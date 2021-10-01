import {  useEffect, useState } from 'react'
import {
  nftaddress, nftmarketaddress
} from '../config'
import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'
import AllNfts from './categories/AllNfts'
import {get,buy} from "../utils/unsoldmarketitems"
export default function Home(props) {
  const [nfts, setNfts] = useState([])
  const [music,setMusic]=useState([])
  const [images,setImages]=useState([])
  const [videos,setVideos]=useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  const [search,setsearch]=useState([])
  

  useEffect(() => {
    loadNFTs()
    
  }, [])
  async function loadNFTs() {    
   const items=await get();
        setNfts(items)
        console.log(items)
        setLoadingState('loaded') 
    }
  async function buyNft(nft) {
    await buy(nft)
    loadNFTs()
  }
  if (loadingState !='loaded') return (<img src="./logo.gif " style={{paddingLeft:"300px"}} /> )
  if (loadingState === 'loaded' && !nfts.length) return (<h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>)
    return (
      <div className="flex justify-center m-8">
        <div className="px-4" >
              <AllNfts data={nfts} function={buyNft} />  
            </div>
        </div>
        )
  }
  
