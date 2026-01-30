"use client";

import Link from "next/link";
import { Header } from "@/components/header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { languages } from "@/lib/languages";
import { useAuth } from "@/context/auth-context";
import { ChevronRight, BookOpen, CheckCircle2 } from "lucide-react";

export default function LanguagesPage() {
  const { userData } = useAuth();
  const completedLessons = userData?.completedLessons || [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Programlama Dilleri</h1>
          <p className="text-muted-foreground mt-2">
            Öğrenmek istediğiniz dili seçin ve yolculuğunuza başlayın
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {languages.map((lang) => {
            const completed = lang.lessons.filter(lesson => 
              completedLessons.includes(lesson.id)
            ).length;
            const isStarted = completed > 0;
            const isCompleted = completed === lang.lessons.length;

            return (
              <Link key={lang.id} href={`/learn/${lang.id}`}>
                <Card className="h-full border border-border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10 cursor-pointer group overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div 
                        className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform"
                        style={{ backgroundColor: `${lang.color}20` }}
                      >
                        {lang.icon}
                      </div>
                      {isCompleted ? (
                        <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Tamamlandı
                        </Badge>
                      ) : isStarted ? (
                        <Badge variant="secondary">
                          {completed}/{lang.lessons.length} ders
                        </Badge>
                      ) : null}
                    </div>
                    
                    <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {lang.name}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {lang.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <BookOpen className="w-4 h-4" />
                        <span>{lang.lessons.length} ders</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>

                    {isStarted && !isCompleted && (
                      <div className="mt-4">
                        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all"
                            style={{ width: `${(completed / lang.lessons.length) * 100}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
