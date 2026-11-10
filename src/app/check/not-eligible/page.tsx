"use client";

import React from "react";
import Link from "next/link";
import { TopBar } from "@/components/ui/TopBar";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PageTitle } from "@/components/ui/PageTitle";
import { Card } from "@/components/ui/Card";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Phone, Calculator, MapPin, ChevronRight } from "lucide-react";

export default function NotEligiblePage() {
  const options = [
    {
      title: "Talk with a counselor",
      desc: "We know other local programs",
      icon: Phone,
      href: "tel:8005550199",
    },
    {
      title: "Get a free estimate",
      desc: "Pay privately, no pressure",
      icon: Calculator,
      href: "/schedule",
    },
    {
      title: "Check a different address",
      desc: "Maybe a parent's or relative's home",
      icon: MapPin,
      href: "/check",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-ivory flex flex-col items-center">
      <main id="main-content" className="w-full max-w-md mx-auto min-h-screen bg-ivory px-6 py-4 pb-12 flex flex-col justify-between">
        <div className="space-y-6">
          <TopBar showBack={true} showCall={false} />

          <div className="space-y-3">
            <Eyebrow>ADDRESS RESULT</Eyebrow>
            <PageTitle>This address isn&apos;t in a USDA rural area.</PageTitle>
            <p className="text-[18px] text-muted leading-relaxed">
              That&apos;s okay. Many families still get help. Here are your options:
            </p>
          </div>

          {/* Options Card with 3 rows */}
          <Card className="p-2 divide-y divide-hairline">
            {options.map((opt) => {
              const Icon = opt.icon;
              return (
                <Link
                  key={opt.title}
                  href={opt.href}
                  className="flex items-center gap-3.5 p-4 rounded-[14px] hover:bg-sand/40 transition-colors group focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-focus"
                >
                  <div
                    className="w-10 h-10 rounded-full bg-sand text-navy flex items-center justify-center shrink-0 group-hover:bg-sand-deep transition-colors"
                    aria-hidden="true"
                  >
                    <Icon className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-[18px] text-navy">
                      {opt.title}
                    </div>
                    <div className="text-[15px] text-muted">
                      {opt.desc}
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted group-hover:text-navy transition-colors shrink-0" aria-hidden="true" />
                </Link>
              );
            })}
          </Card>

          {/* Note about maps */}
          <p className="text-[16px] text-muted leading-relaxed">
            Maps can be out of date. If you think this is wrong, we&apos;ll double-check for you.
          </p>
        </div>

        {/* Bottom CTA */}
        <div className="pt-8">
          <a href="tel:8005550199" className="block w-full">
            <PrimaryButton>
              Call (800) 555-0199
            </PrimaryButton>
          </a>
        </div>
      </main>
    </div>
  );
}
