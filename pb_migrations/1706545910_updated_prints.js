/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("yzcqye4he8hnhga")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "s4xdxvzp",
    "name": "pages",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "eq5rki2o",
    "name": "paper",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "A4",
        "A5",
        "A3"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "n9ynxikf",
    "name": "printed",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bu9uiwqe",
    "name": "money_recived",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bimt24oc",
    "name": "given",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("yzcqye4he8hnhga")

  // remove
  collection.schema.removeField("s4xdxvzp")

  // remove
  collection.schema.removeField("eq5rki2o")

  // remove
  collection.schema.removeField("n9ynxikf")

  // remove
  collection.schema.removeField("bu9uiwqe")

  // remove
  collection.schema.removeField("bimt24oc")

  return dao.saveCollection(collection)
})
