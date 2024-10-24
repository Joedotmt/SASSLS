/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("speb2lcq1b576bq")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zjhyknse",
    "name": "group",
    "type": "select",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "Teacher",
        "Administrator",
        "Maintenance",
        "LSE",
        "8.1",
        "8.2",
        "8.3",
        "8.4",
        "9.1",
        "9.2",
        "9.3",
        "9.4",
        "10.1",
        "10.2",
        "10.3",
        "10.4",
        "11.1",
        "11.2",
        "11.3",
        "11.4",
        "12.1",
        "12.2",
        "12.3",
        "12.4"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("speb2lcq1b576bq")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zjhyknse",
    "name": "group",
    "type": "select",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 24,
      "values": [
        "Teacher",
        "Administrator",
        "Maintenance",
        "LSE",
        "8.1",
        "8.2",
        "8.3",
        "8.4",
        "9.1",
        "9.2",
        "9.3",
        "9.4",
        "10.1",
        "10.2",
        "10.3",
        "10.4",
        "11.1",
        "11.2",
        "11.3",
        "11.4",
        "12.1",
        "12.2",
        "12.3",
        "12.4"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
