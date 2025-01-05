/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("speb2lcq1b576bq")

  // update field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "zjhyknse",
    "maxSelect": 1,
    "name": "group",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "select",
    "values": [
      "Teacher",
      "Admin",
      "Maintenance",
      "LSE",
      "8.1",
      "8.2",
      "8.3",
      "8.4",
      "9.1",
      "9.2",
      "9.3",
      "9.4",
      "10.1",
      "10.2",
      "10.3",
      "10.4",
      "11.1",
      "11.2",
      "11.3",
      "11.4",
      "12.1",
      "12.2",
      "12.3",
      "12.4",
      "Other"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("speb2lcq1b576bq")

  // update field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "zjhyknse",
    "maxSelect": 1,
    "name": "group",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "select",
    "values": [
      "Teacher",
      "Admin",
      "Maintenance",
      "LSE",
      "8.1",
      "8.2",
      "8.3",
      "8.4",
      "9.1",
      "9.2",
      "9.3",
      "9.4",
      "10.1",
      "10.2",
      "10.3",
      "10.4",
      "11.1",
      "11.2",
      "11.3",
      "11.4",
      "12.1",
      "12.2",
      "12.3",
      "12.4"
    ]
  }))

  return app.save(collection)
})
