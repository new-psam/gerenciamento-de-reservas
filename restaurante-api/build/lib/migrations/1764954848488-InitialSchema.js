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

// src/lib/migrations/1764954848488-InitialSchema.ts
var InitialSchema_exports = {};
__export(InitialSchema_exports, {
  InitialSchema1764954848488: () => InitialSchema1764954848488
});
module.exports = __toCommonJS(InitialSchema_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  InitialSchema1764954848488
});
