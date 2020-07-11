import React from 'react';
import { Flex, Image } from 'rebass';

export const Avatar: React.FunctionComponent<{ alt: string; url: string }> = ({
  alt,
  url,
}) => {
  return (
    <Flex alignItems="center" variant="avatar">
      <Image alt={alt} src={url} />
    </Flex>
  );
};
