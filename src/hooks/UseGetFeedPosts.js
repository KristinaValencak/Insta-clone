import React, { useEffect, useState } from 'react'
import usePostStore from '../store/postStore'
import useAuthStore from '../store/authStore'
import UseShowToast from './UseShowToast'
import useUserProfileStore from '../store/userProfileStore'
import { collection, doc, getDocs, query, where } from 'firebase/firestore'
import { firestore } from '../firebase/firebase'
import { a } from 'framer-motion/client'

const UseGetFeedPosts = () => {
  const [isLoading, setIsLoading]= useState(true)
  const {posts, setPosts} = usePostStore()
  const authUser = useAuthStore((state) => state.user)
  const showToast = UseShowToast()
  const {setUserProfile} = useUserProfileStore()
  useEffect(()=> {
    const getFeedPosts = async ()=> {
        setIsLoading(true)
        if(authUser.following.length === 0) {
            setIsLoading(false)
            setPosts([])
            return
        }
        const q = query(collection(firestore, "posts"), where("createdBy", "in", authUser.following))
        try {
            const querySnapshot = await getDocs(q)
            const feedPosts = []

            querySnapshot.forEach(doc=> {
                feedPosts.push({id:doc.id, ...doc.data()})
            })
            feedPosts.sort((a,b)=> b.createdAt - a.createdAt)
            setPosts(feedPosts)
        } catch (error) {
            showToast("Error", error.message, "error")
        }finally{
            setIsLoading(false)
        }
    }
    if(authUser) getFeedPosts()

  }, [authUser, showToast, setPosts, setUserProfile])
  return {isLoading, posts}
}

export default UseGetFeedPosts
