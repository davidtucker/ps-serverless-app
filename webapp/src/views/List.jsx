import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import DocumentsTable from '../components/DocumentsTable';
import Page from '../containers/Page';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(5),
  },
  title: {
    marginBottom: theme.spacing(5),
  },
  datagrid: {
    flexGrow: 1,
  },
}));

function List() {
  const theme = useTheme();
  const classes = useStyles(theme);
  return (
    <Page title="Documents">
      <DocumentsTable className={classes.datagrid} />
    </Page>
  );
}

export default List;
