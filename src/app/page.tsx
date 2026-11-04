import { LetterBook } from "@/components/LetterBook";

export default function Home() {
  return (
    <>
      <a
        href="#letter"
        className="sr-only z-50 rounded-sm bg-paper px-4 py-2 font-sans text-sm text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to the letter
      </a>
      <LetterBook />
    </>
  );
}
