import { Button, Container, Box, IconButton, SimpleGrid, Spinner } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'

import { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import axios from 'axios'
import { addDays, subDays } from 'date-fns'
import { useFetch } from '@refetty/react'

import { useAuth } from "../components/Auth";
import { formatDate } from '../components/Date'
import { Logo } from "../components/Logo";
import { TimeBlock } from '../components/TimeBlock'

async function getSchedule(when) {
  return axios({
    method: 'get',
    url: '/api/schedule',
    params: { when, username: window.location.pathname },
  })
}

function Header({ children }) {
  return (
    <Box width='100%' p={4} display='flex' alignItems='center' justifyContent='space-between'>
      { children}
    </Box>
  )
}

export default function Schedule() {
  const [auth, { logout }] = useAuth()
  const router = useRouter()

  const [when, setWhen] = useState(() => new Date())
  const [ data, {loading, status, error}, fetch ] = useFetch(getSchedule, { lazy: true })

  
  function addDay() {
    return addDays(when, 1);
  }
  
  function removeDay() {
    return subDays(when, 1);
  }

  useEffect(() => {
    fetch(when)
  }, [when])

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

        {loading && <Spinner mt={70} thickness='4px' speed='0.65s' color='teal' size='xl'/>}
        <SimpleGrid mt={50} p={4} columns={2} spacingX={8} spacingY={6}>
          {data?.map((item, index) => <TimeBlock time={item}  key={index} />)}         
        </SimpleGrid>

      </Container>
    </div>
  )
}