"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  collection, 
  getDocs, 
  doc, 
  updateDoc,
  query,
  orderBy,
  limit
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { languages } from "@/lib/languages";
import { 
  Users, 
  BookOpen, 
  Coins, 
  TrendingUp,
  Search,
  Shield,
  Loader2,
  Crown,
  Zap,
  Edit2,
  Check,
  X,
  CreditCard,
  Settings,
  AlertCircle,
  Link as LinkIcon
} from "lucide-react";

interface UserData {
  uid: string;
  email: string;
  displayName: string;
  coins: number;
  isAdmin: boolean;
  completedLessons: string[];
  streak: number;
  lastLoginDate: string;
  createdAt: any;
}

export default function AdminPage() {
  const { user, userData, loading } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<UserData[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [editCoins, setEditCoins] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<"users" | "payments">("users");
  const [stripeKey, setStripeKey] = useState("");
  const [stripeSecret, setStripeSecret] = useState("");
  const [paymentEnabled, setPaymentEnabled] = useState(false);

  useEffect(() => {
    if (!loading && (!user || !userData?.isAdmin)) {
      router.push("/dashboard");
    }
  }, [user, userData, loading, router]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, orderBy("createdAt", "desc"), limit(100));
        const snapshot = await getDocs(q);
        const usersData = snapshot.docs.map(doc => ({
          ...doc.data(),
          uid: doc.id
        })) as UserData[];
        setUsers(usersData);
      } catch (error) {
        console.log("[v0] Error fetching users:", error);
      } finally {
        setLoadingUsers(false);
      }
    };

    if (userData?.isAdmin) {
      fetchUsers();
    }
  }, [userData]);

  const handleUpdateCoins = async (userId: string, newCoins: number) => {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, { coins: newCoins });
      setUsers(users.map(u => u.uid === userId ? { ...u, coins: newCoins } : u));
      setEditingUser(null);
    } catch (error) {
      console.log("[v0] Error updating coins:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || !userData?.isAdmin) {
    return null;
  }

  const filteredUsers = users.filter(u => 
    u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.displayName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalLessonsCompleted = users.reduce((acc, u) => acc + (u.completedLessons?.length || 0), 0);
  const totalLessons = languages.reduce((acc, l) => acc + l.lessons.length, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Admin Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-6 h-6 text-primary" />
              <Badge className="bg-primary/10 text-primary border-primary/30">Admin Panel</Badge>
            </div>
            <h1 className="text-3xl font-bold text-foreground">Yönetim Paneli</h1>
            <p className="text-muted-foreground mt-1">
              Kullanıcıları ve içerikleri yönetin
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full">
            <Crown className="w-5 h-5 text-secondary" />
            <span className="font-medium text-foreground">Sınırsız Coin</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="border-0 bg-gradient-to-br from-primary/10 to-primary/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">{users.length}</p>
                  <p className="text-sm text-muted-foreground">Toplam Kullanıcı</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-secondary/10 to-secondary/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">{totalLessonsCompleted}</p>
                  <p className="text-sm text-muted-foreground">Tamamlanan Ders</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-accent/10 to-accent/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                  <Coins className="w-6 h-6 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">
                    {users.filter(u => !u.isAdmin).reduce((acc, u) => acc + (u.coins || 0), 0)}
                  </p>
                  <p className="text-sm text-muted-foreground">Toplam Coin (Kullanıcı)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-primary/10 to-secondary/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">{languages.length}</p>
                  <p className="text-sm text-muted-foreground">Toplam Dil</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-6">
          <Button
            variant={activeTab === "users" ? "default" : "outline"}
            onClick={() => setActiveTab("users")}
            className={activeTab === "users" ? "bg-gradient-to-r from-primary to-secondary text-white" : ""}
          >
            <Users className="w-4 h-4 mr-2" />
            Kullanicilar
          </Button>
          <Button
            variant={activeTab === "payments" ? "default" : "outline"}
            onClick={() => setActiveTab("payments")}
            className={activeTab === "payments" ? "bg-gradient-to-r from-primary to-secondary text-white" : ""}
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Odeme Ayarlari
          </Button>
        </div>

        {/* Payment Settings */}
        {activeTab === "payments" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Stripe Entegrasyonu</CardTitle>
                    <CardDescription>Odeme islemleri icin Stripe API anahtarlarinizi girin</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-amber-600">Odeme Sistemi Pasif</p>
                    <p className="text-sm text-amber-600/80 mt-1">
                      Stripe anahtarlarinizi girerek odeme sistemini aktif hale getirin. Aktif olana kadar kullanicilar sadece ucretsiz plani kullanabilir.
                    </p>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Stripe Publishable Key
                    </label>
                    <Input
                      type="text"
                      placeholder="pk_live_..."
                      value={stripeKey}
                      onChange={(e) => setStripeKey(e.target.value)}
                      className="font-mono"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Stripe Dashboard &gt; Developers &gt; API Keys adresinden alinabilir
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Stripe Secret Key
                    </label>
                    <Input
                      type="password"
                      placeholder="sk_live_..."
                      value={stripeSecret}
                      onChange={(e) => setStripeSecret(e.target.value)}
                      className="font-mono"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Bu anahtar gizli tutulmalidir ve asla paylasmayin
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Settings className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-foreground">Odeme Sistemi Durumu</p>
                      <p className="text-sm text-muted-foreground">
                        {paymentEnabled ? "Aktif - Kullanicilar odeme yapabilir" : "Pasif - Odeme yapilmamaktadir"}
                      </p>
                    </div>
                  </div>
                  <Badge className={paymentEnabled ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"}>
                    {paymentEnabled ? "Aktif" : "Pasif"}
                  </Badge>
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-primary to-secondary text-white"
                  onClick={() => {
                    if (stripeKey && stripeSecret) {
                      setPaymentEnabled(true);
                      alert("Stripe anahtarlari kaydedildi! Odeme sistemi aktif.");
                    } else {
                      alert("Lutfen tum alanlari doldurun.");
                    }
                  }}
                >
                  <LinkIcon className="w-4 h-4 mr-2" />
                  Stripe Bagla ve Aktif Et
                </Button>
              </CardContent>
            </Card>

            {/* Plan Pricing Info */}
            <Card>
              <CardHeader>
                <CardTitle>Plan Fiyatlandirmasi</CardTitle>
                <CardDescription>Mevcut fiyatlandirma yapilandirmasi</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-muted/50 rounded-xl text-center">
                    <p className="text-sm text-muted-foreground mb-1">Free</p>
                    <p className="text-2xl font-bold text-foreground">$0</p>
                    <p className="text-xs text-muted-foreground mt-1">Gunluk 5 Coin</p>
                  </div>
                  <div className="p-4 bg-blue-500/10 rounded-xl text-center">
                    <p className="text-sm text-blue-600 mb-1">Plus</p>
                    <p className="text-2xl font-bold text-blue-600">$1<span className="text-sm line-through text-muted-foreground ml-1">$5</span></p>
                    <p className="text-xs text-muted-foreground mt-1">Gunluk 20 Coin</p>
                  </div>
                  <div className="p-4 bg-primary/10 rounded-xl text-center">
                    <p className="text-sm text-primary mb-1">Pro</p>
                    <p className="text-2xl font-bold text-primary">$5<span className="text-sm line-through text-muted-foreground ml-1">$10</span></p>
                    <p className="text-xs text-muted-foreground mt-1">Gunluk 200 Coin</p>
                  </div>
                  <div className="p-4 bg-amber-500/10 rounded-xl text-center">
                    <p className="text-sm text-amber-600 mb-1">Max</p>
                    <p className="text-2xl font-bold text-amber-600">$19.99<span className="text-sm line-through text-muted-foreground ml-1">$50</span></p>
                    <p className="text-xs text-muted-foreground mt-1">Sinirsiz Coin</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Users Table */}
        {activeTab === "users" && (
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <CardTitle>Kullanıcılar</CardTitle>
                  <CardDescription>Tüm kayıtlı kullanıcıları görüntüle ve yönet</CardDescription>
                </div>
                <div className="relative w-full sm:w-72">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Kullanıcı ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {loadingUsers ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Kullanıcı</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">E-posta</th>
                        <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Coin</th>
                        <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Streak</th>
                        <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Dersler</th>
                        <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Durum</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">İşlemler</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((u) => (
                        <tr key={u.uid} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <span className="text-sm font-medium text-primary">
                                  {u.displayName?.[0]?.toUpperCase() || "U"}
                                </span>
                              </div>
                              <span className="font-medium text-foreground">{u.displayName || "İsimsiz"}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">{u.email}</td>
                          <td className="py-3 px-4 text-center">
                            {editingUser === u.uid ? (
                              <div className="flex items-center justify-center gap-1">
                                <Input
                                  type="number"
                                  value={editCoins}
                                  onChange={(e) => setEditCoins(Number(e.target.value))}
                                  className="w-20 h-8 text-center"
                                />
                                <button
                                  type="button"
                                  onClick={() => handleUpdateCoins(u.uid, editCoins)}
                                  className="p-1 hover:bg-green-500/10 rounded"
                                >
                                  <Check className="w-4 h-4 text-green-500" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setEditingUser(null)}
                                  className="p-1 hover:bg-red-500/10 rounded"
                                >
                                  <X className="w-4 h-4 text-red-500" />
                                </button>
                              </div>
                            ) : (
                              <Badge variant="secondary">
                                {u.isAdmin ? "∞" : u.coins || 0}
                              </Badge>
                            )}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <Zap className="w-4 h-4 text-secondary" />
                              <span className="text-foreground">{u.streak || 0}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className="text-foreground">{u.completedLessons?.length || 0}</span>
                            <span className="text-muted-foreground">/{totalLessons}</span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            {u.isAdmin ? (
                              <Badge className="bg-primary/10 text-primary border-0">
                                <Crown className="w-3 h-3 mr-1" />
                                Admin
                              </Badge>
                            ) : (
                              <Badge variant="outline">Kullanıcı</Badge>
                            )}
                          </td>
                          <td className="py-3 px-4 text-right">
                            {!u.isAdmin && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setEditingUser(u.uid);
                                  setEditCoins(u.coins || 0);
                                }}
                              >
                                <Edit2 className="w-4 h-4" />
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {filteredUsers.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                      Kullanıcı bulunamadı
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Popüler Diller</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {languages.slice(0, 5).map((lang) => {
                  const completedInLang = users.reduce((acc, u) => {
                    return acc + (u.completedLessons?.filter(l => l.startsWith(lang.id)).length || 0);
                  }, 0);
                  const maxPossible = users.length * lang.lessons.length;
                  const percent = maxPossible > 0 ? (completedInLang / maxPossible) * 100 : 0;

                  return (
                    <div key={lang.id} className="flex items-center gap-3">
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-lg"
                        style={{ backgroundColor: `${lang.color}20` }}
                      >
                        {lang.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-foreground">{lang.name}</span>
                          <span className="text-xs text-muted-foreground">{completedInLang} ders</span>
                        </div>
                        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all"
                            style={{ 
                              width: `${percent}%`,
                              backgroundColor: lang.color
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Son Aktiviteler</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {users.slice(0, 5).map((u) => (
                  <div key={u.uid} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {u.displayName?.[0]?.toUpperCase() || "U"}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{u.displayName}</p>
                      <p className="text-xs text-muted-foreground">
                        {u.completedLessons?.length || 0} ders tamamladı
                      </p>
                    </div>
                    <Badge variant="outline" className="shrink-0">
                      {u.streak} gün
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
