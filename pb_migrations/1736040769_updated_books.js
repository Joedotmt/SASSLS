/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("rdmfrdj8iithjzw")

  // update collection data
  unmarshal({
    "indexes": []
  }, collection)

  // update field
  collection.fields.addAt(17, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "2ffuzyv8",
    "max": 0,
    "min": 0,
    "name": "legacy_book_id",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("rdmfrdj8iithjzw")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE INDEX `idx_4uoNzrN` ON `books` (`legacy_book_id`)"
    ]
  }, collection)

  // update field
  collection.fields.addAt(17, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "2ffuzyv8",
    "max": 0,
    "min": 0,
    "name": "legacy_book_id",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": true,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
})
