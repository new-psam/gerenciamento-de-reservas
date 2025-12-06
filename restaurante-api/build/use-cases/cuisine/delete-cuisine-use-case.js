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

// src/use-cases/cuisine/delete-cuisine-use-case.ts
var delete_cuisine_use_case_exports = {};
__export(delete_cuisine_use_case_exports, {
  DeleteCuisineUseCase: () => DeleteCuisineUseCase
});
module.exports = __toCommonJS(delete_cuisine_use_case_exports);
var DeleteCuisineUseCase = class {
  constructor(cuisineRepository) {
    this.cuisineRepository = cuisineRepository;
  }
  async execute(id) {
    if (!id) {
      throw new Error("O Id da cozinha \xE9 obrigat\xF3rio para exclus\xE3o!");
    }
    await this.cuisineRepository.delete(id);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DeleteCuisineUseCase
});
