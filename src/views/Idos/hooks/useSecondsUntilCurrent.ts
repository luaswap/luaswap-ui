import { useEffect, useState } from 'react'
import { timestampAndCurrentDifference } from 'utils/formatTime'
import useInterval from './useInterval'

/**
 * Counting how many seconds left until specific timestamp
 */
const useSecondsUntilCurrent = (seconds) => {
  const [numberOfSeconds, setNumberOfSeconds] = useState(seconds)

  useEffect(() => {
    setNumberOfSeconds(seconds)
  }, [seconds])

  useInterval(() => {
    const newSeconds = numberOfSeconds - 1
    if (newSeconds >= 0) {
      setNumberOfSeconds(newSeconds)
    }
  }, 1000)
  return numberOfSeconds
}

export default useSecondsUntilCurrent
