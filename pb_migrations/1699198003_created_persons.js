/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "speb2lcq1b576bq",
    "created": "2023-11-05 15:26:43.029Z",
    "updated": "2023-11-05 15:26:43.029Z",
    "name": "persons",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "tqymccan",
        "name": "name",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "yk8lma4e",
        "name": "surname",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "bepnbpf2",
        "name": "group",
        "type": "select",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "LSE",
            "Teacher",
            "Management",
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
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("speb2lcq1b576bq");

  return dao.deleteCollection(collection);
})
