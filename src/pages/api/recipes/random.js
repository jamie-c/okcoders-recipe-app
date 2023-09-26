import Recipe from '@/server/Recipe'
import dbConnect from '@/server/db'

export default async function handler(req, res) {
    await dbConnect()
    const recipe = await Recipe.aggregate([{ $sample: { size: 1 } }])

    if (!recipe) {
        res.status(404).json({ message: 'Recipe was lost in transmission, please try again.' })
    }

    if (req.method === 'GET') {
        res.status(200).json({ recipe })
    } else {
        res.status(405).json({ message: 'Method not allowed' })
    }
}
