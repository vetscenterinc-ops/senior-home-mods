"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PageTitle } from "@/components/ui/PageTitle";
import { Card } from "@/components/ui/Card";
import { BottomTabBar } from "@/components/ui/BottomTabBar";
import { ShieldCheck, Check, Camera, Upload, Laptop, Users, Phone } from "lucide-react";

// Link to the online class. Set NEXT_PUBLIC_ONLINE_CLASS_URL in .env.local when you have it.
const ONLINE_CLASS_URL = process.env.NEXT_PUBLIC_ONLINE_CLASS_URL || "";

export default function PapersPage() {
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  const papers = [
    { id: "photo-id", title: "Photo ID", received: true, detail: "Got it Nov 9" },
    { id: "deed", title: "Home deed", received: false, detail: "Shows you own the home" },
    { id: "income", title: "Proof of income", received: false, detail: "Like a Social Security letter" },
    { id: "doctor", title: "Doctor's letter", received: false, detail: "Only if you have one" },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadStatus(`Sent: ${file.name}`);
      setTimeout(() => setUploadStatus(null), 4000);
    }
  };

  return (
    <div className="w-full min-h-screen bg-ivory flex flex-col items-center">
      <main id="main-content" className="w-full max-w-md mx-auto min-h-screen bg-ivory px-6 py-6 pb-36 space-y-6">
        <div className="space-y-2">
          <Eyebrow>YOUR PAPERS</Eyebrow>
          <PageTitle>Send your papers</PageTitle>
          <p className="text-[17px] text-muted leading-relaxed">
            Your HUD housing counselor will tell you which papers you need. Choose the way that&apos;s easiest for you.
          </p>
        </div>

        {/* Option 1: online class */}
        <Card className="p-5 space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-full bg-sand text-navy flex items-center justify-center shrink-0" aria-hidden="true">
              <Laptop className="w-6 h-6 stroke-[2]" />
            </div>
            <div className="space-y-1">
              <h2 className="font-bold text-[19px] text-navy leading-snug">Take the online class</h2>
              <p className="text-[16px] text-muted leading-relaxed">
                Learn about the program at your own pace. You can send your papers at the end.
              </p>
            </div>
          </div>
          {ONLINE_CLASS_URL ? (
            <a
              href={ONLINE_CLASS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-[56px] rounded-[14px] bg-navy text-white font-bold text-[18px] flex items-center justify-center gap-2 hover:bg-navy-hover transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-focus"
            >
              Start the class
            </a>
          ) : (
            <a
              href="tel:+18005550199"
              className="w-full h-[56px] rounded-[14px] bg-navy text-white font-bold text-[18px] flex items-center justify-center gap-2 hover:bg-navy-hover transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-focus"
            >
              <Phone className="w-5 h-5" aria-hidden="true" />
              Call us for the class link
            </a>
          )}
        </Card>

        {/* Option 2: in person */}
        <Card className="p-5 space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-full bg-sand text-navy flex items-center justify-center shrink-0" aria-hidden="true">
              <Users className="w-6 h-6 stroke-[2]" />
            </div>
            <div className="space-y-1">
              <h2 className="font-bold text-[19px] text-navy leading-snug">Meet in person</h2>
              <p className="text-[16px] text-muted leading-relaxed">
                Bring your papers to a meeting with your counselor. We&apos;ll make copies for you.
              </p>
            </div>
          </div>
          <Link
            href="/schedule?type=inperson"
            className="w-full h-[56px] rounded-[14px] bg-white border-2 border-navy text-navy font-bold text-[18px] flex items-center justify-center gap-2 hover:bg-sand transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-focus"
          >
            Set up a meeting
          </Link>
        </Card>

        {/* What to have ready */}
        <div className="space-y-3">
          <h2 className="font-[family-name:var(--font-fraunces)] font-semibold text-[22px] text-navy">Papers to have ready</h2>
          <ul className="rounded-[22px] bg-white border border-hairline divide-y divide-hairline">
            {papers.map((p) => (
              <li key={p.id} className="p-4 flex items-center gap-3">
                {p.received ? (
                  <span className="w-8 h-8 rounded-full bg-leaf text-white flex items-center justify-center shrink-0" aria-hidden="true">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </span>
                ) : (
                  <span className="w-8 h-8 rounded-full border-2 border-control bg-white shrink-0" aria-hidden="true" />
                )}
                <div>
                  <div className="font-bold text-[18px] text-navy">
                    {p.title}
                    {p.received && <span className="sr-only">, received</span>}
                  </div>
                  <div className={`text-[16px] ${p.received ? "text-leaf-text font-semibold" : "text-muted"}`}>{p.detail}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Already have them? */}
        <div className="space-y-3">
          <h2 className="font-bold text-[18px] text-navy">Already have them? Send them now.</h2>

          <div className="p-4 rounded-[16px] bg-sand border border-hairline flex items-center gap-3 text-[16px] text-navy">
            <ShieldCheck className="w-6 h-6 text-leaf-text shrink-0 stroke-[2]" aria-hidden="true" />
            <span>Safe and private. Only your counselor and our team can see them.</span>
          </div>

          {uploadStatus && (
            <div role="status" aria-live="polite" className="p-3.5 rounded-[14px] bg-leaf/10 border border-leaf text-leaf-text font-bold text-[16px] flex items-center gap-2">
              <Check className="w-5 h-5 stroke-[3]" aria-hidden="true" />
              <span>{uploadStatus}</span>
            </div>
          )}

          <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" className="hidden" aria-label="Take a photo of a paper" onChange={handleFileChange} />
          <input ref={fileInputRef} type="file" className="hidden" aria-label="Choose a file" onChange={handleFileChange} />

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => cameraInputRef.current?.click()}
              className="h-[56px] rounded-[16px] bg-navy text-white font-bold text-[17px] flex items-center justify-center gap-2 hover:bg-navy-hover transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-focus"
            >
              <Camera className="w-5 h-5" aria-hidden="true" />
              <span>Take a photo</span>
            </button>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="h-[56px] rounded-[16px] bg-white border-2 border-navy text-navy font-bold text-[17px] flex items-center justify-center gap-2 hover:bg-sand transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-focus"
            >
              <Upload className="w-5 h-5" aria-hidden="true" />
              <span>Choose file</span>
            </button>
          </div>
        </div>
      </main>

      <BottomTabBar />
    </div>
  );
}
