import React from 'react'
import {
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
import { LinkComponent } from '../Link/LinkComponent'


/**
 * @notice GasFee component is aReact component that displays a Gas Fee.
 * It uses the useNetwork() and useFeeData() hooks to retrieve data about the current chain and fee data, respectively.
 * The gasPrice and fastGasPrice variables are calculated from the data retrieved from useFeeData().
 * The component displays a button with an icon and the gas price, which when clicked opens a modal containing more details about the gas fee.
 * The modal contains two Flex components displaying the minimum fee and fast fee, respectively.
 * There is also a button with a link to more details about ETH gas fees.
 *
 * @returns {JSX.Element} - A Button with an Icon And a Text showing gasPrice, which when clicked opens a modal containing more details about the gas fee.
 */

export function GasFee() {
  const { chain } = useNetwork()
  const { data } = useFeeData({ chainId: chain?.id })
  const { isOpen, onOpen, onClose } = useDisclosure()
  const gasPrice = Math.round(Number(data?.formatted.gasPrice) / 1e9)
  const fastGasPrice = Math.round(Number(data?.formatted.maxFeePerGas) / 1e9)
  console.log(data)
  if (!data) return null

  return (
    <>
      <Button
        onClick={onOpen}
        colorScheme='white'
        display="flex"
        variant={"ghost"}
        flexDirection="row"
        gap={2}
        p={2}
        justifyItems="center">
        <FaGasPump />
        <Text fontSize="xs" fontWeight={'bold'}>
          {gasPrice}
        </Text>
      </Button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Gas Fee</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex fontWeight={'bold'} alignItems={'center'} gap={2} p={4}>
              <FaMotorcycle size={'25px'} />
              Minimum Fee
              <Spacer />
              {gasPrice} GWEI
            </Flex>
            <Flex
              fontWeight={'bold'}
              alignItems={'center'}
              gap={2}
              p={4}
              borderTop={'solid 1px #cccccc30'}>
              <FaSpaceShuttle size={'25px'} />
              Fast
              <Spacer />
              {fastGasPrice} GWEI
            </Flex>
          </ModalBody>
          <ModalFooter>
            <LinkComponent label='More Details About Fees' href="https://www.bitcoin.com/get-started/what-is-ETH-gas-and-how-do-fees-work-in-ethereum/">
              <Button onClick={onClose}>More Details</Button>
            </LinkComponent>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
