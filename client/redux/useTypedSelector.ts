import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { RootState } from '../state/RootState';

export const useTypedSelector = useSelector as TypedUseSelectorHook<RootState>;
