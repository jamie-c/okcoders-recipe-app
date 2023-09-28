import { Button } from '@mui/material'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

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
