import React from 'react';

import {
  EditForm,
  EditFormAction,
  EditFormActionsField,
} from '../../shared/components/EditForm';
import { LoadingIndicator } from '../../shared/components/LoadingIndicator';
import { PageContent } from '../../shared/components/PageContent';
import { setCSVToClipboard } from '../../shared/view_models/__experimental__/Clipboard';
import { ID } from '../../view_models/ID';
import { TodosReport } from '../components/TodosReport';
import { useTodosReportPageState } from '../hooks/useTodosReportPageState';
import {
  printTodosReportAsCSV,
  printTodosReportAsMarkdown,
} from '../view_models/TodosReport';

type Props = {
  categoryId: ID;
};

export const TodosReportPage: React.FunctionComponent<Props> = ({
  categoryId,
}) => {
  const { isLoading, tags, todos } = useTodosReportPageState(categoryId);
  const actions: EditFormAction[] = React.useMemo(
    () => [
      {
        label: 'Copy as CSV',
        onClick() {
          // FIXME: Extract as TodoReportUsecase
          const text = printTodosReportAsCSV(todos);
          setCSVToClipboard(text);
        },
      },
      {
        label: 'Copy as Markdown',
        onClick() {
          // FIXME: Extract as TodoReportUsecase
          const text = printTodosReportAsMarkdown(todos, tags);
          setCSVToClipboard(text);
        },
      },
    ],
    [tags, todos]
  );

  return (
    <PageContent>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <>
          <TodosReport tags={tags} todos={todos} />
          <EditForm isInline>
            <EditFormActionsField actions={actions} />
          </EditForm>
        </>
      )}
    </PageContent>
  );
};
