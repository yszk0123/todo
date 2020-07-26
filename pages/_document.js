/* eslint-disable react/jsx-sort-props */
/* eslint-disable react/react-in-jsx-scope */
import Document, { Head, Main, NextScript } from 'next/document';

const APP_NAME = 'Todo';
const APP_DESCRIPTION = 'Simple todo app';

// FIXME: Strict settings
const CSP_CONTENT =
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https: http:; object-src 'none'; base-uri 'none';";

const MetaContentSecurityPolicy = () => {
  return <meta httpEquiv="Content-Security-Policy" content={CSP_CONTENT} />;
};

export default class extends Document {
  static async getInitialProps(ctx) {
    return await Document.getInitialProps(ctx);
  }

  render() {
    return (
      <html lang="en" dir="ltr">
        <Head>
          <meta name="application-name" content={APP_NAME} />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content={APP_NAME} />
          <meta name="description" content={APP_DESCRIPTION} />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="theme-color" content="#FFFFFF" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <MetaContentSecurityPolicy />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/images/icons/apple-touch-icon.png"
          />
          <link rel="manifest" href="/manifest.json" />
          <link rel="shortcut icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
