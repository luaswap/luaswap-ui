/* eslint-disable consistent-return */
import { useEffect, useRef } from 'react'
import { useWeb3React } from '@web3-react/core'

export default function useInterval(callback, delay) {
  const savedCallback = useRef()
  const { chainId, account } = useWeb3React()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      // @ts-ignore
      savedCallback.current()
    }
    if (delay !== null) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay, chainId, account])
}
