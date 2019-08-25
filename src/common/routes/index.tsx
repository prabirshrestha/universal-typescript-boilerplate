import * as React from 'react';
import { NotFound } from './notFound';
import { Home } from './home';
import { About } from './about';

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
    component: Home,
    fetchInitialData: () => Promise.resolve(null)
  },
  {
    path: '/about',
    exact: true,
    component: About,
    fetchInitialData: () => Promise.resolve(null)
  },
  {
    key: 'notfound',
    component: NotFound
  }
];
