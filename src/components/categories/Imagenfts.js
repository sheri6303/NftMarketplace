import { data } from 'autoprefixer'
import React from 'react'
import { useState } from 'react'
import Home from '../Home'
 function ImageNfts(props)
{
    function buy(nft)
    {
        props.function(nft)
    }

    return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                {
    props.data.map((nft, i) => (
        <div key={i} className="border shadow rounded-xl overflow-hidden">
          <img src={nft.image} />
          <div className="p-4">
            <p style={{ height: '64px' }} className="text-2xl font-semibold">Name : {nft.name}</p>
            <p style={{ height: '64px' }} className="text-2xl font-semibold">Category : {nft.category}</p>

            <div style={{ height: '70px', overflow: 'hidden' }}>
              <p className="text-1xl font-semibold ">Description : {nft.description}</p>
            </div>
          </div>
          <div className="p-4 bg-black">
            <p className="text-2xl mb-4 font-bold text-white">{nft.price} ETH</p>
            <button className="w-full bg-pink-500 text-white font-bold py-2 px-12 rounded" onClick={() => buy(nft)}>Buy Now</button>
          </div>
        </div>
      ))
    }
    </div>
    
)
}
export default ImageNfts