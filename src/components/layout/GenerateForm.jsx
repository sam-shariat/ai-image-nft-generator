import {
  Box,
  Button,
  Flex,
  Select,
  Textarea,
  Text,
  useToast,
  Heading,
  useMediaQuery,
  Drawer,
  useDisclosure,
  Spacer,
} from '@chakra-ui/react'
import { useCreateImage } from 'hooks/useCreateImage'
import { useLocalStorage } from 'hooks/useLocalStorage'
import { useRef, useState, useEffect } from 'react'
import { NO_FREE_GENERATED_IMAGES, STYLE_OPTIONS } from 'utils/config'
import { BuyCreditButton } from './BuyCreditButton'
import { GeneratedImages } from './GeneratedImages'

export default function GenerateForm() {
  const [text, setText] = useState('')
  const textRef = useRef(null)
  const [generatedImages, setGeneratedImages] = useLocalStorage('gimgs', [])
  const [notMobile] = useMediaQuery('(min-width: 750px)')
  const toast = useToast()
  const [style, setStyle] = useState('')
  const [finalText, setFinalText] = useState('')
  const { loading, data: images, error } = useCreateImage(finalText)
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    if (images !== undefined) {
      const preveiusGeneratedImages = generatedImages ? new Set(generatedImages) : []
      console.log(preveiusGeneratedImages)

      setGeneratedImages([
        ...preveiusGeneratedImages,
        images?.data
          .map((image) => image.url)
          .toString(),
      ])
    }
  }, [images])

  async function createImages() {
    if (generatedImages && generatedImages.length >= NO_FREE_GENERATED_IMAGES) {
      toast({
        title: 'Out of credits',
        status: 'info',
        description: `You have used ${NO_FREE_GENERATED_IMAGES} free credits today. if you need more, please recharge $1 to get 10 more`,
        duration: 8000,
        isClosable: true,
        variant: 'solid',
        position: 'top',
      })
      return
    }
    if (text.length < 3) {
      toast({
        title: 'Missing a description',
        status: 'info',
        description: `Please enter a description of the image you want to generate. just imagine and type ... `,
        duration: 8000,
        isClosable: true,
        variant: 'solid',
        position: 'top',
      })
      textRef.current.focus()
      return
    }
    setFinalText(text + ' ' + style)
    onOpen()
  }
  return (
    <Flex p={notMobile ? 4 : 0} flexDirection="column" alignItems={'center'} width={'100%'}>
      <Flex px={1} py={3} flexDirection="column" alignItems={'center'} width={'100%'}>
        <Heading py={4} as="h2" fontWeight={'black'}>
          Mint AI Generated NFTs In Seconds
        </Heading>
        <Text p={3} backgroundColor={'blackAlpha.300'} borderRadius={10} fontWeight="light">
          <strong>Describe</strong> Your Image, <strong>Select</strong> The Style, Click{' '}
          <strong>GENERATE</strong>, Connect Your <strong>Wallet</strong>, <strong>Mint</strong>,{' '}
          <strong>Done!</strong>
        </Text>
      </Flex>
      <Flex direction={'column'} px={1} gap={2} width="100%">
        <Textarea
          ref={textRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="e.g. A Yogi dancing estaticly in Himalaya mountain"
          size="lg"
          variant={'filled'}
          rows={3}
          width={'100%'}
        />
        <Box display={'flex'} gap={2} py={1}>
          <Select
            variant={'filled'}
            placeholder="Art Style"
            size="lg"
            onChange={(e) => setStyle(e.currentTarget.value)}>
            {STYLE_OPTIONS.map((style_option) => (
              <option value={style_option.value}>{style_option.label}</option>
            ))}
          </Select>
          <Button size="lg" width={200} whiteSpace={'normal'} onClick={createImages}>
            GENERATE
          </Button>
        </Box>
      </Flex>
      <Flex py={2} px={1} width="100%" maxWidth={800} direction="row" alignItems={'center'}>
        {generatedImages && (
          <Text fontWeight="light">
            {NO_FREE_GENERATED_IMAGES - generatedImages.length}/{NO_FREE_GENERATED_IMAGES} Credits
            left
          </Text>
        )}
        <Spacer />
        <BuyCreditButton />
      </Flex>
      <Drawer placement={'bottom'} onClose={onClose} isOpen={isOpen} size={'full'}>
        <GeneratedImages
          onClose={onClose}
          notMobile={notMobile}
          images={images?.data}
          loading={loading}
          text={finalText}
        />
      </Drawer>
    </Flex>
  )
}
