/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bf6ilunhc538qjn")

  collection.name = "books_subjects"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bf6ilunhc538qjn")

  collection.name = "book_subjects"

  return dao.saveCollection(collection)
})
