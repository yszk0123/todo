import React from 'react';
import { Box, Flex, SxStyleProp } from 'rebass';

import { EmptyProps } from '../../view_models/EmptyProps';

const LoadingIndicatorWithSize: React.FunctionComponent<{
  radius: number;
  size: number;
}> = ({ radius, size }) => {
  return (
    <Flex alignItems="center" justifyContent="center" width="100%">
      <Box
        sx={{
          position: 'relative',
          transformStyle: 'preserve-3d',
          width: size,
          height: size,
        }}
      >
        <Stellar radius={radius} size={size} />
        <Satellite delay={0} duration={200} id={1} radius={4} size={size} />
        <Satellite delay={-50} duration={400} id={2} radius={5} size={size} />
        <Satellite delay={-100} duration={600} id={3} radius={6} size={size} />
        <Satellite delay={-300} duration={1000} id={4} radius={7} size={size} />
      </Box>
    </Flex>
  );
};

const Stellar: React.FunctionComponent<{
  radius: number;
  size: number;
}> = ({ radius, size }) => {
  const sx = React.useMemo(() => {
    return {
      left: size / 2 - radius,
      top: size / 2 - radius,
      transform: 'translate3d(0px, 0px, 0px)',
    };
  }, [radius, size]);

  return <Circle radius={radius} sx={sx} />;
};

const Satellite: React.FunctionComponent<{
  delay: number;
  duration: number;
  id: number;
  radius: number;
  size: number;
}> = ({ delay, duration, id, radius, size }) => {
  const sx = React.useMemo(() => {
    return {
      bg: 'secondary',
      animationName: `Satellite-rotation-${id}`,
      animationIterationCount: 'infinite',
      animationDuration: `${duration}ms`,
      animationDelay: `${delay}ms`,
      animationTimingFunction: 'ease-in-out',
      [`@keyframes Satellite-rotation-${id}`]: {
        '0%': {
          transform: `translate3d(0px, ${size * 0.8 - radius}px, 10px)`,
        },
        '50%': {
          transform: `translate3d(${size - 2 * radius - 1}px, ${
            size * 0.2 - radius
          }px, 10px)`,
        },
        '51%': {
          transform: `translate3d(${size - 2 * radius - 1}px, ${
            size * 0.2 - radius
          }px, -10px)`,
        },
        '100%': {
          transform: `translate3d(0px, ${size * 0.8 - radius}px, -10px)`,
        },
      },
    };
  }, [radius, size, id, delay, duration]);

  return <Circle radius={radius} sx={sx} />;
};

const Circle: React.FunctionComponent<{ radius: number; sx: SxStyleProp }> = ({
  radius,
  sx,
}) => {
  const circleSx2 = React.useMemo(() => {
    return {
      position: 'absolute',
      borderRadius: 9999,
      bg: 'primary',
      width: radius * 2,
      height: radius * 2,
      ...sx,
    } as const;
  }, [radius, sx]);
  return <Box sx={circleSx2} />;
};

export const LoadingIndicator: React.FunctionComponent<EmptyProps> = () => {
  return <LoadingIndicatorWithSize radius={32} size={64} />;
};
