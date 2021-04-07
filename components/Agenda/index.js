import { Button } from "@chakra-ui/button";
import firebase from '../../config/firebase'

export function Agenda() {
  function logout() {
    firebase.auth().signOut()
  }
  
  return (
    <div>
      <Button onClick={logout}>Sair</Button>
    </div>
  )
}