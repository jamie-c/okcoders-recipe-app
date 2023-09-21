import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';
import FullWidthHeaderImage from '@/components/FullWidthHeaderImage';
import FullWidthHeaderImageLoading from '@/components/FullWidthHeaderImageLoading';

function RecipeCard({ recipe }) {
  return (
    <Card style={styles.card}>
      {/* Ingredients */}
      <div style={styles.ingredients}>
        <Typography variant="h5">Ingredients</Typography>
        <List>
          {recipe && Array.isArray(recipe.ingredients) && recipe.ingredients.map((ingredient) => (
            <ListItem key={ingredient._id}>
              <ListItemText>
                {ingredient.amount} {ingredient.unit} {ingredient.name}
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </div>

      {/* Instructions */}
      <CardContent style={styles.instructions}>
      <container  style={styles.recipeNameContainer}>
          <Typography variant="h5" style={styles.recipeName}>{recipe.name}</Typography>
        </container>        
      {/* Render FullWidthHeaderImageLoading if loading */}
        {recipe.loading && (
          <FullWidthHeaderImageLoading recipe={recipe}>
            <Typography variant="h1" color="white" width="75%">
              {/* Loading content */}
            </Typography>
          </FullWidthHeaderImageLoading>
        )}

        {/* Render FullWidthHeaderImage if not loading */}
        {!recipe.loading && (
          <FullWidthHeaderImage recipe={recipe}>
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
            >
            </Typography>
          </FullWidthHeaderImage>
        )}
        {recipe.instructions.map((instruction, index) => (
          <p key={`${recipe._id}-instruction-${index}`}>{instruction}</p>
        ))}
        

      </CardContent>
    </Card>
  );
}

const styles = {
  card: {
    maxWidth: '90%',
    height: '80vh',
    margin: 'auto',
    marginTop: '45px',
    display: 'flex',
    filter: 'drop-shadow(3px 3px 8px #3ABEFF)',
    radius: '50px',
    padding: '20px'
  },
  ingredients: {
    flex: 1,
    borderRight: '1px solid #ccc',
    padding: '16px',
    overflowY: 'auto',
  },
  instructions: {
    flex: 3,
    padding: '16px',
    marginLeft: '30px',
    
    overflowY: 'auto',
  },
  recipeNameContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  recipeName: {
    fontSize: '30px'
  }
};

export default RecipeCard;
