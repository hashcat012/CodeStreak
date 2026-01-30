"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getLanguageById, getLessonById } from "@/lib/languages";
import { useAuth } from "@/context/auth-context";
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  XCircle,
  Coins,
  AlertCircle,
  BookOpen,
  Code,
  HelpCircle,
  Trophy,
  Star,
  Play,
  Lock,
  SkipForward,
  Lightbulb
} from "lucide-react";

type LessonPhase = "theory" | "quiz" | "challenge" | "complete";

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const languageId = params.languageId as string;
  const lessonId = params.lessonId as string;
  
  const language = getLanguageById(languageId);
  const lesson = getLessonById(languageId, lessonId);
  const { user, userData, completeLesson } = useAuth();
  
  // Lesson phases
  const [phase, setPhase] = useState<LessonPhase>("theory");
  
  // Quiz state
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<(number | null)[]>([]);
  const [quizResults, setQuizResults] = useState<(boolean | null)[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  
  // Challenge state
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [challengeCode, setChallengeCode] = useState("");
  const [challengeOutput, setChallengeOutput] = useState("");
  const [challengeResults, setChallengeResults] = useState<(boolean | null)[]>([]);
  const [showHint, setShowHint] = useState(false);
  
  // Completion state
  const [stars, setStars] = useState(0);
  const [coinError, setCoinError] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);

  const completedLessons = userData?.completedLessons || [];
  const isAlreadyCompleted = completedLessons.includes(`${languageId}-${lessonId}`);
  
  // Check if previous lesson is completed (for locking)
  const currentIndex = language?.lessons.findIndex(l => l.id === lessonId) ?? 0;
  const prevLesson = language?.lessons[currentIndex - 1];
  const isPreviousCompleted = currentIndex === 0 || completedLessons.includes(`${languageId}-${prevLesson?.id}`);
  const isLocked = !isPreviousCompleted && !isAlreadyCompleted && !userData?.isAdmin;

  useEffect(() => {
    if (lesson) {
      setQuizAnswers(new Array(lesson.quiz.length).fill(null));
      setQuizResults(new Array(lesson.quiz.length).fill(null));
      setChallengeResults(new Array(lesson.challenges.length).fill(null));
      if (lesson.challenges[0]) {
        setChallengeCode(lesson.challenges[0].starterCode);
      }
    }
  }, [lesson]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (user === null) {
      router.push(`/login?redirect=/learn/${languageId}/${lessonId}`);
    }
  }, [user, router, languageId, lessonId]);

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Giriş sayfasına yönlendiriliyorsunuz...</p>
        </div>
      </div>
    );
  }

  if (!language || !lesson) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-20">
            <h1 className="text-2xl font-bold text-foreground mb-4">Ders bulunamadı</h1>
            <Link href="/languages">
              <Button>Dillere Dön</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  // Locked lesson view
  if (isLocked) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link 
            href={`/learn/${languageId}`} 
            className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            {language.name} Dersleri
          </Link>
          
          <Card className="border-muted">
            <CardContent className="p-12 text-center">
              <div className="w-24 h-24 mx-auto rounded-full bg-muted flex items-center justify-center mb-6">
                <Lock className="w-12 h-12 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Bu Ders Kilitli</h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Bu derse erişmek için önce "{prevLesson?.title}" dersini tamamlamanız gerekiyor.
              </p>
              <Link href={`/learn/${languageId}/${prevLesson?.id}`}>
                <Button className="bg-gradient-to-r from-primary to-secondary text-primary-foreground">
                  Önceki Derse Git
                </Button>
              </Link>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  const nextLesson = language.lessons[currentIndex + 1];

  // Quiz handlers
  const handleQuizAnswer = (answerIndex: number) => {
    if (quizResults[currentQuizIndex] !== null) return;
    
    const newAnswers = [...quizAnswers];
    newAnswers[currentQuizIndex] = answerIndex;
    setQuizAnswers(newAnswers);
    
    const isCorrect = answerIndex === lesson.quiz[currentQuizIndex].correctAnswer;
    const newResults = [...quizResults];
    newResults[currentQuizIndex] = isCorrect;
    setQuizResults(newResults);
  };

  const handleNextQuiz = () => {
    if (currentQuizIndex < lesson.quiz.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
    } else {
      setQuizCompleted(true);
      setPhase("challenge");
      setChallengeCode(lesson.challenges[0]?.starterCode || "");
    }
  };

  // Challenge handlers
  const runChallenge = () => {
    const challenge = lesson.challenges[currentChallengeIndex];
    // Simple output simulation - in real app, this would run actual code
    try {
      // Extract print/console.log content for simulation
      const printMatch = challengeCode.match(/print\s*\(\s*["'](.+?)["']\s*\)/);
      const consoleMatch = challengeCode.match(/console\.log\s*\(\s*["'](.+?)["']\s*\)/);
      const calcMatch = challengeCode.match(/print\s*\(\s*(\d+\s*[+\-*/]\s*\d+)\s*\)/);
      
      let output = "";
      if (calcMatch) {
        output = String(eval(calcMatch[1]));
      } else if (printMatch) {
        output = printMatch[1];
      } else if (consoleMatch) {
        output = consoleMatch[1];
      } else {
        output = "Kod çalıştırıldı";
      }
      
      setChallengeOutput(output);
      
      const isCorrect = output.trim().toLowerCase().includes(challenge.expectedOutput.toLowerCase()) || 
                        challenge.expectedOutput.toLowerCase().includes(output.trim().toLowerCase());
      
      const newResults = [...challengeResults];
      newResults[currentChallengeIndex] = isCorrect;
      setChallengeResults(newResults);
    } catch {
      setChallengeOutput("Hata: Kod çalıştırılamadı");
    }
  };

  const handleNextChallenge = () => {
    if (currentChallengeIndex < lesson.challenges.length - 1) {
      setCurrentChallengeIndex(currentChallengeIndex + 1);
      setChallengeCode(lesson.challenges[currentChallengeIndex + 1]?.starterCode || "");
      setChallengeOutput("");
      setShowHint(false);
    } else {
      calculateStarsAndComplete();
    }
  };

  const handleSkipLesson = async () => {
    await calculateStarsAndComplete();
  };

  const calculateStarsAndComplete = async () => {
    if (isCompleting) return;
    setIsCompleting(true);
    
    // Calculate stars based on quiz and challenge performance
    const correctQuizzes = quizResults.filter(r => r === true).length;
    const correctChallenges = challengeResults.filter(r => r === true).length;
    
    const quizScore = (correctQuizzes / lesson.quiz.length) * 100;
    const challengeScore = lesson.challenges.length > 0 
      ? (correctChallenges / lesson.challenges.length) * 100 
      : 100;
    
    const totalScore = (quizScore + challengeScore) / 2;
    
    let earnedStars = 1;
    if (totalScore >= 90) earnedStars = 5;
    else if (totalScore >= 75) earnedStars = 4;
    else if (totalScore >= 60) earnedStars = 3;
    else if (totalScore >= 40) earnedStars = 2;
    
    setStars(earnedStars);
    
    // Complete lesson
    if (!isAlreadyCompleted && user) {
      const success = await completeLesson(`${languageId}-${lessonId}`);
      if (!success) {
        setCoinError(true);
        setIsCompleting(false);
        return;
      }
    }
    
    setPhase("complete");
    setIsCompleting(false);
  };

  // Progress indicator
  const getPhaseProgress = () => {
    switch (phase) {
      case "theory": return 33;
      case "quiz": return 66;
      case "challenge": return 90;
      case "complete": return 100;
      default: return 0;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button & Progress */}
        <div className="flex items-center justify-between mb-6">
          <Link 
            href={`/learn/${languageId}`} 
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            {language.name} Dersleri
          </Link>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">İlerleme:</span>
              <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                  style={{ width: `${getPhaseProgress()}%` }}
                />
              </div>
            </div>
            {phase !== "complete" && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleSkipLesson}
                className="text-muted-foreground bg-transparent"
              >
                <SkipForward className="w-4 h-4 mr-1" />
                Dersi Geç
              </Button>
            )}
          </div>
        </div>

        {/* Lesson Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" style={{ borderColor: `${language.color}50`, color: language.color }}>
              {language.icon} {language.name}
            </Badge>
            <Badge variant="secondary">
              Ders {currentIndex + 1}/{language.lessons.length}
            </Badge>
            {isAlreadyCompleted && (
              <Badge className="bg-green-500/10 text-green-600 border-0">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Tamamlandı
              </Badge>
            )}
          </div>
          <h1 className="text-3xl font-bold text-foreground">{lesson.title}</h1>
          <p className="text-muted-foreground mt-2">{lesson.description}</p>
        </div>

        {/* Coin Warning */}
        {coinError && (
          <Card className="mb-6 border-destructive/30 bg-destructive/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-destructive" />
                <div>
                  <p className="font-medium text-destructive">Yetersiz Coin</p>
                  <p className="text-sm text-muted-foreground">
                    Bu dersi tamamlamak için en az 1 coininiz olmalı. Yarın tekrar deneyin!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* PHASE 1: Theory */}
        {phase === "theory" && (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Theory Content - Left Side */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <BookOpen className="w-5 h-5 text-primary" />
                    Ders İçeriği
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none">
                    {lesson.content.theory.split('\n\n').map((paragraph, idx) => (
                      <p key={idx} className="text-foreground leading-relaxed mb-4 whitespace-pre-line">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Code Examples */}
              {lesson.content.codeExamples.map((example, idx) => (
                <Card key={idx}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Code className="w-5 h-5 text-primary" />
                      {example.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-zinc-900 text-zinc-100 p-4 rounded-xl overflow-x-auto mb-4">
                      <code className="text-sm font-mono whitespace-pre">
                        {example.code}
                      </code>
                    </pre>
                    <p className="text-muted-foreground text-sm">{example.explanation}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Key Points - Right Side */}
            <div className="space-y-6">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Lightbulb className="w-5 h-5 text-yellow-500" />
                    Önemli Noktalar
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {lesson.content.keyPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-sm text-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-6 pt-6 border-t border-border">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <Coins className="w-4 h-4" />
                      <span>Bu ders 1 coin harcar</span>
                    </div>
                    <Button 
                      onClick={() => setPhase("quiz")}
                      className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground"
                    >
                      Quiz'e Geç
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* PHASE 2: Quiz */}
        {phase === "quiz" && (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Theory Summary - Left Side */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <BookOpen className="w-5 h-5 text-primary" />
                    Ders Özeti
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    {lesson.content.keyPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-muted-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Quiz - Right Side */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <HelpCircle className="w-5 h-5 text-primary" />
                      Quiz - Soru {currentQuizIndex + 1}/{lesson.quiz.length}
                    </CardTitle>
                    <div className="flex gap-1">
                      {lesson.quiz.map((_, idx) => (
                        <div 
                          key={idx}
                          className={`w-3 h-3 rounded-full ${
                            quizResults[idx] === true ? 'bg-green-500' :
                            quizResults[idx] === false ? 'bg-red-500' :
                            idx === currentQuizIndex ? 'bg-primary' : 'bg-muted'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-medium text-foreground mb-6">
                    {lesson.quiz[currentQuizIndex].question}
                  </p>
                  
                  <div className="space-y-3">
                    {lesson.quiz[currentQuizIndex].options.map((option, index) => {
                      const isSelected = quizAnswers[currentQuizIndex] === index;
                      const isCorrectAnswer = index === lesson.quiz[currentQuizIndex].correctAnswer;
                      const hasAnswered = quizResults[currentQuizIndex] !== null;
                      
                      let buttonClass = "w-full p-4 text-left rounded-xl border transition-all ";
                      
                      if (!hasAnswered) {
                        buttonClass += "border-border hover:border-primary/50 hover:bg-primary/5 cursor-pointer";
                      } else if (isCorrectAnswer) {
                        buttonClass += "border-green-500 bg-green-500/10";
                      } else if (isSelected && !isCorrectAnswer) {
                        buttonClass += "border-red-500 bg-red-500/10";
                      } else {
                        buttonClass += "border-border opacity-50";
                      }

                      return (
                        <button
                          key={index}
                          type="button"
                          onClick={() => handleQuizAnswer(index)}
                          className={buttonClass}
                          disabled={hasAnswered}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                              hasAnswered && isCorrectAnswer ? 'bg-green-500 text-white' :
                              hasAnswered && isSelected ? 'bg-red-500 text-white' :
                              'bg-muted'
                            }`}>
                              {String.fromCharCode(65 + index)}
                            </span>
                            <span className={hasAnswered && isCorrectAnswer ? 'text-green-700 font-medium' : 
                                           hasAnswered && isSelected ? 'text-red-700' : ''}>
                              {option}
                            </span>
                            {hasAnswered && isCorrectAnswer && (
                              <CheckCircle2 className="w-5 h-5 text-green-500 ml-auto" />
                            )}
                            {hasAnswered && isSelected && !isCorrectAnswer && (
                              <XCircle className="w-5 h-5 text-red-500 ml-auto" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {quizResults[currentQuizIndex] !== null && (
                    <div className="mt-6 flex justify-end">
                      <Button onClick={handleNextQuiz}>
                        {currentQuizIndex < lesson.quiz.length - 1 ? 'Sonraki Soru' : "Challenge'a Geç"}
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* PHASE 3: Challenge */}
        {phase === "challenge" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Code className="w-5 h-5 text-primary" />
                    Challenge {currentChallengeIndex + 1}/{lesson.challenges.length}
                  </CardTitle>
                  <div className="flex gap-1">
                    {lesson.challenges.map((_, idx) => (
                      <div 
                        key={idx}
                        className={`w-3 h-3 rounded-full ${
                          challengeResults[idx] === true ? 'bg-green-500' :
                          challengeResults[idx] === false ? 'bg-red-500' :
                          idx === currentChallengeIndex ? 'bg-primary' : 'bg-muted'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4 p-4 bg-muted/50 rounded-xl">
                  <p className="font-medium text-foreground mb-2">Görev:</p>
                  <p className="text-muted-foreground">{lesson.challenges[currentChallengeIndex].instruction}</p>
                  <p className="mt-2 text-sm">
                    <span className="text-muted-foreground">Beklenen Çıktı: </span>
                    <code className="bg-zinc-800 text-zinc-100 px-2 py-1 rounded text-xs">
                      {lesson.challenges[currentChallengeIndex].expectedOutput}
                    </code>
                  </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-4">
                  {/* Code Editor */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Kod Editörü</label>
                    <textarea
                      value={challengeCode}
                      onChange={(e) => setChallengeCode(e.target.value)}
                      className="w-full h-48 bg-zinc-900 text-zinc-100 p-4 rounded-xl font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                      spellCheck={false}
                    />
                  </div>

                  {/* Output */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Çıktı</label>
                    <div className={`w-full h-48 p-4 rounded-xl font-mono text-sm overflow-auto ${
                      challengeResults[currentChallengeIndex] === true ? 'bg-green-900/20 border border-green-500/50' :
                      challengeResults[currentChallengeIndex] === false ? 'bg-red-900/20 border border-red-500/50' :
                      'bg-zinc-900'
                    }`}>
                      {challengeOutput ? (
                        <pre className="text-zinc-100 whitespace-pre-wrap">{challengeOutput}</pre>
                      ) : (
                        <span className="text-zinc-500">Kodu çalıştırın...</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Hint */}
                {showHint && (
                  <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
                    <div className="flex items-center gap-2 text-yellow-600 mb-1">
                      <Lightbulb className="w-4 h-4" />
                      <span className="font-medium">İpucu</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{lesson.challenges[currentChallengeIndex].hint}</p>
                  </div>
                )}

                <div className="mt-4 flex items-center justify-between">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowHint(!showHint)}
                  >
                    <Lightbulb className="w-4 h-4 mr-2" />
                    {showHint ? 'İpucunu Gizle' : 'İpucu Göster'}
                  </Button>

                  <div className="flex gap-2">
                    <Button onClick={runChallenge} variant="outline">
                      <Play className="w-4 h-4 mr-2" />
                      Çalıştır
                    </Button>
                    
                    {challengeResults[currentChallengeIndex] !== null && (
                      <Button onClick={handleNextChallenge}>
                        {currentChallengeIndex < lesson.challenges.length - 1 ? 'Sonraki Challenge' : 'Dersi Tamamla'}
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </div>

                {challengeResults[currentChallengeIndex] !== null && (
                  <div className={`mt-4 p-4 rounded-xl flex items-center gap-2 ${
                    challengeResults[currentChallengeIndex] ? 'bg-green-500/10 text-green-700' : 'bg-red-500/10 text-red-700'
                  }`}>
                    {challengeResults[currentChallengeIndex] ? (
                      <>
                        <CheckCircle2 className="w-5 h-5" />
                        <span className="font-medium">Doğru! Harika iş çıkardınız.</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5" />
                        <span className="font-medium">Tam doğru değil, ama devam edebilirsiniz.</span>
                      </>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* PHASE 4: Complete */}
        {phase === "complete" && (
          <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardContent className="p-12 text-center">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6">
                <Trophy className="w-12 h-12 text-primary-foreground" />
              </div>
              
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Tebrikler!
              </h2>
              <p className="text-muted-foreground mb-6">
                "{lesson.title}" dersini başarıyla tamamladınız!
              </p>

              {/* Stars */}
              <div className="flex justify-center gap-2 mb-8">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star}
                    className={`w-10 h-10 transition-all duration-300 ${
                      star <= stars 
                        ? 'text-yellow-500 fill-yellow-500 scale-110' 
                        : 'text-muted'
                    }`}
                    style={{ transitionDelay: `${star * 100}ms` }}
                  />
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {nextLesson ? (
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-primary to-secondary text-primary-foreground"
                    onClick={() => router.push(`/learn/${languageId}/${nextLesson.id}`)}
                  >
                    Sonraki Ders: {nextLesson.title}
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                ) : (
                  <div className="text-center">
                    <p className="text-green-600 font-medium mb-4 text-lg">
                      {language.name} derslerini tamamladınız!
                    </p>
                    <Button size="lg" onClick={() => router.push("/languages")}>
                      Yeni Bir Dil Öğren
                    </Button>
                  </div>
                )}
                
                <Button variant="outline" size="lg" onClick={() => router.push(`/learn/${languageId}`)}>
                  Ders Listesine Dön
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
