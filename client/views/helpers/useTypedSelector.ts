import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { RootState } from '../../models/RootState';

export const useTypedSelector = useSelector as TypedUseSelectorHook<RootState>;
