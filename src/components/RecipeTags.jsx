import { Chip, Stack, Typography } from '@mui/material'

// { tags } type is an array of strings

const RecipeTags = ({ tags }) => {
    return (
      <Stack
        className="recipe-tags"
        direction="row"
        alignItems="center"
        textTransform="uppercase"
        gap={1}
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        <Typography>Tags:</Typography>
        {tags.map((tag) => (
          <Chip key={tag} label={tag} color="secondary" />
        ))}
      </Stack>
    );
  };
  

export default RecipeTags
