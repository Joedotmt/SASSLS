/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("6lpadqcc4x5pb3x")

  // update collection data
  unmarshal({
    "viewRule": ""
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("6lpadqcc4x5pb3x")

  // update collection data
  unmarshal({
    "viewRule": null
  }, collection)

  return app.save(collection)
})
