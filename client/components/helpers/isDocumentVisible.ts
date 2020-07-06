// @see https://github.com/vercel/swr/blob/1882cbd410f1dbf8017997af5f3383ad07090346/src/libs/is-document-visible.ts
export default function isDocumentVisible(): boolean {
  if (
    typeof document !== 'undefined' &&
    typeof document.visibilityState !== 'undefined'
  ) {
    return document.visibilityState !== 'hidden';
  }
  return true;
}
