/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("speb2lcq1b576bq")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_zzqb2bG` ON `borrowers` (`borrower_id`)",
    "CREATE UNIQUE INDEX `idx_ZTUVSFP` ON `borrowers` (`borrower_id`)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("speb2lcq1b576bq")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_zzqb2bG` ON `borrowers` (`borrower_id`)"
  ]

  return dao.saveCollection(collection)
})
