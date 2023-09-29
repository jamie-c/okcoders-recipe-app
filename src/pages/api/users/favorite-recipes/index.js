import dbConnect from '@/server/db'
import User from '@/server/User'
import { getAuth } from '@clerk/nextjs/server'

export default async function handler(req, res) {
    const { userId } = getAuth(req)
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const { 'liked-recipe-id': likedRecipeId, add } = req.headers
    await dbConnect()

    let user
    user = await User.findOne({ userId })

    if (!user) {
        user = await User.create({ userId, likedRecipes: [likedRecipeId] })
    }

    if (req.method === 'GET') {
        return res.status(200).json(user)
    } else if (req.method === 'POST') {
        if (!likedRecipeId) {
            return res.status(400).json({ message: 'Missing recipe ID' })
        }
        if (user.likedRecipes.includes(likedRecipeId)) {
            if (add === 'false') {
                user.likedRecipes = user.likedRecipes.filter(
                    (id) => id !== likedRecipeId
                )
                await user.save()
                return res.status(200).json(user)
            }
            return res.status(200).json(user)
        }
        if (add === 'false') {
            return res.status(200).json(user)
        }
        user.likedRecipes.push(likedRecipeId)
        await user.save()
        return res.status(200).json(user)
    } else {
        return res.status(405).json({ message: 'Method not allowed' })
    }
}
