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
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};

// src/entities/reservation.entity.ts
var reservation_entity_exports = {};
__export(reservation_entity_exports, {
  Reservation: () => Reservation
});
module.exports = __toCommonJS(reservation_entity_exports);
var import_typeorm6 = require("typeorm");

// src/entities/restaurant.entity.ts
var import_typeorm4 = require("typeorm");

// src/entities/cuisine.entity.ts
var import_typeorm = require("typeorm");
var Cuisine = class {
};
__decorateClass([
  (0, import_typeorm.PrimaryGeneratedColumn)("uuid", {
    name: "id"
  })
], Cuisine.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm.Column)({
    name: "name",
    type: "varchar",
    length: 100
  })
], Cuisine.prototype, "name", 2);
__decorateClass([
  (0, import_typeorm.ManyToMany)(() => Restaurant, (restaurant) => restaurant.cuisines, {
    cascade: true
  }),
  (0, import_typeorm.JoinTable)({
    name: "restaurant_cuisine",
    //nome da tabela Intermediária
    joinColumn: {
      name: "cuisine_id",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "restaurant_id",
      referencedColumnName: "id"
    }
  })
], Cuisine.prototype, "restaurants", 2);
Cuisine = __decorateClass([
  (0, import_typeorm.Entity)({
    name: "cuisine"
  })
], Cuisine);

// src/entities/address.entitty.ts
var import_typeorm2 = require("typeorm");
var Address = class {
};
__decorateClass([
  (0, import_typeorm2.PrimaryGeneratedColumn)("uuid", {
    name: "id"
  })
], Address.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm2.Column)({
    name: "street",
    type: "varchar",
    length: 150
  })
], Address.prototype, "street", 2);
__decorateClass([
  (0, import_typeorm2.Column)({
    name: "city",
    type: "varchar",
    length: 100
  })
], Address.prototype, "city", 2);
__decorateClass([
  (0, import_typeorm2.Column)({
    name: "state",
    type: "varchar",
    length: 2
  })
], Address.prototype, "state", 2);
__decorateClass([
  (0, import_typeorm2.Column)({
    name: "zip_code",
    type: "varchar",
    length: 10
  })
], Address.prototype, "zip_code", 2);
__decorateClass([
  (0, import_typeorm2.OneToOne)(() => Restaurant, (restaurant) => restaurant.address)
], Address.prototype, "restaurant", 2);
Address = __decorateClass([
  (0, import_typeorm2.Entity)({
    name: "address"
  })
], Address);

// src/entities/restaurantSlot.entity.ts
var import_typeorm3 = require("typeorm");
var RestaurantSlot = class {
};
__decorateClass([
  (0, import_typeorm3.PrimaryGeneratedColumn)("uuid", {
    name: "id"
  })
], RestaurantSlot.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm3.Column)({
    name: "start_time",
    type: "timestamp without time zone"
  })
], RestaurantSlot.prototype, "reservationTime", 2);
__decorateClass([
  (0, import_typeorm3.Column)({
    name: "is_booked",
    type: "boolean",
    default: false
  })
], RestaurantSlot.prototype, "is_booked", 2);
__decorateClass([
  (0, import_typeorm3.ManyToOne)(() => Restaurant, (restaurant) => restaurant.slots),
  (0, import_typeorm3.JoinColumn)({ name: "restaurant_id" })
], RestaurantSlot.prototype, "restaurant", 2);
__decorateClass([
  (0, import_typeorm3.OneToMany)(() => Reservation, (reservation) => reservation.slots)
], RestaurantSlot.prototype, "reservations", 2);
RestaurantSlot = __decorateClass([
  (0, import_typeorm3.Entity)({
    name: "restaurant_slots"
  })
], RestaurantSlot);

