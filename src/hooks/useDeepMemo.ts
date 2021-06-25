import { useRef } from 'react'
import isEqual from 'lodash/isEqual'

function useDeepMemo<T>(memoFn: () => T, key):T {
  const ref = useRef(null)
  if (!ref.current || !isEqual(key, ref.current.key)) {
    ref.current = { key, value: memoFn() }
  }

  return ref.current.value
}

export default useDeepMemo