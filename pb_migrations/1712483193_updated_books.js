/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rdmfrdj8iithjzw")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_rmatcia` ON `books` (`book_id`)",
    "CREATE INDEX `idx_4uoNzrN` ON `books` (`legacy_book_id`)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rdmfrdj8iithjzw")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_rmatcia` ON `books` (`book_id`)",
    "CREATE UNIQUE INDEX `idx_4uoNzrN` ON `books` (`legacy_book_id`)"
  ]

  return dao.saveCollection(collection)
})