// src/entities/restaurant.entity.ts
var Restaurant = class {
};
__decorateClass([
  (0, import_typeorm4.PrimaryGeneratedColumn)("uuid", {
    name: "id"
  })
], Restaurant.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm4.Column)({
    name: "name",
    type: "varchar",
    length: 100
  })
], Restaurant.prototype, "name", 2);
__decorateClass([
  (0, import_typeorm4.Column)({
    name: "capacity",
    type: "int"
  })
], Restaurant.prototype, "capacity", 2);
__decorateClass([
  (0, import_typeorm4.Column)({
    name: "review_count",
    type: "int",
    default: 0
  })
], Restaurant.prototype, "review_count", 2);
__decorateClass([
  (0, import_typeorm4.Column)({
    name: "average_rating",
    type: "numeric",
    precision: 3,
    scale: 2,
    default: 0
  })
], Restaurant.prototype, "average_rating", 2);
// Cria a coluna 'address_id na tabela 'restaurant'
__decorateClass([
  (0, import_typeorm4.OneToOne)(() => Address),
  (0, import_typeorm4.JoinColumn)({ name: "address_id" })
], Restaurant.prototype, "address", 2);
__decorateClass([
  (0, import_typeorm4.ManyToMany)(() => Cuisine, (cuisine) => cuisine.restaurants)
], Restaurant.prototype, "cuisines", 2);
__decorateClass([
  (0, import_typeorm4.OneToMany)(() => RestaurantSlot, (slot) => slot.restaurant)
], Restaurant.prototype, "slots", 2);
__decorateClass([
  (0, import_typeorm4.OneToMany)(() => Reservation, (reservation) => reservation.restaurants)
], Restaurant.prototype, "reservations", 2);
Restaurant = __decorateClass([
  (0, import_typeorm4.Entity)({
    name: "restaurant"
  })
], Restaurant);

// src/entities/user.entity.ts
var import_typeorm5 = require("typeorm");

// src/enums/userRole.ts
var UserRole = /* @__PURE__ */ ((UserRole2) => {
  UserRole2["ADMIN"] = "admin";
  UserRole2["RESTAURANT_OWNER"] = "restaurant_owner";
  UserRole2["CLIENT"] = "client";
  UserRole2["GHOST"] = "ghost";
  return UserRole2;
})(UserRole || {});

// src/entities/user.entity.ts
var User = class {
};
__decorateClass([
  (0, import_typeorm5.PrimaryGeneratedColumn)("uuid", {
    name: "id"
  })
], User.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm5.Column)({
    name: "name",
    type: "varchar",
    length: 150
  })
], User.prototype, "name", 2);
__decorateClass([
  (0, import_typeorm5.Column)({
    name: "email",
    type: "varchar",
    length: 150,
    unique: true,
    nullable: false
  })
], User.prototype, "email", 2);
__decorateClass([
  (0, import_typeorm5.Column)({
    name: "password",
    type: "varchar",
    length: 100,
    nullable: false
  })
], User.prototype, "password", 2);
__decorateClass([
  (0, import_typeorm5.Column)({
    name: "role",
    type: "enum",
    enum: UserRole,
    default: "client" /* CLIENT */
  })
], User.prototype, "role", 2);
__decorateClass([
  (0, import_typeorm5.OneToMany)(() => Reservation, (reservation) => reservation.users)
], User.prototype, "reservations", 2);
User = __decorateClass([
  (0, import_typeorm5.Entity)({
    name: "users"
  })
], User);

// src/entities/reservation.entity.ts
var Reservation = class {
};
__decorateClass([
  (0, import_typeorm6.PrimaryGeneratedColumn)("uuid", { name: "id" })
], Reservation.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm6.Column)({
    name: "party_size",
    type: "int",
    default: 1
  })
], Reservation.prototype, "number_people", 2);
__decorateClass([
  (0, import_typeorm6.Column)({
    name: "created_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP"
  })
], Reservation.prototype, "created_at", 2);
__decorateClass([
  (0, import_typeorm6.ManyToOne)(() => Restaurant, (restaurant) => restaurant.reservations),
  (0, import_typeorm6.JoinColumn)({ name: "restaurant_id" })
], Reservation.prototype, "restaurants", 2);
__decorateClass([
  (0, import_typeorm6.ManyToOne)(() => User, (user) => user.reservations),
  (0, import_typeorm6.JoinColumn)({ name: "user_id" })
], Reservation.prototype, "users", 2);
__decorateClass([
  (0, import_typeorm6.ManyToOne)(() => RestaurantSlot, (slot) => slot.reservations),
  (0, import_typeorm6.JoinColumn)({ name: "slot_id" })
], Reservation.prototype, "slots", 2);
Reservation = __decorateClass([
  (0, import_typeorm6.Entity)({
    name: "reservations"
  })
], Reservation);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Reservation
});
