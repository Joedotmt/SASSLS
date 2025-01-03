/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bf6ilunhc538qjn")

  collection.indexes = [
    "CREATE INDEX `idx_esJdJ7A` ON `books_subjects` (`subject`)"
  ]

  // remove
  collection.schema.removeField("in4j2vte")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bf6ilunhc538qjn")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_j7NI76y` ON `books_subjects` (\n  `subject`,\n  `resource`\n)"
  ]

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "in4j2vte",
    "name": "resource",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
})
