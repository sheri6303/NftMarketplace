import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from "web3modal"

import {
  nftmarketaddress, nftaddress
} from '../config'

import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'
import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import { useHistory } from "react-router-dom";
import Details from './categories/Details'
export default function Dashboard() {
  const [nfts, setNfts] = useState([])
  const [sold, setSold] = useState([])
  const history = useHistory();
  const [loadingState, setLoadingState] = useState('not-loaded')
  useEffect(() => {
    loadNFTs()
  }, [])
  function  CreateItemDetails(nft) {
    var id=nft.tokenId
    history.push({ 
      pathname: '/CreateItemDetails/'+id,
     });
    
  }
  function details(nft)
  {
    var id=nft.tokenId
    history.push({ 
      pathname: '/details/'+id,
     });
  }
  async function loadNFTs() {
    const web3Modal = new Web3Modal({
      network: "mainnet",
      cacheProvider: true,
    })
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
      
    const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
    const data = await marketContract.fetchItemsCreated()
    
    const items = await Promise.all(data.map(async i => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        sold: i.sold,
        image: meta.data.image,
        category:meta.data.category
      }
      return item
    }))
    /* create a filtered array of items that have been sold */
    const soldItems = items.filter(i => i.sold)
    setSold(soldItems)
    setNfts(items)
    setLoadingState('loaded') 
  }
  if (loadingState !='loaded') return (<img src="./logo.gif " style={{paddingLeft:"300px"}} /> )
  if (loadingState === 'loaded' && !nfts.length) return (<h1 className="py-10 px-20 text-3xl">No assets created</h1>)
  return (
    <div>
      <div className="p-4">
        <h1 className="text-2xl py-2">Items Created</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {
            nfts.map((nft, i) => (
              <div key={i} className="border shadow rounded-xl overflow-hidden">
              {nft.category=="image"? <img src={nft.image} className="rounded" /> :
                nft.category=="audio" ?
                    <audio 
                autoPlay={false}
                style={{  width: "100%"}} 
                className="mt-36"
                controls={true} >
               <source type="audio/mp3" src={nft.image} />
               </audio> :
               <video
               autoPlay={true}
               style={{  width: "100%"}} 
               
               controls={true} >
              <source type="audio/mp3" src={nft.image} />
              </video>
                }
                <div className="p-4 bg-black">
                  <p className="text-2xl font-bold text-white">Price - {nft.price} Eth</p>
                  <button className="font-bold mt-4 bg-blue-500 text-white rounded p-4 shadow-lg" onClick={() => CreateItemDetails(nft) } >Details</button>
                </div>
              </div>
            ))
          }
        </div>
      </div>
        <div className="px-4">
        {
          Boolean(sold.length) && (
            <div>
              <h1 className="text-2xl py-2">Items sold</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                {
                  sold.map((nft, i) => (
                    <div key={i} className="border shadow rounded-xl overflow-hidden">
                     {nft.category=="image"? <img src={nft.image} className="rounded" /> :
                nft.category=="audio" ?
                    <audio 
                autoPlay={false}
                style={{  width: "100%"}} 
                className="mt-36"
                controls={true} >
               <source type="audio/mp3" src={nft.image} />
               </audio> :
               <video
               autoPlay={true}
               style={{  width: "100%"}} 
               
               controls={true} >
              <source type="audio/mp3" src={nft.image} />
              </video>
}
                      <div className="p-4 bg-black">
                        <p className="text-2xl font-bold text-white">Price - {nft.price} Eth</p>

                        
                      </div>
                      <button className="font-bold mt-4 bg-blue-500 text-white rounded p-4 shadow-lg  " onClick={() => details(nft) }   >Details</button>
                    </div>
                  ))
                }
              </div>
            </div>
          )
        }
        </div>
    </div>
  )
}