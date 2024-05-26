
import { kv } from '@vercel/kv';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { address } = req.body;
            const existingAddresses = await kv.get('user_addresses') || [];
            if (!existingAddresses.includes(address)) {
                existingAddresses.push(address);
                await kv.set('user_addresses', existingAddresses);
                res.status(200).json({ message: 'User registered successfully', address: address });
            } else {
                res.status(400).json({ message: 'User address already exists' });
            }

        } catch (error) {
            res.status(500).json({ message: 'Failed to register user', error: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}