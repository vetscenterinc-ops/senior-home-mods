import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { ArrowLeft, ShieldCheck, Lock, Phone } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="max-w-2xl mx-auto w-full px-4 py-6 sm:py-10">
      <Card variant="default" className="space-y-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#2F5FD0] font-bold text-[18px] underline min-h-[48px] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2F5FD0] rounded p-1"
        >
          <ArrowLeft className="w-5 h-5 shrink-0" aria-hidden="true" />
          <span>Return to Home</span>
        </Link>

        <div className="space-y-2">
          <h1 className="text-[28px] sm:text-[32px] font-extrabold text-[#111827]">
            Privacy Policy
          </h1>
          <p className="text-[18px] text-[#4B5563]">
            Plain language and transparent practices.
          </p>
        </div>

        <div className="space-y-5 text-[18px] text-[#374151] leading-relaxed">
          <div className="p-4 rounded-[12px] bg-[#EEF3FC] border border-[#DCE4F2] flex items-start gap-3">
            <ShieldCheck className="w-6 h-6 text-[#2F5FD0] shrink-0 mt-0.5" aria-hidden="true" />
            <p>
              Your personal information is never sold, rented, or shared with third-party advertisers.
            </p>
          </div>

          <h2 className="text-[22px] font-bold text-[#111827] pt-2">
            1. Information We Collect
          </h2>
          <p>
            We only collect the details necessary to evaluate home safety eligibility—such as street address, contact information, and home layout questions.
          </p>

          <h2 className="text-[22px] font-bold text-[#111827] pt-2">
            2. How We Keep It Safe
          </h2>
          <p>
            We use zero-trust security standards. All data is protected with end-to-end encryption in transit and at rest using Google Cloud infrastructure.
          </p>

          <h2 className="text-[22px] font-bold text-[#111827] pt-2">
            3. Contact Support
          </h2>
          <p className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-[#2F5FD0]" aria-hidden="true" />
            <span>Have questions? Call our team at <strong>229225498</strong> anytime.</span>
          </p>
        </div>
      </Card>
    </div>
  );
}
