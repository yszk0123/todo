// eslint-disable-next-line no-undef
const withPWA = require('next-pwa');

// eslint-disable-next-line no-undef
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

// eslint-disable-next-line no-undef
const runtimeCaching = require('./next.config.cache');

// eslint-disable-next-line no-undef
module.exports = withPWA({
  pwa: {
    // eslint-disable-next-line no-undef
    disable: process.env.NODE_ENV === 'development',

    runtimeCaching,

    dest: 'public',
  },
  webpack: (config) => {
    // https://github.com/welldone-software/why-did-you-render/issues/85
    config.resolve = config.resolve || {};
    config.resolve.alias = config.resolve.alias || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-redux':
        // eslint-disable-next-line no-undef
        process.env.NODE_ENV === 'development'
          ? 'react-redux/lib'
          : 'react-redux',
    };

    // eslint-disable-next-line no-undef
    if (process.env.ENABLE_WEBPACK_BUNDLE_ANALYZE === 'true') {
      config.plugins = config.plugins || [];
      config.plugins.push(new BundleAnalyzerPlugin());
    }

    return config;
  },
});
