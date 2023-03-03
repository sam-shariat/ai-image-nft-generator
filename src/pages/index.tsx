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
            <Heading p={3} as="h2" textTransform={'uppercase'}>
              Create And Mint AI Generated Art In A Minute
            </Heading>
            <Text py={2}>
              <strong>
                <u>Describe</u>
              </strong>{' '}
              Your Image,{' '}
              <strong>
                <u>Select</u>
              </strong>{' '}
              The Style, Click{' '}
              <strong>
                <u>GENERATE</u>
              </strong>
              , Connect Your{' '}
              <strong>
                <u>Wallet</u>
              </strong>
              , <strong>Mint</strong>,{' '}
              <strong>
                <u>Done!</u>
              </strong>
            </Text>
          </Flex>
          <GenerateForm />
          <NFTsByContract />
      </main>
    </>
  )
}
