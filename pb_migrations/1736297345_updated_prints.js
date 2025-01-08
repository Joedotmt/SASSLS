/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("yzcqye4he8hnhga")

  // update collection data
  unmarshal({
    "createRule": null,
    "deleteRule": null,
    "listRule": null,
    "updateRule": null
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("yzcqye4he8hnhga")

  // update collection data
  unmarshal({
    "createRule": "",
    "deleteRule": "user = @request.auth.id",
    "listRule": "",
    "updateRule": "user = @request.auth.id"
  }, collection)

  return app.save(collection)
})
