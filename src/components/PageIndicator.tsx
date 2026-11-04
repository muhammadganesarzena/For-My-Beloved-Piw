import {
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
} from "lucide-react";
import { cn, ordinal } from "@/lib/utils";

interface PageIndicatorProps {
  current: number;
  total: number;
  canGoBack: boolean;
  canGoForward: boolean;
  showHint?: boolean;
  interactive?: boolean;
  soundOn?: boolean;
  onToggleSound?: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
}

const buttonClass =
  "flex h-7 w-7 items-center justify-center rounded-full text-ink-soft/70 transition-colors duration-300 hover:bg-ink/5 hover:text-ink disabled:pointer-events-none disabled:opacity-20 sm:h-8 sm:w-8";

export function PageIndicator({
  current,
  total,
  canGoBack,
  canGoForward,
  showHint = true,
  interactive = true,
  soundOn = false,
  onToggleSound,
  onPrevious,
  onNext,
}: PageIndicatorProps) {
  return (
    <footer className="flex items-center justify-between gap-3 border-t border-ink/10 pt-4 sm:pt-5">
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          className={buttonClass}
          aria-label="Previous page"
          onClick={onPrevious}
          disabled={!interactive || !canGoBack}
          tabIndex={interactive ? 0 : -1}
        >
          <ChevronLeft size={15} strokeWidth={1.5} aria-hidden />
        </button>

        <p
          className="min-w-[3.9rem] text-center font-sans text-[9px] tracking-[0.24em] text-ink-soft tabular-nums sm:text-[10px]"
          aria-hidden="true"
        >
          {ordinal(current)}
          <span className="mx-1.5 text-ink-soft/45">/</span>
          {ordinal(total)}
        </p>

        <button
          type="button"
          className={buttonClass}
          aria-label="Next page"
          onClick={onNext}
          disabled={!interactive || !canGoForward}
          tabIndex={interactive ? 0 : -1}
        >
          <ChevronRight size={15} strokeWidth={1.5} aria-hidden />
        </button>
      </div>

      <div className="flex items-center gap-1.5">
        {showHint && (
          <p
            className={cn(
              "text-right font-sans text-[9px] tracking-[0.12em] text-ink-soft/80",
              "sm:text-[10px]",
            )}
          >
            {canGoForward ? (
              <>
                <span className="sm:hidden">Tap to turn &rarr;</span>
                <span className="hidden sm:inline">
                  Click to turn the page &rarr;
                </span>
              </>
            ) : (
              <span>The end</span>
            )}
          </p>
        )}

        {onToggleSound && (
          <button
            type="button"
            data-music-toggle
            className={cn(buttonClass, "text-ink-soft/55")}
            aria-label={
              soundOn ? "Pause background music" : "Play background music"
            }
            aria-pressed={soundOn}
            onClick={onToggleSound}
            disabled={!interactive}
            tabIndex={interactive ? 0 : -1}
          >
            {soundOn ? (
              <Volume2 size={13} strokeWidth={1.5} aria-hidden />
            ) : (
              <VolumeX size={13} strokeWidth={1.5} aria-hidden />
            )}
          </button>
        )}
      </div>
    </footer>
  );
}
