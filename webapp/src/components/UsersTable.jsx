import React, { useState, useEffect } from 'react';
import MUIDataTable from 'mui-datatables';
import { makeStyles } from '@material-ui/core/styles';
import { Chip } from '@material-ui/core';
import UserView from './UserView';
import { deleteUser, getAllUsers } from '../services';
import LoadingView from './LoadingView';
import { getFormattedDate } from '../util';

const useStyles = makeStyles(() => ({
  root: {
  },
}));

export default function UsersTable() {
  const [tableData, setTableData] = useState(null);

  const fetchData = async () => {
    const data = await getAllUsers();
    setTableData(data);
  };

  useEffect(() => {
    (async () => {
      await fetchData();
    })();
  }, []);

  const columns = [
    {
      name: 'name',
      label: 'Name',
      options: {
        filter: true,
        filterType: 'textField',
        customFilterListOptions: { render: (v) => `Name: ${v}` },
        sort: true,
        customBodyRenderLite: function UserViewCell(dataIndex) {
          const val = tableData[dataIndex];
          return (
            <UserView userId={val.userId} />
          );
        },
      },
    },
    {
      name: 'dateCreated',
      label: 'Created',
      options: {
        filter: false,
        sort: true,
        sortOrder: 'asc',
        customBodyRenderLite: (dataIndex) => {
          const val = tableData[dataIndex];
          return getFormattedDate(new Date(val.dateCreated));
        },
      },
    },
    {
      name: 'group',
      label: 'Group',
      options: {
        filter: true,
        customFilterListOptions: { render: (v) => `Group: ${v}` },
        sort: false,
        customBodyRenderLite: function GroupCell(dataIndex) {
          const val = tableData[dataIndex];
          return (
            <Chip label={val.group} color="primary" />
          );
        },
      },
    },
  ];

  const classes = useStyles();

  const options = {
    filterType: 'dropdown',
    selectableRows: 'single',
    fixedSelectColumn: false,
    print: false,
    download: false,
    onRowsDelete: (rowsDeleted) => {
      const itemIdsToDelete = rowsDeleted.data.map((i) => tableData[i.dataIndex].userId);
      return Promise.all(itemIdsToDelete.map((id) => deleteUser(id)));
    },
  };

  return (
    <>
      { tableData
    && (
    <MUIDataTable
      className={classes.root}
      data={tableData}
      columns={columns}
      options={options}
    />
    ) }
      { !tableData
    && <LoadingView />}
    </>
  );
}
