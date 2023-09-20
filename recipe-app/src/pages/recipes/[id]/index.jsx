import RecipeCard from '@/components/RecipeCard'; // Import the RecipeCard component
import { inter } from '@/lib/theme';
import { Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Recipe() {
  const router = useRouter();
  const { id } = router.query;
  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(false);
  const [prepTimeDisplay, setPrepTimeDisplay] = useState('');
  const [cookTimeDisplay, setCookTimeDisplay] = useState('');
  const [totalTimeDisplay, setTotalTimeDisplay] = useState('');

  const getRecipe = async () => {
    setLoading(true);
    const response = await fetch(`/api/recipes/${id}`);
    const data = await response.json();
    setRecipe(data.recipe);
    setLoading(false);
  }

  useEffect(() => {
    if (!id) return;
    getRecipe();
  }, [id]);

  const setPrepTime = () => {
    const { hours, minutes } = recipe.prepTime
    if (hours === 0) {
        setPrepTimeDisplay(`${minutes} minutes`)
    } else if (minutes === 0) {
        setPrepTimeDisplay(`${hours} hours`)
    } else {
        setPrepTimeDisplay(`${hours} hours ${minutes} minutes`)
    }
  }

  const setCookTime = () => {
    const { hours, minutes } = recipe.cookTime
    if (hours === 0) {
        setCookTimeDisplay(`${minutes} minutes`)
    } else if (minutes === 0) {
        setCookTimeDisplay(`${hours} hours`)
    } else {
        setCookTimeDisplay(`${hours} hours ${minutes} minutes`)
    }
  }

  const setTotalTime = () => {
    const { hours: prepHours, minutes: prepMinutes } = recipe.prepTime
    const { hours: cookHours, minutes: cookMinutes } = recipe.cookTime
    const totalHours = prepHours + cookHours
    const totalMinutes = prepMinutes + cookMinutes
    if (totalHours === 0) {
        setTotalTimeDisplay(`${totalMinutes} minutes`)
    } else if (totalMinutes === 0) {
        setTotalTimeDisplay(`${totalHours} hours`)
    } else {
        setTotalTimeDisplay(`${totalHours} hours ${totalMinutes} minutes`)
    }
  }

  useEffect(() => {
    if (!recipe?._id) return;
    setPrepTime();
    setCookTime();
    setTotalTime();
  }, [recipe]);

<<<<<<< HEAD
  return (
    <div className={`${inter.className}`}>
      {loading && (
        <>
          {/* Render loading content here */}
          <Stack sx={{ px: { xs: 2, sm: 8, md: 20 } }}>
            <Typography variant="h1">
              {/* Loading content */}
            </Typography>
            <Typography variant="body1">
              {/* Loading content */}
            </Typography>
          </Stack>
        </>
      )}
      {!recipe?._id && !loading && (
        <Typography>Listing not found</Typography>
      )}
      {recipe?._id && (
        <>
          <Stack sx={{ px: { xs: 2, sm: 8, md: 20 } }}>
            <RecipeCard recipe={recipe} /> {/* Render the RecipeCard component here */}
          </Stack>
        </>
      )}
    </div>
  );
}
=======
    useEffect(() => {
        if (!recipe?._id) return
        setPrepTime()
        setCookTime()
        setTotalTime()
    }, [recipe])

    return (
        <div className={`${inter.className}`}>
            {loading && (
                <>
                    <FullWidthHeaderImageLoading recipe={recipe}>
                        <Typography variant="h1" color="white" width="75%">
                            <Skeleton variant="text" width="100%" />
                        </Typography>
                    </FullWidthHeaderImageLoading>
                    <Stack sx={{ px: { xs: 2, sm: 8, md: 20 } }}>
                        <Typography variant="h1">
                            <Skeleton variant="text" width="75%" />
                        </Typography>
                        <Typography variant="body1">
                            <Skeleton variant="text" width="100%" />
                            <Skeleton variant="text" width="100%" />
                            <Skeleton variant="text" width="100%" />
                        </Typography>
                    </Stack>
                </>
            )}
            {!recipe?._id && !loading && (
                <Typography>Listing not found</Typography>
            )}
            {recipe?._id && (
                <>
                    <FullWidthHeaderImage recipe={recipe} loading={loading}>
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
                            {recipe.name}
                        </Typography>
                    </FullWidthHeaderImage>
                    <Stack sx={{ px: { xs: 2, sm: 8, md: 20 } }}>
                        <RecipeTitle>{recipe.name}</RecipeTitle>
                        <RecipeDescription>
                            {recipe.description}
                        </RecipeDescription>
                        <RecipeTags tags={recipe.tags} />
                        <h2>Info</h2>
                        <p>Prep Time: {prepTimeDisplay}</p>
                        <p>Cook Time: {cookTimeDisplay}</p>
                        <p>Total Time: {totalTimeDisplay}</p>
                        <p>
                            Servings: {recipe.servings.amount}{' '}
                            {recipe.servings.unit}
                        </p>
                        <h2>Ingredients</h2>
                        {recipe.ingredients.map((ingredient) => (
                            <div key={ingredient._id}>
                                <p>
                                    {ingredient.amount} {ingredient.unit}{' '}
                                    {ingredient.name}
                                </p>
                            </div>
                        ))}
                        <h2>Instructions</h2>
                        {recipe.instructions.map((instruction) => (
                            <div key={`${recipe._id}-instructions`}>
                                <p>{instruction}</p>
                            </div>
                        ))}
                    </Stack>
                </>
            )}
        </div>
    )
}
>>>>>>> 84fb092 (pass loading state to loading prop on FullWidthHeaderImage)
