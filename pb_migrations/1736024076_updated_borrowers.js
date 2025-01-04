/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("speb2lcq1b576bq")

  // update collection data
  unmarshal({
    "indexes": []
  }, collection)

  // remove field
  collection.fields.removeById("vgbr4ijh")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("speb2lcq1b576bq")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_ZTUVSFP` ON `borrowers` (`borrower_id`)"
    ]
  }, collection)

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "vgbr4ijh",
    "max": 3,
    "min": 0,
    "name": "borrower_id",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": true,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
})
