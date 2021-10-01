
import {  useEffect, useState } from 'react'
import { get,buy } from '../utils/unsoldmarketitems'
import {
  nftaddress, nftmarketaddress
} from '../config'
import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'
import AllNfts from './categories/AllNfts'
export default function Favourite(props) {
  const [fav, setfav] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  var add1 = localStorage.getItem("name")
  const add = JSON.parse(add1);
 
 useEffect(() => {
  loadNFTs()
  
}, [])
  async function loadNFTs(props) {    
    const items=await get()
    const favo=items.filter(i=>add.includes(i.tokenId)  )
    setfav(favo)
    console.log(favo)
        setLoadingState('loaded') 
    }
  async function buyNft(nft) {
   await buy(nft)
    loadNFTs()
  }
  if (loadingState !='loaded' ) return (<img src="./logo.gif " style={{paddingLeft:"300px"}} /> )
  if (loadingState === 'loaded' && !fav.length  ) return (<h1 className="px-20 py-10 text-3xl">No Favourities added</h1>)
    return (
      <div className="flex justify-center">
        <div className="px-4" >
          {
         <AllNfts data={fav} function={buyNft} state={true} />
           
        }
            </div>
        </div>
        )
  }