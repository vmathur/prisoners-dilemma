import { kv } from '@vercel/kv';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const users = await kv.lrange('users', 0, -1);
            res.status(200).json({ users });
        } catch (error) {
            res.status(500).json({ message: 'Failed to retrieve users', error: error.message });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}