"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, Crown, Sparkles, Coins, X } from "lucide-react";

const plans = [
  {
    id: "free",
    name: "Free",
    description: "Başlangıç için ideal",
    price: 0,
    originalPrice: null,
    coinsPerDay: 5,
    coinLimit: "Günlük 5 Coin",
    features: [
      { text: "Günlük 5 coin", included: true },
      { text: "Tüm dillere erişim", included: true },
      { text: "Temel dersler", included: true },
      { text: "Topluluk desteği", included: true },
      { text: "Öncelikli destek", included: false },
      { text: "Sertifika", included: false },
    ],
    icon: Coins,
    popular: false,
    buttonText: "Mevcut Plan",
    gradient: "from-gray-500 to-gray-600",
  },
  {
    id: "plus",
    name: "Plus",
    description: "Daha hızlı öğrenmek için",
    price: 1,
    originalPrice: 5,
    coinsPerDay: 20,
    coinLimit: "Günlük 20 Coin",
    features: [
      { text: "Günlük 20 coin", included: true },
      { text: "Tüm dillere erişim", included: true },
      { text: "Tüm dersler", included: true },
      { text: "Topluluk desteği", included: true },
      { text: "Email desteği", included: true },
      { text: "Sertifika", included: false },
    ],
    icon: Zap,
    popular: false,
    buttonText: "Plus'a Yükselt",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    id: "pro",
    name: "Pro",
    description: "Ciddi geliştiriciler için",
    price: 5,
    originalPrice: 10,
    coinsPerDay: 200,
    coinLimit: "Günlük 200 Coin",
    features: [
      { text: "Günlük 200 coin", included: true },
      { text: "Tüm dillere erişim", included: true },
      { text: "Tüm dersler + projeler", included: true },
      { text: "Öncelikli destek", included: true },
      { text: "1-1 mentorluk (aylık 1 saat)", included: true },
      { text: "Sertifika", included: true },
    ],
    icon: Crown,
    popular: true,
    buttonText: "Pro'ya Yükselt",
    gradient: "from-primary to-secondary",
  },
  {
    id: "max",
    name: "Max",
    description: "Sınırsız öğrenme deneyimi",
    price: 19.99,
    originalPrice: 50,
    coinsPerDay: -1, // unlimited
    coinLimit: "Sınırsız Coin",
    features: [
      { text: "Sınırsız coin", included: true },
      { text: "Tüm dillere erişim", included: true },
      { text: "Tüm dersler + projeler + workshop", included: true },
      { text: "7/24 öncelikli destek", included: true },
      { text: "1-1 mentorluk (sınırsız)", included: true },
      { text: "Sertifika + LinkedIn rozeti", included: true },
    ],
    icon: Sparkles,
    popular: false,
    buttonText: "Max'e Yükselt",
    gradient: "from-amber-500 to-orange-600",
  },
];

export default function PricingPage() {
  const { user, userData } = useAuth();
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleSelectPlan = (planId: string) => {
    if (!user) {
      router.push("/login?redirect=/pricing");
      return;
    }

    if (planId === "free") return;

    setSelectedPlan(planId);
    // Show coming soon message
    alert("Ödeme sistemi yakında aktif olacak! Admin panelinden ödeme yöntemi bağlandığında satın alma işlemi yapabileceksiniz.");
  };

  const currentPlan = userData?.plan || "free";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-primary to-secondary text-white border-0">
            Sınırlı Süre Teklifi
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Öğrenme Hızını <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Artır</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            İhtiyacına uygun planı seç ve kodlama yolculuğunda sınırları kaldır
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isCurrentPlan = currentPlan === plan.id;
            const discount = plan.originalPrice 
              ? Math.round((1 - plan.price / plan.originalPrice) * 100) 
              : 0;

            return (
              <Card 
                key={plan.id}
                className={`relative flex flex-col ${
                  plan.popular 
                    ? "border-2 border-primary shadow-xl scale-105" 
                    : "border-border"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-primary to-secondary text-white border-0 px-4">
                      En Popüler
                    </Badge>
                  </div>
                )}

                {discount > 0 && (
                  <div className="absolute -top-2 -right-2">
                    <Badge className="bg-green-500 text-white border-0">
                      %{discount} İndirim
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-2">
                  <div className={`w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center mb-4`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>

                <CardContent className="flex-1">
                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center gap-2">
                      {plan.originalPrice && (
                        <span className="text-2xl text-muted-foreground line-through">
                          ${plan.originalPrice}
                        </span>
                      )}
                      <span className="text-4xl font-bold text-foreground">
                        {plan.price === 0 ? "Ücretsiz" : `$${plan.price}`}
                      </span>
                    </div>
                    {plan.price > 0 && (
                      <span className="text-muted-foreground text-sm">/ay</span>
                    )}
                    <div className="mt-2">
                      <Badge variant="outline" className="font-medium">
                        {plan.coinLimit}
                      </Badge>
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        {feature.included ? (
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                        ) : (
                          <X className="w-5 h-5 text-muted-foreground/50 flex-shrink-0" />
                        )}
                        <span className={feature.included ? "text-foreground" : "text-muted-foreground/50"}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  <Button
                    className={`w-full ${
                      plan.popular 
                        ? "bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90" 
                        : ""
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                    disabled={isCurrentPlan || plan.id === "free"}
                    onClick={() => handleSelectPlan(plan.id)}
                  >
                    {isCurrentPlan ? "Mevcut Planınız" : plan.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* FAQ or Additional Info */}
        <div className="bg-card border border-border rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Sıkça Sorulan Sorular</h2>
          <div className="grid md:grid-cols-2 gap-6 text-left max-w-4xl mx-auto">
            <div>
              <h3 className="font-semibold text-foreground mb-2">Coin nedir?</h3>
              <p className="text-muted-foreground text-sm">
                Coin, dersleri açmak için kullanılan birimdir. Her ders 1 coin harcar. Günlük coin limitiniz planınıza göre belirlenir.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Planımı değiştirebilir miyim?</h3>
              <p className="text-muted-foreground text-sm">
                Evet, istediğiniz zaman planınızı yükseltebilir veya düşürebilirsiniz. Değişiklik bir sonraki fatura döneminde geçerli olur.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Kullanılmayan coinler aktarılır mı?</h3>
              <p className="text-muted-foreground text-sm">
                Hayır, günlük coinler ertesi güne aktarılmaz. Her gün yeni coin hakkınız yenilenir.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">İptal edebilir miyim?</h3>
              <p className="text-muted-foreground text-sm">
                Evet, aboneliğinizi istediğiniz zaman iptal edebilirsiniz. Mevcut dönem sonuna kadar tüm özelliklere erişiminiz devam eder.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
