import { SimpleGrid } from '@chakra-ui/react'
import GenerateForm from 'components/Generation/GenerateForm'
import { Head } from 'components/layout/Header/Head'
import NFTsByContract from 'components/NFTSlider/NFTsByContract'

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
