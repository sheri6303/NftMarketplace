
import {  useEffect, useState } from 'react'
import { get,buy } from '../utils/unsoldmarketitems'
import {
  nftaddress, nftmarketaddress
} from '../config'
import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'
import AllNfts from './categories/AllNfts'

export default function Favourite(props) {
  const [favourites, setFavourites] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  const getFromLocalStorage = localStorage.getItem("name") 
  const tokenIdArray = JSON.parse(getFromLocalStorage);
 
 useEffect(() => {
  loadNFTs()
  }, [])

  async function loadNFTs() {    
    const items=await get()
    const favouriteItem=items.filter(i=>tokenIdArray.includes(i.tokenId)  )
    setFavourites(favouriteItem)
    setLoadingState('loaded') 
    }

  async function buyNft(nft) {
   await buy(nft)
    loadNFTs()
  }

  if (loadingState !='loaded' ) return (<img src="./logo.gif " style={{paddingLeft:"300px"}} /> )

  if (loadingState === 'loaded' && !favourites.length  ) return (<h1 className="px-20 py-10 text-3xl">No Favourities added yet</h1>)

    return (
      <div className="flex justify-center pt-20">
        <div className="px-4" >
          {
         <AllNfts data={favourites} function={buyNft} show={true} secondfunction={loadNFTs}/>
         }
            </div>
        </div>
        )
  }