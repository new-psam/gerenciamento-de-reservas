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

// src/use-cases/cuisine/create-cuisine-use-case.ts
var create_cuisine_use_case_exports = {};
__export(create_cuisine_use_case_exports, {
  CreateCuisineUseCase: () => CreateCuisineUseCase
});
module.exports = __toCommonJS(create_cuisine_use_case_exports);
var CreateCuisineUseCase = class {
  constructor(cuisineRepository) {
    this.cuisineRepository = cuisineRepository;
  }
  async execute(cuisine) {
    if (!cuisine.name || cuisine.name.trim().length === 0) {
      throw new Error("O nome da cozinha n\xE3o pode ser vazio.");
    }
    return this.cuisineRepository.create(cuisine);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateCuisineUseCase
});
