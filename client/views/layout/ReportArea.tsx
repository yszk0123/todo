import { Textarea } from '@rebass/forms';
import React from 'react';

const MIN_HEIGHT = 300;

export const ReportArea: React.FunctionComponent<{ text: string }> = ({
  text,
}) => {
  return <Textarea minHeight={MIN_HEIGHT} readOnly value={text} />;
};
