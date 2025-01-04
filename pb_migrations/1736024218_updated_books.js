/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("rdmfrdj8iithjzw")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE INDEX `idx_4uoNzrN` ON `books` (`legacy_book_id`)"
    ]
  }, collection)

  // remove field
  collection.fields.removeById("tf4xuimk")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("rdmfrdj8iithjzw")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_rmatcia` ON `books` (`book_id`)",
      "CREATE INDEX `idx_4uoNzrN` ON `books` (`legacy_book_id`)"
    ]
  }, collection)

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "tf4xuimk",
    "max": 4,
    "min": 0,
    "name": "book_id",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": true,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
})
