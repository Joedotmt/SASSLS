/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rdmfrdj8iithjzw")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_rmatcia` ON `books` (\n  `legacy_book_id`,\n  `book_id`\n)"
  ]

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tf4xuimk",
    "name": "book_id",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": 3,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rdmfrdj8iithjzw")

  collection.indexes = []

  // remove
  collection.schema.removeField("tf4xuimk")

  return dao.saveCollection(collection)
})
