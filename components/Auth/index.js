import { createContext, useContext, useEffect, useState } from 'react';

import firebaseClient, { persistenceMode } from '../../config/firebase/client'

const AuthContext = createContext([{}, () => {}])

export async function login({ email, password }) {
  firebaseClient.auth().setPersistence(persistenceMode)

  try {
    await firebaseClient.auth().signInWithEmailAndPassword(email, password)
  } catch (e) {
    console.log('LOGIN ERRRO:', e)
  }
}

export async function signup({ email, password, username }) {
  // const { data } = axios({
  //   method: 'post',
  //   url: '/api/profile',
  //   data: {
  //     username: values.username
  //   },
  //   header: {
  //     'Authentication': `Bearer ${user.getToken()}`
  //   }
  // })

  try {
    await firebaseClient.auth().createUserWithEmailAndPassword(email, password)
    await login({ email, password })
    // setupProfile(token, username)
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