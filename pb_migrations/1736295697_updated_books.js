/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("rdmfrdj8iithjzw")

  // update collection data
  unmarshal({
    "listRule": "@request.auth.id != \"\""
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("rdmfrdj8iithjzw")

  // update collection data
  unmarshal({
    "listRule": ""
  }, collection)

  return app.save(collection)
})