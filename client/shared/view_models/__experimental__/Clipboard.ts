// @see https://developer.mozilla.org/ja/docs/Web/API/Clipboard/write
type SupportedMineType = 'text/plain' | 'text/csv';

declare global {
  class ClipboardItem {
    constructor(params: { [K in SupportedMineType]?: string });
  }

  interface Clipboard {
    write(data: ClipboardItem[]): Promise<unknown>;
  }
}

export async function setCSVToClipboard(text: string): Promise<void> {
  const data = [new ClipboardItem({ 'text/csv': text })];
  await navigator.clipboard.write(data);
}
