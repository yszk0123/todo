import React from 'react';
// @ts-ignore
import Linkify from 'react-linkify';

import {
  EditForm,
  EditFormActionsField,
  EditFormInputField,
} from '../../../shared/components/EditForm';
import {
  ListText,
  ListTextExternalLink,
} from '../../../shared/components/List';
import { Popover } from '../../../shared/components/Popover';
import { replaceURLSchemeWithChrome } from '../../../shared/helpers/replaceURLSchemeWithChrome';
import { simplifyURL } from '../../../shared/view_helpers/simplifyURL';

function linkifyComponentDecorator(
  decoratedHref: string,
  decoratedText: string,
  key: number
): React.ReactNode {
  const replacedHref = replaceURLSchemeWithChrome(decoratedHref);
  return (
    <ListTextExternalLink href={replacedHref} key={key}>
      {decoratedText}
    </ListTextExternalLink>
  );
}

function linkifyTextDecorator(text: string): string {
  return simplifyURL(text);
}

export const TodoListText: React.FunctionComponent<{
  isDone: boolean;
  onUpdate: (text: string) => void;
  subElement?: JSX.Element | null;
  text: string;
}> = ({ isDone, onUpdate, subElement, text }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleToggle = React.useCallback(() => {
    setIsOpen((v) => !v);
  }, []);

  const handleUpdate = React.useCallback(
    (text: string) => {
      onUpdate(text);
      setIsOpen(false);
    },
    [onUpdate]
  );

  const content = React.useMemo(() => {
    return (
      <Linkify
        componentDecorator={linkifyComponentDecorator}
        textDecorator={linkifyTextDecorator}
      >
        {text}
      </Linkify>
    );
  }, [text]);

  return (
    <Popover
      content={
        <TodoListTextEditForm
          defaultText={text}
          onCancel={handleToggle}
          onUpdate={handleUpdate}
        />
      }
      isOpen={isOpen}
      position="bottom"
      onClickOutside={handleToggle}
    >
      <ListText
        hasStrikeThrough={isDone}
        subElement={subElement}
        onClick={handleToggle}
      >
        {content}
      </ListText>
    </Popover>
  );
};

const TodoListTextEditForm: React.FunctionComponent<{
  defaultText: string;
  onCancel: () => void;
  onUpdate: (text: string) => void;
}> = ({ defaultText, onCancel, onUpdate }) => {
  const [text, setText] = React.useState(defaultText);

  const handleChange = React.useCallback((newText: string) => {
    setText(newText);
  }, []);

  const handleUpdate = React.useCallback(() => {
    onUpdate(text);
  }, [onUpdate, text]);

  const actions = React.useMemo(
    () => [
      { label: 'Cancel', onClick: onCancel },
      { label: 'Update', onClick: handleUpdate },
    ],
    [onCancel, handleUpdate]
  );

  return (
    <EditForm>
      <EditFormInputField
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
        id="popover-text"
        label="text"
        value={text}
        onChange={handleChange}
      />
      <EditFormActionsField actions={actions} />
    </EditForm>
  );
};
