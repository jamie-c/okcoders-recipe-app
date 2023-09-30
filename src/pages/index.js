import FeelingHungryButton from '@/components/FeelingHungryButton'
import SearchBar from '@/components/SearchBar'
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Grid,
    Typography,
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
            pt={0}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="90vh"
            position="relative"
        >
            <Box
                display="flex"
                alignItems="center"
                flexDirection="column"
            >
                <img src="/cookbookio icon.png" alt="Cookbookio Icon" style={{ width: '60px' }} />
                <Typography variant='h1'
                    style={{
                        fontSize: '70px'
                    }}
                >
                    cookbook.io
                </Typography>
            </Box>
            <FeelingHungryButton />
            <Box
                style={{
                    marginTop: '50px',
                    display: 'flex',
                    minWidth: '50%', // Initially set to full width
                }}
            >
                <SearchBar />
            </Box>
            <box
                style={{
                    display: 'flex',
                    minWidth: '80%',
                    margin: '50px',
                    backgroundColor: '#F0F0F0',
                    padding: '20px',
                    borderRadius: '10px',
                    alignItems: 'center',
                    flexDirection: 'column',
                    textAlign: 'center',
                }}>
                <Typography
                    variant="h2"
                    gutterBottom
                    style={{
                        fontSize: '30px',
                        fontWeight: 'bold', // Add this line to make the text bold
                        marginBottom: '20px', // Adjust the value for the desired space
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
                                        <Link href={`/recipes/${recipe._id}`} passHref style={{ textDecoration: 'none' }}>
                                            <Typography
                                                variant="h5"
                                                style={{
                                                    color: '#006400',
                                                    textDecoration: 'none', // Remove underlines
                                                    cursor: 'pointer', // Show pointer cursor on hover
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
            </box>
        </Box>
    )
}
