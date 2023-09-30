import SearchBar from '@/components/SearchBar'
import { Box, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Recipes() {
    const [createdRecipes, setCreatedRecipes] = useState([''])
    const [likedRecipes, setLikedRecipes] = useState([''])
    const [allRecipes, setAllRecipes] = useState([''])
    const [displayedRecipes, setDisplayedRecipes] = useState('liked')
    const [loading, setLoading] = useState(true)

    const fetchCreatedRecipes = async () => {
        setLoading(true)
        const res = await fetch('/api/users/created-recipes')
        const data = await res.json()
        setCreatedRecipes(data)
        setLoading(false)
    }

    const fetchLikedRecipes = async () => {
        setLoading(true)
        const res = await fetch('/api/users/liked-recipes')
        const data = await res.json()
        setLikedRecipes(data)
        setLoading(false)
    }

    useEffect(() => {
        fetchCreatedRecipes()
        fetchLikedRecipes()
    }, [])

    useEffect(() => {
        // Combine created and liked recipes, ensuring no duplicates
        const allRecipes = [...createdRecipes]
        if (likedRecipes.length > 0) {
            likedRecipes.forEach((likedRecipe) => {
                if (!allRecipes.find((recipe) => recipe._id === likedRecipe._id)) {
                    allRecipes.push(likedRecipe)
                }
            })
        }
        setAllRecipes(allRecipes)
    }, [createdRecipes, likedRecipes])

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
            <SearchBar />
            <Typography
                variant="h3"
                gutterBottom
                style={{
                    fontFamily: 'Comfortaa',
                    fontWeight: 'bold', // Add this line to make the text bold
                    marginTop: '50px', // Adjust the value for the desired space
                    marginBottom: '20px', // Adjust the value for the desired space
                }}
            >
                My Recipes
            </Typography>
            <Grid container spacing={2}>
                {loading && (
                    <Typography>Loading...</Typography>
                )}
                {displayedRecipes === 'all' && (
                    allRecipes.map((recipe) => (
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
                {displayedRecipes === 'created' && (
                    createdRecipes.map((recipe) => (
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
                {displayedRecipes === 'liked' && 
                    likedRecipes.map((recipe) => (
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
                }
            </Grid>
        </Box>
            )
}
