/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("speb2lcq1b576bq")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_vW3m1xR` ON `borrowers` (\n  `borrower_id`,\n  `legacy_borrower_id`\n)"
  ]

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3hqmr25k",
    "name": "legacy_borrower_id",
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

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_vW3m1xR` ON `borrowers` (`borrower_id`)"
  ]

  // remove
  collection.schema.removeField("3hqmr25k")

  return dao.saveCollection(collection)
})
