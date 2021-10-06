import {  useEffect, useState } from 'react'
import {
  nftaddress, nftmarketaddress
} from '../config'
import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'
import AllNfts from './categories/AllNfts'
import {getallnfts} from '../utils/allmarketitems'
import { get } from '../utils/unsoldmarketitems'
import Details from './categories/Details'
export default function CreateItemDetails(props) {
  const [createDetails, setcreateDetails] = useState([])
  const [unsoldDetails,setUnsoldDetails]=useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  const detailsData=props.match.params.id;
  const state=props.location.state
  useEffect(() => {
    loadNFTs()
    
  }, [])
  async function loadNFTs() {
    if (state==true)
    {
      const items=await get()
      const unsold= items.filter(i=>i.tokenId==detailsData)
      setUnsoldDetails(unsold)
    }
    else if (state==null)
    {
   const items=await getallnfts();
   const detail= items.filter(i=>i.tokenId==detailsData)
    setcreateDetails(detail)
    }
    setLoadingState('loaded') 
    }
  if (loadingState !='loaded') return (<img src="./logo.gif " style={{paddingLeft:"300px"}} /> )
 
    return (
      <div>
      {state==null?
        <Details data={createDetails} />
        :<Details data={unsoldDetails} />
      }
        </div>
        )
  }