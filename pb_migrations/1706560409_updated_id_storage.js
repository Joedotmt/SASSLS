/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uaplk7w245vdewl")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zksxo9im",
    "name": "note",
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
  const collection = dao.findCollectionByNameOrId("uaplk7w245vdewl")

  // remove
  collection.schema.removeField("zksxo9im")

  return dao.saveCollection(collection)
})
