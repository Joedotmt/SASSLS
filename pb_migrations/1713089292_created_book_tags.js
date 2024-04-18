/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "3xdomym4ndbcv5y",
    "created": "2024-04-14 10:08:12.797Z",
    "updated": "2024-04-14 10:08:12.797Z",
    "name": "book_tags",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "8vkcymfb",
        "name": "tag",
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
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("3xdomym4ndbcv5y");

  return dao.deleteCollection(collection);
})
