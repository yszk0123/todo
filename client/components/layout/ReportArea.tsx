import React from 'react';
import { Textarea } from '@rebass/forms';

const MIN_HEIGHT = 300;

export const ReportArea: React.FunctionComponent<{ text: string }> = ({
  text,
}) => {
  return <Textarea readOnly minHeight={MIN_HEIGHT} value={text} />;
};
