import { Box, Button, Flex, Img, Select, SimpleGrid, Skeleton, Textarea } from '@chakra-ui/react'
import { Mint } from 'components/layout/Mint'
import { useCreateImage } from 'hooks/useCreateImage'
import { useState } from 'react'
import { STYLE_OPTIONS } from 'utils/config'

export default function GenerateForm() {
  const [text, setText] = useState('')
  const [style, setStyle] = useState('')
  const [finalText, setFinalText] = useState('')
  const { loading, data: images, error } = useCreateImage(finalText)

  async function createImages() {
    setFinalText(text + ' ' + style)
  }
  return (
    <Flex flexDirection="column" alignItems={'center'} width={'100%'}>
      <Flex py={5} px={1} gap={2} width="100%" maxWidth={800}>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="e.g. A Yogi dancing estaticly in Himalaya mountain"
          size="lg"
          rows={2}
          width={'100%'}
        />
        <Box display={'flex'} flexDirection="column" gap={2}>
          <Select placeholder="Style" size="lg" onChange={(e) => setStyle(e.currentTarget.value)}>
            {STYLE_OPTIONS.map((style_option)=> <option value={style_option.value}>{style_option.label}</option>)}
          </Select>
          <Button
            colorScheme="teal"
            size="lg"
            width={'100%'}
            whiteSpace={'normal'}
            onClick={createImages}>
            GENERATE
          </Button>
        </Box>
      </Flex>
      <Flex flexDirection="column" alignItems={'center'} width={'100%'}>
        {images?.data && (
          <SimpleGrid columns={[1, 2]} gap={3} maxWidth={800}>
            {images.data.map((image) => (
              <Flex direction={'column'} border={'2px solid blackAlpha'} borderRadius={10}>
                <Img src={image.url} key={'image' + image.url} alt={text} borderTopRadius={10} />
                <Mint imageUrl={String(image.url)} text={text} key={'mint' + image.url} />
              </Flex>
            ))}
          </SimpleGrid>
        )}
        {loading && (
          <SimpleGrid columns={[1, 2]} gap={3} width="100%" maxWidth={800}>
            <Skeleton height="300px" isLoaded={!loading} width="100%" />
            <Skeleton height="300px" isLoaded={!loading} width="100%" />
          </SimpleGrid>
        )}
      </Flex>
    </Flex>
  )
}
