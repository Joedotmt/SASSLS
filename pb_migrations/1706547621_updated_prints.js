/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("yzcqye4he8hnhga")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "eq5rki2o",
    "name": "paper",
    "type": "select",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "A4",
        "A5",
        "A3"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("yzcqye4he8hnhga")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "eq5rki2o",
    "name": "paper",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "A4",
        "A5",
        "A3"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
