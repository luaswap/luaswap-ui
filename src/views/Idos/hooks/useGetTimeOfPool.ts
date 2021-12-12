import { useState, useEffect } from 'react'
import { convertSecondToDay } from 'utils/formatTime'
import { Pool } from '../types'

const useGetTimeOfPool = ({ untilOpen, untilClose, untilClaim }: Pool): [t: string] => {
  const [timeStamp, setTimeStamp] = useState(null)

  useEffect(() => {
    if (untilOpen) {
      const [time, value] = convertSecondToDay(untilOpen)
      setTimeStamp(`${value} ${time}(s) until pool opens.`)
    } else if (untilClose) {
      const [time, value] = convertSecondToDay(untilClose)
      setTimeStamp(`${value} ${time}(s) until pool closes.`)
    } else if (untilClaim) {
      const [time, value] = convertSecondToDay(untilClaim)
      setTimeStamp(`${value} ${time}(s) until claiming time.`)
    }
  }, [untilOpen, untilClose, untilClaim])

  return [timeStamp]
}

export default useGetTimeOfPool
