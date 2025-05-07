import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';

// Extiende los matchers de expect con los de jest-dom
expect.extend(matchers);

// Limpia después de cada test
afterEach(() => {
  cleanup();
});
