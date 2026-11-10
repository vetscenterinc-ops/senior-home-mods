"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { PageTitle } from "@/components/ui/PageTitle";
import { Card } from "@/components/ui/Card";
import { BottomTabBar } from "@/components/ui/BottomTabBar";
import { Calendar, Camera, Phone, Video, ChevronRight, ShieldCheck } from "lucide-react";

export default function HomePage() {
  const router = useRouter();

  // Time-aware greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  // 7-step progress: step 1 done (leaf), step 2 current (navy), 3-7 upcoming (sand-deep)
  const segments = [
    { id: 1, status: "done" },
    { id: 2, status: "current" },
    { id: 3, status: "upcoming" },
    { id: 4, status: "upcoming" },
    { id: 5, status: "upcoming" },
    { id: 6, status: "upcoming" },
    { id: 7, status: "upcoming" },
  ];

  return (
    <div className="w-full min-h-screen bg-ivory flex flex-col items-center">
      <main id="main-content" className="w-full max-w-md mx-auto min-h-screen bg-ivory px-6 py-5 pb-36 space-y-6">
        {/* Top Header: Logo + Initials Avatar */}
        <header className="flex items-center justify-between gap-4">
          <Link href="/home">
            <Logo size="small" />
          </Link>

          <Link
            href="/profile"
            className="w-12 h-12 rounded-full bg-navy text-white font-bold text-[18px] flex items-center justify-center border-2 border-gold/40 shadow-sm hover:scale-105 transition-transform focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-focus"
            aria-label="My profile"
          >
            MJ
          </Link>
        </header>

        {/* Welcome Greeting */}
        <div className="space-y-1">
          <PageTitle>{greeting}, Mary.</PageTitle>
          <p className="text-[17px] text-muted">
            Here&apos;s how your home project is going.
          </p>
        </div>

        {/* Navy "To do next" Card: talk with a HUD housing counselor */}
        <Card variant="navy" className="space-y-4 p-6 rounded-[22px]">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-[2px] bg-gold" aria-hidden="true" />
              <span className="text-gold-on-navy text-[14px] font-semibold tracking-[0.14em] uppercase font-[family-name:var(--font-montserrat)]">
                TO DO NEXT
              </span>
            </div>
            <h2 className="font-[family-name:var(--font-fraunces)] font-semibold text-[24px] text-white leading-tight">
              Talk with your HUD housing counselor
            </h2>
            <p className="text-[17px] text-cream-on-navy leading-relaxed">
              A free phone or video call. They&apos;ll explain the program and answer your questions.
            </p>
          </div>

          <button
            type="button"
            onClick={() => router.push("/schedule")}
            className="w-full h-[56px] rounded-[14px] bg-ivory text-navy font-bold text-[18px] flex items-center justify-center gap-2 hover:bg-sand transition-colors cursor-pointer select-none focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-focus"
          >
            <Calendar className="w-5 h-5" aria-hidden="true" />
            Pick a time
          </button>
        </Card>

        {/* Optional: photos of the home */}
        <Card className="p-5 space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-full bg-sand text-navy flex items-center justify-center shrink-0" aria-hidden="true">
              <Camera className="w-6 h-6 stroke-[2]" />
            </div>
            <div className="space-y-1">
              <span className="text-[14px] font-bold text-gold-text">If you want</span>
              <h2 className="font-bold text-[19px] text-navy leading-snug">Show us your home</h2>
              <p className="text-[16px] text-muted leading-relaxed">
                Take a few photos of the rooms that are hard to use. It helps your counselor get ready.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => router.push("/photos")}
            className="w-full h-[56px] rounded-[14px] bg-white border-2 border-navy text-navy font-bold text-[18px] flex items-center justify-center gap-2 hover:bg-sand transition-colors cursor-pointer select-none focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-focus"
          >
            <Camera className="w-5 h-5" aria-hidden="true" />
            Take photos
          </button>
        </Card>

        {/* Project Card */}
        <Link
          href="/status"
          className="block rounded-[22px] bg-white border border-hairline p-5 shadow-[0_4px_16px_rgba(60,40,10,0.05)] hover:border-control/60 transition-all focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-focus"
        >
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="font-bold text-[19px] text-navy">
                Safer bathroom
              </h2>
              <p className="text-[16px] text-muted font-medium">
                Step 2 of 7 · Talk with your counselor
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted" aria-hidden="true" />
          </div>

          {/* 7-Segment Progress Bar */}
          <div className="flex items-center gap-1.5 my-3" role="img" aria-label="Project progress: step 2 of 7">
            {segments.map((seg) => (
              <div
                key={seg.id}
                className={`h-2 flex-1 rounded-full ${
                  seg.status === "done"
                    ? "bg-leaf"
                    : seg.status === "current"
                    ? "bg-navy"
                    : "bg-sand-deep"
                }`}
                aria-hidden="true"
              />
            ))}
          </div>

          <div className="flex items-center gap-2.5 pt-3 text-[16px] text-navy font-semibold border-t border-hairline mt-3">
            <Calendar className="w-5 h-5 text-gold stroke-[2]" aria-hidden="true" />
            <span>Call not set up yet</span>
          </div>
        </Link>

        {/* Counselor Card */}
        <Card className="p-5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-sand text-navy flex items-center justify-center shrink-0 border border-hairline" aria-hidden="true">
              <ShieldCheck className="w-6 h-6 text-navy" />
            </div>
            <div>
              <span className="text-[15px] font-bold text-gold-text block">Your counselor</span>
              <h3 className="font-[family-name:var(--font-fraunces)] font-semibold text-[20px] text-navy leading-snug">
                HUD housing counselor
              </h3>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <a
              href="tel:+18005550199"
              className="h-[56px] rounded-[14px] bg-white border-2 border-navy text-navy font-bold text-[17px] flex items-center justify-center gap-2 hover:bg-sand transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-focus"
            >
              <Phone className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />
              Call
            </a>
            <button
              type="button"
              onClick={() => router.push("/schedule")}
              className="h-[56px] rounded-[14px] bg-white border-2 border-navy text-navy font-bold text-[17px] flex items-center justify-center gap-2 hover:bg-sand transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-focus"
            >
              <Video className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />
              Meet
            </button>
          </div>
        </Card>
      </main>

      <BottomTabBar />
    </div>
  );
}
