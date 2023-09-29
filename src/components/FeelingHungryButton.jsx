import { Button } from '@mui/material'
import Link from 'next/link'

const FeelingHungryButton = () => {
    return (
        <div>
            {' '}
            <Link href="/api/recipes/random" passHref>
                <Button
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
