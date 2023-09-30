import { Button } from '@mui/material'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const FeelingHungryButton = () => {
    const [recipe, setRecipe] = useState('')
    const [loading, setLoading] = useState(true)

    const fetchRandomRecipe = async () => {
        setLoading(true)
        const res = await fetch('/api/recipes/random')
        const data = await res.json()
        setRecipe(data.recipe[0]._id)
        setLoading(false)
    }

    useEffect(() => {
        fetchRandomRecipe()
    }, [])

    return (
        <div>
            {' '}
            <Link href={`/recipes/${recipe}`} passHref onClick={fetchRandomRecipe}>
                <Button
                    disabled={loading}
                    variant="contained"
                    color="primary"
                    style={{ 
                        borderRadius: '50px',
                        position: 'fixed',
                        bottom: '40px',
                        right: '50px'
                    }}
                >
                    I'm Feeling Hungry
                </Button>
            </Link>
        </div>
    )
}

export default FeelingHungryButton
