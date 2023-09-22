// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Ingredient from '@/server/Ingredient'
import dbConnect from '@/server/db'

export default async function handler(req, res) {
    await dbConnect()
    const { name } = req.headers

    if (req.method === 'GET') {
        let ingredients
        if (name) {
            ingredients = await Ingredient.find(
                // return items that have a name that contains the name query
                { name: { $regex: name, $options: 'i' } },
                { name: true, fdcId: true },
                { limit: 10, sort: { name: 'asc' } }
            )
        } else {
            ingredients = await Ingredient.find(
                {},
                { name: true, fdcId: true },
                { sort: { name: 'asc' } }
            )
        }

        return res.status(200).json({ ingredients })
    } else if (req.method === 'POST') {
        const { name, fdcId } = req.body

        const existingIngredient = await Ingredient.findOne({ fdcId })

        if (existingIngredient) {
            const { _id, name, fdcId } = existingIngredient
            return res.status(409).json({
                message: 'Ingredient already exists',
                _id,
                name,
                fdcId,
            })
        }
        const newIngredient = new Ingredient(req.body)
        await newIngredient.save()
        return res.status(201).json(newIngredient)
    } else {
        return res.status(405).json({ message: 'Method not allowed' })
    }
}
