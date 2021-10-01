
import {  useEffect, useState } from 'react'
import {get,buy} from '../utils/unsoldmarketitems'
import{
  nftaddress, nftmarketaddress
} from '../config'
import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'
import AllNfts from './categories/AllNfts'
export default function Search(props) {
     
    const searchData=props.match.params.id;
    console.log(searchData)
  const [Search,setSearch]=useState([])
  
  const [loadingState, setLoadingState] = useState('not-loaded')
  
  

  useEffect(() => {
    loadNFTs()
    
  }, [])
  async function loadNFTs(props) {    
   const items=await get()
     const search= items.filter(i=>i.name==searchData)
     console.log(search.length)
        setSearch(search)
        setLoadingState('loaded') 
    }
  async function buyNft(nft) {
    await buy(nft)
    loadNFTs()
  }
  if (loadingState === 'loaded' && !Search.length) return (<h1 className="px-20 py-10 text-3xl">No item found with name {searchData} in the  marketplace</h1>)
    return (
      <div className="flex justify-center">
        <div className="px-4" >
              <AllNfts data={Search} function={buyNft} />  
            </div>
        </div>
        )
  }