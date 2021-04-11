import { Button, Container, Box, IconButton } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'

import { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import axios from 'axios'
import { addDays, subDays } from 'date-fns'
import { useFetch } from '@refetty/react'

import { useAuth } from "../components/Auth";
import { getToken } from "../config/firebase/client";
import { formatDate } from '../components/Date'
import { Logo } from "../components/Logo";

async function getAgenda(when) {
  const token = await getToken()
  
  return axios({
    method: 'get',
    url: '/api/agenda',
    params: { when },
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

function Header({ children }) {
  return (
    <Box width='100%' p={4} display='flex' alignItems='center' justifyContent='space-between'>
      { children}
    </Box>
  )
}

export default function Agenda() {
  const [auth, { logout }] = useAuth()
  const router = useRouter()

  const [when, setWhen] = useState(() => new Date())
  const [ data, {loading, status, error}, fetch ] = useFetch(getAgenda, { lazy: true })

  useEffect(() => {
    !auth.user && router.push('/')
  }, [auth.user])

  useEffect(() => {
    fetch(when)
  }, [when])

  function addDay() {
    return addDays(when, 1);
  }

  function removeDay() {
    return subDays(when, 1);
  }

  return (
    <div style={{ height: '100vh', width: '100%', background: '#f5f5fa', display: 'flex', justifyContent: 'center' }}>
      <Container centerContent maxW='1200px' w='100%' p={2}>
        <Header>
          <Logo size={140} />
          <Button borderColor='teal' color='teal' _hover={{ bg: 'teal', color: '#f5f5f5' }} variant="outline" onClick={logout}>
            Sair
            </Button>
        </Header>

        <Box bg='#ebebf3' borderRadius='4px' display='flex' alignItems='center' justifyContent='center' maxW='400px' w='99%' mt={14}>
          <IconButton
            icon={<ChevronLeftIcon />}
            bg='transparent'
            borderRadius='4px 0 0 4px'
            _hover={{ bg: 'teal', color: '#f5f5f5' }}
            onClick={() => setWhen(removeDay)}
          />
          <Box flex='1' textAlign='center'>{formatDate(when, 'PPPP')}</Box>
          <IconButton
            icon={<ChevronRightIcon />}
            bg='transparent'
            borderRadius='0 4px 4px 0'
            _hover={{ bg: 'teal', color: '#f5f5f5' }}
            onClick={() => setWhen(addDay)}
          />
        </Box>

      </Container>
    </div>
  )
}