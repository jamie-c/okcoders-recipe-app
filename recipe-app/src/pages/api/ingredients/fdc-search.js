export default async function handler(req, res) {
    if (req.method === 'GET') {
        console.log('running fdc-search')
        const { name, maxIngredients } = req.headers
        const nameQuery = name.replace(' ', '%20')
        const maxIngredientsQuery = maxIngredients ? maxIngredients : 5
        const ingredients = await fetch(
            `https://api.nal.usda.gov/fdc/v1/foods/search?query=${nameQuery}&dataType=Foundation,SR%20Legacy&pageSize=${maxIngredientsQuery}&sortBy=dataType.keyword&sortOrder=asc&api_key=${process.env.FDC_API_KEY}`
        )
        const data = await ingredients.json()
        return res.status(200).json({ ingredients: data })
    }
}
