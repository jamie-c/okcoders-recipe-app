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