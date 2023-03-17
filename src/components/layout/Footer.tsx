import React from 'react'
import { Flex, Text } from '@chakra-ui/react'
import { FaGithub, FaStar, FaTwitter } from 'react-icons/fa'
import { LinkComponent } from './LinkComponent'
import {
  COPYRIGHT,
  GITHUB_URL,
  SITE_DESCRIPTION,
  SOCIAL_GITHUB,
  SOCIAL_TWITTER,
} from 'utils/config'

interface Props {
  className?: string
}

export function Footer(props: Props) {
  const className = props.className ?? ''

  return (
    <Flex
      as="footer"
      backgroundColor={'blackAlpha.400'}
      className={className}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      py={3}>
      <Flex color="gray.500" gap={2} alignItems="center" mt={2}>
        <LinkComponent href={GITHUB_URL}>
          <FaStar />
        </LinkComponent>
        <LinkComponent href={`https://github.com/${SOCIAL_GITHUB}`}>
          <FaGithub />
        </LinkComponent>
        <LinkComponent href={`https://twitter.com/${SOCIAL_TWITTER}`}>
          <FaTwitter />
        </LinkComponent>
        <Text>{COPYRIGHT}</Text>
      </Flex>
    </Flex>
  )
}
