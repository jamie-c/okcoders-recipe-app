import React from 'react';
import {
    Card,
    CardContent,
    List,
    ListItem,
    ListItemText,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import RecipeCardHeaderImage from './RecipeCardHeaderImage';

function RecipeCard({ recipe, loading }) {
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const theme = useTheme();

    const cardStyles = {
        maxWidth: '90%',
        margin: 'auto',
        display: 'flex',
        marginTop: '45px',
        filter: 'drop-shadow(3px 3px 8px #BBB)',
        borderRadius: '20px',
        flexDirection: isSmallScreen ? 'column' : 'row',
        height: isSmallScreen ? 'auto' : '80vh', // 70% of viewport height on large screens
    };

    const ingredientsStyles = {
        flex: 1,
        borderRight: isSmallScreen ? 'none' : '1px solid #ccc',
        padding: '16px',
        overflowY: 'auto',
        marginBottom: isSmallScreen ? '20px' : '0',
    };

    const instructionsStyles = {
        flex: 3,
        padding: '16px',
        marginLeft: isSmallScreen ? '0' : '30px',
        overflowY: 'auto',
        maxWidth: '100%', // Add max-width to the instructions container
    };

    const recipeNameStyles = {
        fontSize: isSmallScreen ? theme.typography.h6.fontSize : theme.typography.h5.fontSize,
    };

    const recipeNameContainerStyles = {
        display: 'flex',
        justifyContent: 'center',
    };

    const numberedStepStyles = {
        counterIncrement: 'step',
        marginBottom: '10px', // Adjust the space between each step as needed
    };

    const numberedStepContentStyles = {
        fontWeight: 'bold',
        marginRight: '5px', // Adjust the space between the number and the step text
    };

    const instructionsTextStyles = {
            marginTop: isSmallScreen ? '0' : '20px',

    };

    return (
        <Card style={cardStyles}>
            {/* Ingredients */}
            <div style={ingredientsStyles}>
                <Typography variant="h5">Ingredients</Typography>
                <List>
                    {recipe &&
                        Array.isArray(recipe.ingredients) &&
                        recipe.ingredients.map((ingredient) => (
                            <ListItem key={ingredient._id}>
                                <ListItemText>
                                    <Typography style={theme.typography.body1}>
                                        {ingredient.amount} {ingredient.unit} {ingredient.name}
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                        ))}
                </List>
            </div>

            {/* Instructions */}
            <CardContent style={instructionsStyles}>
                <div style={recipeNameContainerStyles}>
                    <Typography variant="h5" style={recipeNameStyles}>
                        {recipe.name}
                    </Typography>
                </div>
                {/* Render FullWidthHeaderImageLoading if loading */}
                {recipe.loading && (
                    <FullWidthHeaderImageLoading recipe={recipe}>
                        <Typography variant="h1" color="white" width="75%">
                            {/* Loading content */}
                        </Typography>
                    </FullWidthHeaderImageLoading>
                )}

                {/* Render RecipeCardHeaderImage if not loading */}
                {!recipe.loading && (
                    <RecipeCardHeaderImage recipe={recipe} loading={loading}>
                        <Typography
                            variant="h1"
                            color="white"
                            sx={{
                                textTransform: 'uppercase',
                                fontWeight: 'bold',
                                fontSize: {
                                    xs: '2rem',
                                    sm: '3rem',
                                    md: '4rem',
                                    lg: '5rem',
                                    xl: '6rem',
                                },
                            }}
                        ></Typography>
                    </RecipeCardHeaderImage>
                )}

                {/* Render instructions with numbered steps */}
                <div style={instructionsTextStyles}>
                    {recipe.instructions.map((instruction, index) => (
                        <Typography key={`${recipe._id}-instruction-${index}`} style={{ ...theme.typography.body1, ...numberedStepStyles }}>
                            <span style={numberedStepContentStyles}>{index + 1}.</span> {instruction}
                        </Typography>
                    ))}
                </div>

            </CardContent>
        </Card>
    );
}

export default RecipeCard;