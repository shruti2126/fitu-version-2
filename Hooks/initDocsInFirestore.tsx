/** @format */

;
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import getFirestore from "../db/config/config";
import addMultipleItems from "../db/queries/store/addMultipleItems";
import { Store } from "../types/StoreTypes";

const db = getFirestore;
export async function saveUserToFirestore(Username: string, email: string) {
  const data = {
    username: Username,
    email: email,
  };

  await setDoc(doc(db, "users", email.toLowerCase()), data);
}

const initialStoreState: Store = [
  {
    id: 1,
    name: "Fresh Made Coffee",
    description:
      "Not only can your daily cup of joe help you feel more energized, it may also helps burn fat and improve physical performance",
    coins: 5,
    jewels: 0,
    isBought: false,
    isActive: false,
  },
  {
    id: 2,
    name: "Healthy Salad",
    description: "A salad a day, keeps disease and aging at bay.",
    coins: 0,
    jewels: 20,
    isBought: false,
    isActive: false,
  },
  {
    id: 3,
    name: "Brand New Pakers Cap",
    description:
      "Go to the sport games with your friends and family. Let everyone know where your allegiance lies. ",
    coins: 10,
    jewels: 10,
    isBought: false,
    isActive: false,
  },
  {
    id: 4,
    name: "UW-Madison T-shirt",
    description:
      "Who doesn't love a free T-shirt with UW's logo on it? Go, atheletic bagder!",
    coins: 20,
    jewels: 20,
    isBought: false,
    isActive: false,
  },
  {
    id: 5,
    name: "NIKE Runing Shoes",
    description:
      "Walking too many miles already? Get these newly innovated shoes with NIKE technology. Keep walking!",
    coins: 100,
    jewels: 0,
    isBought: false,
    isActive: false,
  },
  {
    id: 6,
    name: "Road Bike",
    description:
      "Riding a bike is healthy, fun and a low-impact form of exercise for all ages. It also helps to protect you from serious diseases such as stroke, heart attack, some cancers, depression, diabetes, obesity and arthritis.",
    coins: 100,
    jewels: 100,
    isBought: false,
    isActive: false,
  },
  {
    id: 7,
    name: "Apple Watch",
    description:
      "Fantastic job! Now let Apple Watch help track your daily steps and sleep. You can also incorporate your personal data into our app through Apple Watch.",
    coins: 200,
    jewels: 200,
    isBought: false,
    isActive: false,
  },
];

export async function initializeDocsInFirestore(email: string) {

  await setDoc(doc(db, "rewards", email.toLocaleLowerCase()), {
    coins: 0,
    jewels: 0,
  });
  await setDoc(doc(db, "levels", email), {
    currentLevel: 1,
    experienceToComplete: 5,
    levelRewards: {
      coins: 0,
      jewels: 0,
    },
  });
  await addMultipleItems(initialStoreState, email);
}
