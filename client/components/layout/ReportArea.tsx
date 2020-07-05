import React from 'react';
import { Textarea } from '@rebass/forms';

const MIN_HEIGHT = 300;

export const ReportArea: React.FunctionComponent<{ text: string }> = ({
  text,
}) => {
  return <Textarea minHeight={MIN_HEIGHT} readOnly value={text} />;
};
