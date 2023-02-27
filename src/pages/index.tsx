import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Img,
  Select,
  SimpleGrid,
  Skeleton,
  Textarea,
  Text,
} from '@chakra-ui/react'
import { Head } from 'components/layout/Head'
import { Mint } from 'components/layout/Mint'
import { useCreateImage } from 'hooks/useCreateImage'
import { useState } from 'react'

export default function Home() {
  const [text, setText] = useState('')
  const [style, setStyle] = useState('')
  const [finalText, setFinalText] = useState('')
  const { loading, data: images, error } = useCreateImage(finalText)

  async function createImages() {
    setFinalText(text + ' ' + style)
  }

  return (
    <>
      <Head />
      <main>
        <Flex flexDirection="column" alignItems={'center'} width={'100%'}>
          <Heading py={2} as="h2" textTransform={'uppercase'}>
            Create And Mint AI Generated Art In A Minute
          </Heading>
          <Text py={2}>
            <strong>
              <u>Describe</u>
            </strong>{' '}
            Your Image,{' '}
            <strong>
              <u>Select</u>
            </strong>{' '}
            The Style, Click{' '}
            <strong>
              <u>GENERATE</u>
            </strong>
            , Connect Your{' '}
            <strong>
              <u>Wallet</u>
            </strong>
            , <strong>Mint</strong>,{' '}
            <strong>
              <u>Done!</u>
            </strong>
          </Text>
          <Flex py={5} px={1} gap={2} width="100%" maxWidth={800}>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="e.g. A Yogi dancing estaticly in Himalaya mountain range"
              size="lg"
              rows={2}
              width={'100%'}
            />
            <Box display={'flex'} flexDirection="column" gap={2}>
              <Select
                placeholder="Style"
                size="lg"
                onChange={(e) => setStyle(e.currentTarget.value)}>
                <option value="Digital Art">Digital Art</option>
                <option value="3D Render">3D Render</option>
                <option value="Pixel Art">Pixel Art</option>
                <option value="Oil Painting">Oil Painting</option>
                <option value="Black and White Drawing">Black and White Drawing</option>
                <option value="Illustration">Illustration</option>
                <option value="Van Gogh Style">Van Gogh Style</option>
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
            <Skeleton height="300px" isLoaded={!loading} width="100%"/>
            <Skeleton height="300px" isLoaded={!loading} width="100%"/>
          </SimpleGrid>
        )}
        </Flex>
      </main>
    </>
  )
}
