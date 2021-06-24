import { useState } from "react"
import { timestampAndCurrentDifference } from 'utils/formatTime'
import useInterval from './useInterval'

const useSecondsUntilCurrent = (timestamp) => {
  const [numberOfSeconds, setNumberOfSeconds] = useState(timestampAndCurrentDifference(timestamp))

  useInterval(() => {
    const newSeconds = numberOfSeconds - 1
    if (newSeconds >= 0) {
      setNumberOfSeconds(newSeconds)
    }
  }, 1000)


  return numberOfSeconds
}

export default useSecondsUntilCurrent