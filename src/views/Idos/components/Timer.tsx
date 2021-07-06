import React from 'react'
import { Flex, PocketWatchIcon, Text } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'

interface Props {
  suffix: string
  timeUntil: {
    years: number
    months: number
    days: number
    hours: number
    minutes: number
    seconds: number
  }
}

const Timer: React.FC<Props> = ({ suffix, timeUntil }) => {
  const { t } = useTranslation()

  return (
    <Flex justifyContent="center" mb="16px">
      <>
        <PocketWatchIcon width="48px" mr="16px" />
        <Flex alignItems="center">
          <Text bold mr="16px">
            {suffix}:
          </Text>
          <Text>
            {t('%day%d %hour%h %minute%m %second%s', {
              day: timeUntil.days,
              hour: timeUntil.hours,
              minute: timeUntil.minutes,
              second: timeUntil.seconds,
            })}
          </Text>
        </Flex>
      </>
    </Flex>
  )
}

export default Timer
