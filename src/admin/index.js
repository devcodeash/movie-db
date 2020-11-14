import * as React from 'react';
import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

import { MovieList, MovieIcon } from './movies';
const API =
  process.env.NODE_ENV === 'production'
    ? 'https://ash-movie-db.herokuapp.com/api'
    : 'http://localhost:4000/api';

function AdminApp() {
  return (
    <Admin dataProvider={jsonServerProvider(API)}>
      <Resource name="movies" list={MovieList} icon={MovieIcon} />
    </Admin>
  );
}

export default AdminApp;
