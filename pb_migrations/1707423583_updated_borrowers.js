/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("speb2lcq1b576bq")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_zzqb2bG` ON `borrowers` (`borrower_id`)"
  ]

  // remove
  collection.schema.removeField("3hqmr25k")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("speb2lcq1b576bq")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_vW3m1xR` ON `borrowers` (`legacy_borrower_id`)",
    "CREATE INDEX `idx_zzqb2bG` ON `borrowers` (`borrower_id`)"
  ]

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3hqmr25k",
    "name": "legacy_borrower_id",
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
})
