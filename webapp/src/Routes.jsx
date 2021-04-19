import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import Header from './views/Header';
import Footer from './views/Footer';
import theme from './theme';
import './App.css';
import List from './views/List';
import Profile from './views/Profile';
import Detail from './views/Detail';
import Users from './views/Users';
import NotFound from './views/NotFound';
import Upload from './views/Upload';
import { UserProvider } from './UserContext';
import CreateUser from './views/CreateUser';

const useStyles = makeStyles(() => ({
  root: {
    boxShadow: 'none',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  content: {
    flexGrow: 1,
    backgroundColor: 'rgb(247, 249, 252)',
  },
}));

function Routes() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Route
          render={() => (
            <UserProvider>
              <Paper className={classes.root}>
                <Header />
                <div className={classes.content}>
                  <Switch>
                    <Route exact path="/" component={List} />
                    <Route exact path="/profile" component={Profile} />
                    <Route exact path="/users" component={Users} />
                    <Route exact path="/users/create" component={CreateUser} />
                    <Route path="/document/:documentId" component={Detail} />
                    <Route exact path="/upload" component={Upload} />
                    <Route path="*" component={NotFound} />
                  </Switch>
                </div>
                <Footer />
              </Paper>
            </UserProvider>
          )}
        />
      </Router>
    </ThemeProvider>
  );
}

export default Routes;
