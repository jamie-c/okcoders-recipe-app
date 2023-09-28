import React, { useState } from 'react';
import {
    Card,
    CardContent,
    List,
    ListItem,
    ListItemText,
    Typography,
    useMediaQuery,
    useTheme,
    Button,
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import RecipeCardHeaderImage from './RecipeCardHeaderImage';
import RecipeDescription from './RecipeDescription';
import RecipeTags from './RecipeTags';
import PrepTimeDisplay from './PrepTimeDisplay';
import CookTimeDisplay from './CookTimeDisplay';
import TotalTimeDisplay from './TotalTimeDisplay';

function RecipeCard({ recipe, loading }) {
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const theme = useTheme();
    const [fontSize, setFontSize] = useState(16); // Initial font size (you can change it)

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
        flex: 2,
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

    const RecipeDescriptionStyles = {
        justifyContent: 'center',
    };

    const infoBoxStyles = {
        border: '1px dashed #006400',
        padding: '15px',
    };

    const timeInfoStyles = {
        display: 'flex',
        fontSize: '15px',
        fontStyle: 'italic',
        justifyContent: 'space-between',
    };

    const minusBtnStyles = {
        left: '53px',
        color: '#de5006',
        // bottom: '50px',
    };
    const plusBtnStyles = {
        right: '10px',
        bottom: '40px',
        color: '#de5006',
    };
    const buttonsContainer = {
        position: 'fixed',
        top: '75vh',
        right: '0px',

    };
    const increaseFontSize = () => {
        setFontSize((prevSize) => prevSize + 1);
    };

    const decreaseFontSize = () => {
        setFontSize((prevSize) => Math.max(prevSize - 1, 10)); // Ensure font size doesn't go below 10
    };

    return (
        <Card style={cardStyles}>
            {/* Ingredients */}
            <div style={ingredientsStyles}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                </div>
                <div style={infoBoxStyles}>
                    <RecipeTags tags={recipe.tags} />
                    <div style={timeInfoStyles}>
                        <PrepTimeDisplay recipe={recipe} />
                        <CookTimeDisplay recipe={recipe} />
                        <TotalTimeDisplay recipe={recipe} />
                    </div>
                </div>
                <br />
                <Typography variant="h5">
                    Ingredients
                </Typography>
                <List>
                    {recipe &&
                        Array.isArray(recipe.ingredients) &&
                        recipe.ingredients.map((ingredient) => (
                            <ListItem key={ingredient._id}>
                                <ListItemText>
                                    <Typography style={{ ...theme.typography.body1, fontSize: `${fontSize}px` }}>
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
                <RecipeDescription style={RecipeDescriptionStyles}>
                    {recipe.description}
                </RecipeDescription>
                <div style={instructionsTextStyles}>
                    {recipe.instructions.map((instruction, index) => (
                        <Typography key={`${recipe._id}-instruction-${index}`} style={{ ...theme.typography.body1, ...numberedStepStyles, fontSize: `${fontSize}px` }}>
                            <span style={numberedStepContentStyles}>{index + 1}.</span> {instruction}
                        </Typography>
                    ))}

                </div>
                <div style={buttonsContainer}>
                    <Button variant='text' onClick={decreaseFontSize} style={minusBtnStyles}>
                        <RemoveIcon />
                    </Button>
                    <Button variant='text' onClick={increaseFontSize} style={plusBtnStyles}>
                        <AddIcon />
                    </Button>
                </div>

            </CardContent>
        </Card>
    );

}

export default RecipeCard;
