"use client";

import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Flame, Menu, X, Coins } from "lucide-react";
import { useState } from "react";

export function Header() {
  const { user, userData, logout, loading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Flame className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">
              Code<span className="text-primary">Streak</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/languages" className="text-muted-foreground hover:text-foreground transition-colors">
              Diller
            </Link>
            <Link href="/roadmap" className="text-muted-foreground hover:text-foreground transition-colors">
              Yol Haritası
            </Link>
            <Link href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
              Fiyatlar
            </Link>
            {!loading && (
              <>
                {user ? (
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-secondary/10 rounded-full">
                      <Coins className="w-4 h-4 text-secondary" />
                      <span className="text-sm font-medium text-foreground">
                        {userData?.isAdmin ? "∞" : userData?.coins || 0}
                      </span>
                    </div>
                    <Link href="/dashboard">
                      <Button variant="ghost" size="sm">
                        Dashboard
                      </Button>
                    </Link>
                    {userData?.isAdmin && (
                      <Link href="/admin">
                        <Button variant="outline" size="sm" className="border-primary text-primary bg-transparent">
                          Admin
                        </Button>
                      </Link>
                    )}
                    <Button variant="ghost" size="sm" onClick={() => logout()}>
                      Çıkış
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Link href="/login">
                      <Button variant="ghost" size="sm">
                        Giriş Yap
                      </Button>
                    </Link>
                    <Link href="/register">
                      <Button size="sm" className="bg-gradient-to-r from-primary to-secondary text-primary-foreground">
                        Kayıt Ol
                      </Button>
                    </Link>
                  </div>
                )}
              </>
            )}
          </nav>

          <button
            type="button"
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              <Link
                href="/languages"
                className="text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Diller
              </Link>
              <Link
                href="/roadmap"
                className="text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Yol Haritası
              </Link>
              <Link
                href="/pricing"
                className="text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Fiyatlar
              </Link>
              {!loading && (
                <>
                  {user ? (
                    <>
                      <div className="flex items-center gap-2">
                        <Coins className="w-4 h-4 text-secondary" />
                        <span className="text-sm font-medium">
                          {userData?.isAdmin ? "∞ Coin" : `${userData?.coins || 0} Coin`}
                        </span>
                      </div>
                      <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="ghost" size="sm" className="w-full justify-start">
                          Dashboard
                        </Button>
                      </Link>
                      {userData?.isAdmin && (
                        <Link href="/admin" onClick={() => setMobileMenuOpen(false)}>
                          <Button variant="outline" size="sm" className="w-full justify-start border-primary text-primary bg-transparent">
                            Admin Panel
                          </Button>
                        </Link>
                      )}
                      <Button variant="ghost" size="sm" onClick={() => { logout(); setMobileMenuOpen(false); }}>
                        Çıkış
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="ghost" size="sm" className="w-full">
                          Giriş Yap
                        </Button>
                      </Link>
                      <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                        <Button size="sm" className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground">
                          Kayıt Ol
                        </Button>
                      </Link>
                    </>
                  )}
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
