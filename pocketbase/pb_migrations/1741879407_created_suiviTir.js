/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = new Collection({
    "createRule": "",
    "deleteRule": null,
    "fields": [
      {
        "autogeneratePattern": "[a-z0-9]{15}",
        "hidden": false,
        "id": "text3208210256",
        "max": 15,
        "min": 15,
        "name": "id",
        "pattern": "^[a-z0-9]+$",
        "presentable": false,
        "primaryKey": true,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
        "hidden": false,
        "id": "autodate2862495610",
        "name": "date",
        "onCreate": true,
        "onUpdate": false,
        "presentable": false,
        "system": false,
        "type": "autodate"
      },
      {
        "hidden": false,
        "id": "number497739336",
        "max": null,
        "min": null,
        "name": "licence",
        "onlyInt": false,
        "presentable": false,
        "required": true,
        "system": false,
        "type": "number"
      },
      {
        "hidden": false,
        "id": "select1056243103",
        "maxSelect": 1,
        "name": "pastir",
        "presentable": false,
        "required": true,
        "system": false,
        "type": "select",
        "values": [
          "10M",
          "25M",
          "50M"
        ]
      }
    ],
    "id": "pbc_3341114217",
    "indexes": [],
    "listRule": "",
    "name": "suiviTir",
    "system": false,
    "type": "base",
    "updateRule": null,
    "viewRule": ""
  });

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3341114217");

  return app.delete(collection);
})
