// @see https://github.com/facebookexperimental/Recoil/issues/290#issuecomment-644607393
import { useEffect, useState } from 'react';
import { RecoilValue, useRecoilValueLoadable } from 'recoil';

export function useRecoilValueOrPrevious<T, S extends T>(
  recoilValue: RecoilValue<T>,
  defaultContents: S
): T {
  const [contents, setContents] = useState<T>(defaultContents);
  const loadable = useRecoilValueLoadable<T>(recoilValue);

  useEffect(() => {
    if (loadable.state === 'hasValue' && loadable.contents !== contents) {
      setContents(loadable.contents);
    }
  }, [loadable, contents]);

  const finalContents =
    loadable.state === 'hasValue' ? loadable.contents : contents;
  return finalContents;
}
