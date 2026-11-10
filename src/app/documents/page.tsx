"use client";

import React, { useRef, useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PageTitle } from "@/components/ui/PageTitle";
import { Card } from "@/components/ui/Card";
import { BottomTabBar } from "@/components/ui/BottomTabBar";
import { ShieldCheck, Check, Plus, Camera, Upload } from "lucide-react";

export default function DocumentsPage() {
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  const docs = [
    {
      id: "photo-id",
      title: "Photo ID",
      status: "received",
      detail: "Received Oct 14",
    },
    {
      id: "ownership",
      title: "Proof of ownership",
      status: "needed",
      detail: "Needed",
    },
    {
      id: "income",
      title: "Proof of income",
      status: "needed",
      detail: "Needed",
    },
    {
      id: "doctor",
      title: "Doctor's letter",
      status: "optional",
      detail: "Optional",
    },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadStatus(`Uploaded: ${file.name}`);
      setTimeout(() => setUploadStatus(null), 3000);
    }
  };

  return (
    <div className="w-full min-h-screen bg-ivory flex flex-col items-center">
      <main id="main-content" className="w-full max-w-md mx-auto min-h-screen bg-ivory px-6 py-6 pb-36 space-y-6">
        {/* Title */}
        <div className="space-y-1">
          <Eyebrow>SECURE DOCUMENTS</Eyebrow>
          <PageTitle>Your documents</PageTitle>
        </div>

        {/* Sand Encrypted Notice */}
        <div className="p-4 rounded-[16px] bg-sand border border-hairline flex items-center gap-3 text-[16px] text-navy">
          <ShieldCheck className="w-6 h-6 text-navy shrink-0 stroke-[2]" aria-hidden="true" />
          <span>Encrypted. Only your case team can see these.</span>
        </div>

        {uploadStatus && (
          <div
            role="status"
            aria-live="polite"
            className="p-3.5 rounded-[14px] bg-leaf/10 border border-leaf text-leaf-text font-bold text-[16px] flex items-center gap-2"
          >
            <Check className="w-5 h-5 stroke-[3]" />
            <span>{uploadStatus}</span>
          </div>
        )}

        {/* Document Items List */}
        <div className="space-y-3">
          {docs.map((doc) => (
            <Card key={doc.id} className="p-4 flex items-center justify-between gap-3">
              <div className="space-y-0.5">
                <h2 className="font-bold text-[18px] text-navy">
                  {doc.title}
                </h2>
                {doc.status === "received" ? (
                  <div className="flex items-center gap-1.5 text-leaf-text font-semibold text-[15px]">
                    <span className="w-4 h-4 rounded-full bg-leaf text-white flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                    <span>{doc.detail}</span>
                  </div>
                ) : doc.status === "needed" ? (
                  <div className="text-gold-text font-bold text-[15px]">
                    {doc.detail}
                  </div>
                ) : (
                  <div className="text-muted text-[15px]">
                    {doc.detail}
                  </div>
                )}
              </div>

              {doc.status !== "received" && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1 px-4 py-2 rounded-full border-2 border-control/40 hover:border-navy text-navy font-bold text-[15px] bg-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-focus"
                  aria-label={`Add document for ${doc.title}`}
                >
                  <Plus className="w-4 h-4 stroke-[3]" aria-hidden="true" />
                  <span>Add</span>
                </button>
              )}
            </Card>
          ))}
        </div>

        {/* Upload Action Buttons */}
        <div className="pt-2 space-y-3">
          {/* Hidden Inputs */}
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            aria-label="Take photo with camera"
            onChange={handleFileChange}
          />
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            aria-label="Choose file from device"
            onChange={handleFileChange}
          />

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
