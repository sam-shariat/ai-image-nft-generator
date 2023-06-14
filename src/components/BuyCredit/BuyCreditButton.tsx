import { Button, useToast } from '@chakra-ui/react'
import { ethers } from 'ethers'
import { useLocalStorage } from 'usehooks-ts'
import { CREDITS_CHAIN, CREDITS_FEE, CREDITS_WALLET } from 'utils/config'
import { useSendTransaction, usePrepareSendTransaction, useNetwork, useSwitchNetwork, useSigner } from 'wagmi'

export function BuyCreditButton() {
  const [generatedImages, setGeneratedImages] = useLocalStorage('gimgs',[])
  const toast = useToast()
  const { chain } = useNetwork()
  const { data: signer } = useSigner()
  const { switchNetwork } = useSwitchNetwork({
    chainId: CREDITS_CHAIN,
  })
  const { config } = usePrepareSendTransaction({
    request: { to: CREDITS_WALLET, value: ethers.BigNumber.from(CREDITS_FEE) },
    chainId: CREDITS_CHAIN,
  })
  const { isLoading, sendTransaction } = useSendTransaction({
    ...config,
    onSuccess(data) {
      setGeneratedImages([])
      toast({
        title: '3 Credits Added',
        status: 'success',
        description: `Payment Succesfull. Please Refresh the Website. Tx Hash: ${data.hash}`,
        duration: 8000,
        isClosable: true,
        variant: 'solid',
        position: 'top',
      })
      console.log(data)
    },
  })


  if(!signer) {
    return null
  }

  return (
    <>
      {chain?.id !== CREDITS_CHAIN ? (
        <Button
          onClick={()=> switchNetwork}
          size={'sm'}
          variant={'outline'}>
          Switch To Polygon
        </Button>
      ) : (
        <Button
          disabled={!sendTransaction}
          onClick={() => sendTransaction?.()}
          isLoading={isLoading}
          size={'sm'}
          variant={'outline'}
          colorScheme="green">
          Buy Credits
        </Button>
      )}
    </>
  )
}
