import { ExternalLink } from '../types'

const getLink = (links: ExternalLink[], label: string): string | null => {
  const result = links.find((link) => link.label === label)
  if (result) {
    return result.link
  }

  return null
}

export default getLink
