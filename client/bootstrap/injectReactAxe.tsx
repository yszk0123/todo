import React from 'react';
import ReactDOM from 'react-dom';

import { isSSR } from '../shared/helpers/isSSR';

const TIMEOUT = 1000;

export function injectReactAxe(): void {
  if (process.env.NODE_ENV !== 'production' && !isSSR()) {
    const axe = require('react-axe');
    axe(React, ReactDOM, TIMEOUT, undefined, {
      exclude: [['#__next-prerender-indicator'], ['#__next-build-watcher']],
    });
  }
}
