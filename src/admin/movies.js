import * as React from 'react';
import { List, Datagrid, TextField } from 'react-admin';
import Movie from '@material-ui/icons/Movie';

export const MovieIcon = Movie;

export const MovieList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="language" />
      <TextField source="year" />
    </Datagrid>
  </List>
);
