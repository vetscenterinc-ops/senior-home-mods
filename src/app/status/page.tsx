"use client";

import React from "react";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PageTitle } from "@/components/ui/PageTitle";
import { BottomTabBar } from "@/components/ui/BottomTabBar";
import { Check, Phone, Calendar } from "lucide-react";

export default function StatusPage() {
  const steps: { num: number; name: string; status: string; date?: string; appointment?: string; desc?: string; sub?: string }[] = [
    { num: 1, name: "We got your form", status: "done", date: "Nov 9" },
    {
      num: 2,
      name: "Talk with your counselor",
      status: "current",
      appointment: "Call not set up yet",
      desc: "A free call with a HUD housing counselor. They'll explain the program and which papers you need.",
    },
    { num: 3, name: "Send your papers", status: "upcoming", sub: "Online class or in-person meeting" },
    { num: 4, name: "Home visit", status: "upcoming" },
    { num: 5, name: "We pick a worker", status: "upcoming" },
    { num: 6, name: "Work on your home", status: "upcoming" },
    { num: 7, name: "All done!", status: "upcoming" },
  ];

  return (
    <div className="w-full min-h-screen bg-ivory flex flex-col items-center">
      <main id="main-content" className="w-full max-w-md mx-auto min-h-screen bg-ivory px-6 py-6 pb-36 space-y-6">
        {/* Header */}
        <div className="space-y-1">
          <Eyebrow>STEP 2 OF 7</Eyebrow>
          <PageTitle>Your safer bathroom</PageTitle>
          <p className="text-[17px] text-muted">
            214 Oak Ridge Rd, Locust Grove
          </p>
        </div>

        {/* Vertical Timeline */}
        <ol className="space-y-5 relative pl-2 pt-2" aria-label="Project timeline steps">
          {steps.map((step, idx) => {
            const isDone = step.status === "done";
            const isCurrent = step.status === "current";
            const isUpcoming = step.status === "upcoming";

            return (
              <li
                key={step.num}
                className="flex items-start gap-4 relative"
                aria-current={isCurrent ? "step" : undefined}
              >
                {/* Vertical connecting line */}
                {idx < steps.length - 1 && (
                  <div
                    className="absolute left-[15px] top-[32px] bottom-[-20px] w-[2px] bg-sand-deep"
                    aria-hidden="true"
                  />
                )}

                {/* Step Circle */}
                <div className="shrink-0 mt-0.5">
                  {isDone && (
                    <div
                      className="w-8 h-8 rounded-full bg-leaf text-white flex items-center justify-center shadow-sm"
                      aria-hidden="true"
                    >
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  )}

                  {isCurrent && (
                    <div
                      className="w-8 h-8 rounded-full bg-navy text-white font-bold text-[15px] flex items-center justify-center ring-4 ring-gold/40 shadow-sm"
                      aria-hidden="true"
                    >
                      {step.num}
                    </div>
                  )}

                  {isUpcoming && (
                    <div
                      className="w-8 h-8 rounded-full bg-white border-2 border-control/50 text-muted font-bold text-[14px] flex items-center justify-center"
                      aria-hidden="true"
                    >
                      {step.num}
                    </div>
                  )}
                </div>

                {/* Step Content */}
                <div className="flex-1">
                  {isCurrent ? (
                    /* Active step card with 2px navy border */
                    <div className="p-4 rounded-[18px] bg-white border-2 border-navy shadow-sm space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[19px] text-navy">
                          {step.name}
                        </span>
                        <span className="text-[14px] font-bold text-gold-text">
                          Now
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-navy font-bold text-[16px]">
                        <Calendar className="w-4 h-4 text-gold stroke-[2]" aria-hidden="true" />
                        <span>{step.appointment}</span>
                      </div>

                      <p className="text-[16px] text-muted leading-relaxed">
                        {step.desc}
                      </p>

                      <div className="flex items-center gap-4 pt-2 border-t border-hairline text-[16px] font-bold">
                        <Link
                          href="/schedule"
                          className="min-h-[48px] inline-flex items-center text-navy underline decoration-gold underline-offset-2 hover:text-navy-hover"
                        >
                          Pick a time
                        </Link>
                        <a
                          href="tel:+18005550199"
                          className="min-h-[48px] inline-flex items-center gap-1 text-navy underline decoration-gold underline-offset-2 hover:text-navy-hover"
                        >
                          <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Call us</span>
                        </a>
                      </div>
                    </div>
                  ) : (
                    /* Normal step row */
                    <div className="pt-0.5">
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-[18px] font-bold leading-snug ${
                            isDone ? "text-navy" : "text-muted font-medium"
                          }`}
                        >
                          {step.name}
                          {isDone && <span className="sr-only">, done</span>}
                        </span>
                        {step.date && (
                          <span className="text-[15px] font-semibold text-gold-text ml-2 shrink-0">
                            {step.date}
                          </span>
                        )}
                      </div>
                      {step.sub && <p className="text-[16px] text-muted">{step.sub}</p>}
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </main>

      <BottomTabBar />
    </div>
  );
}
