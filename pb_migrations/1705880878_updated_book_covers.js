/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wckwb8cmrhv690r")

  // remove
  collection.schema.removeField("xlop19ls")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uqqjwknf",
    "name": "image",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wckwb8cmrhv690r")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xlop19ls",
    "name": "image",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "mimeTypes": [],
      "thumbs": [],
      "maxSelect": 1,
      "maxSize": 5242880,
      "protected": false
    }
  }))

  // remove
  collection.schema.removeField("uqqjwknf")

  return dao.saveCollection(collection)
})
