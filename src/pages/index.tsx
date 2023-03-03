import {
  Flex,
  Heading,
  Text,
} from '@chakra-ui/react'
import GenerateForm from 'components/layout/GenerateForm'
import { Head } from 'components/layout/Head'
import NFTsByContract from 'components/layout/NFTsByContract'

export default function Home() {
  return (
    <>
      <Head />
      <main>
          <Flex flexDirection="column" alignItems={'center'} width={'100%'}>
            <Heading p={3} as="h2" textTransform={'uppercase'} textAlign="center">
              Create And Mint AI Generated Art In A Minute
            </Heading>
            <Text p={4} textAlign="center" backgroundColor={'blackAlpha.500'} borderRadius={10}>
              <strong>
                Describe
              </strong>{' '}
              Your Image,{' '}
              <strong>
                Select
              </strong>{' '}
              The Style, Click{' '}
              <strong>
                GENERATE
              </strong>
              , Connect Your{' '}
              <strong>
                Wallet
              </strong>
              , <strong>Mint</strong>,{' '}
              <strong>
                Done!
              </strong>
            </Text>
          </Flex>
          <GenerateForm />
          <NFTsByContract />
      </main>
    </>
  )
}
