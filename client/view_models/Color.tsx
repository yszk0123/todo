import { Color } from '../shared/graphql/__generated__/baseTypes';
import { DEFAULT_TAG_COLOR } from '../shared/theme/theme';

export { Color };

export function getColorCode(color: Color): string {
  switch (color) {
    case Color.Default:
      return DEFAULT_TAG_COLOR;
    case Color.Blue:
      return 'navy';
    case Color.Green:
      return 'green';
    case Color.Purple:
      return 'purple';
    case Color.Red:
      return 'orangered';
    case Color.Yellow:
      return 'goldenrod';
  }
}

export function isLightColor(color: Color): boolean {
  return color === Color.Yellow;
}
