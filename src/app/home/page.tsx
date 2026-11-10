"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { PageTitle } from "@/components/ui/PageTitle";
import { Card } from "@/components/ui/Card";
import { BottomTabBar } from "@/components/ui/BottomTabBar";
import { Calendar, Phone, Video, ChevronRight, User } from "lucide-react";

export default function HomePage() {
  const router = useRouter();

  // Time-aware greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  // 7-segment progress state: steps 1 & 2 done (leaf), step 3 current (navy), 4-7 upcoming (sand-deep)
  const segments = [
    { id: 1, status: "done" },
    { id: 2, status: "done" },
    { id: 3, status: "current" },
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
            aria-label="MJ - Mary Johnson Profile"
          >
            MJ
          </Link>
        </header>

        {/* Welcome Greeting */}
        <div className="space-y-1">
          <PageTitle>{greeting}, Mary.</PageTitle>
          <p className="text-[17px] text-muted">
            Here&apos;s where your project stands.
          </p>
        </div>

        {/* Navy "Your Next Step" Card */}
        <Card variant="navy" className="space-y-4 p-6 rounded-[22px]">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-[2px] bg-gold" aria-hidden="true" />
              <span className="text-gold-on-navy text-[13px] font-semibold tracking-[0.14em] uppercase font-[family-name:var(--font-montserrat)]">
                YOUR NEXT STEP
              </span>
            </div>
            <h2 className="font-[family-name:var(--font-fraunces)] font-semibold text-[24px] text-white leading-tight">
              Send two more documents
            </h2>
            <p className="text-[16px] text-cream-on-navy leading-relaxed">
              Proof of ownership and proof of income. About 5 minutes with your phone&apos;s camera.
            </p>
          </div>

          <button
            type="button"
            onClick={() => router.push("/documents")}
            className="w-full h-[52px] rounded-[14px] bg-ivory text-navy font-bold text-[17px] flex items-center justify-center gap-2 hover:bg-sand transition-colors cursor-pointer select-none focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-focus"
          >
            Send documents
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
                Bathroom safety upgrade
              </h2>
              <p className="text-[15px] text-muted font-medium">
                Step 3 of 7 · Home visit
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted" aria-hidden="true" />
          </div>

          {/* 7-Segment Progress Bar */}
          <div className="flex items-center gap-1.5 my-3" aria-label="Project progress: Step 3 of 7">
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

          {/* Appointment line */}
          <div className="flex items-center gap-2.5 pt-2 text-[16px] text-navy font-semibold border-t border-hairline mt-3">
            <Calendar className="w-5 h-5 text-gold stroke-[2]" aria-hidden="true" />
            <span>Tue, Nov 3 at 10:30 AM</span>
          </div>
        </Link>

        {/* Counselor Card */}
        <Card className="p-4 sm:p-5 flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-12 h-12 rounded-full bg-sand text-navy flex items-center justify-center font-bold text-[18px] shrink-0 border border-hairline">
              <User className="w-6 h-6 text-navy" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <span className="text-[12px] sm:text-[13px] font-semibold tracking-wider text-muted uppercase font-[family-name:var(--font-montserrat)] block truncate">
                YOUR COUNSELOR
              </span>
              <h3 className="font-[family-name:var(--font-fraunces)] font-semibold text-[19px] sm:text-[20px] text-navy leading-snug truncate">
                Jordan Lee
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href="tel:8005550199"
              className="w-12 h-12 rounded-full bg-white border border-hairline text-navy flex items-center justify-center shadow-sm hover:bg-sand transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-focus"
              aria-label="Call Jordan Lee"
            >
              <Phone className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={() => router.push("/schedule")}
              className="w-12 h-12 rounded-full bg-white border border-hairline text-navy flex items-center justify-center shadow-sm hover:bg-sand transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-focus cursor-pointer"
              aria-label="Book video call with Jordan Lee"
            >
              <Video className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />
            </button>
          </div>
        </Card>
      </main>

      <BottomTabBar />
    </div>
  );
}
