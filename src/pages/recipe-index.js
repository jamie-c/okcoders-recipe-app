// Import necessary modules and styles
import { Stack, Typography } from '@mui/material'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from '../styles/Recipe-Index.module.css' // Correct the import path

export default function RecipeIndex() {
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

        // Sort recipes alphabetically by name
        const sortedRecipes = data.sort((a, b) => a.name.localeCompare(b.name))
        setRecipes(sortedRecipes)
        setLoading(false)
    }

    useEffect(() => {
        fetchRecipes()
    }, [])

    // Function to group recipes by the first letter of their name
    const groupRecipesByLetter = () => {
        const groupedRecipes = {}
        recipes.forEach((recipe) => {
            const firstLetter = recipe.name.charAt(0).toUpperCase()
            if (!groupedRecipes[firstLetter]) {
                groupedRecipes[firstLetter] = []
            }
            groupedRecipes[firstLetter].push(recipe)
        })
        return groupedRecipes
    }

    const groupedRecipes = groupRecipesByLetter()

    return (
        <div className={styles.container}>
            <h1 className={styles.recipeIndexTitle}>Recipe Index</h1>
            {loading ? (
                <p className={styles.loadingMessage}>Loading...</p>
            ) : (
                <>
                    {Object.keys(groupedRecipes).map((letter) => (
                        <div key={letter} className={styles.recipeGroup}>
                            <Typography
                                variant="h4"
                                className={styles.recipeLetter}
                            >
                                {letter}
                            </Typography>
                            <Stack>
                                {groupedRecipes[letter].map((recipe) => (
                                    <Link
                                        href={`/recipes/${recipe._id}`}
                                        key={recipe._id}
                                        className={styles.recipeLink}
                                    >
                                        {recipe.name}
                                    </Link>
                                ))}
                            </Stack>
                        </div>
                    ))}
                </>
            )}
        </div>
    )
}
