import { RadioProps } from '@rebass/forms';
import React from 'react';
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from 'react-icons/md';
import { Box, Flex } from 'rebass';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RadioIcon = (props: any) => (
  <>
    <Box
      {...props}
      as={MdRadioButtonChecked}
      sx={{
        display: 'none',
        'input:checked ~ &': {
          display: 'block',
        },
      }}
    />
    <Box
      {...props}
      as={MdRadioButtonUnchecked}
      sx={{
        display: 'block',
        'input:checked ~ &': {
          display: 'none',
        },
      }}
    />
  </>
);

export const Radio = React.forwardRef<
  unknown,
  RadioProps & { icon: React.ElementType | null }
>(({ className, icon, sx, variant = 'radio', ...props }, ref) => (
  <Flex>
    <Box
      as="input"
      ref={ref}
      type="radio"
      {...props}
      sx={{
        position: 'absolute',
        opacity: 0,
        zIndex: -1,
        width: 1,
        height: 1,
        overflow: 'hidden',
      }}
    />
    <Box
      aria-hidden="true"
      as={icon || RadioIcon}
      className={className}
      {...props}
      sx={{
        mr: 2,
        borderRadius: 4,
        color: 'gray',
        'input:checked ~ &': {
          color: 'primary',
        },
        'input:focus ~ &': {
          color: 'primary',
          bg: 'highlight',
        },
        ...sx,
      }}
      tx="forms"
      variant={variant}
    />
  </Flex>
));
