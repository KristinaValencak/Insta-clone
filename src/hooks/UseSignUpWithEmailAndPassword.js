import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { auth, firestore } from '../firebase/firebase'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import UseShowToast from './UseShowToast';
import useAuthStore from '../store/authStore';

const UseSignUpWithEmailAndPassword = () => {
    const [
        createUserWithEmailAndPassword,
        ,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    const showToast = UseShowToast()
    const loginUser = useAuthStore(state => state.login)
    
    const signup = async (inputs) => {
        if (!inputs.email || !inputs.password || !inputs.username || !inputs.fullname) {
showToast("Error", "Please fill all the fields", "error")
            return
        }

        const usersRef = collection(firestore, "users");
        const q = query(usersRef, where("username", "==", inputs.username));
        const querySnapshots = await getDocs(q);

        if (!querySnapshots.empty){
            showToast("Error", "Username already exists", "error");
            return;
        }
        
        try {
            const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);
            if (!newUser && error) {
                showToast("Error", error.message, "error")
                return;
            }
            if (newUser) {
                const userDoc = {
                    uid: newUser.user.uid,
                    email: inputs.email,
                    username: inputs.username,
                    fullname: inputs.fullname,
                    bio: "",
                    profilePicURL: "",
                    followers: [],
                    following: [],
                    posts: [],
                    createdAt: Date.now()
                }
                await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
                localStorage.setItem("user-info", JSON.stringify(userDoc))
                loginUser(userDoc)
                //https://firebase.google.com/docs/firestore/manage-data/add-data#add_a_document
            }
        } catch (error) {
            showToast("Error", error.message, "error")
        }
    }

    return {
        loading, error, signup

    }
}

export default UseSignUpWithEmailAndPassword


//https://github.com/CSFrequency/react-firebase-hooks?tab=readme-ov-file