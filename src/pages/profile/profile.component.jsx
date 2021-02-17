import React from 'react';
import { useStyles } from './profile.styles';

const ProfilePage = ({ currentUser }) => {

    const classes = useStyles();

    return ( 
        <div className={classes.profilePage}>
            <div className={classes.profileCard}>
                <h2>Name: {`${currentUser.firstName} ${currentUser.lastName}`}</h2>
                <h2>School: {currentUser.school}</h2>
                <h2>Department: {currentUser.department}</h2>
                <h2>Role: {currentUser.role}</h2>
                <h2>Username: {currentUser.displayName}</h2>
                <h2>Date Joined: {new Date(currentUser.createdAt).toString()}</h2>
            </div>
            <div className={classes.profileCard}>
                <h1>Other part</h1>
            </div>
        </div>
    );
}

export default ProfilePage;
