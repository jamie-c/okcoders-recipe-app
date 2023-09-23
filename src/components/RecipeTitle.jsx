import { Typography } from '@mui/material'

const RecipeTitle = ({ children }) => (
    <div
        style={{
            position: 'relative',
            width: '100%',
            margin: '30px 0 0 0',
        }}
    >
        <Typography
            variant="h2"
            fontWeight="bold"
            fontStyle="italic"
            textTransform="uppercase"
        >
            {children}
        </Typography>
    </div>
)

export default RecipeTitle
