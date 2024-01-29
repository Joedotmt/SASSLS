/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uaplk7w245vdewl")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "1lvflcth",
    "name": "amount_used",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uaplk7w245vdewl")

  // remove
  collection.schema.removeField("1lvflcth")

  return dao.saveCollection(collection)
})
