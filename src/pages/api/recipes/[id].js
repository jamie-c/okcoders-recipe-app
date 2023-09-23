// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Recipe from '@/server/Recipe'
import dbConnect from '@/server/db'

export default async function handler(req, res) {
    await dbConnect()
    const { id } = req.query
    const recipe = await Recipe.findById(id)

    if (!recipe) {
        res.status(404).json({ message: 'Recipe not found' })
    }

    if (req.method === 'GET') {
        res.status(200).json({ recipe })
    } else {
        res.status(405).json({ message: 'Method not allowed' })
    }
}
