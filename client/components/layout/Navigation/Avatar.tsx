import React from 'react';
import { Box, Image } from 'rebass';

export const Avatar: React.FunctionComponent<{ alt: string; url: string }> = ({
  alt,
  url,
}) => {
  return (
    <Box variant="avatar">
      <Image src={url} alt={alt} />
    </Box>
  );
};
