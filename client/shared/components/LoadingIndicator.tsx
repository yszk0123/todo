import React from 'react';
import { Box, BoxProps } from 'rebass';

export const LoadingIndicator = () => {
  return (
    <Box>
      <AnimatedCircle
        color="primary"
        duration={1500}
        r={200}
        sx={{ position: 'absolute', left: '50%', top: '50%' }}
        w={10}
      />
      <AnimatedCircle
        color="secondary"
        delay={600}
        duration={763}
        r={220}
        sx={{ position: 'absolute', left: '50%', top: '50%' }}
        w={10}
      />
    </Box>
  );
};

const AnimatedCircle = ({
  delay,
  duration,
  ...props
}: BoxProps & {
  color: string;
  delay?: number;
  duration: number;
  r: number;
  w: number;
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
    } as const;
  }, [props.sx, delay, duration]);

  return <Circle {...props} sx={sx} />;
};

const Circle = ({
  color,
  r,
  w,
  ...props
}: BoxProps & { color: string; r: number; w: number }) => {
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
