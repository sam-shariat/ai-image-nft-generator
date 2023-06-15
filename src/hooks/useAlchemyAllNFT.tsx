import { useState, useEffect } from 'react'
import { State } from 'types'
import { Alchemy, AlchemySettings, Network, NftContractNftsResponse } from "alchemy-sdk";
import { contractAddress } from 'utils/contract';
import { useAtomValue } from 'jotai';
import { networkAtom } from 'utils/config';

export function useAlchemyAllNFT() {
  const [state, setState] = useState<State<NftContractNftsResponse>>({
    loading: false,
    error: undefined,
    data: undefined,
  })
  const nftNetwork = useAtomValue(networkAtom);
  const config:AlchemySettings = {
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    network: nftNetwork.network
  };
  const alchemy = new Alchemy(config);
  useEffect(() => {
    const getNfts = async () => {
      const response = await alchemy.nft.getNftsForContract(contractAddress[nftNetwork.id],{omitMetadata:false,pageSize:10})
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
    if(!state.loading){
      getNfts()
    }
  },[nftNetwork])
  return state
}
