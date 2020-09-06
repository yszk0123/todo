// @see https://developer.mozilla.org/ja/docs/Web/API/Clipboard/write
type SupportedMineType = 'text/plain' | 'text/csv';

declare global {
  class ClipboardItem {
    constructor(params: { [K in SupportedMineType]?: Blob });
  }

  interface Clipboard {
    write(data: ClipboardItem[]): Promise<unknown>;
  }
}

export async function setCSVToClipboard(text: string): Promise<void> {
  // text/csv is not supported yet
  const blob = new Blob([text], { type: 'text/plain' });
  const data = [new ClipboardItem({ 'text/plain': blob })];
  await navigator.clipboard.write(data);
}

export function getTextFromClipboard(): Promise<string> {
  return navigator.permissions
    .query({
      // @ts-ignore
      name: 'clipboard-read',
    })
    .then((result) => {
      if (result.state == 'granted' || result.state == 'prompt') {
        return navigator.clipboard.readText();
      }
      return Promise.reject();
    });
}
