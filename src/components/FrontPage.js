import {Link,Redirect} from 'react-router-dom'
import Home from "./Home"
import { useHistory } from "react-router-dom";

export default function FrontPage() {
  const history = useHistory();
 
    return (
        <div>
        <div  className="pt-24 bg-green-300">
       <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
        <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
         
          <h1 className="my-4 text-5xl font-bold leading-tight">
            Buy,Sell and Discover NFTS ! 
          </h1>
          <p className="leading-normal text-2xl mb-8">
            From this NFT Market Place . Lets Create Now!
          </p>
          
          <button className="mx-auto lg:mx-0 hover:underline bg-green-300 text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out" onClick={() => {history.push('/create')}} >
            Create New Nft
          </button>
          
          </div>
         
          <div class="w-full md:w-3/5 py-6 text-center">
          <img class="w-full md:w-4/5 z-50" src="./nft.jpg" />
        </div>    
</div>
</div> 

      
      </div>
    )
}
