import { useEffect, useState } from "react"
import getTimePeriods from "utils/getTimePeriods"

let timeoutId = null

const useGetCountDownInSeconds = (numberOfSeconds) => {
  const [countdownInSeconds, setCoundownInSeconds] = useState(numberOfSeconds)
  const [timeUntil, setTimeUntil] = useState(getTimePeriods(countdownInSeconds))

  useEffect(() => {
    const countDown = () => {
      timeoutId = setTimeout(() => {
        const secondsLeft = countdownInSeconds - 1
        const newTimeUntil = getTimePeriods(secondsLeft)
        setCoundownInSeconds(secondsLeft)
        setTimeUntil(newTimeUntil)
        if (secondsLeft <= 0) {
          clearTimeout(timeoutId)
        }
        return () => clearTimeout(timeoutId)
      }, 1000)
    }
    countDown()
  }, [countdownInSeconds])

  return timeUntil
}

export default useGetCountDownInSeconds