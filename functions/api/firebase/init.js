const admin = require("firebase-admin")
const serviceAccount = require("../../service-account.json")
admin.initializeApp({
   credential: admin.credential.cert(serviceAccount),
   databaseURL: "https://roadmap-dev-e584b.firebaseio.com",
})
exports.db = admin.firestore()
exports.auth = admin.auth()
