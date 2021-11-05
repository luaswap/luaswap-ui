import fromUnixTime from 'date-fns/fromUnixTime'

const generateClaimInfo = (claimTime, claimPercent) => {
  let result = ''

  for (let i = 0; i < claimTime.length; i++) {
    result += `- Claim (${i + 1}) ${claimPercent[i]}% at ${fromUnixTime(claimTime[i])} \n`
  }

  return result
}

export default generateClaimInfo
