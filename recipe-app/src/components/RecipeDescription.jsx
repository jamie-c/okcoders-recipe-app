import { Typography } from '@mui/material'

const RecipeDescription = ({ children }) => (
    <div
        style={{
            position: 'relative',
            width: '100%',
            margin: '30px 0',
        }}
    >
        <Typography variant="subtitle1" fontStyle="italic">
            {children}
        </Typography>
    </div>
)

export default RecipeDescription
