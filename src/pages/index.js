import SearchBar from '@/components/SearchBar'
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
            {loading ? (
                <p>Loading...</p>
            ) : (
                <Stack
                    sx={{
                        px: { xs: 2, sm: 8, md: 20 },
                    }}
                >
                    <h1>Home</h1>
                    <SearchBar />
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
