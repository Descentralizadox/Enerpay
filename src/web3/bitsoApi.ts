import axios from 'axios';
import crypto from 'crypto';

const BITSO_API_KEY = process.env.BITSO_API_KEY!;
const BITSO_API_SECRET = process.env.BITSO_API_SECRET!;
const BITSO_BASE_URL = 'https://api.bitso.com';

function getAuthHeaders(httpMethod: string, endpoint: string, body: any = '') {
  const nonce = Date.now() * 1000;
  const requestBody = typeof body === 'string' ? body : JSON.stringify(body || {});
  const message = `${nonce}${httpMethod}${endpoint}${requestBody}`;
  const signature = crypto.createHmac('sha256', BITSO_API_SECRET).update(message).digest('hex');

  return {
    'Authorization': `Bitso ${BITSO_API_KEY}:${nonce}:${signature}`,
    'Content-Type': 'application/json'
  };
}

export async function createClabe(label: string) {
  const endpoint = '/spei/v1/clabes';
  const url = `${BITSO_BASE_URL}${endpoint}`;
  const body = { label };
  const headers = getAuthHeaders('POST', endpoint, body);
  const response = await axios.post(url, body, { headers });
  return response.data;
}

export async function createOneTimePayment(payment_id: string, amount: string, payer_name: string) {
  const endpoint = '/spei/v1/payments';
  const url = `${BITSO_BASE_URL}${endpoint}`;
  const body = { payment_id, amount, payer_name };
  const headers = getAuthHeaders('POST', endpoint, body);
  const response = await axios.post(url, body, { headers });
  return response.data;
}

export async function getBalance(currency: string = 'mxn') {
  const endpoint = '/v3/balance/';
  const url = `${BITSO_BASE_URL}${endpoint}`;
  const headers = getAuthHeaders('GET', endpoint);
  const response = await axios.get(url, { headers });
  const balance = response.data.balances.find((b: any) => b.currency === currency);
  return balance ? balance.total : '0';
}

export async function placeOrder(book: string, side: 'buy' | 'sell', amount: string, price: string) {
  const endpoint = '/v3/orders/';
  const url = `${BITSO_BASE_URL}${endpoint}`;
  const body = { book, side, type: 'limit', major: amount, price };
  const headers = getAuthHeaders('POST', endpoint, body);
  const response = await axios.post(url, body, { headers });
  return response.data;
} 