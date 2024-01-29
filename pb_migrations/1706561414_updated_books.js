/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rdmfrdj8iithjzw")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tf4xuimk",
    "name": "book_id",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": 4,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rdmfrdj8iithjzw")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tf4xuimk",
    "name": "book_id",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": 3,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
