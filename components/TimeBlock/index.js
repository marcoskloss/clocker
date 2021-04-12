import { useFormik, yupToFormErrors } from 'formik'
import * as yup from 'yup'
import { useState } from "react";
import {
  Button,
  Box,   
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  ModalCloseButton, 
  ModalBody, 
  ModalFooter, 
} from "@chakra-ui/react";
import { Input } from '../Input'

function ModalTimeBlock({ isOpen, onClose, children, onComplete }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Faça sua reserva</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {children}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={onComplete}>
              Reservar Horário
            </Button>
            <Button variant="ghost">
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  )
}

export function TimeBlock({ time }) {
  const [isOpen, setIsOpen] = useState(false)
  
  function toggle() {
    setIsOpen(prevState => !prevState)
  }

  const { values, handleSubmit, handleChange, handleBlur, errors, touched } = useFormik({
    onSubmit: () => {},
    initialValues: {
      name: '',
      phone: ''
    },
    validationSchema: yup.object().shape({
      name: yup.string().required('Preenchimento obrigatório'),
      phone: yup.string().required('Preenchimento obrigatório')
    })
  })
  
  return (
    <Button 
      _hover={{
        opacity: '0.8'
      }}
      bg='teal' 
      w={40} h={12} 
      borderRadius='4px' 
      color='#f5f5f5' fontWeight='bold'
      onClick={toggle}
    >
      {time}
      <ModalTimeBlock isOpen={isOpen} onClose={toggle} time={time}>
        <>
          <Input
            label='Nome:'
            name='name' 
            onBlur={handleBlur}
            touched={touched.name}
            error={errors.name}
            value={values.name} 
            onChange={handleChange} 
            focusBorderColor="#298080" 
            placeholder='Digite o seu nome' 
            size='lg' 
          />
          <Box h={4}/>
          <Input 
            label='Telefone:'
            name='phone' 
            onBlur={handleBlur}
            touched={touched.phone}
            error={errors.phone}
            value={values.phone} 
            onChange={handleChange}
            focusBorderColor='#298080' 
            placeholder='(99) 9 9999-9999' 
            size='lg' 
          />
        </>
      </ModalTimeBlock>
    </Button>
  )
}
