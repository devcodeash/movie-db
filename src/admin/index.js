import * as React from 'react';
import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

import { MovieList, MovieIcon } from './movies';

function AdminApp() {
  return (
    <Admin dataProvider={jsonServerProvider('http://localhost:4000/api')}>
      <Resource name="movies" list={MovieList} icon={MovieIcon} />
    </Admin>
  );
}

export default AdminApp;
