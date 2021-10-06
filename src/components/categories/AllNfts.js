import { findRenderedDOMComponentWithTag } from "react-dom/test-utils";
import Home from "../Home";
import { useHistory } from "react-router-dom";
import {useEffect, useState} from 'react'
import { data } from "autoprefixer";
import Favourite from "../Favourite";
import {Link,Redirect} from 'react-router-dom'
function AllNfts(props)
{
  const history = useHistory();
  var add1 = localStorage.getItem("name")
  const add = JSON.parse(add1);
  const [state,setstate]=useState(false)

  function detailsOfNft(nft)
  {
    history.push({
      pathname :'/CreateItemDetails/'+nft.tokenId,
      state:true
    }
      )
  }
    function buy(nft)
    {
        props.function(nft)
    }
    function favourites(nft)
    {
      if (add.indexOf(nft.tokenId)===-1)
      {
        add.push(nft.tokenId)
        alert ("Item has been added to your favourites")
      }
      else
      alert("Already added to favourites")
      localStorage.setItem("name", JSON.stringify(add));
    }
    function removefavourites(nft)
    {
      
      const index = add.indexOf(nft.tokenId);
      if (index > -1) 
      {
        add.splice(index, 1);
        localStorage.setItem("name", JSON.stringify(add))
        
        setstate(true)
      }
}

if (state==true) return (
  <div>
    <h1>Item removed from favourites </h1>
    <Link to="/" >
    <button className="w-full bg-green-500 text-white font-bold py-2 px-12 rounded"  >Return to Home</button>
    </Link>
  </div>
)
    return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 ">
    {
        props.data.map((nft, i) => (
        <div key={i} className="border shadow rounded-xl overflow-hidden" >
         
                {nft.category=="image" || props.data=='images'? <img src={nft.image} className="rounded" style={{height:"300px"}} /> :
                nft.category=="audio" || props.data=='music'?
                <div style={{height:"300px"}} >
                <img 
                src='vlc.png'style={{height:"300px"}} />
                    <audio
                autoPlay={false}
                style={{  width: "100%"}} 
                className="mt-60"
                controls={true} >
               <source type="audio/mp3" src={nft.image} />
               </audio> 
               </div>
               :
               <video 
               autoPlay={true}
               style={{  width: "100%"}}
               className="mt-20"
               controls={true} >
              <source type="video/mp4" src={nft.image} />
              </video>
              }
              
            <button className="w-full bg-green-500 text-white font-bold py-2 px-12 rounded" onClick={() => detailsOfNft(nft)}>See Details</button>
            <button className="w-full bg-green-500 text-white font-bold py-2 px-12 rounded" onClick={() => buy(nft)}>Buy</button>
            
            {props.show==null?
            <button className="w-full bg-green-500 text-white font-bold py-2 px-12 rounded" onClick={() => favourites(nft)} >Add to  favourites</button>
            :props.show==true?<button className="w-full bg-green-500 text-white font-bold py-2 px-12 rounded" onClick={() => removefavourites(nft)} >Remove From Favourites</button>
            :null
              }
          
         
             
        </div>
      ))
      
    }
    </div>
    )
  }
export default AllNfts