export function formatTime(minutes) {
    // const prepTime = 45;
    // const formattedTime = formatTime(prepTime);
    // console.log(formattedTime); // Output: "45 minutes"

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    let result = '';
    if (hours > 0) {
        result += `${hours} hour${hours > 1 ? 's' : ''} `;
    }
    if (remainingMinutes > 0) {
        result += `${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''}`;
    }
    return result.trim();
}