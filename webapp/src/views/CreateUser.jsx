import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid, TextField, Card, CardHeader, CardContent, Button,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import CircularProgress from '@material-ui/core/CircularProgress';
import Page from '../containers/Page';
import { createNewUser } from '../services';
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

function CreateUser() {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [group, setGroup] = useState('reader');
  const { updateAllUserProfiles } = useUser();
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const groups = ['admin', 'contributor', 'reader'];
    if (!name || name.length < 1) {
      setIsValid(false);
      return;
    }
    if (!email || email.length < 3) {
      setIsValid(false);
      return;
    }

    if (!group || !groups.includes(group)) {
      setIsValid(false);
      return;
    }
    setIsValid(true);
  }, [name, email, group]);

  const createUser = async () => {
    setSubmitting(true);
    try {
      await createNewUser(email, name, group);
    } catch (err) {
      setSubmitting(false);
      setIsSuccessVisible(false);
      setIsErrorVisible(true);
      return;
    }
    setSubmitting(false);
    setIsSuccessVisible(true);
    setIsErrorVisible(false);
    setName('');
    setEmail('');
    setGroup('reader');
    await updateAllUserProfiles();
  };

  // Determine what icon is used with the upload button
  const getButtonIcon = () => {
    if (submitting) {
      return <CircularProgress size={22} />;
    }
    return <PermIdentityIcon />;
  };

  // Breadcrumb values for the header
  const getBreadcrumbs = () => [
    {
      name: 'All Documents',
      link: '/',
    },
    {
      name: 'Manage Users',
      link: '/users',
    },
    {
      name: 'Create User',
    },
  ];

  return (
    <Page title="Create User" breadcrumbs={getBreadcrumbs()}>
      { isSuccessVisible
      && <MuiAlert onClose={() => setIsSuccessVisible(false)} className={classes.alert} severity="success" elevation={6} variant="filled">User successfully created</MuiAlert> }
      { isErrorVisible
      && <MuiAlert onClose={() => setIsErrorVisible(false)} className={classes.alert} severity="error" elevation={6} variant="filled">Could not create user. Please try again later.</MuiAlert> }
      <Grid container spacing={2} alignItems="stretch">
        <Grid item xs={12} sm={6} className={classes.container}>
          <Card className={classes.card}>
            <CardHeader title="User Details" subheader="Enter the details for the new user" />
            <CardContent>
              <TextField
                id="email"
                className={classes.input}
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={submitting}
                required
                fullWidth
              />
              <TextField
                id="name"
                className={classes.input}
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={submitting}
                fullWidth
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.container}>
          <Card className={classes.card}>
            <CardHeader title="Group Membership" subheader="Determine the user's level of access" />
            <CardContent>
              <FormControl component="fieldset">
                <RadioGroup aria-label="grpup" name="group1" value={group} onChange={(e) => setGroup(e.target.value)}>
                  <FormControlLabel value="admin" control={<Radio color="primary" />} label="Admin" />
                  <FormControlLabel value="contributor" control={<Radio color="primary" />} label="Contributor" />
                  <FormControlLabel value="reader" control={<Radio color="primary" />} label="Reader" />
                </RadioGroup>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={2} alignItems="stretch">
        <Grid item className={classes.actionItemsContainer} xs>
          <Button
            variant="outlined"
            color="primary"
            disabled={!isValid}
            startIcon={getButtonIcon()}
            onClick={createUser}
          >
            Create User

          </Button>
        </Grid>
      </Grid>
    </Page>
  );
}

export default CreateUser;
