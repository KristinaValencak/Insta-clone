import { useState } from 'react'
import UseShowToast from './UseShowToast'
import { collection, doc, getDocs, query, where } from 'firebase/firestore'
import { firestore } from '../firebase/firebase'

const UseSearchUser = () => {
 const [isLoading, setIsLoading] = useState(false)
 const [user, setUser]= useState(null)
 const showToast = UseShowToast()

 const getUserProfile = async(username)=> {
    setIsLoading(true)
    setUser(null)
    try {
        const q = query(collection(firestore, "users"), where("username", "==", username))
        const querySnapshot = await getDocs(q)
        if(querySnapshot.empty) return showToast("Error", "User not found", error)

        querySnapshot.forEach((doc)=>{
            setUser(doc.data())
        })
    } catch (error) {
        showToast("Error", "User not found", "error")
        setUser(null)
    }finally{
        setIsLoading(false)
    }
 }
 return {isLoading, getUserProfile, user, setUser}
}

export default UseSearchUser
