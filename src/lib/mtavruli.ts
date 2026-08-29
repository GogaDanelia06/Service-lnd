const MTAVRULI_OFFSET = 0x1c90 - 0x10d0;

export function mtavruli(text: string): string {
  return text.replace(/[ა-ჺ]/gu, (char) => {
    const code = char.codePointAt(0);
    return code === undefined ? char : String.fromCodePoint(code + MTAVRULI_OFFSET);
  });
}
