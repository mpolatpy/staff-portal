import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyBmUYI-PpxVSuO6VRe4onM80u2TbE8AHYU",
    authDomain: "hcss-staff-portal.firebaseapp.com",
    projectId: "hcss-staff-portal",
    storageBucket: "hcss-staff-portal.appspot.com",
    messagingSenderId: "365499006292",
    appId: "1:365499006292:web:cae201fd244f6d60ab9cc1"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { email } = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
};

export const convertTeacherSnapshotToMap = (teachers) => {
    const transformedCollection = teachers.docs.map(doc => {
        const { firstName, lastName, email, role, department } = doc.data();

        return ({
            id: doc.id,
            firstName, 
            lastName,
            email,
            role,
            department
        });
    });

    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.id] = collection;
        return accumulator;
    }, {})
}

export const addDocumentToFirestore = async (collectionName, docName, data) => {
    try{
        await firestore.collection(collectionName).doc(docName).set(data);
        console.log('Sucessfully Added/Updated')
    } catch (error){
        console.log(error)
    }
}

export const fetchCurrentYear = async (setYear) => {
    try{
        firestore.collection('years').where('isActiveYear', '==', true)
                            .get()
                            .then(snapshot => snapshot.docs[0].data().schoolYear)
                            .then(year => (setYear(year)) )
    } catch(error){
        console.log(error);
    }
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;