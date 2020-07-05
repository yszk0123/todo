export function simplifyURL(text: string): string {
  const simplifiedText = text
    .replace(/^https?:\/\//, '')
    .replace(/\?.*$/, '')
    .replace(/#.*$/, '')
    .replace(
      /^github.com\/[^/]+\/([^/]+)\/(?:pull|issue)\/([0-9]+)$/,
      '$1 #$2'
    );

  const splittedText = simplifiedText.split('/');
  if (splittedText.length >= 5) {
    return [
      splittedText[0],
      splittedText[1],
      '...',
      splittedText[splittedText.length - 1],
    ].join('/');
  }

  return simplifiedText;
}
