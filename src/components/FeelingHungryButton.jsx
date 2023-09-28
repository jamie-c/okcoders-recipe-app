import { Button } from '@mui/material'
import Link from 'next/link'
import styles from '/Users/karencampbell/okcoders-recipe-app/src/styles/Home.module.css' // Import your CSS module

const FeelingHungryButton = () => {
    return (
        <div className={styles.FeelingHungryButtonWrapper}>
            {' '}
            {/* Use a class from your CSS module */}
            <Link href="/api/recipes/random" passHref>
                <Button
                    variant="contained"
                    color="primary"
                    className={styles.FeelingHungryButton} // Use a class from your CSS module
                >
                    I'm Feeling Hungry
                </Button>
            </Link>
        </div>
    )
}

export default FeelingHungryButton
