import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Goal } from "../types/GoalTypes"
import { getAuth } from '@firebase/auth';
import getFirestore from "../config/config";
import { doc, getDoc } from '@firebase/firestore';
import { collection, getDocs } from 'firebase/firestore';

const db = getFirestore;

let auth = getAuth();

const fetchStepsGoals = async (email: string) => {

    // const docRef = doc(db, "steps_goals", email);
    // const docSnap = await getDoc(docRef);

    // if (docSnap.exists()) {
    //     //console.log(docSnap.data())
    //     return docSnap.data();
    // } else {
    //     // doc.data() will be undefined in this case
    //     console.log("No such document!");
        
    // }

    const querySnapshot = await getDocs(
      collection(db, "steps_goals", email, "daily steps goals")
    );
    console.log("query snapshot docs = ", querySnapshot);
    return querySnapshot;
}

export default fetchStepsGoals;

