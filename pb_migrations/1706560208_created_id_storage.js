/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "uaplk7w245vdewl",
    "created": "2024-01-29 20:30:08.089Z",
    "updated": "2024-01-29 20:30:08.089Z",
    "name": "id_storage",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "0x5s9ks3",
        "name": "string",
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
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("uaplk7w245vdewl");

  return dao.deleteCollection(collection);
})
