"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const items = [
  {
    title: "Discovery",
    text: "Start from the left and reveal the first insight.",
  },
  {
    title: "Iteration",
    text: "Second item slides from the right during the same scroll flow.",
  },
  {
    title: "Launch",
    text: "Final card enters from the left and completes Section Three.",
  },
];

const SectionThree = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      if (!sectionRef.current) {
        return;
      }

      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      if (!cards.length) {
        return;
      }

      cards.forEach((card, index) => {
        const fromLeft = index % 2 === 0;
        gsap.set(card, {
          autoAlpha: 0,
          xPercent: fromLeft ? -110 : 110,
          y: 20,
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=260%",
          pin: true,
          scrub: true,
        },
      });

      cards.forEach((card, index) => {
        tl.to(card, { autoAlpha: 1, xPercent: 0, y: 0, duration: 1.1 });

        if (index < cards.length - 1) {
          const toLeft = index % 2 === 0;
          tl.to(card, {
            autoAlpha: 0,
            xPercent: toLeft ? 110 : -110,
            y: -20,
            duration: 1,
          });
        }
      });
    },
    { scope: sectionRef }
  );

  return (
    <section id="section-three" ref={sectionRef} className="section-three relative h-screen overflow-hidden bg-emerald-100 px-6 py-20">
      <div className="mx-auto flex h-full w-full max-w-5xl items-center justify-center">
        <div className="relative h-[340px] w-full max-w-3xl sm:h-[380px]">
          {items.map((item, index) => (
            <article
              key={item.title}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="absolute inset-0 flex flex-col justify-center rounded-3xl border border-emerald-300 bg-white p-10 shadow-[0_24px_80px_rgba(0,0,0,0.12)] sm:p-14"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Section 3</p>
              <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">{item.title}</h2>
              <p className="mt-5 max-w-2xl text-base text-slate-600 sm:text-lg">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectionThree;