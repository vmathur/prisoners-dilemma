import { kv } from '@vercel/kv';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            // Retrieve all keys (assuming user addresses are stored with a common prefix)
            const users = await kv.get('user_address');
            res.status(200).json({ users });
        } catch (error) {
            res.status(500).json({ message: 'Failed to retrieve users', error: error.message });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}