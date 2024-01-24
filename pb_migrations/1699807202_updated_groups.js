/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pm4dl2jvwzkm11f")

  collection.name = "borrowers_groups"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pm4dl2jvwzkm11f")

  collection.name = "groups"

  return dao.saveCollection(collection)
})
