import CheckIcon from '@mui/icons-material/Check'
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Grid,
    Stack,
    Typography,
} from '@mui/material'
import ToggleButton from '@mui/material/ToggleButton'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Recipes() {
    const [createdRecipes, setCreatedRecipes] = useState([''])
    const [likedRecipes, setLikedRecipes] = useState([''])
    const [allRecipes, setAllRecipes] = useState([''])
    const [displayedRecipes, setDisplayedRecipes] = useState('all')
    const [loading, setLoading] = useState(true)
    const [createdSelected, setCreatedSelected] = useState(true)
    const [likedSelected, setLikedSelected] = useState(true)

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

    // if createdSelected is true an likedSelected is true, display all recipes
    // if createdSelected is true and likedSelected is false, display created recipes
    // if createdSelected is false and likedSelected is true, display liked recipes
    // if createdSelected is false and likedSelected is false, display no recipes
    useEffect(() => {
        if (createdSelected && likedSelected) {
            setDisplayedRecipes('all')
        }
        if (createdSelected && !likedSelected) {
            setDisplayedRecipes('created')
        }
        if (!createdSelected && likedSelected) {
            setDisplayedRecipes('liked')
        }
        if (!createdSelected && !likedSelected) {
            setDisplayedRecipes('none')
        }
    }, [createdSelected, likedSelected])

    useEffect(() => {
        // Combine created and liked recipes, ensuring no duplicates
        const allRecipes = [...createdRecipes]
        if (likedRecipes.length > 0) {
            likedRecipes.forEach((likedRecipe) => {
                if (
                    !allRecipes.find((recipe) => recipe._id === likedRecipe._id)
                ) {
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
            <Typography
                mt={8}
                variant="h3"
                style={{
                    fontWeight: 'bold', // Add this line to make the text bold
                }}
            >
                My Recipes
            </Typography>
            <Stack
                sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
                gap={1}
                alignItems="center"
                my={8}
            >
                <ToggleButton
                    value="check"
                    selected={createdSelected}
                    onChange={() => {
                        setCreatedSelected(!createdSelected)
                        setDisplayedRecipes('created')
                    }}
                >
                    <CheckIcon /> Show Created Recipes
                </ToggleButton>

                <ToggleButton
                    value="check"
                    selected={likedSelected}
                    onChange={() => {
                        setLikedSelected(!likedSelected)
                        setDisplayedRecipes('liked')
                    }}
                >
                    <CheckIcon /> Show Liked Recipes
                </ToggleButton>
            </Stack>

            <Grid container spacing={2}>
                {loading && <Typography>Loading...</Typography>}
                {displayedRecipes === 'all' &&
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
                                    <Link
                                        href={`/recipes/${recipe._id}`}
                                        passHref
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <Typography
                                            variant="h5"
                                            style={{
                                                color: '#341900',
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
                    ))}
                {displayedRecipes === 'created' &&
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
                                    <Link
                                        href={`/recipes/${recipe._id}`}
                                        passHref
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <Typography
                                            variant="h5"
                                            style={{
                                                color: '#341900',
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
                    ))}
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
                                    <Link
                                        href={`/recipes/${recipe._id}`}
                                        passHref
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <Typography
                                            variant="h5"
                                            style={{
                                                color: '#341900',
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
                    ))}
            </Grid>
        </Box>
    )
}
