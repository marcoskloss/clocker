import { useEffect, useState } from "react";
import { Box, Spinner } from '@chakra-ui/react'

import { Agenda } from "../components/Agenda";
import { Login } from "../components/Login";
import firebase from '../config/firebase'

export default function Home() {
  const [ auth, setAuth ] = useState({
    loading: true,
    user: null
  })

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setAuth({
        loading: false,
        user
      })
    })
  }, [])

  if (auth.loading) {
    return (
      <Box 
        background='#f5f5fa' 
        width='100%' 
        height='100vh' 
        display='flex' 
        alignItems='center' 
        justifyContent='center'
      >
        <Spinner />
      </Box>
    )
  }

  return auth.user ? <Agenda /> : <Login />
}