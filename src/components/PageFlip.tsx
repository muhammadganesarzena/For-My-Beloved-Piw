"use client";

import { useEffect } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useTransform,
} from "motion/react";
import type { LetterPageData } from "@/data/letter";
import { LetterPage } from "./LetterPage";
import { PaperSheet } from "./PaperSheet";

export type FlipDirection = "next" | "prev";

interface PageFlipProps {
  page: LetterPageData;
  pageIndex: number;
  total: number;
  label: string;
  signature?: string;
  direction: FlipDirection;
  onComplete: () => void;
}

const EASE = [0.3, 0.02, 0.16, 1] as const;

export function PageFlip({
  page,
  pageIndex,
  total,
  label,
  signature,
  direction,
  onComplete,
}: PageFlipProps) {
  const rotation = useMotionValue(direction === "next" ? 0 : -180);

  const baseShade = useTransform(rotation, [-180, -90, 0], [0, 0.36, 0]);
  const frontShade = useTransform(rotation, [-180, -90, 0], [0.9, 0.55, 0]);
  const backShade = useTransform(rotation, [-180, -90, 0], [0.12, 0.55, 0.8]);

  useEffect(() => {
    const target = direction === "next" ? -180 : 0;

    const controls = animate(rotation, target, {
      duration: 1.05,
      ease: EASE,
      onComplete,
    });

    return () => controls.stop();
  }, [direction, onComplete, rotation]);

  return (
    <div className="pointer-events-none absolute inset-0 z-20" aria-hidden="true">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-[#3d2b1d]/50 via-[#3d2b1d]/10 to-transparent"
        style={{ opacity: baseShade }}
      />

      <div className="absolute inset-0 [perspective:2400px] [perspective-origin:38%_50%]">
        <motion.div
          className="page-flip-sheet absolute inset-0 origin-left"
          style={{
            rotateY: rotation,
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
        >
          <div
            className="absolute inset-0"
            style={{ backfaceVisibility: "hidden" }}
          >
            <PaperSheet>
              <LetterPage
                page={page}
                index={pageIndex}
                total={total}
                label={label}
                signature={signature}
                showHint={false}
                interactive={false}
              />
            </PaperSheet>

            <motion.div
              className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(90deg,rgba(56,39,25,0.6),rgba(56,39,25,0.12)_38%,transparent_72%,rgba(255,250,240,0.14))]"
              style={{ opacity: frontShade }}
            />
          </div>

          <div
            className="absolute inset-0"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <PaperSheet className="paper-back-face" />
            <div className="pointer-events-none absolute inset-0 z-10 opacity-20 [background-image:repeating-linear-gradient(0deg,transparent,transparent_27px,rgba(141,114,88,0.28)_27px,rgba(141,114,88,0.28)_28px)]" />
            <motion.div
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(270deg,rgba(56,39,25,0.5),rgba(56,39,25,0.08)_42%,transparent_75%,rgba(255,250,240,0.16))]"
              style={{ opacity: backShade }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
