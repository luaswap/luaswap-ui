import { useCallback } from 'react'
import { useAppDispatch } from 'state'
import { fetchNFTPools } from 'state/nfts'

const useGetNFTPools = () => {
  const dispatch = useAppDispatch()

  const handleGetNFTPools = useCallback(async () => {
    await dispatch(fetchNFTPools())
  }, [dispatch])

  return { onGetNFTPools: handleGetNFTPools }
}

export default useGetNFTPools
