export const convertTemperature = (temp: number, toCelsius: boolean) => {
  return toCelsius ? temp : (temp * 9) / 5 + 32;
};
