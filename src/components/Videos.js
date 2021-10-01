
import {  useEffect, useState } from 'react'
import { get,buy } from '../utils/unsoldmarketitems'
import {
  nftaddress, nftmarketaddress
} from '../config'
import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'
import VideoNfts from './categories/VideoNfts'
export default function Video(props) {
 
  
  const [Video,setVideo]=useState([])
  
  const [loadingState, setLoadingState] = useState('not-loaded')
  
  

  useEffect(() => {
    loadNFTs()
    
  }, [])
  async function loadNFTs(props) {    
    const items=await get()
    const video=items.filter(i =>i.category=="video")
        setVideo(video)
        setLoadingState('loaded') 
    }
  async function buyNft(nft) {
    await buy(nft)
    loadNFTs()
  }
  if (loadingState !='loaded') return (<img src="./logo.gif " style={{paddingLeft:"300px"}} /> )
  if (loadingState === 'loaded' && !Video.length) return (<h1 className="px-20 py-10 text-3xl">No Video items in marketplace</h1>)
    return (
      <div className="flex justify-center">
        <div className="px-4" >
              <VideoNfts data={Video} function={buyNft} />  
            </div>
        </div>
        )
  }