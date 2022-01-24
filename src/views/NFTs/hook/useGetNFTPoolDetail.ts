import { useCallback } from 'react'
import { useAppDispatch } from 'state'
import { fetchNFTPoolDetail } from 'state/nfts'

const useGetNFTPoolDetail = () => {
  const dispatch = useAppDispatch()

  const handleGetNFTPoolDetail = useCallback(
    async (NFTPoolId) => {
      await dispatch(fetchNFTPoolDetail(NFTPoolId))
    },
    [dispatch],
  )

  return { onGetNFTPoolDetail: handleGetNFTPoolDetail }
}

export default useGetNFTPoolDetail
