import React from 'react'
import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { FaGasPump, FaMotorcycle, FaSpaceShuttle } from 'react-icons/fa'
import { useFeeData, useNetwork } from 'wagmi'
import { LinkComponent } from './LinkComponent'

interface Props {
  className?: string
}

export function GasFee(props: Props) {
  const className = props.className ?? ''
  const { chain } = useNetwork()
  const { data } = useFeeData({chainId: chain?.id});
  const { isOpen, onOpen, onClose } = useDisclosure()
  const gasPrice = Math.round(Number(data?.formatted.gasPrice)/1e9)
  const fastGasPrice = Math.round(Number(data?.formatted.maxFeePerGas)/1e9)
  console.log(data)
  if (!data) return null

  return (
    <>
      <Box className={className} onClick={onOpen} _hover={{ cursor: 'pointer' }} display="flex" flexDirection="row" gap={2} justifyItems="center">
        <FaGasPump />
        <Text fontSize="xs" fontWeight={"bold"}>{gasPrice}</Text>
      </Box>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Gas Fee</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex fontWeight={'bold'} alignItems={'center'} gap={2} p={4}><FaMotorcycle size={'25px'} />Minimum Fee<Spacer/>{gasPrice} GWEI</Flex>
            <Flex fontWeight={'bold'} alignItems={'center'} gap={2} p={4} borderTop={'solid 1px #cccccc30'}><FaSpaceShuttle size={'25px'}/>Fast<Spacer/>{fastGasPrice} GWEI</Flex>
          </ModalBody>
          <ModalFooter>
            <LinkComponent href="https://www.bitcoin.com/get-started/what-is-ETH-gas-and-how-do-fees-work-in-ethereum/">
              <Button onClick={onClose}>More Details</Button>
            </LinkComponent>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
