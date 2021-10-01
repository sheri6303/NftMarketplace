
import {  useEffect, useState } from 'react'
import {
  nftaddress, nftmarketaddress
} from '../config'
import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'
import AllNfts from './categories/AllNfts'
import ImageNfts from './categories/Imagenfts'
import {get,buy} from "../utils/unsoldmarketitems"
export default function Home(props) {
 
  
  const [images,setImages]=useState([])
  
  const [loadingState, setLoadingState] = useState('not-loaded')
  
  

  useEffect(() => {
    loadNFTs()
    
  }, [])
  async function loadNFTs(props) {    
    const items=await get();
       const image=items.filter(i =>i.category=="image")
        setImages(image)
        setLoadingState('loaded') 
    }
  async function buyNft(nft) {
    await buy(nft)
    loadNFTs()
  }
  if (loadingState !='loaded') return (<img src="./logo.gif " style={{paddingLeft:"300px"}} /> )
  if (loadingState === 'loaded' && !images.length) return (<h1 className="px-20 py-10 text-3xl">No Image  items in marketplace</h1>)
    return (
      <div className="flex justify-center">
        <div className="px-4" >
              <ImageNfts data={images} function={buyNft} />  
            </div>  
        </div>
        )
  }