import { useState, useEffect } from 'react'
import useSecondsUntilCurrent from 'views/Idos/hooks/useSecondsUntilCurrent'
import { Pool, PoolStatus } from 'views/Idos/types'

/**
 * Get pool's current status based on timestamp
 */
const useNFTPoolStatus = (NFTPool: Pool): [s: PoolStatus, o: number, c: number] => {
  const [status, setStatus] = useState(null)
  const openAtSeconds = useSecondsUntilCurrent(NFTPool?.untilOpen)
  const closedAtSeconds = useSecondsUntilCurrent(NFTPool?.untilClose)

  useEffect(() => {
    // If we only has open time, it means that we only allow user to preview the info of the IDO
    if (openAtSeconds > 0 && !closedAtSeconds) {
      setStatus('preview')
      /* If open time > 0 and closed time > 0 -> the Pool is not open yet */
    } else if (openAtSeconds > 0 && closedAtSeconds > 0) {
      setStatus('not open')
    } else if (openAtSeconds <= 0 && closedAtSeconds > 0) {
      setStatus('open')
    } else if (openAtSeconds <= 0 && closedAtSeconds <= 0) {
      setStatus('closed')
    } else {
      setStatus(null)
    }
  }, [openAtSeconds, closedAtSeconds])

  return [status, openAtSeconds, closedAtSeconds]
}

export default useNFTPoolStatus
