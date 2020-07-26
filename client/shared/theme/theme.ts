// @see https://github.com/rebassjs/rebass/blob/93754aaaab99eab305415e1610e0e0f84bdfafca/packages/preset-material/src/index.js

export function createTheme(isMobile: boolean) {
  return {
    colors: {
      text: '#080818',
      secondaryText: '#888',
      background: '#fff',
      primary: '#07c',
      secondary: '#30c',
      muted: '#f8f8f8',
      gray: '#444',
      warning: '#f44',
      highlight: 'hsla(205, 100%, 40%, 0.125)',
      light: 'rgba(240, 240, 255, 0.3)',
      dark: 'rgba(0, 10, 20, 0.1)',
    },
    fonts: {
      body: 'Roboto, sans-serif',
      heading: 'inherit',
      monospace: '"Roboto Mono", monospace',
    },
    fontSizes: [10, 12, 14, 16, 20, 24, 34, 48, 60, 96],
    fontWeights: {
      body: 400,
      heading: 400,
      bold: 700,
    },
    lineHeights: {
      body: 1.5,
      heading: 1.2,
    },
    space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
    sizes: {
      icon: isMobile ? 32 : 24,
      avatar: 44,
    },
    radii: {
      default: 4,
      circle: 99999,
    },
    shadows: {
      // source: https://medium.com/@Florian/freebie-google-material-design-shadow-helper-2a0501295a2d
      1: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
      2: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
      3: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
      4: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
      5: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)',
    },
    // rebass variants
    text: {
      heading: {
        fontFamily: 'heading',
        lineHeight: 'heading',
        fontWeight: 'heading',
      },
      display: {
        fontFamily: 'heading',
        fontWeight: 'heading',
        lineHeight: 'heading',
        fontSize: [6, 7],
      },
      caps: {
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
      },
      monospace: {
        fontFamily: 'body',
        lineHeight: 'body',
        fontWeight: 'body',
      },
    },
    forms: {
      input: {
        fontSize: 18,
        '&[type="datetime-local"], &[type="datetime"], &[type="date"]': {
          minHeight: '2.375rem',
        },
      },
      select: {
        fontSize: 18,
      },
      textarea: {
        fontSize: 18,
      },
      checkbox: {
        fontSize: isMobile ? 32 : 24,
        ':hover': {
          bg: 'highlight',
        },
      },
    },
    variants: {
      avatar: {
        width: 'avatar',
        height: 'avatar',
        borderRadius: 'circle',
      },
      listText: {
        // Align text height
        '::before': isMobile
          ? {
              display: 'inline-block',
              width: 0,
              height: '1.5rem',
              content: '""',
            }
          : undefined,
        display: 'inline',
      },
      label: {
        display: 'inline-block',
        whiteSpace: 'nowrap',
        px: 2,
        py: isMobile ? 2 : 1,
        fontSize: 0,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'dark',
      },
      badge: {
        px: 2,
        py: isMobile ? 2 : 1,
        whiteSpace: 'nowrap',
        fontSize: 0,
        borderRadius: 9999,
        border: '1px solid',
        borderColor: 'dark',
      },
      card: {
        p: 2,
        bg: 'background',
        boxShadow: 2,
      },
      link: {
        color: 'primary',
        ':hover': {
          bg: 'highlight',
        },
      },
      nav: {
        variant: 'text.caps',
        fontSize: 1,
        fontWeight: 'bold',
        display: 'inline-block',
        p: 2,
        color: 'inherit',
        textDecoration: 'none',
        ':hover,:focus,.active': {
          bg: 'white',
          color: 'black',
        },
        height: 44,
      },
      listItem: {
        ':hover': {
          bg: 'highlight',
        },
      },
    },
    buttons: {
      primary: {
        variant: 'text.caps',
        fontSize: 2,
        fontWeight: 'body',
        color: 'background',
        bg: 'primary',
        borderRadius: 'default',
        ':hover': {
          cursor: 'pointer',
          opacity: 0.8,
        },
        height: 44,
      },
      outline: {
        variant: 'buttons.primary',
        color: 'primary',
        bg: 'transparent',
        boxShadow: 'inset 0 0 2px',
        ':hover': {
          cursor: 'pointer',
          opacity: 0.8,
        },
        height: 44,
      },
      secondary: {
        variant: 'buttons.primary',
        color: 'background',
        bg: 'secondary',
        ':hover': {
          cursor: 'pointer',
          opacity: 0.8,
        },
        height: 44,
      },
    },
    styles: {
      root: {
        fontFamily: 'body',
        fontWeight: 'body',
        lineHeight: 'body',
      },
    },
  };
}

export const DEFAULT_TAG_COLOR = '#333333';

// @see https://ics.media/entry/200317/
export const FONT_FAMILY =
  '"Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif';
