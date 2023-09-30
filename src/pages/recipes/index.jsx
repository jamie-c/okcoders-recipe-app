import { Box, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Recipes() {
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
            pt={0}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            position="relative"
        >
            <Grid container spacing={2}>
                {loading ? (
                    <Typography>Loading...</Typography>
                ) : (
                    recipes.map((recipe) => (
                        <Grid item xs={12} sm={4} key={recipe._id}>
                            <Card style={{ height: '100%' }}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={recipe.imageUrl}
                                    alt={recipe.name}
                                />
                                <CardContent>
                                    <Link href={`/recipes/${recipe._id}`} passHref style={{ textDecoration: 'none' }}>
                                        <Typography
                                            variant="h5"
                                            style={{
                                                color: '#006400',
                                                textDecoration: 'none',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            {recipe.name}
                                        </Typography>
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
