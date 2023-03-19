import axios from 'axios'
const axiosRetry = require('axios-retry')

export async function shareImage(url: string, text: string | undefined) {
  const axiosInstance = axios.create()
  axiosRetry(axiosInstance, { retries: 5 })

  const response = await axiosInstance(url, {
    method: 'GET',
    responseType: 'blob',
  })
    .then(async (responseBlob) => {
      try {
        const newFile = await responseBlob.data
        const data = {
          files: [
            new File([newFile], 'image.png', {
              type: newFile.type,
            }),
          ],
          title: 'Image',
          text: `${text} | Image generated by OpenAI at https://ai-image-nft-generator.vercel.app for Free`,
        }
        await navigator.share(data)
      } catch (error) {}
    })
    .catch((e) => {})
}