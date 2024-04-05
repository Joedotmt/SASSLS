/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9b8bewh9vamr9xt")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "n3sdpbd5",
    "name": "return_type",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9b8bewh9vamr9xt")

  // remove
  collection.schema.removeField("n3sdpbd5")

  return dao.saveCollection(collection)
})
