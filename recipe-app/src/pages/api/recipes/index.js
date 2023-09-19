import dbConnect from '@/server/db'
import Recipe from '@/server/Recipe'

export default async function handler(req, res) {
    await dbConnect()
    const { maxRecipes } = req.headers

    if (req.method === 'POST') {
        const { _id } = req.body
        if (_id) {
            const recipe = await Recipe.findOneAndUpdate(
                { _id },
                { ...req.body },
                { new: true }
            )
            return res.status(200).json(recipe)
        }
        const recipe = await Recipe.create(req.body)
        return res.status(201).json(recipe)
    } else if (req.method === 'GET') {
        let recipes
        if (maxRecipes) {
            recipes = await Recipe.find(
                {},
                {},
                { limit: parseInt(maxRecipes), sort: { name: 'asc' } }
            )
        } else {
            recipes = await Recipe.find({})
        }

        return res.status(200).json(recipes)
    } else {
        return res.status(405).json({ message: 'Method not allowed' })
    }
}
