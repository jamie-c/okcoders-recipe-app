import dbConnect from '@/server/db'
import Recipe from '@/server/Recipe'

export default async function handler(req, res) {
    await dbConnect()
    const { keyword } = req.headers

    if (req.method === 'GET') {
        // find any recipe that has the keyword in its name or ingredients or description or tags
        const recipes = await Recipe.find({
            $or: [
                { name: { $regex: keyword, $options: 'i' } },
                { 'ingredients.name': { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } },
                { tags: { $regex: keyword, $options: 'i' } },
            ],
        })
        return res.status(200).json(recipes)
    } else {
        return res.status(405).json({ message: 'Method not allowed' })
    }
}
