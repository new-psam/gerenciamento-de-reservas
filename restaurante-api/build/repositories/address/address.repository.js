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

// src/repositories/address/address.repository.ts
var address_repository_exports = {};
__export(address_repository_exports, {
  AddressRepository: () => AddressRepository
});
module.exports = __toCommonJS(address_repository_exports);

// src/entities/address.entitty.ts
var import_typeorm6 = require("typeorm");

// src/entities/restaurant.entity.ts
var import_typeorm5 = require("typeorm");

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

// src/entities/restaurantSlot.entity.ts
var import_typeorm4 = require("typeorm");

// src/entities/reservation.entity.ts
var import_typeorm3 = require("typeorm");

// src/entities/user.entity.ts
var import_typeorm2 = require("typeorm");

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
  (0, import_typeorm2.PrimaryGeneratedColumn)("uuid", {
    name: "id"
  })
], User.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm2.Column)({
    name: "name",
    type: "varchar",
    length: 150
  })
], User.prototype, "name", 2);
__decorateClass([
  (0, import_typeorm2.Column)({
    name: "email",
    type: "varchar",
    length: 150,
    unique: true,
    nullable: false
  })
], User.prototype, "email", 2);
__decorateClass([
  (0, import_typeorm2.Column)({
    name: "password",
    type: "varchar",
    length: 100,
    nullable: false
  })
], User.prototype, "password", 2);
__decorateClass([
  (0, import_typeorm2.Column)({
    name: "role",
    type: "enum",
    enum: UserRole,
    default: "client" /* CLIENT */
  })
], User.prototype, "role", 2);
__decorateClass([
  (0, import_typeorm2.OneToMany)(() => Reservation, (reservation) => reservation.users)
], User.prototype, "reservations", 2);
User = __decorateClass([
  (0, import_typeorm2.Entity)({
    name: "users"
  })
], User);

// src/entities/reservation.entity.ts
var Reservation = class {
};
__decorateClass([
  (0, import_typeorm3.PrimaryGeneratedColumn)("uuid", { name: "id" })
], Reservation.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm3.Column)({
    name: "party_size",
    type: "int",
    default: 1
  })
], Reservation.prototype, "number_people", 2);
__decorateClass([
  (0, import_typeorm3.Column)({
    name: "created_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP"
  })
], Reservation.prototype, "created_at", 2);
__decorateClass([
  (0, import_typeorm3.ManyToOne)(() => Restaurant, (restaurant) => restaurant.reservations),
  (0, import_typeorm3.JoinColumn)({ name: "restaurant_id" })
], Reservation.prototype, "restaurants", 2);
__decorateClass([
  (0, import_typeorm3.ManyToOne)(() => User, (user) => user.reservations),
  (0, import_typeorm3.JoinColumn)({ name: "user_id" })
], Reservation.prototype, "users", 2);
__decorateClass([
  (0, import_typeorm3.ManyToOne)(() => RestaurantSlot, (slot) => slot.reservations),
  (0, import_typeorm3.JoinColumn)({ name: "slot_id" })
], Reservation.prototype, "slots", 2);
Reservation = __decorateClass([
  (0, import_typeorm3.Entity)({
    name: "reservations"
  })
], Reservation);

// src/entities/restaurantSlot.entity.ts
var RestaurantSlot = class {
};
__decorateClass([
  (0, import_typeorm4.PrimaryGeneratedColumn)("uuid", {
    name: "id"
  })
], RestaurantSlot.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm4.Column)({
    name: "start_time",
    type: "timestamp without time zone"
  })
], RestaurantSlot.prototype, "reservationTime", 2);
__decorateClass([
  (0, import_typeorm4.Column)({
    name: "is_booked",
    type: "boolean",
    default: false
  })
], RestaurantSlot.prototype, "is_booked", 2);
__decorateClass([
  (0, import_typeorm4.ManyToOne)(() => Restaurant, (restaurant) => restaurant.slots),
  (0, import_typeorm4.JoinColumn)({ name: "restaurant_id" })
], RestaurantSlot.prototype, "restaurant", 2);
__decorateClass([
  (0, import_typeorm4.OneToMany)(() => Reservation, (reservation) => reservation.slots)
], RestaurantSlot.prototype, "reservations", 2);
RestaurantSlot = __decorateClass([
  (0, import_typeorm4.Entity)({
    name: "restaurant_slots"
  })
], RestaurantSlot);

