/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("speb2lcq1b576bq")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_vW3m1xR` ON `borrowers` (`borrower_id`)"
  ]

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vgbr4ijh",
    "name": "borrower_id",
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

  collection.indexes = []

  // remove
  collection.schema.removeField("vgbr4ijh")

  return dao.saveCollection(collection)
})
