import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const BAD_IMAGES = {}

const Image = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 10px;
  background-color: white;
  border-radius: 50%;
`

export default function TokenLogo({ address, url, name }) {
  const [error, setError] = useState(false)

  useEffect(() => {
    setError(false)
  }, [address])

  if (error || BAD_IMAGES[address]) {
    return <Image alt={name} src={`${process.env.PUBLIC_URL}/images/placeholder.png`} />
  }

  return (
    <Image
      alt={name}
      src={url}
      onError={(event) => {
        BAD_IMAGES[address] = true
        setError(true)
        event.preventDefault()
      }}
    />
  )
}
