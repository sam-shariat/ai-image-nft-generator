import React from 'react'
import { Flex, useColorModeValue, Spacer, Heading, useMediaQuery } from '@chakra-ui/react'
import { SITE_NAME } from 'utils/config'
import { LinkComponent } from '../Link/LinkComponent'
import { ThemeSwitcher } from './ThemeSwitcher'
import { ConnectKitButton } from 'connectkit'
import { GasFee } from './GasFee'
import { useNetwork } from 'wagmi'
import { Logo } from './Logo'
import { GithubStarButton } from './GithubStarButton'

interface Props {
  className?: string
}

export function Header(props: Props) {
  const className = props.className ?? ''
  const [notMobile] = useMediaQuery('(min-width: 750px)')
  const { chain } = useNetwork()

  return (
    <Flex as="header" className={className} bg={useColorModeValue('gray.100', 'gray.900')} px={4} py={2} mb={4} alignItems="center">
      <LinkComponent label={`${SITE_NAME} Homepage`} href="/">
        <Heading display={'flex'} alignItems={'center'} as="h1" size="md" fontWeight={'black'}>
          <Logo height={35} style={{paddingRight:8}} />{notMobile && SITE_NAME}
        </Heading>
      </LinkComponent>

      <Spacer />

      <Flex alignItems="center" gap={notMobile ? 3 : 2}>
        <GasFee />
        <ConnectKitButton showAvatar={notMobile && chain?.name === "ethereum"} showBalance={notMobile}/>
        {notMobile && <GithubStarButton label='Star On Github' /> }
        <ThemeSwitcher />
      </Flex>
    </Flex>
  )
}
