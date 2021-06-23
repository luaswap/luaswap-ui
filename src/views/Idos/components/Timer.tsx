import React, { useEffect, useState } from 'react'
import { useTranslation } from 'contexts/Localization'
import { Flex, Link, PocketWatchIcon, Text, Skeleton } from '@pancakeswap/uikit'
import getTimePeriods from 'utils/getTimePeriods'
import { differenceInSecond, getDateTypeValue, compareWithCurrentDateTime } from 'utils/formatTime'

interface Props {
  openAt: string
  closeAt: string
}

const useGetCountDownInSeconds = (openAt, closeAt) => {
  const isClose = compareWithCurrentDateTime(closeAt)
  let numberOfSeconds = 0
  if (isClose) {
    numberOfSeconds = differenceInSecond(getDateTypeValue(openAt), new Date())
  } else {
    numberOfSeconds = differenceInSecond(getDateTypeValue(closeAt), new Date())
  }
  const [countdownInSeconds, setCoundownInSeconds] = useState(numberOfSeconds)

  return countdownInSeconds
}

const Timer: React.FC<Props> = ({ openAt, closeAt }) => {
  const { t } = useTranslation()
  const countdownInSeconds = useGetCountDownInSeconds(openAt, closeAt)
  const [timeUntil, setTimeUntil] = useState(getTimePeriods(countdownInSeconds))
  const [secondsUntil, setSecondsUntil] = useState(countdownInSeconds)
  const suffix = t('Finish').toLowerCase()
  useEffect(() => {
    setSecondsUntil(countdownInSeconds)
    setTimeUntil(getTimePeriods(countdownInSeconds))
  }, [countdownInSeconds])

  useEffect(() => {
    const intervalId = setTimeout(() => {
      const secondsLeft = secondsUntil - 1
      const newTimeUntil = getTimePeriods(secondsLeft)
      setSecondsUntil(secondsLeft)
      setTimeUntil(newTimeUntil)
      if (secondsLeft === 2105) {
        return () => clearInterval(intervalId)
      }
      return () => clearInterval(intervalId)
    }, 1000)
  }, [secondsUntil])

  return (
    <Flex justifyContent="center" mb="32px">
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
