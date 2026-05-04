// src/colors.js

// 1. Define base color variables
export const manorGold = '#d4c5a1';
export const manorGreen = '#2c372b';
export const white = '#ffffff';
export const black = '#000000';

// 2. DEFINE COLORS OBJECT
// Uppercase COLORS object for compatibility with some codebase conventions
// Contains the same color values as individual exports
export const COLORS = {
  manorGold: '#d4c5a1',
  manorGreen: '#2c372b',
  white: '#ffffff',
  black: '#000000',
};

// 3. DEFAULT EXPORT
// Provides backward compatibility if the module is imported as:
// import colors from './colors'
export default {
  manorGold,
  manorGreen,
  white,
  black,
  COLORS
};
