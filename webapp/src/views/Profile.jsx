import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField, Card, CardContent, Grid, Button, CardHeader, Avatar,
} from '@material-ui/core';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import CircularProgress from '@material-ui/core/CircularProgress';
import Page from '../containers/Page';
import LoadingView from '../components/LoadingView';
import { updateCurrentUserProfile } from '../services';
import { useUser } from '../UserContext';

const useStyles = makeStyles((theme) => ({
  input: {
    marginBottom: theme.spacing(3),
  },
  card: {
    display: 'flex',
    justifyContent: 'flex-start',
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
  profilePicPreview: {
    width: '120px',
    height: '120px',
    marginBottom: theme.spacing(4),
  },
  button: {
    marginRight: theme.spacing(1),
  },
}));

function Profile() {
  const classes = useStyles();

  const { user, setUser } = useUser();
  const [name, setName] = useState('');
  const [updating, setUpdating] = useState(false);
  const [email, setEmail] = useState('');
  const [dataChanged, setDataChanged] = useState(false);
  const [profileImageURL, setProfileImageURL] = useState(null);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [fileKey, setFileKey] = useState(Date.now());

  useEffect(() => {
    if (!user) {
      setDataChanged(false);
      return;
    }
    setName(user.name);
    setEmail(user.email);
    if (user.pictureURL) {
      setProfileImageURL(user.pictureURL);
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      setDataChanged(false);
      return;
    }
    if (name !== user.name) {
      setDataChanged(true);
    } else if (!user.pictureURL && !profileImageURL) {
      setDataChanged(false);
    } else if (profileImageURL !== user.pictureURL) {
      setDataChanged(true);
    } else {
      setDataChanged(false);
    }
  }, [user, name, profileImageURL]);

  const handleImageChange = (event) => {
    const newImage = event.target?.files?.[0];
    setProfileImageFile(newImage);
    setProfileImageURL(URL.createObjectURL(newImage));
  };

  const removeFile = () => {
    setProfileImageFile(null);
    setProfileImageURL(null);
    setFileKey(Date.now());
  };

  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const updateProfile = async () => {
    setUpdating(true);
    let shouldDeletePicture = false;
    let file;
    if (user.pictureURL && !profileImageURL) {
      // Photo needs to be deleted
      shouldDeletePicture = true;
    } else if (user.pictureURL !== profileImageURL) {
      // Photo needs to be updated
      file = profileImageFile;
    }
    const results = await updateCurrentUserProfile(name, shouldDeletePicture, file);
    setProfileImageFile(null);
    setProfileImageURL(null);
    setUser(results);
    setUpdating(false);
  };

  // Determine what icon is used with the upload button
  const getButtonIcon = () => {
    if (updating) {
      return <CircularProgress size={22} />;
    }
    return <PermIdentityIcon />;
  };

  const isSubmitDisabled = () => {
    if (updating) {
      return true;
    }
    if (dataChanged) {
      return false;
    }
    return true;
  };

  // Breadcrumb values for the header
  const getBreadcrumbs = () => [
    {
      name: 'All Documents',
      link: '/',
    },
    {
      name: 'User Profile',
    },
  ];

  return (
    <Page title="User Profile" breadcrumbs={getBreadcrumbs()}>
      { user
        && (
        <>
          <Grid container spacing={2} alignItems="stretch">
            <Grid item xs={12} sm={6} className={classes.container}>
              <Card className={classes.card}>
                <CardHeader title="Document Details" subheader="Enter the details for the document to be uploaded" />
                <CardContent>
                  <TextField
                    id="email"
                    className={classes.input}
                    label="Email"
                    value={email}
                    disabled
                    fullWidth
                  />
                  <TextField
                    id="name"
                    className={classes.input}
                    label="Full Name"
                    value={name}
                    onChange={onNameChange}
                    required
                    disabled={updating}
                    fullWidth
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.container}>
              <Card className={classes.card}>
                <CardHeader title="Profile Photo" subheader="You can edit and such." />
                <CardContent>
                  <Avatar src={profileImageURL} className={classes.profilePicPreview} />
                  <input
                    accept="image/*"
                    className={classes.input}
                    style={{ display: 'none' }}
                    id="raised-button-file"
                    key={fileKey}
                    onChange={handleImageChange}
                    type="file"
                  />
                  <label htmlFor="raised-button-file">
                    {!profileImageURL
                      && (
                      <Button variant="outlined" component="span" disabled={updating} className={classes.button}>
                        Add Picture
                      </Button>
                      )}
                    {profileImageURL
                      && (
                      <Button variant="outlined" component="span" disabled={updating} className={classes.button}>
                        Edit Picture
                      </Button>
                      )}
                  </label>
                  {profileImageURL
                    && (
                    <Button variant="outlined" color="secondary" component="span" onClick={removeFile} disabled={updating} className={classes.button}>
                      Remove Picture
                    </Button>
                    )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid container spacing={2} alignItems="stretch">
            <Grid item className={classes.actionItemsContainer} xs>
              <Button
                variant="outlined"
                color="primary"
                disabled={isSubmitDisabled()}
                startIcon={getButtonIcon()}
                onClick={updateProfile}
              >
                Update Profile
              </Button>
            </Grid>
          </Grid>
        </>
        )}
      { !user
        && <LoadingView />}
    </Page>
  );
}

export default Profile;
