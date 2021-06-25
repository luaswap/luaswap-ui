import { useRef } from 'react'
import isEqual from 'lodash/isEqual'

/** 
 * Should use this function when your deps array value is object (handle deep comparision)
 * Use normal useMemo hook when your deps array is primitive value (no need deep comparision)
 */ 
function useDeepMemo<T>(memoFn: () => T, key):T {
  const ref = useRef(null)
  if (!ref.current || !isEqual(key, ref.current.key)) {
    ref.current = { key, value: memoFn() }
  }

  return ref.current.value
}

export default useDeepMemo