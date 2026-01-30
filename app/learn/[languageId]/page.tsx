"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getLanguageById } from "@/lib/languages";
import { useAuth } from "@/context/auth-context";
import { 
  ChevronLeft, 
  ChevronRight, 
  Lock, 
  CheckCircle2, 
  Circle,
  Coins,
  BookOpen
} from "lucide-react";
import { use } from "react";

export default function LearnLanguagePage() {
  const params = useParams();
  const router = useRouter();
  const languageId = params.languageId as string;
  const language = getLanguageById(languageId);
  const { user, userData } = useAuth();
  const completedLessons = userData?.completedLessons || [];

  if (!language) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-20">
            <h1 className="text-2xl font-bold text-foreground mb-4">Dil bulunamadı</h1>
            <Link href="/languages">
              <Button>Dillere Dön</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const getLessonStatus = (lessonId: string, index: number) => {
    const fullLessonId = `${languageId}-${lessonId}`;
    if (completedLessons.includes(fullLessonId)) {
      return "completed";
    }
    // First lesson is always unlocked, or if previous lesson is completed, or admin
    const prevLessonId = `${languageId}-${language.lessons[index - 1]?.id}`;
    if (index === 0 || completedLessons.includes(prevLessonId) || userData?.isAdmin) {
      return "unlocked";
    }
    return "locked";
  };

  const completedCount = language.lessons.filter(l => 
    completedLessons.includes(`${languageId}-${l.id}`)
  ).length;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button & Header */}
        <div className="mb-8">
          <Link href="/languages" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4 transition-colors">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Tüm Diller
          </Link>
          
          <div className="flex items-start gap-4">
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl shrink-0"
              style={{ backgroundColor: `${language.color}20` }}
            >
              {language.icon}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-foreground">{language.name}</h1>
              <p className="text-muted-foreground mt-1">{language.description}</p>
              <div className="flex items-center gap-4 mt-3">
                <Badge variant="secondary">
                  <BookOpen className="w-3 h-3 mr-1" />
                  {language.lessons.length} ders
                </Badge>
                <Badge variant="outline" className="text-primary border-primary/30">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  {completedCount} tamamlandı
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">İlerleme</span>
            <span className="text-sm font-medium text-foreground">
              {completedCount}/{language.lessons.length}
            </span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
              style={{ width: `${(completedCount / language.lessons.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Coin Info */}
        {!userData?.isAdmin && user && (
          <Card className="mb-8 border-secondary/30 bg-secondary/5">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Coins className="w-5 h-5 text-secondary" />
                  <span className="text-sm text-muted-foreground">
                    Her ders 1 coin harcar
                  </span>
                </div>
                <Badge variant="secondary" className="text-lg px-3 py-1">
                  {userData?.coins || 0} Coin
                </Badge>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Lessons List */}
        <div className="space-y-3">
          {language.lessons.map((lesson, index) => {
            const status = getLessonStatus(lesson.id, index);
            const isCompleted = status === "completed";
            const isLocked = status === "locked";

            return (
              <Card 
                key={lesson.id}
                className={`transition-all ${
                  isLocked 
                    ? "opacity-60 cursor-not-allowed" 
                    : "hover:border-primary/50 cursor-pointer hover:shadow-md"
                }`}
              >
                <CardContent className="p-4">
                  {isLocked ? (
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                        <Lock className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-muted-foreground">{lesson.title}</h3>
                        <p className="text-sm text-muted-foreground/70">{lesson.description}</p>
                      </div>
                      <Badge variant="outline" className="text-muted-foreground">
                        Kilitli
                      </Badge>
                    </div>
                  ) : (
                    <Link href={`/learn/${languageId}/${lesson.id}`}>
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          isCompleted 
                            ? "bg-green-500/10" 
                            : "bg-primary/10"
                        }`}>
                          {isCompleted ? (
                            <CheckCircle2 className="w-6 h-6 text-green-500" />
                          ) : (
                            <span className="text-lg font-bold text-primary">{index + 1}</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-foreground">{lesson.title}</h3>
                          <p className="text-sm text-muted-foreground">{lesson.description}</p>
                        </div>
                        {isCompleted ? (
                          <Badge className="bg-green-500/10 text-green-600 border-0">
                            Tamamlandı
                          </Badge>
                        ) : (
                          <ChevronRight className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                    </Link>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Not Logged In Message */}
        {!user && (
          <Card className="mt-8 border-primary/30 bg-primary/5">
            <CardContent className="p-6 text-center">
              <h3 className="font-semibold text-foreground mb-2">
                İlerlemenizi kaydedin
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                Giriş yaparak ilerlemenizi kaydedin ve günlük 5 ücretsiz coin kazanın
              </p>
              <div className="flex items-center justify-center gap-3">
                <Link href="/login">
                  <Button variant="outline">Giriş Yap</Button>
                </Link>
                <Link href="/register">
                  <Button>Kayıt Ol</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
