"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/schemas/cuisine.schema.ts
var cuisine_schema_exports = {};
__export(cuisine_schema_exports, {
  cuisineBodySchema: () => cuisineBodySchema,
  cuisineParamsSchema: () => cuisineParamsSchema,
  cuisineQuerySchema: () => cuisineQuerySchema
});
module.exports = __toCommonJS(cuisine_schema_exports);
var import_zod = require("zod");
var cuisineBodySchema = import_zod.z.object({
  name: import_zod.z.string().min(1, "O nome da cozinha n\xE3o pode ser vazio").max(150)
});
var cuisineParamsSchema = import_zod.z.object({
  id: import_zod.z.string().uuid("O ID deve ser um formato UUID v\xE1lido!")
});
var cuisineQuerySchema = import_zod.z.object({
  page: import_zod.z.coerce.number().default(1),
  limit: import_zod.z.coerce.number().default(10)
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  cuisineBodySchema,
  cuisineParamsSchema,
  cuisineQuerySchema
});
