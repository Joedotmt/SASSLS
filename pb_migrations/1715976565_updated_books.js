/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rdmfrdj8iithjzw")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hiwwlfnf",
    "name": "level",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 5,
      "values": [
        "Brown",
        "Yellow",
        "Blue",
        "Green",
        "Red"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rdmfrdj8iithjzw")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hiwwlfnf",
    "name": "level",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "Brown",
        "Yellow",
        "Blue",
        "Green",
        "Red"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
