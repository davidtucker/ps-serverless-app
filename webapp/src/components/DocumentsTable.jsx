import React, { useState, useEffect } from 'react';
import MUIDataTable from 'mui-datatables';
import { makeStyles } from '@material-ui/core/styles';
import { Chip } from '@material-ui/core';
import FileName from './DataGrid/FileName';
import UserView from './UserView';
import { getAllDocuments, deleteDocument } from '../services';
import { getReadableFileSize, getFormattedDate } from '../util';
import LoadingView from './LoadingView';

const useStyles = makeStyles(() => ({
  root: {
  },
}));

export default function DocumentsTable() {
  const [tableData, setTableData] = useState(null);

  const fetchData = async () => {
    const data = await getAllDocuments();
    setTableData(data);
  };

  useEffect(() => {
    (async () => {
      await fetchData();
    })();
    const interval = setInterval(async () => {
      await fetchData();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const columns = [
    {
      name: 'Name',
      label: 'Name',
      options: {
        filter: true,
        filterType: 'textField',
        customFilterListOptions: { render: (v) => `Name: ${v}` },
        sort: true,
        customBodyRenderLite: function FileNameCell(dataIndex) {
          const val = tableData[dataIndex];
          return (
            <FileName file={val} />
          );
        },
      },
    },
    {
      name: 'status',
      label: 'Status',
      options: {
        filter: false,
        sort: true,
        customBodyRenderLite: (dataIndex) => {
          const val = tableData[dataIndex].FileSize;
          if (val) {
            return <Chip label="Processed" color="primary" />;
          }
          return <Chip label="Processing" color="secondary" />;
        },
      },
    },
    {
      name: 'FileSize',
      label: 'Size',
      options: {
        filter: false,
        sort: true,
        customBodyRenderLite: (dataIndex) => {
          const val = tableData[dataIndex].FileSize;
          if (!val) {
            return '';
          }
          return getReadableFileSize(val);
        },
      },
    },
    {
      name: 'DateUploaded',
      label: 'Uploaded',
      options: {
        filter: false,
        sort: true,
        sortOrder: 'asc',
        customBodyRenderLite: (dataIndex) => {
          const val = tableData[dataIndex];
          const date = new Date(val.DateUploaded);
          return getFormattedDate(date);
        },
      },
    },
    {
      name: 'Owner',
      label: 'Uploader',
      options: {
        filter: true,
        customFilterListOptions: { render: (v) => `Uploader: ${v}` },
        sort: false,
        customBodyRenderLite: function UserViewCell(dataIndex) {
          const val = tableData[dataIndex];
          return (
            <UserView userId={val.Owner} />
          );
        },
      },
    },
  ];

  const classes = useStyles();

  const options = {
    filterType: 'dropdown',
    selectableRows: 'none',
    fixedSelectColumn: false,
    print: false,
    download: false,
    onRowsDelete: (rowsDeleted) => {
      const itemIdsToDelete = rowsDeleted.data.map((i) => tableData[i.dataIndex].PK);
      return Promise.all(itemIdsToDelete.map((id) => deleteDocument(id)));
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
        )}
      {!tableData
        && <LoadingView />}
    </>
  );
}
