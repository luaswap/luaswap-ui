import React, { useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import axios from 'axios'
import { Route, Redirect } from 'react-router-dom'
import { useModal } from 'luastarter-uikits'
import TermOfUseModal from 'components/TermOfUseModal'
import { API_IDO_URL } from 'config'
import { TOUResponse } from 'views/Idos/types'

const TOSAuthRoute = ({ component: Component, ...rest }) => {
  const { account } = useWeb3React()
  const [onDisplayTermOfUseModal, onDismiss] = useModal(<TermOfUseModal />, false)

  useEffect(() => {
    const fetchUserTOSInfo = async () => {
      try {
        const response = await axios.get(`${API_IDO_URL}/users/tou/${account}`)
        const { touApproved } = response.data as TOUResponse
        if (!touApproved) {
          onDisplayTermOfUseModal()
        } else {
          onDismiss()
        }
      } catch (error) {
        console.log(error, 'Fail to fetch Term of use information')
      }
    }

    if (account) {
      fetchUserTOSInfo()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account])

  return <Route render={(props) => <Component {...props} />} {...rest} />
}

export default TOSAuthRoute
