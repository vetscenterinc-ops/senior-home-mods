"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { TopBar } from "@/components/ui/TopBar";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PageTitle } from "@/components/ui/PageTitle";
import { Segmented } from "@/components/ui/Segmented";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Check } from "lucide-react";

export default function SchedulePage() {
  const router = useRouter();

  const [callType, setCallType] = useState<"video" | "phone">("video");
  const [selectedDay, setSelectedDay] = useState("Fri 30");
  const [selectedTime, setSelectedTime] = useState("10:30 AM");
  const [isBooked, setIsBooked] = useState(false);

  const days = [
    { dow: "Thu", date: "29", id: "Thu 29" },
    { dow: "Fri", date: "30", id: "Fri 30" },
    { dow: "Mon", date: "2", id: "Mon 2" },
    { dow: "Tue", date: "3", id: "Tue 3" },
  ];

  const times = ["9:00 AM", "10:30 AM", "1:00 PM", "3:30 PM"];

  const handleBook = () => {
    setIsBooked(true);
    setTimeout(() => {
      router.push("/status");
    }, 1000);
  };

  return (
    <div className="w-full min-h-screen bg-ivory flex flex-col items-center">
      <main id="main-content" className="w-full max-w-md mx-auto min-h-screen bg-ivory px-6 py-4 pb-12 flex flex-col justify-between">
        <div className="space-y-6">
          <TopBar showBack={true} showCall={false} />

          <div className="space-y-2">
            <Eyebrow>TALK WITH US</Eyebrow>
            <PageTitle>Book a call with Jordan.</PageTitle>
          </div>

          {/* Segmented Call Type (Video / Phone) */}
          <Segmented
            label="Call Type"
            options={[
              { value: "video", label: "Video (Zoom)" },
              { value: "phone", label: "Phone call" },
            ]}
            value={callType}
            onChange={(val) => setCallType(val as "video" | "phone")}
          />

          {/* Day Picker: 4 large day buttons */}
          <div className="space-y-2">
            <span className="block font-bold text-[18px] text-navy">
              Choose a day
            </span>
            <div className="grid grid-cols-4 gap-2">
              {days.map((d) => {
                const isSelected = selectedDay === d.id;
                return (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setSelectedDay(d.id)}
                    className={`
                      h-[72px] rounded-[16px] flex flex-col items-center justify-center border-2 transition-all cursor-pointer
                      focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-focus
                      ${
                        isSelected
                          ? "bg-navy text-white border-navy shadow-sm"
                          : "bg-white text-navy border-hairline hover:border-control/60"
                      }
                    `}
                    aria-pressed={isSelected}
                  >
                    <span className="text-[14px] font-semibold opacity-90">{d.dow}</span>
                    <span className="text-[22px] font-bold leading-none mt-0.5">{d.date}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Picker: 2-column grid of 56px buttons */}
          <div className="space-y-2">
            <span className="block font-bold text-[18px] text-navy">
              Choose a time <span className="text-[16px] text-muted font-normal">(Central time)</span>
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              {times.map((t) => {
                const isSelected = selectedTime === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSelectedTime(t)}
                    className={`
                      h-[56px] rounded-[14px] flex items-center justify-center gap-2 border-2 text-[17px] font-bold transition-all cursor-pointer
                      focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-focus
                      ${
                        isSelected
                          ? "bg-sand text-navy border-navy"
                          : "bg-white text-navy border-hairline hover:border-control/60"
                      }
                    `}
                    aria-pressed={isSelected}
                  >
                    {isSelected && <Check className="w-4 h-4 stroke-[3] text-navy shrink-0" aria-hidden="true" />}
                    <span>{t}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Note */}
          <p className="text-[15px] text-muted leading-relaxed">
            We&apos;ll email and text you the Zoom link. One tap to join, no app needed.
          </p>
        </div>

        {/* Dynamic Booking Button */}
        <div className="pt-8">
          <PrimaryButton onPress={handleBook}>
            {isBooked
              ? "Appointment Booked!"
              : `Book ${selectedDay === "Fri 30" ? "Fri, Oct 30" : selectedDay} at ${selectedTime}`}
          </PrimaryButton>
        </div>
      </main>
    </div>
  );
}
