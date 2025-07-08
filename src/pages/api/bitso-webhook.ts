import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

const BITSO_WEBHOOK_SECRET = process.env.BITSO_WEBHOOK_SECRET || '';

function verifySignature(req: NextApiRequest) {
  // Si Bitso envía una firma en headers, verifica aquí
  // const signature = req.headers['x-bitso-signature'];
  // const expected = crypto.createHmac('sha256', BITSO_WEBHOOK_SECRET).update(req.rawBody).digest('hex');
  // return signature === expected;
  return true; // Si no hay firma, omite
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  if (!verifySignature(req)) return res.status(401).json({ error: 'Invalid signature' });

  // Procesa el depósito
  const { amount, payment_id, payer_name, clabe, status } = req.body.payload || {};
  // Aquí puedes acreditar MXNB al usuario correspondiente en tu sistema

  res.status(200).json({ ok: true });
} 