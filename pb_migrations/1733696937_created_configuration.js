/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "uh8j3gj6v7tnuz5",
    "created": "2024-12-08 22:28:57.902Z",
    "updated": "2024-12-08 22:28:57.902Z",
    "name": "configuration",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "mm8kajim",
        "name": "Logo",
        "type": "file",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "mimeTypes": [
            "image/png"
          ],
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
  const collection = dao.findCollectionByNameOrId("uh8j3gj6v7tnuz5");

  return dao.deleteCollection(collection);
})
