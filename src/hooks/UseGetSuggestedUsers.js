import { useEffect, useState } from 'react'
import useAuthStore from '../store/authStore'
import UseShowToast from './UseShowToast'
import { collection, doc, getDocs, limit, orderBy, query, where } from 'firebase/firestore'
import { firestore } from '../firebase/firebase'

const UseGetSuggestedUsers = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [suggestedUsers, setSuggestedUsers] = useState([])
    const authUser = useAuthStore(state => state.user)
    const showToast = UseShowToast()

    useEffect(() => {
        const getSuggestedUsers = async () => {
            setIsLoading(true)
            try {
                const usersRef = collection(firestore, "users")
                const q = query(
                    usersRef,
                    where("uid", "not-in", [authUser.uid, ...authUser.following]),
                    orderBy("uid"),
                    limit(3)
                )
                const querySnapshot = await getDocs(q)
                const users = []
                querySnapshot.forEach(doc => {
                    users.push({ ...doc.data(), id: doc.id })
                })
                setSuggestedUsers(users)

            } catch (error) {
                showToast("Error", error.message, "error")
            } finally {
                setIsLoading(false)
            }
        }
        if (authUser) getSuggestedUsers()
    }, [authUser, showToast])
    return { isLoading, suggestedUsers }
}

export default UseGetSuggestedUsers
