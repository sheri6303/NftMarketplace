import { findRenderedDOMComponentWithTag } from "react-dom/test-utils";
import Home from "../Home";
import { useHistory } from "react-router-dom";
import {useEffect} from 'react'
import { data } from "autoprefixer";
import Favourite from "../Favourite";
function AllNfts(props)
{
  const history = useHistory();
  var add1 = localStorage.getItem("name")
  const add = JSON.parse(add1);
  
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
    return (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                {
    props.data.map((nft, i) => (
        <div key={i} className="border shadow rounded-xl overflow-hidden">
          <div>
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
                </div>
          <div className="p-4">
            <p style={{ height: '64px' }} className="text-2xl font-semibold">Name : {nft.name}</p>
            <p style={{ height: '64px' }} className="text-2xl font-semibold">Category : {nft.category}</p>


            <div style={{ height: '70px', overflow: 'hidden' }}>
              <p className="text-1xl font-semibold">Description : {nft.description}</p>
            </div>
          </div>
          <div className="p-4 bg-black">
            <p className="text-2xl mb-4 font-bold text-white">{nft.price} ETH</p>
            <button className="w-full bg-green-500 text-white font-bold py-2 px-12 rounded" onClick={() => buy(nft)}>Buy</button>
            
            <button className="w-full bg-green-500 text-white font-bold py-2 px-12 rounded" onClick={() => favourites(nft)} >Add to Favourites</button>
             </div>
             
        </div>
      ))
      
    }
    </div>

  
    )
}
export default AllNfts