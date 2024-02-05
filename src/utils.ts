import { User } from "firebase/auth";
import {
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
  getDoc,
  query,
  where,
  deleteDoc,
  DocumentReference,
  onSnapshot,
} from "firebase/firestore";
import useApp from "./hooks/useApp";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import sha256 from "crypto-js/sha256";
import {
  useCollectionData,
  useDocument,
  useDocumentData,
} from "react-firebase-hooks/firestore";

function hashString(str: string) {
  const hashedStr = sha256(str).toString();
  return hashedStr;
}

export function useCFirestore() {
  const { db, auth } = useApp();
  const [user] = useAuthState(auth);
  const [isCrushExceeded, setCrushIsExceeded] = useState(false);
  const [crushList, setCrushList] = useState<string[][]>([]);
  const [loadingCrushList, setLoadingCrushList] = useState(false);
  const [errorCrushList, setErrorCrushList] = useState(false);

  useEffect(() => {
    if (user) {
      const unsub = onSnapshot(
        doc(db, "yourcrush", user.uid),
        { includeMetadataChanges: true },
        (doc) => {
          let data = doc.data();
          console.log(data);
          if (data) {
            setCrushList(data.crushHash);
          }
        }
      );
      return unsub;
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      setLoadingCrushList(true);
      getCrushList(user)
        .then((crushList) => {
          setCrushList(crushList);
          setLoadingCrushList(false);
        })
        .catch((e) => {
          setErrorCrushList(true);
          setLoadingCrushList(false);
        });
    }
  }, [user]);

  useEffect(() => {
    const checkCrushLimit = async () => {
      const limitExceeded = await isExceeded(user);
      setCrushIsExceeded(limitExceeded);
    };
    if (user) checkCrushLimit();
  }, [user]);

  async function addCrush(user: any, crushHash: string) {
    try {
      if (await isExceeded(user)) {
        console.log("Maximum crush limit reached");
        return { error: "Maximum crush limit reached" };
      }

      const docRef = doc(db, "yourcrush", user.uid);
      const docData = await getDocData(docRef);

      const updatedCrushHashes = docData.crushHash
        ? [...docData.crushHash, crushHash]
        : [crushHash];

      await setDoc(docRef, {
        ...docData,
        crushHash: updatedCrushHashes,
      });

      return { success: true };
    } catch (e) {
      console.error("Error adding document: ", e);
      return { error: `${e}` };
    }
  }

  async function isExceeded(user: any) {
    try {
      const docRef = doc(db, "yourcrush", user.uid);
      const docData = await getDocData(docRef);

      return docData.crushHash?.length >= 1 || false;
    } catch (e) {
      console.error("Error checking crush limit: ", e);
      return true;
    }
  }

  async function getDocData(docRef: DocumentReference<any>) {
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : {};
  }

  async function getCrushList(user: any) {
    try {
      const docRef = doc(db, "yourcrush", user.uid);
      const docData = await getDocData(docRef);

      return docData.crushHash;
    } catch (e) {
      console.error("Error getting crush list: ", e);
      return [];
    }
  }

  return {
    addCrush,
    isCrushExceeded,
    crushList,
    loadingCrushList,
    errorCrushList,
    getCrushList,
    isExceeded,
  };
}
