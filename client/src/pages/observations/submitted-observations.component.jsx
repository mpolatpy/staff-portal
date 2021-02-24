import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { firestore } from '../../firebase/firebase.utils';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCurrentYear } from '../../redux/school-year/school-year.selectors';
import Button from '@material-ui/core/Button';
import { DataGrid } from '@material-ui/data-grid';
import { mapObservationData, observationColumns } from './observations.utils';
import { Typography } from '@material-ui/core';


const SubmittedObservations = ({ currentUser, currentYear, ...otherProps }) => {

    const QUERY_LIMIT = 3;
    const [isLoading, setIsLoading] = useState(false);
    const [observationData, setObservationData ] = useState({
        observations: [],
        queryRef: null,
        lastDoc: null
    });

    useEffect(() => {
        const fetchInitialObservationData = async () => {  
            try{
                setIsLoading(true);
                const observationsRef = firestore.collection('observations')
                    .where('observerId', '==', currentUser.id)
                    .where('observationDetails.schoolYear', '==', currentYear)
                    .orderBy('observationDate', 'desc')
                    .limit(QUERY_LIMIT);

                const snapshot = await observationsRef.get();
                const fetchedObservations = snapshot.docs.map(doc => doc.data());
                const last = snapshot.docs[snapshot.docs.length - 1];

                setObservationData({
                    queryRef: observationsRef,
                    observations: fetchedObservations,
                    lastDoc: last
                })
                setIsLoading(false);
            } catch(e){
                console.log(e.message);
            }
        }
        
        fetchInitialObservationData();
    },[]);

    const addPaginatedObservations = async () => {
        const { queryRef, lastDoc } = observationData;
        try{
            if(lastDoc){
                const next = queryRef.startAfter(lastDoc.data().observationDate);
                const snapshot = await next.get();
                const fetchedObservations = snapshot.docs.map(doc => doc.data());
                const last = snapshot.docs[snapshot.docs.length - 1];

                setObservationData({
                    ...observationData,
                    observations: [...observationData.observations, ...fetchedObservations],
                    lastDoc: last
                });
            } else {
                alert('No more data !!!')
            }
        }catch(e){
            console.log(e);
        }
    }

    const rows = observationData.observations ? 
        observationData.observations.map( (observation, index) => mapObservationData(observation, index)) 
    : [];

    const columns = rows.length>0 ? Object.keys(rows[0]).map( key => ({ field: key })):[]; 

    return ( 
        <div>
            { isLoading ? 
            (<h2>Loading...</h2>) : 
            (
                <Typography variant="h5">Submitted Observations</Typography>
            ) }
            <div style={{ height: 450, width: '100%', margin: '10px 0 10px 0' }}>
                <DataGrid rows={rows} columns={observationColumns} />
            </div>
            
            <Button variant="contained" 
            color="primary"
            onClick={() => addPaginatedObservations()}>
            Load more
            </Button>
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    currentYear: selectCurrentYear
});

export default connect(mapStateToProps)(SubmittedObservations);
