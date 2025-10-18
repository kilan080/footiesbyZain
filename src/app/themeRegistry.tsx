'use client';

import * as React from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

const theme = createTheme();

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const cache = createCache({ key: 'css', prepend: true });

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
