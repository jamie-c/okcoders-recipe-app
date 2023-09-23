// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Ingredient from '@/server/Ingredient'
import dbConnect from '@/server/db'

export default async function handler(req, res) {
    await dbConnect()
    const { id } = req.query
    const ingredient = await Ingredient.findById(id)

    if (!ingredient) {
        res.status(404).json({ message: 'Ingredient not found' })
    }

    if (req.method === 'GET') {
        res.status(200).json({ ingredient })
    } else {
        res.status(405).json({ message: 'Method not allowed' })
    }
}
