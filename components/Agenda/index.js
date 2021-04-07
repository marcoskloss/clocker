import { Button } from "@chakra-ui/button";
import { firebaseClient } from '../../config/firebase'

export function Agenda() {
  function logout() {
    firebaseClient.auth().signOut()
  }
  
  return (
    <div>
      <Button onClick={logout}>Sair</Button>
    </div>
  )
}