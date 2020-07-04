import { Color } from '../../graphql/__generated__/baseTypes';

export function parseColorString(colorString: string): Color {
  switch (colorString) {
    case Color.Default:
      return Color.Default;
    case Color.Blue:
      return Color.Blue;
    case Color.Green:
      return Color.Green;
    case Color.Purple:
      return Color.Purple;
    case Color.Red:
      return Color.Red;
    case Color.Yellow:
      return Color.Yellow;
    default:
      throw new Error('Unknown color');
  }
}
