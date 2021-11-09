import { useState, useEffect } from 'react'
import { IdoDetailInfo, Pool, PoolStatus } from '../types'
import useSecondsUntilCurrent from './useSecondsUntilCurrent'

/**
 * Get pool's current status based on timestamp
 */
const usePoolStatus = ({
  untilClaim,
  untilClose,
  untilOpen,
}: Pool): [s: PoolStatus, o: number, c: number, d: number] => {
  const [status, setStatus] = useState(null)
  const openAtSeconds = useSecondsUntilCurrent(untilOpen)
  const closedAtSeconds = useSecondsUntilCurrent(untilClose)
  const claimAtSeconds = useSecondsUntilCurrent(untilClaim)

  useEffect(() => {
    // If we only has open time, it means that we only allow user to preview the info of the IDO
    if (openAtSeconds > 0 && !closedAtSeconds) {
      setStatus('preview')
      /* If open time > 0 and closed time > 0 -> the Pool is not open yet */
    } else if (openAtSeconds > 0 && closedAtSeconds > 0) {
      setStatus('not open')
    } else if (openAtSeconds <= 0 && closedAtSeconds > 0) {
      setStatus('open')
    } else if (openAtSeconds <= 0 && closedAtSeconds <= 0 && claimAtSeconds > 0) {
      setStatus('claim')
    } else if (openAtSeconds <= 0 && closedAtSeconds <= 0 && claimAtSeconds <= 0) {
      setStatus('closed')
    } else {
      setStatus(null)
    }
  }, [openAtSeconds, closedAtSeconds, claimAtSeconds])

  return [status, openAtSeconds, closedAtSeconds, claimAtSeconds]
}

export default usePoolStatus
