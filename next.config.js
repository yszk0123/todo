// eslint-disable-next-line no-undef
const withPWA = require('next-pwa');

// eslint-disable-next-line no-undef
module.exports = withPWA({
  pwa: {
    // eslint-disable-next-line no-undef
    disable: process.env.NODE_ENV === 'development',
  },
});
