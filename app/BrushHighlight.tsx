"use client";

import { PropsWithChildren, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type BrushHighlightProps = {
  className?: string;
  start?: string;
  once?: boolean;
};

const BrushHighlight = ({
  children,
  className = "",
  start = "top 75%",
  once = false,
}: PropsWithChildren<BrushHighlightProps>) => {
  const wrapperRef = useRef<HTMLSpanElement | null>(null);
  const mainLayerRef = useRef<HTMLSpanElement | null>(null);
  const textureLayerRef = useRef<HTMLSpanElement | null>(null);

  useGSAP(
    () => {
      if (!wrapperRef.current || !mainLayerRef.current || !textureLayerRef.current) {
        return;
      }

      const wrapper = wrapperRef.current;
      const mainLayer = mainLayerRef.current;
      const textureLayer = textureLayerRef.current;

      gsap.set([mainLayer, textureLayer], { width: 0 });

      const tl = gsap.timeline({ paused: true });
      tl.to(mainLayer, {
        width: "calc(100% + 0.56em)",
        duration: 0.85,
        ease: "power3.out",
      }).to(textureLayer, {
        width: "calc(100% + 0.48em)",
        duration: 0.75,
        ease: "power3.out",
      });

      const triggerElement = wrapper.closest("section") ?? wrapper;

      const trigger = ScrollTrigger.create({
        trigger: triggerElement,
        start,
        onEnter: () => {
          tl.restart();
        },
        onEnterBack: () => {
          tl.restart();
        },
        onLeaveBack: () => {
          if (!once) {
            tl.pause(0);
            gsap.set([mainLayer, textureLayer], { width: 0 });
          }
        },
      });

      return () => {
        trigger.kill();
        tl.kill();
      };
    },
    { scope: wrapperRef }
  );

  return (
    <span ref={wrapperRef} className={`brush-highlight ${className}`}>
      <span ref={mainLayerRef} aria-hidden="true" className="brush-highlight__layer brush-highlight__layer--main" />
      <span
        ref={textureLayerRef}
        aria-hidden="true"
        className="brush-highlight__layer brush-highlight__layer--texture"
      />
      <span className="brush-highlight__text">{children}</span>
    </span>
  );
};

export default BrushHighlight;