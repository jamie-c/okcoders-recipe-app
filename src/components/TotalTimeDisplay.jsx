import React from 'react';

function TotalTimeDisplay({ recipe }) {
  const { prepTime, cookTime } = recipe;
  
  // Calculate total time in minutes
  const totalMinutes = prepTime.hours * 60 + prepTime.minutes + cookTime.hours * 60 + cookTime.minutes;

  // Calculate hours and minutes components
  const totalHours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;

  // Format the total time as needed
  let formattedTotalTime;

  if (totalHours === 0) {
    formattedTotalTime = `${remainingMinutes} minutes`;
  } else if (remainingMinutes === 0) {
    formattedTotalTime = `${totalHours} hours`;
  } else {
    formattedTotalTime = `${totalHours} hours ${remainingMinutes} minutes`;
  }

  return (
    <div>
      <p>Total Time: <br/>{formattedTotalTime}</p>
    </div>
  );
}

export default TotalTimeDisplay;
