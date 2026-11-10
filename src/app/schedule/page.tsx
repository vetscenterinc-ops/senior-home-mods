"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { TopBar } from "@/components/ui/TopBar";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PageTitle } from "@/components/ui/PageTitle";
import { Segmented } from "@/components/ui/Segmented";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Check } from "lucide-react";

type MeetingType = "phone" | "video" | "inperson";

const NOTES: Record<MeetingType, string> = {
  phone: "Your counselor will call you at the phone number you gave us.",
  video: "We'll text and email you a link. Just tap it to join. No app needed.",
  inperson: "Bring your papers with you. We'll make copies and give the originals back. The office address will be in your text and email.",
};

// Next 4 weekdays, starting tomorrow
function nextWeekdays(count: number) {
  const out: { id: string; dow: string; date: string; long: string }[] = [];
  const d = new Date();
  while (out.length < count) {
    d.setDate(d.getDate() + 1);
    const day = d.getDay();
    if (day === 0 || day === 6) continue;
    out.push({
      id: d.toISOString().slice(0, 10),
      dow: d.toLocaleDateString("en-US", { weekday: "short" }),
      date: String(d.getDate()),
      long: d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }),
    });
  }
  return out;
}

export default function SchedulePage() {
  const router = useRouter();

  const [meetingType, setMeetingType] = useState<MeetingType>("phone");
  const days = useMemo(() => nextWeekdays(4), []);
  const [selectedDay, setSelectedDay] = useState(days[1]?.id ?? days[0].id);
  const [selectedTime, setSelectedTime] = useState("10:30 AM");
  const [isBooked, setIsBooked] = useState(false);

  // /schedule?type=inperson preselects an in-person meeting (from the Papers screen)
  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("type");
    if (t === "inperson" || t === "video" || t === "phone") setMeetingType(t);
  }, []);

  const times = ["9:00 AM", "10:30 AM", "1:00 PM", "3:30 PM"];
  const dayLabel = days.find((d) => d.id === selectedDay)?.long ?? "";

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
            <PageTitle>Meet with your HUD housing counselor.</PageTitle>
            <p className="text-[17px] text-muted">It&apos;s free. How would you like to meet?</p>
          </div>

          <Segmented
            label="How would you like to meet?"
            options={[
              { value: "phone", label: "Phone" },
              { value: "video", label: "Video" },
              { value: "inperson", label: "In person" },
            ]}
            value={meetingType}
            onChange={(val) => setMeetingType(val as MeetingType)}
          />

          {/* Day Picker */}
          <div className="space-y-2">
            <span className="block font-bold text-[18px] text-navy">Pick a day</span>
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
                      ${isSelected ? "bg-navy text-white border-navy shadow-sm" : "bg-white text-navy border-hairline hover:border-control/60"}
                    `}
                    aria-pressed={isSelected}
                    aria-label={d.long}
                  >
                    <span className="text-[15px] font-semibold">{d.dow}</span>
                    <span className="text-[22px] font-bold leading-none mt-0.5">{d.date}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Picker */}
          <div className="space-y-2">
            <span className="block font-bold text-[18px] text-navy">
              Pick a time <span className="text-[16px] text-muted font-normal">(Central time)</span>
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
                      ${isSelected ? "bg-sand text-navy border-navy" : "bg-white text-navy border-hairline hover:border-control/60"}
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

          <p className="text-[16px] text-muted leading-relaxed">{NOTES[meetingType]}</p>
        </div>

        <div className="pt-8">
          <PrimaryButton onPress={handleBook}>
            {isBooked ? "You're all set!" : `Confirm ${dayLabel} at ${selectedTime}`}
          </PrimaryButton>
        </div>
      </main>
    </div>
  );
}
