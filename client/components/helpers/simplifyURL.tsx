export function simplifyURL(text: string): string {
  const simplifiedText = text.replace(/\?.*$/, '').replace(/#.*$/, '');

  const github = simplifiedText.replace(
    /^https?:\/\/github.com\/[^/]+\/([^/]+)\/(?:pull|issue)\/([0-9]+)$/,
    '$1 #$2'
  );
  if (github !== simplifiedText) {
    return github;
  }

  const [schema, , domain] = simplifiedText.split('/');
  return schema && domain ? [schema, domain].join('//') : simplifiedText;
}
