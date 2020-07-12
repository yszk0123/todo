import React from 'react';
import { Bar, BarChart, Tooltip, XAxis, YAxis } from 'recharts';

import { useAutoResize } from '../../shared/hooks/useAutoResize';
import { TodoCountByDateFragment } from '../graphql/__generated__/DashboardPage.graphql';

type Props = {
  data: TodoCountByDateFragment[];
};

export const TodoCountByDateChart: React.FunctionComponent<Props> = ({
  data,
}) => {
  const { AutoResizeBox, rect } = useAutoResize();

  return (
    <AutoResizeBox>
      {rect && (
        <BarChart data={data} height={rect.height} width={rect.width}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar barSize={30} dataKey="count" fill="green" />
        </BarChart>
      )}
    </AutoResizeBox>
  );
};
