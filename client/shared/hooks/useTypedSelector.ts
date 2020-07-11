import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { RootState } from '../ducks/RootDucks';

export const useTypedSelector = useSelector as TypedUseSelectorHook<RootState>;
