/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("speb2lcq1b576bq")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tqymccan",
    "name": "name",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yk8lma4e",
    "name": "surname",
    "type": "text",
    "required": true,
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
  const collection = dao.findCollectionByNameOrId("speb2lcq1b576bq")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tqymccan",
    "name": "name",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": "/^[a-zA-Z]+$/"
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yk8lma4e",
    "name": "surname",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": "/^[a-zA-Z]+$/"
    }
  }))

  return dao.saveCollection(collection)
})
