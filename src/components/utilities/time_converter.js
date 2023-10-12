const convertTime = (time) => {
  const date = new Date(time);
  const humanReadableTime = date.toLocaleString();
  const [, timePart] = humanReadableTime.split(', ');
  return timePart;
};

export default convertTime;
