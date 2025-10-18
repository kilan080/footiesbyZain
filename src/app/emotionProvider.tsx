'use client';

import * as React from 'react';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from './emotionCache';

const clientSideEmotionCache = createEmotionCache();

export default function EmotionProvider({ children }: { children: React.ReactNode }) {
  return <CacheProvider value={clientSideEmotionCache}>{children}</CacheProvider>;
}
