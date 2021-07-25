import React from 'react';

interface Route {
  path: string;
  exact?: boolean;
  component?: any;
}

const Dashboard = React.lazy(() => import('modules/dashboard'));
const Students = React.lazy(() => import('modules/students'));
const StudentsManagement = React.lazy(() => import('modules/students/pages/StudentsManagement'));
const CreateStudent = React.lazy(() => import('modules/students/pages/CreateStudent'));
const UpdateStudent = React.lazy(() => import('modules/students/pages/UpdateStudent'));

const routes: Route[] = [
  { path: '/', exact: true },
  { path: '/dashboard', component: Dashboard, exact: true },
  { path: '/students', component: Students, exact: true },
  { path: '/students/list', component: StudentsManagement, exact: true },
  {
    path: '/students/create',
    exact: true,
    component: CreateStudent,
  },
  {
    path: '/students/:id',
    exact: true,
    component: UpdateStudent,
  },
];

export default routes;
