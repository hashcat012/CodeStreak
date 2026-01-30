"use client";

import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { 
  Flame, 
  Code2, 
  Zap, 
  Trophy, 
  Coins, 
  Map, 
  ChevronRight,
  Star,
  Users,
  BookOpen
} from "lucide-react";
import { languages } from "@/lib/languages";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
              <Flame className="w-4 h-4" />
              <span>Günlük 5 Ücretsiz Coin</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground leading-tight text-balance">
              Kod Yazmayı
              <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Eğlenerek Öğren
              </span>
            </h1>
            
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              İnteraktif dersler, yol haritası ve günlük coin sistemi ile 
              programlama dillerini öğren. Her gün yeni bir seviye aç!
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register">
                <Button size="lg" className="bg-gradient-to-r from-primary to-secondary text-primary-foreground px-8 h-14 text-lg">
                  Ücretsiz Başla
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/languages">
                <Button size="lg" variant="outline" className="px-8 h-14 text-lg bg-transparent">
                  Dilleri İncele
                </Button>
              </Link>
            </div>
            
            <div className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <span>10,000+ Öğrenci</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                <span>12+ Dil</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-primary" />
                <span>4.9 Puan</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Neden CodeStreak?
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Kod öğrenmenin en eğlenceli yolu
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 bg-background/80 backdrop-blur">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
                  <Coins className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Günlük Coin</h3>
                <p className="text-muted-foreground text-sm">
                  Her gün 5 ücretsiz coin kazan. 1 coin = 1 ders = 1 seviye
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 bg-background/80 backdrop-blur">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
                  <Map className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">3D Yol Haritası</h3>
                <p className="text-muted-foreground text-sm">
                  Birbirine bağlı seviyelerle ilerlemenizi görün
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 bg-background/80 backdrop-blur">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Streak Sistemi</h3>
                <p className="text-muted-foreground text-sm">
                  Her gün giriş yaparak streak zincirini sürdürün
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 bg-background/80 backdrop-blur">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
                  <Trophy className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Quiz ve Rozetler</h3>
                <p className="text-muted-foreground text-sm">
                  Her derste quiz çöz, başarı rozetleri kazan
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Languages Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Popüler Programlama Dilleri
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Kariyerinize yön verecek dilleri öğrenin
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {languages.slice(0, 12).map((lang) => (
              <Link key={lang.id} href={`/learn/${lang.id}`}>
                <Card className="border border-border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10 cursor-pointer group">
                  <CardContent className="p-4 text-center">
                    <div 
                      className="w-12 h-12 mx-auto rounded-xl flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: `${lang.color}20` }}
                    >
                      {lang.icon}
                    </div>
                    <h3 className="font-medium text-foreground text-sm">{lang.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {lang.lessons.length} ders
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link href="/languages">
              <Button variant="outline" size="lg">
                Tüm Dilleri Gör
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Nasıl Çalışır?
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              3 basit adımda öğrenmeye başlayın
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Kayıt Ol</h3>
              <p className="text-muted-foreground">
                Ücretsiz hesap oluşturun ve günlük 5 coin kazanın
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Dil Seçin</h3>
              <p className="text-muted-foreground">
                12+ programlama dilinden öğrenmek istediğinizi seçin
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Öğrenin</h3>
              <p className="text-muted-foreground">
                İnteraktif derslerle yol haritasında ilerleyin
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-primary to-secondary rounded-3xl p-8 sm:p-12">
            <Flame className="w-16 h-16 text-primary-foreground mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-4">
              Bugün Başlayın!
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
              Günlük 5 ücretsiz coin ile programlama öğrenmeye hemen başlayın. 
              Kredi kartı gerekmez.
            </p>
            <Link href="/register">
              <Button size="lg" className="bg-background text-foreground hover:bg-background/90 px-8 h-14 text-lg">
                Ücretsiz Hesap Oluştur
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Flame className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-foreground">CodeStreak</span>
            </div>
            
            <nav className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="/languages" className="hover:text-foreground transition-colors">
                Diller
              </Link>
              <Link href="/roadmap" className="hover:text-foreground transition-colors">
                Yol Haritası
              </Link>
              <Link href="/login" className="hover:text-foreground transition-colors">
                Giriş
              </Link>
            </nav>
            
            <p className="text-sm text-muted-foreground">
              © 2026 CodeStreak. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
