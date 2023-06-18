import { ThemingProps } from '@chakra-ui/react'
import { goerli, sepolia, polygon, optimism, arbitrum, polygonMumbai } from '@wagmi/chains'
import { Network } from 'alchemy-sdk';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils'

type StyleOption = {
  value: string;
  label: string;
};

export const STYLE_OPTIONS: StyleOption[] = [
  { value: "realistic", label: "Realistic" },
  { value: "digital art", label: "Digital Art" },
  { value: "3d render", label: "3D Render" },
  { value: "pixel art", label: "Pixel Art" },
  { value: "black and white", label: "Black and White" },
  { value: "abstract", label: "Abstract" },
  { value: "cartoon", label: "Cartoon" },
  { value: "surreal", label: "Surreal" },
  { value: "fantasy", label: "Fantasy" },
  { value: "minimalist", label: "Minimalist" },
  { value: "pop-art", label: "Pop Art" },
  { value: "impressionist", label: "Impressionist" },
  { value: "expressionist", label: "Expressionist" },
  { value: "cubist", label: "Cubist" },
  { value: "futuristic", label: "Futuristic" },
  { value: "vintage", label: "Vintage" },
  { value: "gothic", label: "Gothic" },
  { value: "steampunk", label: "Steampunk" },
  { value: "cyberpunk", label: "Cyberpunk" },
  { value: "romantic", label: "Romantic" },
  { value: "naturalistic", label: "Naturalistic" },
  { value: "whimsical", label: "Whimsical" },
  { value: "geometric", label: "Geometric" },
  { value: "retro", label: "Retro" },
];

export const SITE_NAME = 'AI NFT Generator'
export const SITE_NAME_MOBILE = 'AI NFT'
export const COPYRIGHT = '@SamyWalters 2023'
export const SITE_DESCRIPTION =
  'A Decentralized Application (DApp) that utilizes Natural Language Processing (NLP) to generate images from text input, and then mints the generated image as an ERC721 token on the blockchain.'
export const SITE_URL = 'https://ai-image-nft-generator.vercel.app/'

export const THEME_INITIAL_COLOR = 'dark'
export const THEME_COLOR_SCHEME: ThemingProps['colorScheme'] = 'blue'
export const THEME_CONFIG = {
  initialColorMode: THEME_INITIAL_COLOR,
}

export const CREDITS_WALLET = '0xD2D12058B23B55AA01b271be16C4855CeFa001CE'
export const CREDITS_FEE = "800000000000000000"
export const CREDITS_FEE_STRING = "0.8 MATIC"
export const CREDITS_CHAIN = 137

export const NO_GENERATED_IMAGES = 1
export const NO_FREE_GENERATED_IMAGES = 3

export const SOCIAL_TWITTER = 'SamyWalters'
export const SOCIAL_GITHUB = 'sam-shariat'
export const GITHUB_URL = 'https://github.com/sam-shariat/ai-image-nft-generator'

export const ETH_CHAINS = [polygon, arbitrum, optimism, goerli, sepolia, polygonMumbai]
interface OPENSEA_ASSET_URLs {
  [index: number]: string;
}

interface IETH_CHAIN_NAMES {
  [index: number]: Network;
}

export const ETH_CHAIN_NAMES:IETH_CHAIN_NAMES = {
  5: Network.ETH_GOERLI,
  80001: Network.MATIC_MUMBAI,
  137: Network.MATIC_MAINNET,
  42161: Network.ARB_MAINNET,
  10: Network.OPT_MAINNET,
  11155111: Network.ETH_GOERLI,
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

export const apiAtom = atomWithStorage('openaiapi','');
export const networkAtom = atom({network:Network.ETH_GOERLI,id:5});