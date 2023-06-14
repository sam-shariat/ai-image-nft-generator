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
import { useRef, useState, useEffect } from 'react'
import { STYLE_OPTIONS } from 'utils/config'
import { CreditInfo } from '../BuyCredit/CreditInfo'
import { GeneratedImages } from './GeneratedImages'
import ApiKeyInput from 'components/BuyCredit/ApiKeyInput'
import { apiAtom } from 'utils/config'
import { useAtomValue } from 'jotai'

export default function GenerateForm() {
  const apikey = useAtomValue(apiAtom)
  const [text, setText] = useState('')
  const textRef = useRef<HTMLTextAreaElement>(null)
  const [notMobile] = useMediaQuery('(min-width: 750px)')
  const toast = useToast()
  const [style, setStyle] = useState('')
  const [finalText, setFinalText] = useState('')
  const { loading, data: images, error } = useCreateImage(finalText)
  const { isOpen, onOpen, onClose } = useDisclosure()

  async function createImages() {
    if (text.length < 3) {
      toast({
        title: 'Missing a description',
        status: 'info',
        description: `Please enter a description of the image you want to generate. just imagine and type ... `,
        duration: 4000,
        isClosable: true,
        variant: 'solid',
        position: 'top',
      })
      if (textRef.current !== null) {
        textRef.current.focus()
      }
      return
    }
    setFinalText(text + ' ' + style + ' APIKEY' + apikey)
    onOpen()
  }

  useEffect(() => {
    if (error && error.includes('code 400')) {
      toast({
        title: 'Out of credits',
        status: 'info',
        description: `There are not enough credits in the OpenAI api key, Please enter a new one or recharge your account on OpenAI`,
        duration: 4000,
        isClosable: true,
        variant: 'solid',
        position: 'top',
      })
      onClose()
      return
    }

    if (error && error.includes('code 401')) {
      toast({
        title: 'Wrong API Key',
        status: 'warning',
        description: `Your OpenAI API Key is not correct, Please enter a correct one that begins with sk-... `,
        duration: 4000,
        isClosable: true,
        variant: 'solid',
        position: 'top',
      })
      onClose()
      return
    }

    if (error && error.includes('NoKey')) {
      toast({
        title: 'Open AI Api Key is Requiered',
        status: 'warning',
        description: `Please Enter your OpenAI API Key, You can get a free one on platform.openai.com if you don't already have one.`,
        duration: 4000,
        isClosable: true,
        variant: 'solid',
        position: 'top',
      })
      onClose()
      return
    }
  }, [error])
  return (
    <Flex p={notMobile ? 4 : 0} flexDirection="column" alignItems={'center'} width={'100%'}>
      <Flex px={1} py={3} flexDirection="column" alignItems={'center'} width={'100%'}>
        <Heading pb={4} as="h2" fontWeight={'black'}>
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
              <option key={style_option.value} value={style_option.value}>
                {style_option.label}
              </option>
            ))}
          </Select>
          <Button size="lg" width={200} whiteSpace={'normal'} onClick={createImages}>
            GENERATE
          </Button>
        </Box>
      </Flex>
      <Flex gap={1} py={2} px={1} width="100%" maxWidth={800} direction="row" alignItems={'center'}>
        <CreditInfo />
        <Spacer />
        <ApiKeyInput />
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
