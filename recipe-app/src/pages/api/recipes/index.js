import dbConnect from '@/server/db'
import Recipe from '@/server/Recipe'

export default async function handler(req, res) {
    await dbConnect()

    if (req.method === 'POST') {
        const recipe = await Recipe.create(req.body)
        res.status(201).json(recipe)
    } else {
        const recipes = await Recipe.find({})
        res.status(200).json(recipes)
    }
}
