import React from 'react';
import { Box, BoxProps } from 'rebass';

export const LoadingIndicator = () => {
  return (
    <Box>
      <AnimatedCircle
        color="primary"
        w={10}
        r={200}
        duration={1500}
        sx={{ position: 'absolute', left: '50%', top: '50%' }}
      />
      <AnimatedCircle
        color="secondary"
        w={10}
        r={220}
        delay={600}
        duration={763}
        sx={{ position: 'absolute', left: '50%', top: '50%' }}
      />
    </Box>
  );
};

const AnimatedCircle = ({
  delay,
  duration,
  ...props
}: BoxProps & {
  delay?: number;
  duration: number;
  r: number;
  w: number;
  color: string;
}) => {
  const sx = React.useMemo(() => {
    return {
      ...props.sx,
      animationName: 'width',
      animationDuration: duration ? `${duration}ms` : undefined,
      animationIterationCount: 'infinite',
      animationTimingFunction: 'ease-out-cubic',
      animationDirection: 'alternate',
      animationDelay: delay ? `${delay}ms` : undefined,
      '@keyframes width': {
        from: {
          transform: 'scale(1)',
          opacity: 0,
        },
        to: {
          transform: 'scale(2)',
          opacity: 1,
        },
      },
    };
  }, [props.sx, delay, duration]);

  return <Circle {...props} sx={sx} />;
};

const Circle = ({
  r,
  color,
  w,
  ...props
}: BoxProps & { r: number; w: number; color: string }) => {
  return (
    <Box
      {...props}
      sx={{
        ...props.sx,
        marginLeft: -r / 4,
        marginTop: -r / 4,
        borderRadius: '50%',
        width: r / 2,
        height: r / 2,
        borderColor: color,
        borderWidth: w,
        borderStyle: color || w ? 'solid' : undefined,
      }}
    />
  );
};
