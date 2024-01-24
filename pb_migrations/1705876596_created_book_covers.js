/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "wckwb8cmrhv690r",
    "created": "2024-01-21 22:36:36.572Z",
    "updated": "2024-01-21 22:36:36.572Z",
    "name": "book_covers",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "nbtuxeem",
        "name": "isbn",
        "type": "text",
        "required": false,
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
        "id": "xlop19ls",
        "name": "image",
        "type": "file",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "mimeTypes": [],
          "thumbs": [],
          "maxSelect": 1,
          "maxSize": 5242880,
          "protected": false
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
  const collection = dao.findCollectionByNameOrId("wckwb8cmrhv690r");

  return dao.deleteCollection(collection);
})
