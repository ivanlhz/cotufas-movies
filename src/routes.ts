import React from 'react';

export const HomePage = React.lazy(() => import('@/ui/pages/Home'));
export const MovieDetailPage = React.lazy(() => import('@/ui/pages/MovieDetail'));
export const NotFoundPage = React.lazy(() => import('@/ui/pages/NotFound'));
