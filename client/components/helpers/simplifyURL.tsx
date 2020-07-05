export function simplifyURL(text: string): string {
  const simplifiedText = text.replace(/\?.*$/, '').replace(/#.*$/, '');

  const github = simplifiedText.replace(
    /^https?:\/\/github.com\/[^/]+\/([^/]+)\/(?:pull|issue)\/([0-9]+)$/,
    '$1 #$2'
  );
  if (github !== simplifiedText) {
    return github;
  }

  const [schema, , domain, ...rest] = simplifiedText.split('/');
  if (!schema || !domain) {
    return simplifiedText;
  }
  return [schema, '', domain, ...rest.slice(0, 2)].join('/');
}
