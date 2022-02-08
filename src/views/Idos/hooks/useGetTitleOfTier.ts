import React, { useEffect, useState } from 'react'

const titleTierObj = {
  none: 'None',
  earth: 'Earth',
  moon: 'Moon',
  mars: 'Mars',
  galaxy: 'Galaxy',
  galaxyPlus: 'Galaxy plus',
}

const useGetTitleOfTier = (estLua) => {
  const [titleTier, setTitleTier] = useState(titleTierObj.none)

  useEffect(() => {
    if (estLua < 5000) {
      setTitleTier(titleTierObj.none)
    } else if (estLua >= 5000 && estLua < 25000) {
      setTitleTier(titleTierObj.earth)
    } else if (estLua >= 25000 && estLua < 100000) {
      setTitleTier(titleTierObj.moon)
    } else if (estLua >= 100000 && estLua < 250000) {
      setTitleTier(titleTierObj.mars)
    } else if (estLua >= 250000 && estLua < 400000) {
      setTitleTier(titleTierObj.galaxy)
    } else {
      setTitleTier(titleTierObj.galaxyPlus)
    }
  }, [estLua])
  return titleTier
}

export default useGetTitleOfTier
