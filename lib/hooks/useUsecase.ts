import React from 'react';

export function useUsecase<T>(createUsecase: () => T) {
  const [usecase] = React.useState(createUsecase);
  return usecase;
}
