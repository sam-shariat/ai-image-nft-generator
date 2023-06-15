import {
  Box,
  Button,
  Flex,
  Text,
  useMediaQuery,
  useColorModeValue,
  Spacer,
  Tooltip,
} from '@chakra-ui/react'
import { useAlchemyAllNFT } from 'hooks/useAlchemyAllNFT'
import { ETH_CHAIN_NAMES, OPENSEA_ASSET_URL, networkAtom } from 'utils/config'
import { LinkComponent } from '../layout/Link/LinkComponent'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCards } from 'swiper'
import 'swiper/css'
import 'swiper/css/effect-cards'
import Image from 'next/image'
import { contractAddress } from 'utils/contract'
import { ChainIcon } from 'connectkit'
import { useAtom } from 'jotai'
import { FaExternalLinkAlt } from 'react-icons/fa'

export default function NFTsByContract() {
  const { loading, data: nfts, error } = useAlchemyAllNFT()
  const [notMobile] = useMediaQuery('(min-width: 750px)')
  const [nftNetwork,setNftNetwork] = useAtom(networkAtom);

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
            style={{ padding: notMobile ? 0 : '40px 40px' }}
            effect="cards"
            grabCursor
            modules={[EffectCards]}
            slidesPerView={1}
            spaceBetween={36}>
            {filteredNfts.map((nft) => (
              <SwiperSlide key={`swiper-${nft.contract}-${nft.tokenId}`}>
                <Flex key={`swiper-div-${nft.contract}-${nft.tokenId}`} direction={'column'}>
                  <Box
                    key={`swiper-box-${nft.contract}-${nft.tokenId}`}
                    borderColor={useColorModeValue('gray.900', 'gray.100')}
                    border="2px solid"
                    position={'relative'}
                    borderRadius={5}
                    width={notMobile ? 356 : 272}
                    height={notMobile ? 356 : 272}>
                    <Image
                      key={`image-${nft.contract}-${nft.tokenId}`}
                      style={{ borderRadius: 5 }}
                      alt={nft.title}
                      fill
                      sizes="100vw"
                      src={nft.media[0].gateway}
                    />
                  </Box>
                  <Text
                    key={`title-${nft.contract}-${nft.tokenId}`}
                    color={'white'}
                    borderRadius={10}
                    width={'90%'}
                    fontWeight={'semibold'}
                    bg="blackAlpha.600"
                    backdropFilter="blur(10px)"
                    mt={-12}
                    ml="5%"
                    p={2}>
                    {nft.title}
                  </Text>
                </Flex>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </Box>
      <Flex p={2} alignItems={'center'} justifyContent={'center'} width={'90%'} gap={2}>
        
        {[5, 137, 42161, 10, 80001].map((item) => (
          
            <Tooltip
              hasArrow
              placement="bottom"
              label={`Collection On ${OPENSEA_ASSET_URL[item].slice(
                OPENSEA_ASSET_URL[item].lastIndexOf('/') + 1
              )}`}>
              <Button variant={nftNetwork.id ===  item ? 'outline' : 'ghost'} px={0} onClick={()=> setNftNetwork({network:ETH_CHAIN_NAMES[item],id:item})}>
                <ChainIcon id={item} />
              </Button>
            </Tooltip>
        ))}
        <LinkComponent
            label={`AI Collection On Opensea ${OPENSEA_ASSET_URL[nftNetwork.id].slice(
              OPENSEA_ASSET_URL[nftNetwork.id].lastIndexOf('/') + 1
            )}`}
            href={`${OPENSEA_ASSET_URL[nftNetwork.id]}/${contractAddress[nftNetwork.id]}`}>
              <Button variant={'ghost'} colorScheme='facebook' gap={2}>
              <FaExternalLinkAlt />
              Opensea
              </Button>
            </LinkComponent>
      </Flex>
    </Flex>
  )
}
