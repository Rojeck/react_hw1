function pipeDuration(minutes) {
  const hours = Math.floor(minutes / 60); // get the whole number of hours
  const remainingMinutes = minutes % 60; // get the remaining minutes

  return `${hours}:${remainingMinutes === 0 ? '00' : remainingMinutes } hours`;
}

export default pipeDuration;
