import {
  Flex,
  Heading,
  Text,
  useMediaQuery,
} from '@chakra-ui/react'
import GenerateForm from 'components/layout/GenerateForm'
import { Head } from 'components/layout/Head'
import NFTsByContract from 'components/layout/NFTsByContract'

export default function Home() {
  const [notMobile] = useMediaQuery('(min-width: 750px)')
  return (
    <>
      <Head />
      <main>
          <Flex flexDirection="column" alignItems={'center'} width={'100%'}>
            <Heading p={notMobile ? 10 : 3} pb={3} as="h2" textAlign="center">
              Mint AI Generated NFTs In A Minute
            </Heading>
            <Text p={3} mb={notMobile ? 10 : 1} textAlign="center" backgroundColor={'blackAlpha.500'} borderRadius={10}>
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
