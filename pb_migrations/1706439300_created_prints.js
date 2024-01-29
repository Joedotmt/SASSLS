/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "yzcqye4he8hnhga",
    "created": "2024-01-28 10:55:00.593Z",
    "updated": "2024-01-28 10:55:00.593Z",
    "name": "prints",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "uoqxxqbs",
        "name": "email",
        "type": "relation",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "ufdtaxr5",
        "name": "files",
        "type": "file",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "mimeTypes": [],
          "thumbs": [],
          "maxSelect": 99,
          "maxSize": 10000000,
          "protected": false
        }
      },
      {
        "system": false,
        "id": "zcf98plj",
        "name": "note",
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
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("yzcqye4he8hnhga");

  return dao.deleteCollection(collection);
})
