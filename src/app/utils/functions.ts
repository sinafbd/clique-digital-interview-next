export const convertTemperature = (
  temp: number,
  toCelsius: boolean
): number => {
  return toCelsius ? temp : (temp * 9) / 5 + 32;
};
