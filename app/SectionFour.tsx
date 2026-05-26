"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

const items = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  title: `Slide ${index + 1}`,
  text: "Infinite GSAP swiper item",
}));

const loopItems = [...items, ...items];

const SectionFour = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!trackRef.current) {
        return;
      }

      const track = trackRef.current;
      const singleSetWidth = track.scrollWidth / 2;
      const wrapX = gsap.utils.wrap(-singleSetWidth, 0);

      gsap.set(track, { x: 0 });

      const loopTween = gsap.to(track, {
        x: -singleSetWidth,
        duration: 24,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: (value) => `${wrapX(parseFloat(value))}px`,
        },
      });

      const draggable = Draggable.create(track, {
        type: "x",
        onPress: () => {
          loopTween.pause();
        },
        onDrag: () => {
          gsap.set(track, { x: wrapX(gsap.getProperty(track, "x") as number) });
        },
        onRelease: () => {
          loopTween.resume();
        },
      })[0];

      return () => {
        draggable.kill();
        loopTween.kill();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section id="section-four" ref={sectionRef} className="section-four relative overflow-hidden bg-slate-100 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-600">Section 4</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">Infinite Swiper</h2>
        <p className="mt-3 max-w-2xl text-slate-600">10 items continuously swipe in an infinite GSAP loop.</p>
      </div>

      <div className="mt-10 overflow-hidden">
        <div ref={trackRef} className="flex w-max cursor-grab gap-4 px-6 active:cursor-grabbing">
          {loopItems.map((item, index) => (
            <article
              key={`${item.id}-${index}`}
              className="flex min-h-[180px] w-[220px] shrink-0 flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_12px_40px_rgba(15,23,42,0.12)] sm:w-[260px]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Item {item.id}</p>
              <h3 className="mt-4 text-2xl font-bold text-slate-900">{item.title}</h3>
              <p className="mt-3 text-sm text-slate-600">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectionFour;