import { Box, Spinner } from '@chakra-ui/react'
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useAuth } from '../components/Auth';

export default function Home() {
  const [auth] = useAuth()
  const router = useRouter()
  
    useEffect(() => {
      if (!auth.loading) {
        auth.user 
          ? router.push('/agenda')
          : router.push('/login')
      }
    }, [auth.user])

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