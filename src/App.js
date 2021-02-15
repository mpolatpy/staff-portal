import './App.css';
import React, { useEffect } from 'react';
import { Switch, Route, Redirect, Link } from "react-router-dom";
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from "./redux/user/user.selectors";
import NotFound from './pages/404/not-found.component';

import Button from '@material-ui/core/Button';
import SignInForm from './pages/sign-in/sign-in.component';
import MiniDrawer from './components/drawer/drawer.component';
import ObservationPage from './pages/observation-form/observation-form.component';
import UserRegistrationPage from './pages/register/register.component';
import TeachersList from './pages/teachers/teachers.component';


const Users = () => {
  return ( 
    <div>
      <Button component={Link} variant="contained" to='users/registration'>Registration Form</Button>
    </div>
  )
};

function App({ currentUser, setCurrentUser }) {

  useEffect( () => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      }

      setCurrentUser(userAuth);
    });

    return () => {
      unsubscribeFromAuth();
    }
  }, [] )


  return (
    <div className="App">
          <Route exact path="/" 
          render={ () => ( 
            currentUser ?
            <Redirect to="/home"/>:
            <SignInForm />
          )
          } />

          {!currentUser ?

          <Redirect to='/' /> :

          <MiniDrawer>
            <Switch>
              <Route exact path="/users" component={Users}/>
              <Route exact path="/teachers" component={TeachersList} />
              <Route path="/users/registration" component={UserRegistrationPage} />
              <Route path="/home" 
              render={() => (
                <div>
                    <h1>{`You are signed in as ${(currentUser.email)} role: ${currentUser.role} ${currentUser.id}`}</h1>
                </div>
              ) 
              }
              /> 
              <Route path="/observation" component={ObservationPage} />
              <Route component={NotFound}/>
            </Switch>
          </MiniDrawer>
        }
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
