import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { RootState } from '../../models/RootDucks';

export const useTypedSelector = useSelector as TypedUseSelectorHook<RootState>;
