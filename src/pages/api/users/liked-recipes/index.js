import Recipe from '@/server/Recipe'
import User from '@/server/User'
import dbConnect from '@/server/db'
import { getAuth } from '@clerk/nextjs/server'

export default async function handler(req, res) {
    const { userId } = getAuth(req)
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    await dbConnect()
    const user = await User.findOne({ userId })
    const userJson = user.toJSON()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }
    if (req.method === 'GET') {
        // find all recipes that have been liked by the user
        // the user's liked recipes are stored in the user object as an array of recipe IDs
        // we can use the $in operator to find all recipes where the _id is in the user's liked recipes array
        const recipes = await Recipe.find({ _id: { $in: userJson.likedRecipes } })
        return res.status(200).json(recipes)
    } else {
        return res.status(405).json({ message: 'Method not allowed' })
    }
}