import React from 'react';
import { Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { selectCurrentUser } from "../../redux/user/user.selectors";

import ObservationsOverview from './observations-overview.component';
import NewObservationPage from './new-observation.component';
import SavedObservations from './saved-observations.component';
import SavedObservationDetail from './saved-observation-detail.component';
import WithAuthorization from '../../components/with-authorization/withAuthorization.component';


const Observations = (props) => {
    const { match, currentUser, ...otherProps } = props;
    return ( 
        <div>
            <Route exact path={match.path} component={ObservationsOverview}/>
            <Route exact path={`${match.path}/new`} component={NewObservationPage}/>
            <Route exact path={`${match.path}/saved`} component={SavedObservations} />
            <Route exact path={`${match.path}/saved/:observationId`} component={SavedObservationDetail} />
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(WithAuthorization(['superadmin', 'dci', 'admin'])(Observations));