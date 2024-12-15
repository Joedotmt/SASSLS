/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "6lpadqcc4x5pb3x",
    "created": "2024-12-08 22:34:43.265Z",
    "updated": "2024-12-08 22:34:43.265Z",
    "name": "configuration",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "f2mdlfvk",
        "name": "logo",
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
      },
      {
        "system": false,
        "id": "memidqkb",
        "name": "email_domain",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
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
  const collection = dao.findCollectionByNameOrId("6lpadqcc4x5pb3x");

  return dao.deleteCollection(collection);
})
