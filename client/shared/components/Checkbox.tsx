import { CheckboxProps } from '@rebass/forms';
import React from 'react';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';
import { Box, Flex } from 'rebass';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CheckboxIcon = (props: any) => (
  <>
    <Box
      {...props}
      as={MdCheckBox}
      sx={{
        display: 'none',
        'input:checked ~ &': {
          display: 'block',
        },
      }}
    />
    <Box
      {...props}
      as={MdCheckBoxOutlineBlank}
      sx={{
        display: 'block',
        'input:checked ~ &': {
          display: 'none',
        },
      }}
    />
  </>
);

export const Checkbox = React.forwardRef<
  unknown,
  Omit<CheckboxProps, 'className'> & { icon: React.ElementType | null }
>(({ icon, sx, variant = 'checkbox', ...props }, ref) => (
  <Flex>
    <Box
      as="input"
      ref={ref}
      type="checkbox"
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
      as={icon || CheckboxIcon}
      {...props}
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        mr: 2,
        borderRadius: 4,
        color: 'gray',
        ':hover': { opacity: 0.7 },
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
