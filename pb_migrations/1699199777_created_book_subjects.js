/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "bf6ilunhc538qjn",
    "created": "2023-11-05 15:56:17.004Z",
    "updated": "2023-11-05 15:56:17.004Z",
    "name": "book_subjects",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "cvcvaaei",
        "name": "subject",
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
  const collection = dao.findCollectionByNameOrId("bf6ilunhc538qjn");

  return dao.deleteCollection(collection);
})
