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
                { limit: 10, sort: { name: 'asc' } }
            )
        }

        res.status(200).json({ ingredients })
    } else if (req.method === 'POST') {
        const newIngredient = new Ingredient(req.body)
        await newIngredient.save()
        res.status(201).json(newIngredient)
    } else {
        res.status(405).json({ message: 'Method not allowed' })
    }
}
