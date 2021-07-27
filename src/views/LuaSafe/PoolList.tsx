import React from 'react'
import PoolCard from './PoolCard'

const PoolList: React.FC<PoolListProps> = ({ items = [] }) => {
  return (
    <>
      {items.map((pool) => (
        <PoolCard key={pool.lpAddresses} pool={pool} />
      ))}
    </>
  )
}

interface PoolListProps {
  items?: any[]
}

export default PoolList
