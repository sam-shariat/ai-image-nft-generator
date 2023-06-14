import { Configuration, OpenAIApi } from 'openai'
import { ImagesResponse } from 'openai/dist/api'
import { useState, useEffect } from 'react'
import { State } from 'types'
import { NO_GENERATED_IMAGES, apiAtom } from 'utils/config'
import { useAtomValue } from 'jotai'


export function useCreateImage(text: string) {
  const _text = text.slice(0,text.indexOf("APIKEY"))
  const apikey = useAtomValue(apiAtom)
  const [state, setState] = useState<State<ImagesResponse>>({
    loading: false,
    error: undefined,
    data: undefined,
  })
  const [prevText, setPrevText] = useState('')
  const configuration = new Configuration({
    apiKey: apikey,
  })
  const openai = new OpenAIApi(configuration)

  useEffect(() => {
    const getImages = async () => {
      let response;
      if (apikey === '') {
        console.log('noApiKey')
        setState({
          loading: false,
          error: 'NoKey',
          data: undefined,
        })
        return
      }
      try {
        response = await openai.createImage({
          prompt: _text,
          n: NO_GENERATED_IMAGES,
          size: '512x512',
        })
      } catch (e) {
        console.log('error in using openai api',String(e))
        setState({
          loading: false,
          error: String(e),
          data: undefined,
        })
      }

      if (response?.status === 200) {
        setState({
          loading: false,
          error: undefined,
          data: response.data,
        })

        setPrevText(_text)
        return
      }
    }

    if (_text.length > 3 && _text !== prevText) {
      console.log('prev : ' + prevText + ' | new : ' + _text)
      setState({
        loading: true,
        error: undefined,
        data: undefined,
      })
      getImages()
    }
  }, [text])

  return state
}
