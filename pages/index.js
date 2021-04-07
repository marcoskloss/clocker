import Link from 'next/link'
import { useFormik } from 'formik'
import * as yup from 'yup'

import { 
  Container,
  Button,
  Box, 
  Input, 
  Text, 
  FormControl, 
  FormLabel, 
  FormHelperText,
} from '@chakra-ui/react'

import firebase, { persistenceMode } from './../config/firebase'

const validationSchema = yup.object().shape({
  email: yup.string().email('Email inválido').required('Preenchimento obrigatório'),
  password: yup.string().required('Preenchimento obrigatório'),
})

export default function Home() {
  const { 
    values, 
    errors, 
    touched, 
    handleChange, 
    handleBlur, 
    handleSubmit,
    isSubmitting
  } = useFormik({
    onSubmit: async (values, form) => {
      firebase.auth().setPersistence(persistenceMode)
      try {
        const user = await firebase.auth().signInWithEmailAndPassword(values.email, values.password)
        console.log(user);
      } catch (e) {
        console.error(e)
      }
    },  
    validationSchema,
    initialValues: {
      email: '',
      username: '',
      password: ''
    }
  })

  return (
    <div style={{height: '100vh', width:'100%', background: '#f5f5fa', display: 'flex', alignItems:'center', justifyContent:'center'}}>
      <Container p={4} centerContent>
        <img src="/assets/logo.svg" alt="Clocker"/>

        <Box>
          <Text p={4} mt={8}>
            Crie sua agenda compartilhada
          </Text>
        </Box>

        <Box width='100%' maxWidth='500px'>
          <FormControl id='email' p={4} isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              size='lg'
              type='email' 
              borderColor='#b1b1b1'
              value={values.email} 
              onChange={handleChange} 
              onBlur={handleBlur}
            />
            {touched.email && <FormHelperText textColor='#e74c3c'>{errors.email}</FormHelperText>}
          </FormControl>

          <FormControl id='password' p={4} isRequired>
            <FormLabel>Senha</FormLabel>
            <Input
              size='lg'
              type='password' 
              borderColor='#b1b1b1'
              placeholder='No mínimo 6 caracteres'
              value={values.password} 
              onChange={handleChange} 
              onBlur={handleBlur}
            />
            {touched.password && <FormHelperText textColor='#e74c3c'>{errors.password}</FormHelperText>}
          </FormControl>

          <Box p={4}>
            <Button colorScheme='blue' width='100%' isLoading={isSubmitting} onClick={handleSubmit}>Entrar</Button>
          </Box>
        </Box>
        <Link href='/signup'>
          <p style={{color: '#a0a0a0', cursor: 'pointer'}}>Ainda não tem uma conta? Cadrastre-se</p>
        </Link>
      </Container>
    </div>
  )
}
