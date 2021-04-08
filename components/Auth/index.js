import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios'

import firebaseClient, { persistenceMode } from '../../config/firebase/client'

const AuthContext = createContext([{}, () => {}])

export async function login({ email, password }) {
  firebaseClient.auth().setPersistence(persistenceMode)
  
  try {
    await firebaseClient.auth().signInWithEmailAndPassword(email, password)
    return firebaseClient.auth().currentUser
  } catch (e) {
    console.log('LOGIN ERRRO:', e)
  }
}

export async function signup({ email, password, username }) {
  try {
    await firebaseClient.auth().createUserWithEmailAndPassword(email, password)
    const user = await login({ email, password })
    const token = await user.getIdToken()

    const { data } = await axios({
      method: 'post',
      url: '/api/profile',
      data: { username },
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  } catch (e) {
    console.log('SINGUP ERROR:', e)
  }
} 

export function logout() {
  firebaseClient.auth().signOut()
}

export function useAuth() {
  const [ auth ] = useContext(AuthContext)
  return [auth, { login, logout, signup }]
}

export function AuthProvider({ children }) {
  const [ auth, setAuth ] = useState({
    loading: true,
    user: false
  })

  useEffect(() => {
    const unsubscribe = firebaseClient.auth().onAuthStateChanged(user => {
      setAuth({
        loading: false,
        user
      })
    })

    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={[ auth, setAuth ]}>
      { children }
    </AuthContext.Provider>
  )
}