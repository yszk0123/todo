import { defaultTagColor } from '../../theme/defaultTagColor';
import { Color } from '../../graphql/__generated__/baseTypes';

export function getColorCode(color: Color): string {
  switch (color) {
    case Color.Default:
      return defaultTagColor;
    case Color.Blue:
      return 'blue';
    case Color.Green:
      return 'green';
    case Color.Purple:
      return 'purple';
    case Color.Red:
      return 'red';
    case Color.Yellow:
      return 'yellow';
  }
}
