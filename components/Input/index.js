import { FormControl, FormHelperText, FormLabel, Input as InputBase } from '@chakra-ui/react'

export function Input({ error, touched, label, ...props }) {
  return (
    <FormControl id={props.id}>
      <FormLabel>{label}</FormLabel>
      <InputBase {...props} />
      {touched && <FormHelperText textColor='#e74c2c'>{error}</FormHelperText>}
    </FormControl>
  )
}