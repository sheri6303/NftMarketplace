import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from "web3modal"
import { Modal, Button } from 'react-bootstrap'
import {
  nftmarketaddress, nftaddress
} from '../config'

import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'
import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import { useHistory } from "react-router-dom";
export default function MyAssets() {
  const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  const history = useHistory();
  useEffect(() => {
    loadNFTs()
  }, [])
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
    const data = await marketContract.fetchMyNFTs()
    
    const items = await Promise.all(data.map(async i => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        name :meta.data.name,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
        category :meta.data.category
      }
      return item
    }))
    
    console.log(items)
    setNfts(items)
    setLoadingState('loaded') 
  }
  function details(nft)
  {
    var id=nft.tokenId
    history.push({ 
      pathname: '/details/'+id,
     });
  }
  if (loadingState !='loaded') return (<img src="./logo.gif " style={{paddingLeft:"300px"}} /> )
  if (loadingState === 'loaded' && !nfts.length) return (<h1 className="py-10 px-20 text-3xl">No assets owned</h1>)
  return (
    
    <div className="flex justify-center pt-20 ">
      
      <div className="p-4">
      <h1 className="text-4xl font-bold text-green">Assets You Purchased</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {
            nfts.map((nft, i) => (
              <div key={i} className="border shadow rounded-xl overflow-hidden">
                  <div>
                {nft.category=="image"? <img src={nft.image} className="rounded" style={{height:"300px"}} /> :
                nft.category=="audio"?
                <div style={{height:"300px"}} >
                <img 
                src='vlc.png'style={{height:"300px"}} />
                   
              </div>
                     :
                <video
                autoPlay={false}
                style={{  width: "100%"}} 
                
                controls={true} >
               <source type="audio/mp3" src={nft.image} />
               </video>

}
                </div>
                <div className="p-4 ">
                  
                  <p className="text-2xl font-bold ">Price - {nft.price} Ether</p>
                  
                </div>
                <button className="font-bold mt-4 bg-blue-500 text-white rounded p-4 shadow-lg  " onClick={() => details(nft) }>Details</button>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}