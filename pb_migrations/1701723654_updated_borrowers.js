/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("speb2lcq1b576bq")

  collection.listRule = "@request.auth.collectionName = \"users\""
  collection.viewRule = "@request.auth.collectionName = \"users\""
  collection.createRule = "@request.auth.collectionName = \"users\""
  collection.updateRule = "@request.auth.collectionName = \"users\""
  collection.deleteRule = "@request.auth.collectionName = \"users\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("speb2lcq1b576bq")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