// src/entities/restaurant.entity.ts
var Restaurant = class {
};
__decorateClass([
  (0, import_typeorm5.PrimaryGeneratedColumn)("uuid", {
    name: "id"
  })
], Restaurant.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm5.Column)({
    name: "name",
    type: "varchar",
    length: 100
  })
], Restaurant.prototype, "name", 2);
__decorateClass([
  (0, import_typeorm5.Column)({
    name: "capacity",
    type: "int"
  })
], Restaurant.prototype, "capacity", 2);
__decorateClass([
  (0, import_typeorm5.Column)({
    name: "review_count",
    type: "int",
    default: 0
  })
], Restaurant.prototype, "review_count", 2);
__decorateClass([
  (0, import_typeorm5.Column)({
    name: "average_rating",
    type: "numeric",
    precision: 3,
    scale: 2,
    default: 0
  })
], Restaurant.prototype, "average_rating", 2);
// Cria a coluna 'address_id na tabela 'restaurant'
__decorateClass([
  (0, import_typeorm5.OneToOne)(() => Address),
  (0, import_typeorm5.JoinColumn)({ name: "address_id" })
], Restaurant.prototype, "address", 2);
__decorateClass([
  (0, import_typeorm5.ManyToMany)(() => Cuisine, (cuisine) => cuisine.restaurants)
], Restaurant.prototype, "cuisines", 2);
__decorateClass([
  (0, import_typeorm5.OneToMany)(() => RestaurantSlot, (slot) => slot.restaurant)
], Restaurant.prototype, "slots", 2);
__decorateClass([
  (0, import_typeorm5.OneToMany)(() => Reservation, (reservation) => reservation.restaurants)
], Restaurant.prototype, "reservations", 2);
Restaurant = __decorateClass([
  (0, import_typeorm5.Entity)({
    name: "restaurant"
  })
], Restaurant);

// src/entities/address.entitty.ts
var Address = class {
};
__decorateClass([
  (0, import_typeorm6.PrimaryGeneratedColumn)("uuid", {
    name: "id"
  })
], Address.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm6.Column)({
    name: "street",
    type: "varchar",
    length: 150
  })
], Address.prototype, "street", 2);
__decorateClass([
  (0, import_typeorm6.Column)({
    name: "city",
    type: "varchar",
    length: 100
  })
], Address.prototype, "city", 2);
__decorateClass([
  (0, import_typeorm6.Column)({
    name: "state",
    type: "varchar",
    length: 2
  })
], Address.prototype, "state", 2);
__decorateClass([
  (0, import_typeorm6.Column)({
    name: "zip_code",
    type: "varchar",
    length: 10
  })
], Address.prototype, "zip_code", 2);
__decorateClass([
  (0, import_typeorm6.OneToOne)(() => Restaurant, (restaurant) => restaurant.address)
], Address.prototype, "restaurant", 2);
Address = __decorateClass([
  (0, import_typeorm6.Entity)({
    name: "address"
  })
], Address);

// src/lib/typeorm/typeorm.ts
var import_typeorm7 = require("typeorm");

// src/env/index.ts
var import_config = require("dotenv/config");
var import_zod = require("zod");
var envSchema = import_zod.z.object({
  NODE_ENV: import_zod.z.enum(["development", "production", "test"]).default("development"),
  PORT: import_zod.z.coerce.number().default(3010),
  DATABASE_USER: import_zod.z.string(),
  DATABASE_HOST: import_zod.z.string(),
  DATABASE_NAME: import_zod.z.string(),
  DATABASE_PASSWORD: import_zod.z.string(),
  DATABASE_PORT: import_zod.z.coerce.number(),
  JWT_SECRET: import_zod.z.string()
});
var _env = envSchema.safeParse(process.env);
if (!_env.success) {
  console.error("Invalid environment variables", _env.error.format());
  throw new Error("Invalid environment variables");
}
var env = _env.data;

