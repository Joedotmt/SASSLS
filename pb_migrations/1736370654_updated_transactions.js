/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("9b8bewh9vamr9xt")

  // update field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "speb2lcq1b576bq",
    "hidden": false,
    "id": "5smtfbp4",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "person",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("9b8bewh9vamr9xt")

  // update field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "speb2lcq1b576bq",
    "hidden": false,
    "id": "5smtfbp4",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "person",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
})
