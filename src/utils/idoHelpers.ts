type CardStatus = 'Opening' | 'Closed' | 'Upcoming'
type CardColor = 'primary' | 'failure' | 'textDisabled'

export const formatCardStatus = (num: number): CardStatus => {
  if (num === 2) {
    return 'Opening'
  }

  if (num === 1) {
    return 'Upcoming'
  }

  return 'Closed'
}

export const formatCardColor = (num: number): CardColor => {
  if (num === 2) {
    return 'primary'
  }

  if (num === 1) {
    return 'textDisabled'
  }

  return 'failure'
}
