import { useState, useEffect } from 'react'
import { State } from 'types'
import { Alchemy, AlchemySettings, Network, NftContractNftsResponse } from "alchemy-sdk";
import { contractAddress } from 'utils/contract';

const config:AlchemySettings = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  network: Network.ETH_GOERLI
};
const alchemy = new Alchemy(config);

export function useAlchemyAllNFT() {
  const [state, setState] = useState<State<NftContractNftsResponse>>({
    loading: false,
    error: undefined,
    data: undefined,
  })
  useEffect(() => {
    const getNfts = async () => {
      const response = await alchemy.nft.getNftsForContract(contractAddress[5],{omitMetadata:false})
      if (response.nfts) {
        setState({
          loading: false,
          error: undefined,
          data: response,
        })
        return
      } else {
        setState({
          loading: false,
          error: 'Unable to get nfts',
          data: undefined,
        })
      }
    }
    getNfts()
  },[])
  return state
}
