import React, { useEffect, useState } from 'react';

function PrepTimeDisplay({ recipe }) {
  const [prepTimeDisplay, setPrepTimeDisplay] = useState('');

  const setPrepTime = () => {
    const { hours, minutes } = recipe.prepTime;
    if (hours === 0) {
      setPrepTimeDisplay(`${minutes} minutes`);
    } else if (minutes === 0) {
      setPrepTimeDisplay(`${hours} hours`);
    } else {
      setPrepTimeDisplay(`${hours} hours ${minutes} minutes`);
    }
  };

  useEffect(() => {
    if (recipe) {
      setPrepTime();
    }
  }, [recipe]);

  return <p>Prep Time: <br/> {prepTimeDisplay}</p>;
}

export default PrepTimeDisplay;
