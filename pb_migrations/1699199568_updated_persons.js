/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("speb2lcq1b576bq")

  // remove
  collection.schema.removeField("bepnbpf2")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xur6cuul",
    "name": "group",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "pm4dl2jvwzkm11f",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("speb2lcq1b576bq")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bepnbpf2",
    "name": "group",
    "type": "select",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "LSE",
        "Teacher",
        "Management",
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

  // remove
  collection.schema.removeField("xur6cuul")

  return dao.saveCollection(collection)
})
