import { ethers } from 'ethers';

// Cambia estas direcciones cuando tengas los contratos desplegados
type EnerPayConfig = {
  mxnbAddress: string;
  enerpayAddress: string;
  provider: ethers.providers.Web3Provider;
};

// ABI mínimo ERC20
export const ERC20_ABI = [
  'function approve(address spender, uint256 amount) public returns (bool)',
  'function allowance(address owner, address spender) public view returns (uint256)',
  'function balanceOf(address account) public view returns (uint256)'
];

// ABI mínimo EnerPay
export const ENERPAY_ABI = [
  'function payService(string rpu, string serviceType, uint256 amount, string company) external',
  'function payMultipleServices(string[] rpus, string[] serviceTypes, uint256[] amounts, string company) external'
];

export async function approveMXNB(config: EnerPayConfig, amount: ethers.BigNumberish) {
  const signer = config.provider.getSigner();
  const mxnb = new ethers.Contract(config.mxnbAddress, ERC20_ABI, signer);
  return mxnb.approve(config.enerpayAddress, amount);
}

export async function payService(config: EnerPayConfig, rpu: string, serviceType: string, amount: ethers.BigNumberish, company: string) {
  const signer = config.provider.getSigner();
  const enerpay = new ethers.Contract(config.enerpayAddress, ENERPAY_ABI, signer);
  return enerpay.payService(rpu, serviceType, amount, company);
}

export async function payMultipleServices(config: EnerPayConfig, rpus: string[], serviceTypes: string[], amounts: ethers.BigNumberish[], company: string) {
  const signer = config.provider.getSigner();
  const enerpay = new ethers.Contract(config.enerpayAddress, ENERPAY_ABI, signer);
  return enerpay.payMultipleServices(rpus, serviceTypes, amounts, company);
} 