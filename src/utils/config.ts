import { ThemingProps } from '@chakra-ui/react'
import { goerli, sepolia, polygon, optimism, arbitrum, polygonMumbai } from '@wagmi/chains'

export const SITE_NAME = 'AI NFT Generator'
export const SITE_NAME_MOBILE = 'AI NFT'
export const COPYRIGHT = 'Developed by ❤️'
export const SITE_DESCRIPTION =
  'A Decentralized Application (DApp) that utilizes Natural Language Processing (NLP) to generate images from text input, and then mints the generated image as an ERC721 token on the blockchain.'
export const SITE_URL = 'https://nexth.vercel.app'

export const THEME_INITIAL_COLOR = 'system'
export const THEME_COLOR_SCHEME: ThemingProps['colorScheme'] = 'gray'
export const THEME_CONFIG = {
  initialColorMode: THEME_INITIAL_COLOR,
}

export const NO_GENERATED_IMAGES = 2

export const SOCIAL_TWITTER = 'SamyWalters'
export const SOCIAL_GITHUB = 'sam-shariat'

export const ETH_CHAINS = [polygon, arbitrum, optimism, goerli, sepolia, polygonMumbai]

interface OPENSEA_ASSET_URLs {
  [index: number]: string;
}

export const OPENSEA_ASSET_URL:OPENSEA_ASSET_URLs = {
  5: 'https://testnets.opensea.io/assets/goerli',
  80001: 'https://testnets.opensea.io/assets/mumbai',
  137: 'https://opensea.io/assets/matic',
  42161: 'https://opensea.io/assets/arbitrum',
  10: 'https://opensea.io/assets/optimism',
  11155111: 'https://testnets.opensea.io/assets/sepolia',
}

export const SERVER_SESSION_SETTINGS = {
  cookieName: SITE_NAME,
  password:
    process.env.SESSION_PASSWORD ?? 'UPDATE_TO_complex_password_at_least_32_characters_long',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
}
