import React from 'react';
import { Link } from 'rebass';

type Props = {
  href: string;
};

function handleClick(event: React.MouseEvent): void {
  event.stopPropagation();
}

export const ListTextExternalLink: React.FunctionComponent<Props> = ({
  children,
  href,
}) => {
  return (
    <Link
      href={href}
      rel="noreferrer"
      sx={{
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: 'inline-block',
        maxWidth: '100%',
        verticalAlign: 'middle',
      }}
      target="_blank"
      onClick={handleClick}
    >
      {children}
    </Link>
  );
};
