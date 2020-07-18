import React from 'react';

import { StatusBarButton } from '../../../shared/components/StatusBar';
import { TodoArchiveStatus } from '../../../view_models/Todo';

export const TodoStatusBarArchiveButton: React.FunctionComponent<{
  archiveStatus: TodoArchiveStatus;
  isSelected: boolean;
  onClickArchive: () => void;
  onClickUnarchive: () => void;
}> = ({ archiveStatus, isSelected, onClickArchive, onClickUnarchive }) => {
  switch (archiveStatus) {
    case TodoArchiveStatus.UNARCHIVED:
      return (
        <StatusBarButton
          isSelected={isSelected}
          label="Archive"
          onClick={onClickArchive}
        />
      );
    case TodoArchiveStatus.ARCHIVED:
      return (
        <StatusBarButton
          isSelected={isSelected}
          label="Unarchive"
          onClick={onClickUnarchive}
        />
      );
    case TodoArchiveStatus.MIXED:
      return null;
  }
};
