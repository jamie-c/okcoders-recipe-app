import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';

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
        <Typography variant="h5">Instructions</Typography>
        <p>Here's where instructions go</p>
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
    maxHeight: '400px',
    overflowY: 'auto',
  },
};

export default RecipeCard;
