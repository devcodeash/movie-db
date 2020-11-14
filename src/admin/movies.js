import * as React from 'react';
import {
  List,
  Datagrid,
  TextField,
  Filter,
  TextInput,
  SelectInput,
} from 'react-admin';
import Movie from '@material-ui/icons/Movie';

export const MovieIcon = Movie;

const MovieFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search" source="q" alwaysOn />
    <TextInput label="Year" source="year" alwaysOn />
    <SelectInput
      source="language"
      choices={[
        { id: 'English', name: 'English' },
        { id: 'Malayalam', name: 'Malayalam' },
        { id: 'Tamil', name: 'Tamil' },
        { id: 'Hindi', name: 'Hindi' },
        { id: 'Others', name: 'Others' },
      ]}
      alwaysOn
    />
  </Filter>
);

export const MovieList = (props) => (
  <List
    {...props}
    filters={<MovieFilter />}
    sort={{ field: 'year', order: 'DESC' }}
    perPage={25}
  >
    <Datagrid>
      <TextField source="title" />
      <TextField source="language" />
      <TextField source="year" />
    </Datagrid>
  </List>
);
