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
  InputLeftAddon,
  InputGroup
} from '@chakra-ui/react'

import { firebase } from './../config/firebase'

const validationSchema = yup.object().shape({
  email: yup.string().email('Email inválido').required('Preenchimento obrigatório'),
  password: yup.string().required('Preenchimento obrigatório'),
  username: yup.string().required('Preenchimento obrigatório')
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
    onSubmit: (values, form) => {
      console.log(values, form)
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

        <Box>
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
              value={values.password} 
              onChange={handleChange} 
              onBlur={handleBlur}
            />
            {touched.password && <FormHelperText textColor='#e74c3c'>{errors.password}</FormHelperText>}
          </FormControl>

          <FormControl id='username' isRequired>
            <InputGroup size='lg' p={4} pb={0}>
              <InputLeftAddon children='clocker.work/'/>
              <Input
                type='username' 
                value={values.username} 
                borderColor='#b1b1b1'
                onChange={handleChange} 
                onBlur={handleBlur}
              />
            </InputGroup>
              {touched.username && <FormHelperText pl={4} textColor='#e74c3c'>{errors.username}</FormHelperText>}
          </FormControl>

          <Box p={4}>
            <Button colorScheme='blue' width='100%' isLoading={isSubmitting} onClick={handleSubmit}>Entrar</Button>
          </Box>
        </Box>
      </Container>
    </div>
  )
}
