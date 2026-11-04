export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function ordinal(value: number) {
  return String(value).padStart(2, "0");
}
