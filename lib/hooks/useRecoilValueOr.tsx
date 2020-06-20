import { useRecoilValueLoadable, RecoilValue } from 'recoil';

export function useRecoilValueOr<T>(recoilValue: RecoilValue<T>): T | null {
  const loadable = useRecoilValueLoadable(recoilValue);
  return loadable.state === 'hasValue' ? loadable.contents : null;
}
