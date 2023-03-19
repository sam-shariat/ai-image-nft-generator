import { InfoIcon } from '@chakra-ui/icons'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Portal,
  PopoverArrow,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
  PopoverFooter,
  Button,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import { ConnectKitButton } from 'connectkit'
import { CREDITS_FEE_STRING, NO_FREE_GENERATED_IMAGES } from 'utils/config'

export function BuyCreditInfo() {
  const { colorMode } = useColorMode()
  return (
    <Popover>
      <PopoverTrigger>
        <Button variant={'ghost'} px={0} mx={1}>
          <InfoIcon />
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent border={'none'} bg={'blackAlpha.200'} backdropFilter="blur(10px)">
          <PopoverHeader textAlign={'center'} fontWeight={'semibold'} p={4}>
            Want to buy more credits ?
          </PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody
            width={'100%'}
            p={6}
            display={'flex'}
            flexDirection={'column'}
            alignItems="center"
            gap={4}>
            <Text>
              You can buy <strong>{NO_FREE_GENERATED_IMAGES}</strong> Credits for{' '}
              <strong>{CREDITS_FEE_STRING}</strong>. Connect your wallet to continue.
            </Text>
            <ConnectKitButton.Custom>
              {({ isConnected, show, hide, address, ensName }) => {
                return (
                  <Button onClick={show}>
                    {isConnected ? address : 'Connect Wallet'}
                  </Button>
                )
              }}
            </ConnectKitButton.Custom>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  )
}
