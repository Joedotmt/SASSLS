/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rdmfrdj8iithjzw")

  // remove
  collection.schema.removeField("vujpzos4")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "js7tqkpk",
    "name": "tags",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "3xdomym4ndbcv5y",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rdmfrdj8iithjzw")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vujpzos4",
    "name": "tags",
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

  // remove
  collection.schema.removeField("js7tqkpk")

  return dao.saveCollection(collection)
})
