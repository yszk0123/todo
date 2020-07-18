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
  CheckboxProps & { icon: React.ElementType | null }
>(({ className, icon, sx, variant = 'checkbox', ...props }, ref) => (
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
