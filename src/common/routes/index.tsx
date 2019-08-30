import * as React from 'react';
import loadable from '@loadable/component';
import { NotFound } from './notFound';

export interface IRoute {
  key?: string;
  path?: string;
  exact?: boolean;
  component?: any;
  fetchInitialData?: () => Promise<any>;
}

export const routes: IRoute[] = [
  {
    path: '/',
    exact: true,
    component: loadable(() => import('./home')),
    fetchInitialData: () => Promise.resolve(null)
  },
  {
    path: '/about',
    exact: true,
    component: loadable(() => import('./about')),
    fetchInitialData: () => Promise.resolve(null)
  },
  {
    path: '/contact',
    exact: true,
    component: loadable(() => import('./contact'))
  },
  {
    key: 'notfound',
    component: NotFound
  }
];
