import dbConnect from '@/server/db'
import Recipe from '@/server/Recipe'

export default async function handler(req, res) {
    await dbConnect()
    const { maxRecipes } = req.headers

    if (req.method === 'POST') {
        const recipe = await Recipe.create(req.body)
        res.status(201).json(recipe)
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

        res.status(200).json(recipes)
    } else {
        res.status(405).json({ message: 'Method not allowed' })
    }
}
