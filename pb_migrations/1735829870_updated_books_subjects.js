/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bf6ilunhc538qjn")

  collection.indexes = [
    "CREATE INDEX `idx_3dEQIVN` ON `books_subjects` (`n`)"
  ]

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cvcvaaei",
    "name": "n",
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bf6ilunhc538qjn")

  collection.indexes = [
    "CREATE INDEX `idx_esJdJ7A` ON `books_subjects` (`subject`)"
  ]

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cvcvaaei",
    "name": "subject",
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
