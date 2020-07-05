import React from 'react';
// @ts-ignore
import Linkify from 'react-linkify';

import { ListText } from '../../layout/List';

function linkifyComponentDecorator(
  decoratedHref: string,
  decoratedText: string,
  key: number
): React.ReactNode {
  return (
    <a href={decoratedHref} key={key} rel="noreferrer" target="_blank">
      {decoratedText}
    </a>
  );
}

function linkifyTextDecorator(text: string): string {
  const simplifiedText = text
    .replace(/^https?:\/\//, '')
    .replace(/\?.*$/, '')
    .replace(/#.*$/, '')
    .replace(
      /^github.com\/[^/]+\/([^/]+)\/(?:pull|issue)\/([0-9]+)$/,
      '$1 #$2'
    );

  const splittedText = simplifiedText.split('/');
  if (splittedText.length >= 5) {
    return [
      splittedText[0],
      splittedText[1],
      '...',
      splittedText[splittedText.length - 1],
    ].join('/');
  }

  return simplifiedText;
}

export const TodoListText: React.FunctionComponent<{
  text: string;
}> = React.memo(({ text }) => {
  return (
    <ListText>
      <Linkify
        componentDecorator={linkifyComponentDecorator}
        textDecorator={linkifyTextDecorator}
      >
        {text}
      </Linkify>
    </ListText>
  );
});
