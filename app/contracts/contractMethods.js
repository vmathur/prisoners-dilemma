import { abi, contractAddress } from './index'
import { web3 } from '../context/MagicProvider';


export const getGamesForAddress = async (web3, address) => {
  if (!web3 || !address) {
    throw new Error('Web3 instance or address is missing');
  }
  try{
    const contract = new web3.eth.Contract(abi, contractAddress);
    const games = await contract.methods.getAllGamesForAddress(address).call();
    return games;
  }catch(e){
    console.log(e)
    return []
  }
};
