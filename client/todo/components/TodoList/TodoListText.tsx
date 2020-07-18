import React from 'react';
// @ts-ignore
import Linkify from 'react-linkify';

import { ListText } from '../../../shared/components/List';
import { simplifyURL } from '../../../shared/view_helpers/simplifyURL';

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
  isDone: boolean;
  subElement?: JSX.Element | null;
  text: string;
}> = React.memo(({ isDone, subElement, text }) => {
  return (
    <ListText hasStrikeThrough={isDone} subElement={subElement}>
      <Linkify
        componentDecorator={linkifyComponentDecorator}
        textDecorator={linkifyTextDecorator}
      >
        {text}
      </Linkify>
    </ListText>
  );
});
