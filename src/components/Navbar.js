import { data } from 'autoprefixer';
import React, { useState } from 'react';
import {Link,Redirect} from 'react-router-dom'
import { useHistory } from "react-router-dom";
import Home from './Home';
function Navbar() {
    const [searchField , setSearchField]=useState("")
    const history = useHistory();
    const [dropdown ,setdropdown] =useState(false)
    function  onchangehandle(event)
    {
     setSearchField(event.target.value);  
   }
   function searchNfts (){
     if (searchField=="")
     {
      alert ("Please enter name of nft to search")
      
    }
     else 
     {
       let path='/search/'+searchField
       history.push({ 
        pathname: path,
       });
       setSearchField("")
     }
   }
   function showcategory()
   {
     setdropdown(true)
   }
   function hidecategory()
   {
     setdropdown(false)
   }
  return (
<div>
      <nav className="fixed w-full   top-0 inset-x-0 z-50 h-16 text-white bg-green-800 font-medium flex justify-between items-center shadow-lg" >
      <Link to="/">
          <a className='inline-flex items-center  '>
            <svg
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
              className='fill-current text-white h-8 w-8 mr-2'
            >
              <path d='M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z' />
            </svg>
            <span className='text-xl text-white font-bold uppercase tracking-wide'>
              NFT Marketplace
            </span>
          </a>
          </Link>
          <Link to="/">
            <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-green-600 hover:text-white">
              Home
            </a>
         </Link>
         <Link to="/create">
            <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-green-600 hover:text-white">
              Sell  Asset
            </a>
       </Link>
       <Link to="/myassets">
            <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-green-600 hover:text-white">
              My  Assets
            </a>
          </Link>
          <Link to="/dashboard">
            <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-green-600 hover:text-white">
              Creator Dashboard
            </a>
            </Link>
            <Link to="/favourite">
            <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-green-600 hover:text-white">
             Favourites
            </a>
          </Link>

          <div className="dropdown">
    
    <div class="relative inline-block text-left" onMouseEnter={showcategory} onMouseLeave={hidecategory}>
  
       <Link to="">
      <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-green-600 hover:text-white">
      Categories
  </a>
  </Link>
  

  {dropdown ? <div className=" origin-top-right absolute right-0  w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
    <div className="py-1 bg-green-800" role="none">
      <Link to="/images">
      <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-green-600 hover:text-white">Images</a>
      </Link>
      <Link   to="/audios" >
      <a  className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-green-600 hover:text-white">Audios</a>
      </Link>
      <Link to="/videos" >
      <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-green-600 hover:text-white">Videos</a>
      </Link>
    </div>
  </div> : null
}
</div>
</div>

<div className="shadow flex">
    <input className="w-full rounded p-2 text-black" type="text" placeholder="Search by nft name "  onChange={onchangehandle}/>
    <button className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-green-600 hover:text-white" onClick={searchNfts} >
        Search
    </button>
</div>

      </nav>     
    </div>
  );
}
export default Navbar
