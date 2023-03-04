import { Flex, Heading, Img } from '@chakra-ui/react'
import { useAlchemyAllNFT } from 'hooks/useAlchemyAllNFT'

export default function NFTsByContract() {
  const { loading, data: nfts, error } = useAlchemyAllNFT()
  
  
  if(!nfts) return null
  const filteredNfts = [...nfts?.nfts].reverse()
  return (
    <Flex pt={6} flexDirection="column" alignItems={'center'} width={'100%'} overflow="hidden">
      <Heading as="h6" size={'md'}>PREVIOUSLY GENERATED IMAGES</Heading>
      <Flex py={5} px={1} gap={3} width="100%" maxWidth={800} overflow="auto">
        {filteredNfts &&
          filteredNfts.map((nft) => <Img borderRadius={10} src={nft.media[0].gateway} width="256" height="256" />)}
      </Flex>
    </Flex>
  )
}
