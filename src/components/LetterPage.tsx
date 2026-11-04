import type { LetterPageData } from "@/data/letter";
import { cn } from "@/lib/utils";
import { PageIndicator } from "./PageIndicator";

interface LetterPageProps {
  page: LetterPageData;
  index: number;
  total: number;
  label: string;
  signature?: string;
  showHint?: boolean;
  interactive?: boolean;
  soundOn?: boolean;
  onToggleSound?: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
}

const paragraphClass =
  "font-serif text-[1.0625rem] leading-[1.72] text-pretty text-ink sm:text-[1.15rem] sm:leading-[1.8] lg:text-[1.2rem]";

export function LetterPage({
  page,
  index,
  total,
  label,
  signature,
  showHint = true,
  interactive = true,
  soundOn = false,
  onToggleSound,
  onPrevious,
  onNext,
}: LetterPageProps) {
  const isEmphasis = Boolean(page.emphasis);
  const isClosing = page.id === total;

  return (
    <article
      className="relative z-10 flex h-full flex-col px-6 pb-5 pt-7 sm:px-12 sm:pb-8 sm:pt-10 lg:px-14 lg:pb-9 lg:pt-12"
      aria-label={`Letter page ${index + 1} of ${total}`}
    >
      <header className="flex items-center gap-4 pb-6 sm:pb-8">
        <span className="shrink-0 font-sans text-[9px] font-medium uppercase tracking-[0.3em] text-ink-soft sm:text-[10px]">
          {label}
        </span>
        <span
          aria-hidden="true"
          className="h-px flex-1 bg-gradient-to-r from-ink/12 via-ink/6 to-transparent"
        />
      </header>

      <div className="letter-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <div
          className={cn(
            "flex min-h-full flex-col",
            isEmphasis && "items-center justify-center py-4 text-center",
            isClosing && "justify-center py-3 sm:py-6",
            !isEmphasis && !isClosing && "justify-start py-1",
          )}
        >
          {isEmphasis && page.emphasis ? (
            <div className="mx-auto flex w-full max-w-[31rem] flex-col items-center">
              <span
                aria-hidden="true"
                className="mb-7 block h-9 w-px bg-gradient-to-b from-transparent via-accent/60 to-transparent sm:mb-10 sm:h-12"
              />
              <p className="text-balance font-serif text-[1.5rem] italic leading-[1.55] tracking-[-0.01em] text-ink sm:text-[1.9rem] lg:text-[2.05rem]">
                {page.emphasis}
              </p>
              <span
                aria-hidden="true"
                className="mt-7 block h-9 w-px bg-gradient-to-b from-transparent via-accent/60 to-transparent sm:mt-10 sm:h-12"
              />
            </div>
          ) : (
            <>
              {page.greeting && (
                <p className="font-serif text-[1.75rem] italic leading-none tracking-[-0.01em] text-ink sm:text-[2.1rem]">
                  {page.greeting}
                </p>
              )}

              <div
                className={cn(
                  "space-y-5 sm:space-y-6",
                  page.greeting && "mt-6 sm:mt-8",
                  isClosing && "space-y-6 sm:space-y-7",
                )}
              >
                {page.paragraphs.map((paragraph, paragraphIndex) => (
                  <p
                    key={paragraphIndex}
                    className={cn(
                      paragraphClass,
                      isClosing &&
                        paragraphIndex === page.paragraphs.length - 1 &&
                        "text-[1.1rem] italic leading-[1.7] sm:text-[1.2rem]",
                    )}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {signature && isClosing && (
                <p className="mt-9 font-script text-[1.7rem] leading-none text-rosewood sm:mt-11 sm:text-3xl">
                  {signature}
                </p>
              )}
            </>
          )}
        </div>
      </div>

      <PageIndicator
        current={index + 1}
        total={total}
        canGoBack={index > 0}
        canGoForward={index < total - 1}
        showHint={showHint}
        interactive={interactive}
        soundOn={soundOn}
        onToggleSound={onToggleSound}
        onPrevious={onPrevious}
        onNext={onNext}
      />
    </article>
  );
}
