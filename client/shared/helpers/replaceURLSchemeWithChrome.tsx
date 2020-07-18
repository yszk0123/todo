import { isMobile } from './isMobile';
import { isSSR } from './isSSR';

export function replaceURLSchemeWithChrome(url: string): string {
  return !isSSR() && isMobile()
    ? url.replace(/^https?:/, 'googlechrome:')
    : url;
}