// src/lib/migrations/1764954848488-InitialSchema.ts
var InitialSchema1764954848488 = class {
  constructor() {
    this.name = "InitialSchema1764954848488";
  }
  async up(queryRunner) {
    await queryRunner.query(`CREATE TABLE "cuisine" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, CONSTRAINT "PK_d4c1e9427b94335350fecaf238e" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('admin', 'restaurant_owner', 'client', 'ghost')`);
    await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(150) NOT NULL, "email" character varying(150) NOT NULL, "password" character varying(100) NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'client', CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "reservations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "party_size" integer NOT NULL DEFAULT '1', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "restaurant_id" uuid, "user_id" uuid, "slot_id" uuid, CONSTRAINT "PK_da95cef71b617ac35dc5bcda243" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "restaurant_slots" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "start_time" TIMESTAMP NOT NULL, "is_booked" boolean NOT NULL DEFAULT false, "restaurant_id" uuid, CONSTRAINT "PK_deb205d730c07a72349323bef95" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "restaurant" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "capacity" integer NOT NULL, "review_count" integer NOT NULL DEFAULT '0', "average_rating" numeric(3,2) NOT NULL DEFAULT '0', "address_id" uuid, CONSTRAINT "REL_109960073e718523582b944035" UNIQUE ("address_id"), CONSTRAINT "PK_649e250d8b8165cb406d99aa30f" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "street" character varying(150) NOT NULL, "city" character varying(100) NOT NULL, "state" character varying(2) NOT NULL, "zip_code" character varying(10) NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "restaurant_cuisine" ("cuisine_id" uuid NOT NULL, "restaurant_id" uuid NOT NULL, CONSTRAINT "PK_101852477dfd3c1302515794276" PRIMARY KEY ("cuisine_id", "restaurant_id"))`);
    await queryRunner.query(`CREATE INDEX "IDX_3a52b085c573ed58bdda22788b" ON "restaurant_cuisine" ("cuisine_id") `);
    await queryRunner.query(`CREATE INDEX "IDX_07b25b0a91cc390913afef7870" ON "restaurant_cuisine" ("restaurant_id") `);
    await queryRunner.query(`ALTER TABLE "reservations" ADD CONSTRAINT "FK_ee6b00404309108652a2307c66c" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "reservations" ADD CONSTRAINT "FK_4af5055a871c46d011345a255a6" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "reservations" ADD CONSTRAINT "FK_e040d142ef31f0995f8089a3066" FOREIGN KEY ("slot_id") REFERENCES "restaurant_slots"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "restaurant_slots" ADD CONSTRAINT "FK_1130a0e9f9706c77650a0630f08" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "restaurant" ADD CONSTRAINT "FK_109960073e718523582b9440353" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "restaurant_cuisine" ADD CONSTRAINT "FK_3a52b085c573ed58bdda22788bf" FOREIGN KEY ("cuisine_id") REFERENCES "cuisine"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    await queryRunner.query(`ALTER TABLE "restaurant_cuisine" ADD CONSTRAINT "FK_07b25b0a91cc390913afef7870e" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }
  async down(queryRunner) {
    await queryRunner.query(`ALTER TABLE "restaurant_cuisine" DROP CONSTRAINT "FK_07b25b0a91cc390913afef7870e"`);
    await queryRunner.query(`ALTER TABLE "restaurant_cuisine" DROP CONSTRAINT "FK_3a52b085c573ed58bdda22788bf"`);
    await queryRunner.query(`ALTER TABLE "restaurant" DROP CONSTRAINT "FK_109960073e718523582b9440353"`);
    await queryRunner.query(`ALTER TABLE "restaurant_slots" DROP CONSTRAINT "FK_1130a0e9f9706c77650a0630f08"`);
    await queryRunner.query(`ALTER TABLE "reservations" DROP CONSTRAINT "FK_e040d142ef31f0995f8089a3066"`);
    await queryRunner.query(`ALTER TABLE "reservations" DROP CONSTRAINT "FK_4af5055a871c46d011345a255a6"`);
    await queryRunner.query(`ALTER TABLE "reservations" DROP CONSTRAINT "FK_ee6b00404309108652a2307c66c"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_07b25b0a91cc390913afef7870"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_3a52b085c573ed58bdda22788b"`);
    await queryRunner.query(`DROP TABLE "restaurant_cuisine"`);
    await queryRunner.query(`DROP TABLE "address"`);
    await queryRunner.query(`DROP TABLE "restaurant"`);
    await queryRunner.query(`DROP TABLE "restaurant_slots"`);
    await queryRunner.query(`DROP TABLE "reservations"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    await queryRunner.query(`DROP TABLE "cuisine"`);
  }
};

// src/lib/typeorm/typeorm.ts
var appDataSource = new import_typeorm7.DataSource({
  type: "postgres",
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  username: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME,
  entities: [Address, Cuisine, Reservation, Restaurant, RestaurantSlot, User],
  logging: env.NODE_ENV === "development",
  // Configuração CRÍTICA para Migrations
  synchronize: false,
  //env.NODE_ENV === 'development', // Use 'true' em dev, 'false' em produção
  migrations: [InitialSchema1764954848488],
  migrationsRun: false
  // Não rodar automaticamente no startup do servidor
});

// src/lib/base/baseRepository.ts
var BaseRepository = class {
  constructor(entity) {
    this.repository = appDataSource.getRepository(entity);
  }
};

// src/repositories/address/address.repository.ts
var AddressRepository = class extends BaseRepository {
  constructor() {
    super(Address);
  }
  async findAll(page, limit) {
    return this.repository.find({
      skip: (page - 1) * limit,
      take: limit
    });
  }
  async findById(id) {
    return this.repository.findOne({
      where: { id }
    });
  }
  async create(address) {
    return this.repository.save(address);
  }
  async update(address) {
    return this.repository.save(address);
  }
  async delete(id) {
    await this.repository.delete(id);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AddressRepository
});
