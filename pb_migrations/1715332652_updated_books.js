/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rdmfrdj8iithjzw")

  // remove
  collection.schema.removeField("zhegckpz")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rdmfrdj8iithjzw")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zhegckpz",
    "name": "location",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "shelf",
        "lost",
        "scrapped",
        "borrowing"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
