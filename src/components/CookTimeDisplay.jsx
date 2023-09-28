import React from 'react';

function CookTimeDisplay({ recipe }) {
  const { cookTime } = recipe;
  
  // Calculate and format the cook time as needed
  const formattedCookTime = `${cookTime.hours === 0 ? '' : `${cookTime.hours} hours`} ${cookTime.minutes} minutes`;

  return (
    <div>
      <p>Cook Time: <br/>{formattedCookTime}</p>
    </div>
  );
}

export default CookTimeDisplay;
