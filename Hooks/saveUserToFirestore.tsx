import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { doc, collection, setDoc } from "firebase/firestore";
import getFirestore from "../config/config";

const db = getFirestore;
export default async function saveUserToFirestore(Username: string, email: string) {
    const data = {
        username: Username,
        email: email
    }

    await setDoc(doc(db, "users", email.toLowerCase()), data);
}

const styles = StyleSheet.create({})

