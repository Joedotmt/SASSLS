/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rdmfrdj8iithjzw")

  // remove
  collection.schema.removeField("bwneb5v9")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xo8nva0k",
    "name": "subject",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "bf6ilunhc538qjn",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rdmfrdj8iithjzw")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bwneb5v9",
    "name": "subject",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "Melitensia",
        "Non-Fiction",
        "Reference",
        "Poeziji & Drammi",
        "Poetry & Plays",
        "Graphic Novels",
        "French Fiction",
        "Spanish Fiction",
        "Italian Fiction",
        "Maltese Fiction",
        "Spanish",
        "Social  Sciences",
        "Religion",
        "Physics",
        "PE",
        "Maths",
        "Malti",
        "Italian",
        "Hospitality",
        "History",
        "Geography",
        "Science",
        "French",
        "English",
        "Education",
        "Economics",
        "Drama",
        "Design & Tech",
        "Computing",
        "Chemisty",
        "Art",
        "Accounts",
        "Biology"
      ]
    }
  }))

  // remove
  collection.schema.removeField("xo8nva0k")

  return dao.saveCollection(collection)
})
