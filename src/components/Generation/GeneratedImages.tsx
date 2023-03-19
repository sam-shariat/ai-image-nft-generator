import {
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  Flex,
  Img,
  DrawerHeader,
  Button,
} from '@chakra-ui/react'
const FileSaver = require('file-saver')
import { ImagesResponseDataInner } from 'openai'
import { shareImage } from 'utils/shareImage'
import { LoadingSVG } from '../layout/LoadingSVG'
import { Mint } from '../Mint/Mint'

interface Props {
  notMobile: boolean
  text: string
  loading: boolean
  images: ImagesResponseDataInner[] | undefined
  onClose: Function
}

export function GeneratedImages({ text, loading, images, notMobile, onClose }: Props) {
  function download(url:string) {
    FileSaver.saveAs(url,`${text}.jpg`)
  }
  function handleShare(url: string) {
    shareImage(url, text)
  }

  return (
    <DrawerContent>
      <DrawerCloseButton />
      <DrawerHeader p={2} textAlign={'center'}>
        {loading ? 'Generating Image' : 'Image Generated'}
      </DrawerHeader>
      <DrawerBody>
        <Flex pb={2} flexDirection="column" alignItems={'center'} width={'100%'}>
          {images &&
            images.map((image) => (
              <Flex key={'container-' + image.url} direction={notMobile ? 'row' : 'column'} alignItems="center" width={notMobile ? 'auto' : '100%'}>
                <Img src={image.url} key={'image-' + image.url} alt={text} borderRadius={10} />
                <Flex key={'buttons-' + image.url} direction={'column'} mt={2} p={notMobile ? 4 : 0} gap={2} width={'100%'}>
                  <Mint imageUrl={String(image.url)} text={text} key={'mint-' + image.url} />
                  <Button
                    key={'download-' + image.url}
                    colorScheme="green"
                    size="lg"
                    width={'100%'}
                    gap={2}
                    whiteSpace={'normal'}
                    value={String(image.url)}
                    onClick={(e) => download(e.currentTarget.value)}>
                    Download
                  </Button>
                  <Button
                    key={'share-' + image.url}
                    colorScheme="twitter"
                    size="lg"
                    width={'100%'}
                    gap={2}
                    whiteSpace={'normal'}
                    value={String(image.url)}
                    onClick={(e) => handleShare(e.currentTarget.value)}>
                    Share
                  </Button>
                  <Button
                    key={'again-'+image.url}
                    colorScheme="gray"
                    size="lg"
                    width={'100%'}
                    gap={2}
                    whiteSpace={'normal'}
                    onClick={() => onClose()}>
                    Try Again
                  </Button>
                </Flex>
              </Flex>
            ))}
          {loading && <LoadingSVG width={notMobile ? 475 : 350}/>}
        </Flex>
      </DrawerBody>
    </DrawerContent>
  )
}
