"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { languages } from "@/lib/languages";
import { useAuth } from "@/context/auth-context";
import { 
  CheckCircle2, 
  Lock, 
  ChevronRight,
  Star,
  Zap
} from "lucide-react";

export default function RoadmapPage() {
  const { userData } = useAuth();
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const completedLessons = userData?.completedLessons || [];

  const getLessonStatus = (lessonId: string, index: number) => {
    if (completedLessons.includes(lessonId)) {
      return "completed";
    }
    if (index === 0 || completedLessons.includes(selectedLanguage.lessons[index - 1]?.id)) {
      return "unlocked";
    }
    return "locked";
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Yol Haritası</h1>
          <p className="text-muted-foreground mt-2">
            Adım adım ilerle, seviyelerini aç
          </p>
        </div>

        {/* Language Selector */}
        <div className="flex flex-wrap gap-2 mb-8 pb-4 border-b border-border">
          {languages.map((lang) => {
            const completed = lang.lessons.filter(l => completedLessons.includes(l.id)).length;
            const isSelected = selectedLanguage.id === lang.id;
            
            return (
              <button
                key={lang.id}
                type="button"
                onClick={() => setSelectedLanguage(lang)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                  isSelected 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted hover:bg-muted/80 text-foreground"
                }`}
              >
                <span className="text-lg">{lang.icon}</span>
                <span className="font-medium">{lang.name}</span>
                {completed > 0 && (
                  <Badge variant={isSelected ? "secondary" : "outline"} className="ml-1 text-xs">
                    {completed}/{lang.lessons.length}
                  </Badge>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Language Info */}
        <Card className="mb-8 overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl"
                style={{ backgroundColor: `${selectedLanguage.color}20` }}
              >
                {selectedLanguage.icon}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-foreground">{selectedLanguage.name}</h2>
                <p className="text-muted-foreground">{selectedLanguage.description}</p>
              </div>
              <Link href={`/learn/${selectedLanguage.id}`}>
                <Button>
                  Öğrenmeye Başla
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* 3D-like Path Visualization */}
        <div className="relative">
          {/* Path SVG */}
          <svg 
            className="absolute left-1/2 top-0 -translate-x-1/2 h-full pointer-events-none"
            width="4"
            style={{ height: `${selectedLanguage.lessons.length * 140}px` }}
          >
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="hsl(var(--secondary))" />
              </linearGradient>
            </defs>
            <line 
              x1="2" 
              y1="0" 
              x2="2" 
              y2="100%" 
              stroke="url(#pathGradient)" 
              strokeWidth="4" 
              strokeDasharray="8 4"
              opacity="0.3"
            />
          </svg>

          {/* Lessons Path */}
          <div className="relative space-y-4">
            {selectedLanguage.lessons.map((lesson, index) => {
              const status = getLessonStatus(lesson.id, index);
              const isCompleted = status === "completed";
              const isLocked = status === "locked";
              const isEven = index % 2 === 0;

              return (
                <div 
                  key={lesson.id}
                  className={`flex items-center gap-4 ${isEven ? "flex-row" : "flex-row-reverse"}`}
                >
                  {/* Content Card */}
                  <div className={`flex-1 ${isEven ? "text-right pr-8" : "text-left pl-8"}`}>
                    {isLocked ? (
                      <Card className="inline-block opacity-60">
                        <CardContent className="p-4">
                          <div className={`flex items-center gap-3 ${isEven ? "flex-row-reverse" : "flex-row"}`}>
                            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                              <Lock className="w-5 h-5 text-muted-foreground" />
                            </div>
                            <div className={isEven ? "text-right" : "text-left"}>
                              <h3 className="font-medium text-muted-foreground">{lesson.title}</h3>
                              <p className="text-sm text-muted-foreground/70">{lesson.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <Link href={`/learn/${selectedLanguage.id}/${lesson.id}`}>
                        <Card className={`inline-block hover:shadow-lg transition-all cursor-pointer ${
                          isCompleted ? "border-green-500/30 bg-green-500/5" : "hover:border-primary/50"
                        }`}>
                          <CardContent className="p-4">
                            <div className={`flex items-center gap-3 ${isEven ? "flex-row-reverse" : "flex-row"}`}>
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                                isCompleted ? "bg-green-500/20" : "bg-primary/20"
                              }`}>
                                {isCompleted ? (
                                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                                ) : (
                                  <Zap className="w-5 h-5 text-primary" />
                                )}
                              </div>
                              <div className={isEven ? "text-right" : "text-left"}>
                                <h3 className="font-medium text-foreground">{lesson.title}</h3>
                                <p className="text-sm text-muted-foreground">{lesson.description}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    )}
                  </div>

                  {/* Center Node */}
                  <div className="relative z-10 shrink-0">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-bold shadow-lg transition-transform hover:scale-110 ${
                      isCompleted 
                        ? "bg-green-500 text-white" 
                        : isLocked 
                          ? "bg-muted text-muted-foreground"
                          : "bg-gradient-to-br from-primary to-secondary text-primary-foreground"
                    }`}>
                      {isCompleted ? (
                        <Star className="w-6 h-6" />
                      ) : (
                        index + 1
                      )}
                    </div>
                    {/* Glow effect for unlocked */}
                    {!isLocked && !isCompleted && (
                      <div className="absolute inset-0 rounded-2xl bg-primary/30 blur-xl -z-10" />
                    )}
                  </div>

                  {/* Empty space for alignment */}
                  <div className="flex-1" />
                </div>
              );
            })}
          </div>

          {/* Completion Badge */}
          {selectedLanguage.lessons.every(l => completedLessons.includes(l.id)) && (
            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-primary to-secondary rounded-2xl text-primary-foreground">
                <Star className="w-8 h-8" />
                <div className="text-left">
                  <p className="font-bold text-lg">Tebrikler!</p>
                  <p className="text-sm opacity-90">{selectedLanguage.name} yol haritasını tamamladın!</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Legend */}
        <Card className="mt-12">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-primary to-secondary" />
                <span className="text-muted-foreground">Aktif Seviye</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-green-500" />
                <span className="text-muted-foreground">Tamamlandı</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-muted" />
                <span className="text-muted-foreground">Kilitli</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
