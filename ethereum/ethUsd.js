//OM NAMO NARAYANA
import web3 from './web3';
import PriceConsumerV3 from './build/contracts/PriceConsumerV3.json';

const instance = new web3.eth.Contract(
	PriceConsumerV3.abi,
	//address of PriceConsumer here
	'0xCa0e2512e9Ea6f425a66d24a53e11d6c75b1c1bf'
	);

console.log(instance);

export default instance;
