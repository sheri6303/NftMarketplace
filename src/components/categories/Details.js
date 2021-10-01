import { findRenderedDOMComponentWithTag } from "react-dom/test-utils";
import CreateItemDetails from "../CreateItemDetails";
import SoldItemDetails from "../SoldItemDetails";
import { useHistory } from "react-router-dom";
import {useEffect} from 'react'
import { data } from "autoprefixer";
import Favourite from "../Favourite";
export default function Details(props)
{
  
  
    return (
        <section class="text-gray-700 body-font overflow-hidden bg-white">
        {
          props.data.map((nft, i) => (
      <div key={i} class="container px-5 py-24 mx-auto">
        
        <div  class="lg:w-4/5 mx-auto flex flex-wrap">
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
          <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">Name Of Nft :  {nft.name}</h1>
            <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">Category   : {nft.category}</h1>
            <h1 class="text-gray-900 text-2xl title-font font-medium mb-1">Owner Address   : {nft.owner}</h1>
    
            
            <p class="leading-relaxed " >Description : {nft.description} </p>
            
            <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
            </div>
            <div class="flex">
              <span class="title-font font-medium text-2xl text-gray-900">Price- {nft.price} ETH</span>
              
            </div>
          </div>
        </div>
          
      </div>
      ))}
    </section>
  
    )
}