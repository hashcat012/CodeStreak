"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Flame, 
  Coins, 
  Zap, 
  Trophy, 
  BookOpen, 
  ChevronRight,
  Calendar,
  Target,
  Loader2
} from "lucide-react";
import { languages } from "@/lib/languages";

export default function DashboardPage() {
  const { user, userData, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || !userData) {
    return null;
  }

  const completedLessons = userData.completedLessons || [];
  const totalLessons = languages.reduce((acc, lang) => acc + lang.lessons.length, 0);
  const progressPercent = (completedLessons.length / totalLessons) * 100;

  // Get languages with progress
  const languageProgress = languages.map(lang => {
    const completed = lang.lessons.filter(lesson => 
      completedLessons.includes(lesson.id)
    ).length;
    return {
      ...lang,
      completed,
      total: lang.lessons.length,
      percent: (completed / lang.lessons.length) * 100
    };
  }).filter(lang => lang.completed > 0);

  // Get recent activity
  const recentLessons = completedLessons.slice(-5).reverse();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Merhaba, {userData.displayName}!
          </h1>
          <p className="text-muted-foreground mt-1">
            Öğrenmeye devam et, streakini koru!
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-0 bg-gradient-to-br from-primary/10 to-primary/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Coins className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {userData.isAdmin ? "∞" : userData.coins}
                  </p>
                  <p className="text-xs text-muted-foreground">Coin</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-secondary/10 to-secondary/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{userData.streak}</p>
                  <p className="text-xs text-muted-foreground">Gün Streak</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-accent/10 to-accent/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{completedLessons.length}</p>
                  <p className="text-xs text-muted-foreground">Ders Tamamlandı</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-primary/10 to-secondary/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{languageProgress.length}</p>
                  <p className="text-xs text-muted-foreground">Dil Öğreniliyor</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Daily Coins Card */}
            {!userData.isAdmin && (
              <Card className="border-2 border-secondary/30 bg-gradient-to-r from-secondary/10 to-transparent">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-secondary/20 flex items-center justify-center">
                        <Calendar className="w-7 h-7 text-secondary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Günlük Coin</h3>
                        <p className="text-sm text-muted-foreground">
                          Bugün {userData.coins} coinin var
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-secondary">{userData.coins}/5</p>
                      <p className="text-xs text-muted-foreground">Yarın yenilenir</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Continue Learning */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Öğrenmeye Devam Et
                </CardTitle>
                <CardDescription>
                  Bir dil seç ve yolculuğuna devam et
                </CardDescription>
              </CardHeader>
              <CardContent>
                {languageProgress.length > 0 ? (
                  <div className="space-y-4">
                    {languageProgress.slice(0, 3).map((lang) => (
                      <Link key={lang.id} href={`/learn/${lang.id}`}>
                        <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer group">
                          <div 
                            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                            style={{ backgroundColor: `${lang.color}20` }}
                          >
                            {lang.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-medium text-foreground">{lang.name}</h4>
                              <span className="text-sm text-muted-foreground">
                                {lang.completed}/{lang.total} ders
                              </span>
                            </div>
                            <Progress value={lang.percent} className="h-2" />
                          </div>
                          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">Henüz ders tamamlamadın</p>
                    <Link href="/languages">
                      <Button>
                        Öğrenmeye Başla
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* All Languages */}
            <Card>
              <CardHeader>
                <CardTitle>Tüm Diller</CardTitle>
                <CardDescription>
                  Yeni bir dil öğrenmeye başla
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {languages.slice(0, 6).map((lang) => (
                    <Link key={lang.id} href={`/learn/${lang.id}`}>
                      <div className="p-3 rounded-xl border border-border hover:border-primary/50 transition-all cursor-pointer group text-center">
                        <div 
                          className="w-10 h-10 mx-auto rounded-lg flex items-center justify-center text-xl mb-2 group-hover:scale-110 transition-transform"
                          style={{ backgroundColor: `${lang.color}20` }}
                        >
                          {lang.icon}
                        </div>
                        <p className="text-sm font-medium text-foreground">{lang.name}</p>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Link href="/languages">
                    <Button variant="outline" size="sm">
                      Tüm Dilleri Gör
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Overall Progress */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Genel İlerleme</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="relative w-32 h-32 mx-auto">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="12"
                        className="text-muted"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        fill="none"
                        stroke="url(#progress-gradient)"
                        strokeWidth="12"
                        strokeLinecap="round"
                        strokeDasharray={`${progressPercent * 3.52} 352`}
                      />
                      <defs>
                        <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="hsl(var(--primary))" />
                          <stop offset="100%" stopColor="hsl(var(--secondary))" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-foreground">
                          {Math.round(progressPercent)}%
                        </p>
                        <p className="text-xs text-muted-foreground">Tamamlandı</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center text-sm text-muted-foreground">
                  {completedLessons.length} / {totalLessons} ders tamamlandı
                </div>
              </CardContent>
            </Card>

            {/* Streak Card */}
            <Card className="bg-gradient-to-br from-primary to-secondary text-primary-foreground">
              <CardContent className="p-6 text-center">
                <Flame className="w-12 h-12 mx-auto mb-3" />
                <p className="text-4xl font-bold">{userData.streak}</p>
                <p className="text-sm opacity-90">Gün Streak</p>
                <p className="text-xs mt-2 opacity-75">
                  Her gün giriş yap, streakini koru!
                </p>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Hızlı Erişim</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/roadmap">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Target className="w-4 h-4 mr-2" />
                    Yol Haritası
                  </Button>
                </Link>
                <Link href="/languages">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Tüm Diller
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
