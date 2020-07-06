import { Color } from '../graphql/__generated__/baseTypes';
import { defaultTagColor } from '../theme/defaultTagColor';

export function getColorCode(color: Color): string {
  switch (color) {
    case Color.Default:
      return defaultTagColor;
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
