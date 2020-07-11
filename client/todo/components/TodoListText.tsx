import React from 'react';
// @ts-ignore
import Linkify from 'react-linkify';

import { ListText } from '../../shared/components/List';
import { simplifyURL } from '../../shared/view_helpers/simplifyURL';

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
  return simplifyURL(text);
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