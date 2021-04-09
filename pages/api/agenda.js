import firebaseServer from "../../config/firebase/server"

const db = firebaseServer.firestore()
const agenda = db.collection('agenda')

export default async (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  if (!token) {
    return res.status(401)
  }

  try {
    const { user_id } = await firebaseServer.auth().verifyIdToken(token)
    const snapshot = await agenda
      .where('userId', '==', user_id)
      .where('when', '==', req.query.when)
      .get()

    return res.status(200).json(snapshot.docs)
  } catch (e) {
    console.log('FB ERROR:', e)
    return res.status(401)
  }
}