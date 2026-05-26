"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SectionOne from "./SectionOne";

gsap.registerPlugin(ScrollTrigger);

const items = ["1", "2", "3"];

const SectionTwo = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      if (!sectionRef.current || !pinRef.current) {
        return;
      }

      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      if (!cards.length) {
        return;
      }

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: pinRef.current,
        scrub: true,
      });

      gsap.set(cards, { autoAlpha: 0, y: 60, scale: 0.92 });
      gsap.set(cards[0], { autoAlpha: 1, y: 0, scale: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      cards.forEach((card, index) => {
        if (index > 0) {
          tl.to(cards[index - 1], { autoAlpha: 0, y: -50, scale: 0.9, duration: 1 })
            .to(card, { autoAlpha: 1, y: 0, scale: 1, duration: 1 }, "<");
        }
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="section-two"
      ref={sectionRef}
      className="section-two relative h-[360vh] bg-slate-950"
    >
      <div id="hero" ref={pinRef} className="relative grid h-screen grid-rows-[auto_1fr] overflow-hidden px-6 pb-10 pt-24 sm:pt-28">
        <SectionOne className="h-auto min-h-0 items-start bg-transparent" />

        <div className="flex items-center justify-center">
          <div className="relative h-[300px] w-full max-w-2xl sm:h-[360px]">
            {items.map((item, index) => (
              <div
                key={item}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-amber-200 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
              >
                <p className="text-sm uppercase tracking-[0.2em] text-amber-700">Item</p>
                <h2 className="mt-3 text-7xl font-black text-slate-900 sm:text-8xl">{item}</h2>
                <p className="mt-4 text-slate-600">Scroll to reveal next item</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionTwo;