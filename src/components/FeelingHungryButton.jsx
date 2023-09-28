// components/FeelingHungryButton.js

import { Button } from '@mui/material'
import Link from 'next/link'

const FeelingHungryButton = () => {
    return (
        <Link href="/api/recipes/random" passHref>
            <Button variant="contained" color="primary">
                I'm Feeling Hungry
            </Button>
        </Link>
    )
}

export default FeelingHungryButton
