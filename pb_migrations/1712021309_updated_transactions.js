/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9b8bewh9vamr9xt")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_LW95pvg` ON `transactions` (\n  `person`,\n  `book`,\n  `returned`\n)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9b8bewh9vamr9xt")

  collection.indexes = [
    "CREATE INDEX `idx_LW95pvg` ON `transactions` (\n  `person`,\n  `book`\n)"
  ]

  return dao.saveCollection(collection)
})
