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

// src/use-cases/cuisine/update-cuisine-use-case.ts
var update_cuisine_use_case_exports = {};
__export(update_cuisine_use_case_exports, {
  UpdateCuisineUseCase: () => UpdateCuisineUseCase
});
module.exports = __toCommonJS(update_cuisine_use_case_exports);
var UpdateCuisineUseCase = class {
  constructor(cuisineRepository) {
    this.cuisineRepository = cuisineRepository;
  }
  async execute(cuisine) {
    if (!cuisine.id) {
      throw new Error("O ID da cozinha \xE9 obrigat\xF3rio para a atualiza\xE7\xE3o.");
    }
    if (!cuisine.name || cuisine.name.trim().length === 0) {
      throw new Error("O nome da cozinha n\xE3o pode ser vazio.");
    }
    return this.cuisineRepository.update(cuisine);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UpdateCuisineUseCase
});
