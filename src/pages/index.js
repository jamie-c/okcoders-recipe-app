import SearchBar from '@/components/SearchBar'
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Grid,
    Typography
} from '@mui/material'
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
        <Box
            p={2}
            pt={8}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            position="relative"
        >
            <SearchBar />
            <Typography
                variant="h3"
                gutterBottom
                style={{
                    fontFamily: 'Comfortaa',
                    marginTop: '100px',
                }}
            >
                Featured Recipes
            </Typography>
            <Grid container spacing={2}>
                {loading ? (
                    <Typography>Loading...</Typography>
                ) : (
                    recipes.slice(0, 3).map((recipe) => (
                        <Grid item xs={12} sm={4} key={recipe._id}>
                            <Card style={{ height: '100%' }}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={recipe.imageUrl}
                                    alt={recipe.name}
                                />
                                <CardContent>
                                    <Typography
                                        variant="h5"
                                        style={{ fontFamily: 'Comfortaa' }}
                                    >
                                        {recipe.name}
                                    </Typography>
                                    <Link href={`/recipes/${recipe._id}`}>
                                        View Recipe
                                    </Link>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                )}
            </Grid>
        </Box>
    )
}
