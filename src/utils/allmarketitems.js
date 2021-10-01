import Web3Modal from "web3modal";
import {ethers} from "ethers";
import axios  from "axios";
import {nftaddress,nftmarketaddress} from "../config"
import NFT from "../artifacts/contracts/NFT.sol/NFT.json"
import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json"
export async function getallnfts() {
    const provider = new ethers.providers.JsonRpcProvider(
        "https://ropsten.infura.io/v3/a51c823196444327b28c3cca52344975"
    );
  const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
  const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, provider)
  const data = await marketContract.fetchAllMarketItems()
  const items = await Promise.all(data.map(async i => {
    const tokenUri = await tokenContract.tokenURI(i.tokenId)
    const meta = await axios.get(tokenUri)
    let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
    let item = {
      price,
      tokenId: i.tokenId.toNumber(),
      seller: i.seller,
      owner: i.owner,
      image: meta.data.image,
      name: meta.data.name,
      description: meta.data.description,
      category: meta.data.category
    }
    
    return item
  
  }))
  return items;
}