import { Button, Flex, Heading, Img } from '@chakra-ui/react'
import { useAlchemyAllNFT } from 'hooks/useAlchemyAllNFT'
import { OPENSEA_ASSET_URL } from 'utils/config'
import { LinkComponent } from './LinkComponent'

export default function NFTsByContract() {
  const { loading, data: nfts, error } = useAlchemyAllNFT()

  if (!nfts) return null
  const filteredNfts = [...nfts?.nfts].reverse()
  return (
    <Flex pt={6} flexDirection="column" alignItems={'center'} width={'100%'} overflow="hidden">
      <Heading as="h6" size={'md'}>
        PREVIOUSLY GENERATED IMAGES
      </Heading>
      <Flex
        py={5}
        px={1}
        gap={3}
        width="100%"
        maxWidth={800}
        overflow="auto"
        sx={{
          '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
            borderRadius: 10,
            backgroundColor: `rgba(0, 0, 0, 0.20)`,
          },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: 10,
            backgroundColor: `rgba(255, 255, 255, 0.10)`,
          },
        }}>
        {filteredNfts &&
          filteredNfts.map((nft) => (
            <Img borderRadius={10} src={nft.media[0].gateway} width="256" height="256" />
          ))}
      </Flex>
      <Flex p={2} py={4}>
        <LinkComponent href={`${OPENSEA_ASSET_URL[5]}/${filteredNfts[0].contract.address}`}>
          <Button>View Collection On Opensea</Button>
        </LinkComponent>
      </Flex>
    </Flex>
  )
}
