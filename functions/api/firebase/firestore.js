const init = require("./init")

exports.dbGet = props => {
   return new Promise(async (resolve, reject) => {
      const {
         collection,
         collectionId,
         subcollection,
         subcollectionId,
         collectionGroup,
         where,
         orderBy,
      } = props

      let queryType = "many"
      let queryRef = null

      if (collectionGroup) {
         queryRef = init.db.collectionGroup(collectionGroup)
      } else {
         queryRef = init.db.collection(collection)

         if (collectionId) {
            queryType = "one"
            queryRef = queryRef.doc(collectionId)
         }

         if (subcollection) {
            queryType = "many"
            queryRef = queryRef.collection(subcollection)
         }

         if (subcollectionId) {
            queryType = "one"
            queryRef = queryRef.doc(subcollectionId)
         }
      }

      if (where) {
         queryRef = queryRef.where(where[0], where[1], where[2])
      }

      if (orderBy) {
         queryRef = queryRef.orderBy(orderBy)
      }

      let response = await queryRef
      .get()
      .then(result => {
         if (queryType === "one") {
            if (result.exists) {
               let doc = {
                  ...result.data(),
                  id: result.id,
               }
               return doc
            } else {
               return false
            }
         }

         if (queryType === "many") {
            let documents = []
            result.docs.map(item => {
               let doc = {
                  ...item.data(),
                  id: item.id,
               }
               documents.push(doc)
            })

            return documents
         }
      })
      .catch(err => {
         console.error("dbGet", "err", err)
         return false
      })

      if (response) {
         resolve(response)
      } else {
         reject(response)
      }
   })
}

exports.dbAdd = props => {
   return new Promise((resolve, reject) => {
      const {
         collection,
         collectionId,
         subcollection,
         subcollectionId,
         item,
      } = props

      let payload = {
         ...item,
         id: subcollectionId ? subcollectionId : collectionId,
      }

      let dbRef = init.db.collection(collection)
      dbRef = dbRef.doc(collectionId)

      if (subcollection) {
         dbRef = dbRef.collection(subcollection)
         dbRef = dbRef.doc(subcollectionId)
      }

      let result = dbRef
      .set(payload)
      .then(() => {
         return true
      })
      .catch(err => {
         console.log("firebase", "dbAdd", "err", err)
         return false
      })

      if (result) {
         resolve(true)
      } else {
         reject(false)
      }
   })
}

exports.dbUpdate = props => {
   return new Promise(async (resolve, reject) => {
      const {
         collection,
         collectionId,
         subcollection,
         subcollectionId,
         updates,
      } = props

      let payload = {
         ...updates,
      }
      let dbRef = init.db.collection(collection)
      dbRef = dbRef.doc(collectionId)

      if (subcollection) {
         dbRef = dbRef.collection(subcollection)
         dbRef = dbRef.doc(subcollectionId)
      }

      let response = await dbRef
      .update(payload)
      .then(() => {
         return true
      })
      .catch(err => {
         console.error("dbUpdate", "err", err)
         return false
      })

      if (response) {
         resolve(response)
      } else {
         reject(response)
      }
   })
}

exports.dbDelete = props => {
   return new Promise((resolve, reject) => {
      const { collection, collectionId, subcollection, subcollectionId } = props

      let dbRef = init.db.collection(collection)
      dbRef = dbRef.doc(collectionId)
      if (subcollection) {
         dbRef = dbRef.collection(subcollection)
         dbRef = dbRef.doc(subcollectionId)
      }

      dbRef
      .delete()
      .then(result => {
         resolve(subcollectionId ? subcollectionId : collectionId)
      })
      .catch(err => {
         console.log("dbDelete", "end", "err", err)
         reject(false)
      })
   })
}
