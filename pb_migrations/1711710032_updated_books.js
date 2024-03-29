/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rdmfrdj8iithjzw")

  // update
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rdmfrdj8iithjzw")

  // update
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
        "Maltese FictionSpanish",
        "Social Sciences",
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

  return dao.saveCollection(collection)
})
