import {  useEffect, useState } from 'react'
import {
  nftaddress, nftmarketaddress
} from '../config'
import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'
import AllNfts from './categories/AllNfts'
import {get,buy} from "../utils/unsoldmarketitems"
import FrontPage from './FrontPage'
import { useHistory } from "react-router-dom";

export default function Home(props) {
  const [nfts, setNfts] = useState([])
  const [music,setMusic]=useState([])
  const [images,setImages]=useState([])
  const [videos,setVideos]=useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  const [image,setimage]=useState(false)
  const [audio,setaudio]=useState(false)
  const [video,setVideo]=useState(false)
  const [allcaterory,setallcategory]=useState(true)
  const history = useHistory();



  useEffect(() => {
    loadNFTs()
    
  }, [])
  async function loadNFTs() {    
   const items=await get();
   const image=items.filter(i =>i.category=="image")
   const audio=items.filter(i =>i.category=="audio")
   const video=items.filter(i =>i.category=="video")

        setNfts(items)
        setImages(image)
        setMusic(audio)
        setLoadingState('loaded') 
        setVideos(video)
    }
  async function buyNft(nft) {
    await buy(nft)
    loadNFTs()
  }
  function onCategoryChange(e)
  {
    if (e.target.value=='category')
    {
    setallcategory(true)
    setimage(false)
    setaudio(false)
    setVideo(false)
    }
    if (e.target.value=='image')
    {
    setimage(true)
    setaudio(false)
    setVideo(false)
    setallcategory(false)
    }
    else if (e.target.value=='audio')
    {
    setallcategory(false)
    setaudio(true)
    setimage(false)
    setVideo(false)
    }
    else if (e.target.value=='video')
    {
      setVideo(true)
      setallcategory(false)
      setaudio(false)
      setimage(false)

    }


  }
  if (loadingState !='loaded') return (<img src="./logo.gif " style={{paddingLeft:"300px"}} /> )
  if (loadingState === 'loaded' && !nfts.length) return (<h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>)
    return (
      
      <div  >
      <FrontPage />
      <h1 style={{paddingTop: '70px'}} className="text-green-500">Listed all Nfts from market place by </h1>
      <select  onChange={onCategoryChange} className="mt-2 border rounded p-4 bg-green-500">
          <option value="category"  >All Categories</option>
          <option value="image"  >images</option>
          <option value="audio"  >Audios</option>
          <option value="video"  >Videos</option> 
   </select>
       <div className="flex justify-center m-8 bg-green-300">
         <div className="px-4 " >
           {image==true ? <AllNfts data={images} /> :
           audio==true ? <AllNfts data={music} />
           :allcaterory==true?
               <AllNfts data={nfts} function={buyNft} />  
               :<AllNfts data={videos} />
           }
             </div>
         </div>
         </div>   
  
  
        )
  }
  
