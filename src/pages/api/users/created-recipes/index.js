import Recipe from '@/server/Recipe'
import User from '@/server/User'
import dbConnect from '@/server/db'
import { getAuth } from '@clerk/nextjs/server'

export default async function handler(req, res) {
    const { userId } = getAuth(req)
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    let user
    await dbConnect()
    user = User.findOne({ userId })
    if (!user) {
        user = await User.create({ userId })
    }
    if (req.method === 'GET') {
        const recipes = await Recipe.find({ userId: userId })
        return res.status(200).json(recipes)
    } else {
        return res.status(405).json({ message: 'Method not allowed' })
    }
}