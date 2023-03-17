import { Box, Button, Flex, Text, Img, useMediaQuery, useColorModeValue } from '@chakra-ui/react'
import { useAlchemyAllNFT } from 'hooks/useAlchemyAllNFT'
import { OPENSEA_ASSET_URL } from 'utils/config'
import { LinkComponent } from './LinkComponent'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCards } from 'swiper'
import 'swiper/css'
import 'swiper/css/effect-cards'

export default function NFTsByContract() {
  const { loading, data: nfts, error } = useAlchemyAllNFT()
  const [notMobile] = useMediaQuery('(min-width: 750px)')

  if (!nfts) return null
  const filteredNfts = [...nfts?.nfts].reverse()
  return (
    <Flex p={2} flexDirection="column" alignItems={'center'} width={'100%'} overflow="hidden">
      <Box p={4}>
        {filteredNfts && (
          <Swiper
            className="mySwiper"
            width={356}
            height={356}
            style={{padding:notMobile ? 0 : '40px 40px'}}
            effect='cards'
            grabCursor
            modules={[EffectCards]}
            slidesPerView={1}
            spaceBetween={36}>
            {filteredNfts.map((nft) => (
              <SwiperSlide>
                <Flex direction={'column'}>
                <Img borderRadius={10} border='solid 2px' borderColor={useColorModeValue('gray.900', 'gray.100')} src={nft.media[0].gateway} width={356} height={notMobile ? 356 : 272} />
                <Text color={'white'} borderRadius={10} width={'90%'} fontWeight={'semibold'} bg="blackAlpha.600" backdropFilter="blur(10px)" mt={-12} ml='5%' p={2}>{nft.title}</Text>
                </Flex>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </Box>
      <Flex p={2} py={4}>
        <LinkComponent href={`${OPENSEA_ASSET_URL[5]}/${filteredNfts[0].contract.address}`}>
          <Button variant={'outline'}>View Collection On Opensea</Button>
        </LinkComponent>
      </Flex>
    </Flex>
  )
}
