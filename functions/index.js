const functions = require("firebase-functions")
const uid = require("tiny-uid")
const express = require("express")

const db = require("./db")

const app = express()

app.use(express.json())
app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*")
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
   res.header("Access-Control-Allow-Methods", "*")
   next()
})

// Get all collection items
app.get("/:collection", async (req, res) => {
   const collection = req.params.collection
   res.send(await db.get({collection}))
})

// Get collection item
app.get('/:collection/:collectionId', async (req, res) => {
   const collection = req.params.collection
   const collectionId = req.params.collectionId
   let item = await db.get({collection, collectionId})
   if (item) {
      res.send(item)
   } else {
      res.status(404).send('Item not found')
   }
})

// Create collection item
app.post('/:collection', async (req, res) => {
   const collection = req.params.collection
   let item = req.body
   let collectionId = uid()
   item.id = collectionId
   item = await db.add({collection, collectionId, item})
   res.send(item)
})

// Update collection item
app.put('/:collection/:collectionId', async (req, res) => {
   const collection = req.params.collection
   const collectionId = req.params.collectionId
   let updates = req.body
   item = await db.update({collection, collectionId, updates})
   if (item) {
      res.send(item)
   } else {
      res.status(400).send('Update failed')
   }

})

// Delete collection item
app.delete('/:collection/:collectionId', async (req, res) => {
   const collection = req.params.collection
   const collectionId = req.params.collectionId
   let result = await db.delete({collection, collectionId})
   if (result) {
      res.send(result)
   } else {
      res.status(400).send('Delete failed')
   }
})

exports.api = functions.https.onRequest(app)
