/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("speb2lcq1b576bq")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_vW3m1xR` ON `borrowers` (`legacy_borrower_id`)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("speb2lcq1b576bq")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_vW3m1xR` ON `borrowers` (\n  `borrower_id`,\n  `legacy_borrower_id`\n)"
  ]

  return dao.saveCollection(collection)
})
