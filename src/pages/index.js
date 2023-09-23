import { Stack } from '@mui/material'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home() {
    const [recipes, setRecipes] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchRecipes = async () => {
        setLoading(true)
        const res = await fetch('/api/recipes', {
            headers: {
                maxRecipes: 10,
            },
        })
        const data = await res.json()
        setRecipes(data)
        setLoading(false)
    }

    useEffect(() => {
        fetchRecipes()
    }, [])

    return (
        <>
            <h1>Home</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <Stack>
                    {recipes?.map((recipe) => (
                        <Link
                            style={{
                                textDecoration: 'none',
                                color: '#010b8b',
                            }}
                            href={`/recipes/${recipe._id}`}
                            key={recipe._id}
                        >
                            {recipe.name}
                        </Link>
                    ))}
                </Stack>
            )}
        </>
    )
}
