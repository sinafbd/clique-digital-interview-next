import { convertTemperature } from "../functions";

describe("convertTemperature", () => {
  it("should convert Celsius to Fahrenheit", () => {
    expect(convertTemperature(0, false)).toBe(32);
    expect(convertTemperature(100, false)).toBe(212);
  });

  it("should not convert if already in Celsius", () => {
    expect(convertTemperature(0, true)).toBe(0);
    expect(convertTemperature(100, true)).toBe(100);
  });
});
