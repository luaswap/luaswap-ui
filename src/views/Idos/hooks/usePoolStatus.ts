import { useState, useEffect } from 'react'
import { IdoDetailInfo, PoolStatus } from '../types'
import useSecondsUntilCurrent from './useSecondsUntilCurrent'

const usePoolStatus = ({
  openAt,
  closeAt,
  claimAt,
}: IdoDetailInfo): [s: PoolStatus, o: number, c: number, d: number] => {
  const [status, setStatus] = useState(null)
  const openAtSeconds = useSecondsUntilCurrent(openAt)
  const closedAtSeconds = useSecondsUntilCurrent(closeAt)
  const claimAtSeconds = useSecondsUntilCurrent(claimAt)

  useEffect(() => {
    /* If open time > 0 and closed time > 0 -> the Pool is not open yet */
    if (openAtSeconds > 0 && closedAtSeconds > 0) {
      setStatus('not open')
    } else if (openAtSeconds <= 0 && closedAtSeconds > 0) {
      setStatus('open')
    } else if (openAtSeconds <= 0 && closedAtSeconds <= 0 && claimAtSeconds > 0) {
      setStatus('claim')
    } else {
      setStatus('closed')
    }
  }, [openAtSeconds, closedAtSeconds, claimAtSeconds])
  return [status, openAtSeconds, closedAtSeconds, claimAtSeconds]
}

export default usePoolStatus
