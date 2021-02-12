import './App.css';
import React, { useEffect } from 'react';
import { Switch, Route, Redirect, Link } from "react-router-dom";
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from "./redux/user/user.selectors";

// import Link from '@material-ui/core/Link';
import SignInForm from './pages/sign-in/sign-in.component';
import MiniDrawer from './components/drawer/drawer.component';
import ObservationPage from './pages/observation-form/observation-form.component';
import UserRegistrationPage from './pages/register/register.component';
import TeachersList from './pages/teachers/teachers.component';

const Users = () => {
  return ( 
    <div>
      <Link to='users/registration'>Registration Form</Link>
      
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
        <Switch>
          <Route exact path="/" 
          render={ () => ( 
            currentUser ?
            <Redirect to="/home"/>:
            <SignInForm />
          )
          } />
          <MiniDrawer>
            <Route exact path="/users" component={Users}/>
            <Route exact path="/teachers" component={TeachersList} />
            <Route path="/users/registration" component={UserRegistrationPage} />
            <Route path="/home" 
            render={() => (
              <div>
                {currentUser ?
                  (<h1>{`You are signed in as ${(currentUser.email)} role: ${currentUser.role} ${currentUser.id}`}</h1>) :
                  (<Redirect to='/'/>)}
              </div>
            ) 
            }
            />
            <Route path="/test">
                <h1>Test</h1>
            </Route>
            <Route path="/observation" component={ObservationPage}/>
          </MiniDrawer>
        </Switch>
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
