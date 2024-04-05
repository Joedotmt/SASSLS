/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9b8bewh9vamr9xt")

  // remove
  collection.schema.removeField("uchkj1ia")

  // remove
  collection.schema.removeField("k4jjts5r")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9b8bewh9vamr9xt")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uchkj1ia",
    "name": "return_date",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "1990-01-01 12:00:00.000Z",
      "max": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "k4jjts5r",
    "name": "borrow_date",
    "type": "date",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
})
