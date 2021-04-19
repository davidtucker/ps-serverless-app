import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField, Card, CardContent, Grid, Button, CardHeader,
} from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';
import BackupIcon from '@material-ui/icons/Backup';
import CircularProgress from '@material-ui/core/CircularProgress';
import MuiAlert from '@material-ui/lab/Alert';
import Page from '../containers/Page';
import { uploadDocument } from '../services';

const useStyles = makeStyles((theme) => ({
  input: {
    marginBottom: theme.spacing(3),
  },
  card: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    width: '100%',
  },
  container: {
    display: 'flex',
  },
  actionItemsContainer: {
    textAlign: 'right',
    margin: '10px 0',
  },
  alert: {
    marginBottom: theme.spacing(3),
  },
}));

function Upload() {
  const classes = useStyles();

  // State variables (using React hooks)
  const [fileName, setFileName] = useState('');
  const [fileTags, setFileTags] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [fileKey, setFileKey] = useState(Date.now());

  // Check if form is valid when name or selected file changes
  useEffect(() => {
    if (selectedFile !== null && fileName !== null) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [fileName, selectedFile]);

  // Clear the form values
  const clearForm = () => {
    setFileName('');
    setFileTags([]);
    setSelectedFile(null);
    setFileKey(Date.now());
  };

  const upload = async () => {
    // Make sure success and error banners are not visible
    setErrorMessage('');
    setIsSuccessVisible(false);
    // Set the state to enter uploading process
    setIsUploading(true);

    // Try to upload file to the server
    try {
      await uploadDocument(fileName, fileTags, selectedFile);
    } catch (err) {
      // If an error, display the error banner
      setErrorMessage('Could not upload file. Please try again later.');
      setIsUploading(false);
      return;
    }
    // If successful, clear the form, set the success banner,
    // and stop upload process
    clearForm();
    setIsSuccessVisible(true);
    setIsUploading(false);
  };

  // Determining if a file has been selected
  const hasFile = () => selectedFile !== null;

  // Removes the currently selected file
  const removeFile = () => {
    setSelectedFile(null);
    setFileKey(Date.now());
  };

  const MAX_SIZE = 5000000;

  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file.size > MAX_SIZE) {
      setErrorMessage('File too large. Select a file less than 5 MB.');
    } else {
      setSelectedFile(file);
    }
  };

  // Determines if the upload button is disabled
  // which will happen when form is invalid or an
  // upload is in progress
  const isButtonDisabled = () => {
    if (!isFormValid) {
      return true;
    }
    if (isUploading) {
      return true;
    }
    return false;
  };

  // Determine what icon is used with the upload button
  const getButtonIcon = () => {
    if (isUploading) {
      return <CircularProgress size={22} />;
    }
    return <BackupIcon />;
  };

  // Get the value to display in the file name input
  const getFileName = () => {
    if (selectedFile && selectedFile.name) {
      return selectedFile.name;
    }
    return '';
  };

  // Breadcrumb values for the header
  const getBreadcrumbs = () => [
    {
      name: 'All Documents',
      link: '/',
    },
    {
      name: 'New Document',
    },
  ];

  return (
    <Page title="Upload Document" breadcrumbs={getBreadcrumbs()}>
      { isSuccessVisible
      && <MuiAlert onClose={() => setIsSuccessVisible(false)} className={classes.alert} severity="success" elevation={6} variant="filled">Document successfully uploaded</MuiAlert> }
      { errorMessage
      && <MuiAlert onClose={() => setErrorMessage('')} className={classes.alert} severity="error" elevation={6} variant="filled">{ errorMessage }</MuiAlert> }
      <Grid container spacing={2} alignItems="stretch">
        <Grid item xs={12} sm={6} className={classes.container}>
          <Card className={classes.card}>
            <CardHeader title="Document Details" subheader="Enter the details for the document to be uploaded" />
            <CardContent>
              <TextField
                id="outlined-uncontrolled"
                className={classes.input}
                label="Document Name"
                value={fileName}
                onChange={(evt) => setFileName(evt.target.value)}
                required
                fullWidth
              />
              <ChipInput
                className={classes.input}
                value={fileTags}
                label="Document Tags"
                onAdd={(chip) => setFileTags([...fileTags, chip])}
                onDelete={(chip) => setFileTags(fileTags.filter((c) => c !== chip))}
                fullWidth
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.container}>
          <Card className={classes.card}>
            <CardHeader title="File Upload" subheader="Must be a PDF file (Max 5 MB)" />
            <CardContent>
              <TextField
                id="filename"
                className={classes.input}
                value={getFileName()}
                helperText="Select a file to upload"
                required
                fullWidth
                disabled
              />
              <input
                accept="application/pdf"
                className={classes.input}
                style={{ display: 'none' }}
                id="raised-button-file"
                key={fileKey}
                onChange={onFileChange}
                type="file"
              />
              <label htmlFor="raised-button-file">
                { !hasFile()
                && (
                <Button variant="outlined" component="span" className={classes.button}>
                  Add File
                </Button>
                ) }
                { hasFile()
                && (
                <Button variant="outlined" color="secondary" component="span" onClick={removeFile} className={classes.button}>
                  Remove File
                </Button>
                ) }
              </label>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={2} alignItems="stretch">
        <Grid item className={classes.actionItemsContainer} xs>
          <Button
            variant="outlined"
            color="primary"
            onClick={upload}
            startIcon={getButtonIcon()}
            disabled={isButtonDisabled()}
          >
            Upload Document
          </Button>
        </Grid>
      </Grid>
    </Page>
  );
}

export default Upload;
