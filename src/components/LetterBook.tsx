"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { useReducedMotion } from "motion/react";
import { letter } from "@/data/letter";
import { LetterPage } from "./LetterPage";
import { PageFlip, type FlipDirection } from "./PageFlip";
import { PaperSheet } from "./PaperSheet";

interface FlipState {
  from: number;
  to: number;
  direction: FlipDirection;
}

interface PointerStart {
  x: number;
  y: number;
  time: number;
}

const TAP_DELAY = 240;
const SWIPE_DISTANCE = 44;

export function LetterBook() {
  const total = letter.pages.length;
  const [index, setIndex] = useState(0);
  const [flip, setFlip] = useState<FlipState | null>(null);

  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const prefersReducedMotion = useReducedMotion();
  const audioRef = useRef<HTMLAudioElement>(null);
  const musicIntent = useRef(true);
  const locked = useRef(false);
  const tapTimer = useRef<number | null>(null);
  const pointerStart = useRef<PointerStart | null>(null);

  const playMusic = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return false;

    try {
      await audio.play();
      setIsMusicPlaying(true);
      return true;
    } catch {
      setIsMusicPlaying(false);
      return false;
    }
  }, []);

  const pauseMusic = useCallback(() => {
    audioRef.current?.pause();
    setIsMusicPlaying(false);
    musicIntent.current = false;
  }, []);

  const toggleMusic = useCallback(() => {
    if (isMusicPlaying) {
      pauseMusic();
      return;
    }

    musicIntent.current = true;
    void playMusic();
  }, [isMusicPlaying, pauseMusic, playMusic]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.28;

    let cancelled = false;
    let removeUnlock = () => {};

    const unlock = (event: Event) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("[data-music-toggle]")) return;

      removeUnlock();
      if (musicIntent.current) void playMusic();
    };

    const attachUnlock = () => {
      window.addEventListener("pointerdown", unlock, true);
      window.addEventListener("keydown", unlock, true);
      removeUnlock = () => {
        window.removeEventListener("pointerdown", unlock, true);
        window.removeEventListener("keydown", unlock, true);
      };
    };

    void playMusic().then((started) => {
      if (!started && !cancelled) attachUnlock();
    });

    return () => {
      cancelled = true;
      removeUnlock();
    };
  }, [playMusic]);

  const clearTapTimer = useCallback(() => {
    if (tapTimer.current !== null) {
      window.clearTimeout(tapTimer.current);
      tapTimer.current = null;
    }
  }, []);

  const goTo = useCallback(
    (target: number) => {
      if (locked.current || target < 0 || target >= total || target === index) {
        return;
      }

      if (prefersReducedMotion) {
        setIndex(target);
        return;
      }

      locked.current = true;
      setFlip({
        from: index,
        to: target,
        direction: target > index ? "next" : "prev",
      });
    },
    [index, prefersReducedMotion, total],
  );

  const handleFlipComplete = useCallback(() => {
    if (!flip) return;
    setIndex(flip.to);
    setFlip(null);
    locked.current = false;
  }, [flip]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.isContentEditable ||
          ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))
      ) {
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        goTo(index + 1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        goTo(index - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goTo, index]);

  useEffect(() => {
    return () => {
      if (tapTimer.current !== null) {
        window.clearTimeout(tapTimer.current);
      }
    };
  }, []);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    clearTapTimer();

    if (locked.current || flip) return;

    const target = event.target as HTMLElement;
    if (target.closest("button, a")) {
      pointerStart.current = null;
      return;
    }

    pointerStart.current = {
      x: event.clientX,
      y: event.clientY,
      time: Date.now(),
    };
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const start = pointerStart.current;
    pointerStart.current = null;

    if (!start || locked.current || flip) return;

    const target = event.target as HTMLElement;
    if (target.closest("button, a")) return;
    if (window.getSelection()?.toString()) return;

    const distanceX = event.clientX - start.x;
    const distanceY = event.clientY - start.y;
    const elapsed = Date.now() - start.time;

    if (
      Math.abs(distanceX) > SWIPE_DISTANCE &&
      Math.abs(distanceX) > Math.abs(distanceY) * 1.1 &&
      elapsed < 900
    ) {
      goTo(distanceX < 0 ? index + 1 : index - 1);
      return;
    }

    if (Math.abs(distanceX) > 10 || Math.abs(distanceY) > 12 || elapsed > 800) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const isRightSide = event.clientX - rect.left >= rect.width / 2;
    const targetIndex = isRightSide ? index + 1 : index - 1;

    if (targetIndex < 0 || targetIndex >= total) return;

    tapTimer.current = window.setTimeout(() => {
      tapTimer.current = null;
      if (locked.current || window.getSelection()?.toString()) return;
      goTo(targetIndex);
    }, TAP_DELAY);
  };

  const handlePointerCancel = () => {
    clearTapTimer();
    pointerStart.current = null;
  };

  const baseIndex = flip
    ? flip.direction === "next"
      ? flip.to
      : flip.from
    : index;

  const turningIndex = flip
    ? flip.direction === "next"
      ? flip.from
      : flip.to
    : index;

  const basePage = letter.pages[baseIndex];
  const turningPage = letter.pages[turningIndex];

  return (
    <main
      id="letter"
      aria-label="A letter for you"
      className="letter-stage flex h-[100dvh] items-center justify-center overflow-x-clip"
    >
      <p id="letter-instructions" className="sr-only">
        A personal letter in six pages. Use the left and right arrow keys, the
        navigation buttons, or tap the left and right sides of the paper to turn
        the page.
      </p>

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {flip ? "Turning page" : `Page ${index + 1} of ${total}`}
      </p>

      <audio
        ref={audioRef}
        src="/zensong.mp3"
        loop
        preload="auto"
        aria-hidden="true"
      />

      <div
        className="relative z-10 h-full max-h-[54rem] w-full max-w-[44rem] touch-pan-y"
        aria-describedby="letter-instructions"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
      >
        <PaperSheet>
          <LetterPage
            page={basePage}
            index={baseIndex}
            total={total}
            label={letter.label}
            signature={letter.signature}
            interactive={!flip}
            soundOn={isMusicPlaying}
            onToggleSound={toggleMusic}
            onPrevious={() => goTo(baseIndex - 1)}
            onNext={() => goTo(baseIndex + 1)}
          />
        </PaperSheet>

        {flip && (
          <PageFlip
            key={`${flip.from}-${flip.to}-${flip.direction}`}
            page={turningPage}
            pageIndex={turningIndex}
            total={total}
            label={letter.label}
            signature={letter.signature}
            direction={flip.direction}
            onComplete={handleFlipComplete}
          />
        )}
      </div>
    </main>
  );
}
