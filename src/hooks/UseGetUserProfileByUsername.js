import { useEffect, useState } from 'react'
import UseShowToast from './UseShowToast';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
import useUserProfileStore from '../store/userProfileStore';

const UseGetUserProfileByUsername = (username) => {
    const [isLoading, setIsLoading] = useState(true);
    const showToast = UseShowToast();
    const { userProfile, setUserProfile } = useUserProfileStore();

    useEffect(() => {
        const getUserProfile = async () => {
            setIsLoading(true)
            try {
                const q = query(collection(firestore, "users"), where("username", "==", username))
                const querySnapshot = await getDocs(q)
                if (querySnapshot.empty) return setUserProfile(null);
                let userDoc;
                querySnapshot.forEach((doc) => {
                    userDoc = doc.data();
                });
                setUserProfile(userDoc);
                console.log(userDoc)
            } catch (error) {
                showToast("Error", error.message, "error")
            }finally {
                setIsLoading(false)
            }
        }

        getUserProfile()
    }, [setUserProfile, username, showToast])
    return {isLoading, userProfile}
}

export default UseGetUserProfileByUsername
