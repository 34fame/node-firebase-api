const fs = require("./api/firebase/firestore")
const uid = require("tiny-uid")

exports.get = async (props) => {
   const { collection, collectionId, subcollection, subcollectionId, where, orderBy } = props
   let payload = { collection, collectionId, subcollection, subcollectionId, where, orderBy }
   return await fs.dbGet(payload)
   .then(result => {
      return result
   })
   .catch(err => {
      console.error(err)
      return false
   })
}

exports.add = async (props) => {
   const { collection, collectionId, subcollection, subcollectionId, item } = props
   let payload = { collection, collectionId, subcollection, subcollectionId, item }
   let result = await fs.dbAdd(payload)

   if (result) {
      return item
   } else {
      return false
   }
}

exports.update = async (props) => {
   const { collection, collectionId, subcollection, subcollectionId, updates } = props
   let payload = { collection, collectionId, subcollection, subcollectionId, updates }
   let result = await fs.dbUpdate(payload)
   return !!result
}

exports.delete = async (props) => {
   const { collection, collectionId, subcollection, subcollectionId } = props
   let payload = { collection, collectionId, subcollection, subcollectionId }
   let result = await fs.dbDelete(payload)
   return !!result
}
