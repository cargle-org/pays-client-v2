"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { CustomEase } from "gsap/all";

gsap.registerPlugin(CustomEase);

export default function VoucherSuccessAnimation({
  voucherBg,
}: {
  voucherBg: string;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const lidOneRef = useRef<HTMLDivElement>(null);
  const lidTwoRef = useRef<HTMLDivElement>(null);
  const envelopeRef = useRef<HTMLDivElement>(null);
  const letterRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // Define custom ease for wiggle
      CustomEase.create(
        "wiggleEase",
        "M0,0 C0.1,0.5 0.3,1.2 0.5,1 0.7,0.8 0.9,0.2 1,0"
      );

      // Initial styles
      gsap.set([lidOneRef.current, lidTwoRef.current], {
        position: "absolute",
        height: "100%",
        width: "100%",
        top: 0,
        left: 0,
        transformOrigin: "top",
      });

      gsap.set(lidOneRef.current, {
        rotateX: 0,
        zIndex: 3,
      });

      gsap.set(lidTwoRef.current, {
        rotateX: 90,
        zIndex: 1,
      });

      gsap.set(envelopeRef.current, {
        position: "absolute",
        height: "100%",
        width: "100%",
        top: 0,
        left: 0,
        zIndex: 3,
      });

      gsap.set(letterRef.current, {
        position: "absolute",
        top: 0,
        right: 28,
        width: "80%",
        height: "100%",
        borderRadius: 15,
        zIndex: 2,
      });

      // Apply wiggle effect using CustomEase before envelope opens
      tl.fromTo(
        wrapperRef.current,
        { y: 100 },
        {
          // x: 200,
          y: -170,
          duration: 1,
          ease: "wiggleEase",
        }
      ).to(wrapperRef.current, {
        y: 50,
      });

      // Envelope opening animation after wiggle
      tl.to(lidOneRef.current, {
        rotateX: 90,
        duration: 0.25,
        ease: "power2.inOut",
      })
        .to(
          lidTwoRef.current,
          {
            rotateX: 180,
            // duration: 1.5,
            ease: "power2.inOut",
          },
          "-=0.2"
        )
        .to(
          letterRef.current,
          {
            y: -200,
            duration: 1.2,
            rotation: 360,
            ease: "power2.out",
            display: "flex",
            justifyContent: "center",
          },
          "-=0.4"
        );

      // tl.reverse();

      // Reverse the animation after 1 second
      gsap.delayedCall(4, () => tl.reverse());
      // wrapperRef.current?.addEventListener("mouseleave", () => tl.reverse());
      // wrapperRef.current?.addEventListener("mouseenter", () => tl.play());

      // Cleanup function to remove tweens
      return () => {
        tl.kill(); // Kill the timeline
        gsap.killTweensOf(wrapperRef.current); // Kill all tweens on wrapper
      };
    },
    { scope: wrapperRef }
  );

  //use fallback bg color instead if voucherBg is not defined
  const letterColor = `${voucherBg ? `${voucherBg}` : "#C4DFF0"}`;
  const bgStyle = voucherBg?.includes(".png");

  return (
    <div
      ref={wrapperRef}
      className="w-56 h-36 md:w-[300px] md:h-[200px] bg-[#3760C9] relative top-12 md:top-24 xl:top-[170px] mx-auto z-0 rounded-lg shadow-lg shadow-slate-600"
    >
      <div
        ref={lidOneRef}
        className="sm:border-t-[80px] border-t-[100px] border-t-[#658ced] sm:border-b-[80px] border-b-[100px] border-b-transparent border-x-transparent sm:border-x-[100px] border-x-[150px]"
      ></div>
      <div
        ref={lidTwoRef}
        className="sm:border-t-[80px] border-t-[100px] border-t-[#3760C9] sm:border-b-[80px] border-b-[100px] border-b-transparent border-x-transparent sm:border-x-[100px] border-x-[150px]"
      ></div>
      <div
        ref={envelopeRef}
        className="sm:border-t-[80px] border-t-[100px] border-t-transparent sm:border-b-[80px] border-b-[100px] border-b-[#C4DFF0] border-r-[#C4DFF0] sm:border-r-[110px] border-r-[150px] border-l-[#a4d4f2] sm:border-l-[115px] border-l-[150px]"
      ></div>
      <div
        ref={letterRef}
        className="hidden"
        style={{
          backgroundImage: `${bgStyle ? `url(${voucherBg})` : ""}`,
          backgroundSize: "cover",
          backgroundColor: `${bgStyle ? "" : letterColor}`,
        }}
      >
        <p className="flex items-center justify-center font-semibold text-center text-2xl md:text-3xl">
          UsePays
        </p>
      </div>
    </div>
  );
}
