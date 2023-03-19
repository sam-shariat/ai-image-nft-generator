import { SimpleGrid } from '@chakra-ui/react'
import GenerateForm from 'components/layout/GenerateForm'
import { Head } from 'components/layout/Head'
import { LoadingSVG } from 'components/layout/LoadingSVG'
import NFTsByContract from 'components/layout/NFTsByContract'

export default function Home() {
  return (
    <>
      <Head />
      <main>
        <SimpleGrid py={8} columns={[1, 1, 2, 2]} justifyContent={'center'}>
          <GenerateForm />
          <NFTsByContract />
        </SimpleGrid>
      </main>
    </>
  )
}
