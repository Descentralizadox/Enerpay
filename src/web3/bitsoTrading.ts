import { placeOrder, getBalance } from './bitsoApi';

// Convierte MXN a MXNB (compra MXNB)
export async function convertMxnToMxnb(mxnAmount: string, price: string) {
  // price: precio límite por MXNB (puedes obtenerlo del orderbook)
  // mxnAmount: cantidad de MXN a convertir
  // Calcula cuántos MXNB puedes comprar
  // Ejemplo: si price = 20 y mxnAmount = 200, puedes comprar 10 MXNB
  const mxnbAmount = (parseFloat(mxnAmount) / parseFloat(price)).toFixed(8);
  return placeOrder('mxnb_mxn', 'buy', mxnbAmount, price);
}

// Convierte MXNB a MXN (vende MXNB)
export async function convertMxnbToMxn(mxnbAmount: string, price: string) {
  // price: precio límite por MXNB
  return placeOrder('mxnb_mxn', 'sell', mxnbAmount, price);
}

// Helper para obtener el mejor precio de compra/venta (puedes mejorar esto con el orderbook)
export async function getBestPrice(side: 'buy' | 'sell') {
  // Aquí podrías consultar el orderbook de Bitso para obtener el mejor precio
  // Por simplicidad, puedes usar un precio fijo o consultar el endpoint de orderbook
  // Ejemplo: return '20.00';
  return '20.00';
} 