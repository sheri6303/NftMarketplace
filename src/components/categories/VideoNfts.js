import Home from "../Home"
 function VideoNfts(props)
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
          <video
                autoPlay={false}
                style={{  width: "100%"}} 
                controls={true} >
               <source type="audio/mp3" src={nft.image} />
               </video>
          <div className="p-4">
            <p style={{ height: '64px' }} className="text-2xl font-semibold">{nft.name}</p>
            <p style={{ height: '64px' }} className="text-2xl font-semibold">Category : {nft.category}</p>

            <div style={{ height: '70px', overflow: 'hidden' }}>
              <p className="text-gray-400">{nft.description}</p>
            </div>
          </div>
          <div className="p-4 bg-black">
            <p className="text-2xl mb-4 font-bold text-white">{nft.price} ETH</p>
            <button className="w-full bg-pink-500 text-white font-bold py-2 px-12 rounded" onClick={() => buy(nft)}>Buy</button>
          </div>
        </div>
      ))
    }
    </div>
    
)
}
export default VideoNfts