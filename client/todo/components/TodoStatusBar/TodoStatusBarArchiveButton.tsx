import React from 'react';

import { StatusBarButton } from '../../../shared/components/StatusBar';
import { TodoArchiveStatus } from '../../../view_models/Todo';

export const TodoStatusBarArchiveButton: React.FunctionComponent<{
  archiveStatus: TodoArchiveStatus;
  onClickArchive: () => void;
  onClickUnarchive: () => void;
}> = ({ archiveStatus, onClickArchive, onClickUnarchive }) => {
  switch (archiveStatus) {
    case TodoArchiveStatus.UNARCHIVED:
      return <StatusBarButton label="Archive" onClick={onClickArchive} />;
    case TodoArchiveStatus.ARCHIVED:
      return <StatusBarButton label="Unarchive" onClick={onClickUnarchive} />;
    case TodoArchiveStatus.MIXED:
      return null;
  }
};
