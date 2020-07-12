import React from 'react';
import { Box } from 'rebass';
import { Bar, BarChart, Tooltip, XAxis, YAxis } from 'recharts';

import { TodoCountByDateFragment } from '../graphql/__generated__/DashboardPage.graphql';

type Props = {
  data: TodoCountByDateFragment[];
};

type Rect = { height: number; width: number };

export const TodoCountByDateChart: React.FunctionComponent<Props> = ({
  data,
}) => {
  const [rect, setRect] = React.useState<Rect | null>(null);
  const callbackRef = React.useCallback((element: HTMLElement | null) => {
    if (!element) {
      return;
    }
    const rect = element.getBoundingClientRect();
    const height = rect.height;
    const width = rect.width;
    setRect({ width, height });
  }, []);

  return (
    <Box ref={callbackRef} width={1}>
      {rect && isValidRect(rect) && (
        <BarChart data={data} height={rect.height} width={rect.width}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar barSize={30} dataKey="count" fill="green" />
        </BarChart>
      )}
    </Box>
  );
};

function isValidRect({ height, width }: Rect): boolean {
  return width > 0 && width <= 10000 && height > 0 && height <= 10000;
}
