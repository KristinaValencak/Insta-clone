import { useSignOut } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase';
import UseShowToast from './UseShowToast';
import useAuthStore from '../store/authStore';

const UseLogout = () => {
    const [signOut, isLoggingOut, error] = useSignOut(auth);
    const showToast = UseShowToast()
    const logoutUser = useAuthStore((state) => state.logout)
    const handleLogout = async () =>{
        try {
            await signOut();
            localStorage.removeItem('user-info')
            logoutUser();
        } catch (error) {
            showToast("Error", error.message, "error")
        }
    }


  return {handleLogout, isLoggingOut, error}
}

export default UseLogout
