import { MigrationInterface, QueryRunner } from "typeorm";

export class ForceCascadeOnSlots1765151120731 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // 1. Remove a constraint antiga que está bloqueando o delete
        await queryRunner.query(`
            ALTER TABLE "restaurant_slots" 
            DROP CONSTRAINT "FK_1130a0e9f9706c77650a0630f08"
        `);

        // 2. Adiciona a nova constraint com ON DELETE CASCADE
        await queryRunner.query(`
            ALTER TABLE "restaurant_slots" 
            ADD CONSTRAINT "FK_1130a0e9f9706c77650a0630f08" 
            FOREIGN KEY ("restaurant_id") 
            REFERENCES "restaurant"("id") 
            ON DELETE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Reverte para o estado anterior (sem cascade)
        await queryRunner.query(`
            ALTER TABLE "restaurant_slots" 
            DROP CONSTRAINT "FK_1130a0e9f9706c77650a0630f08"
        `);

        await queryRunner.query(`
            ALTER TABLE "restaurant_slots" 
            ADD CONSTRAINT "FK_1130a0e9f9706c77650a0630f08" 
            FOREIGN KEY ("restaurant_id") 
            REFERENCES "restaurant"("id") 
            ON DELETE NO ACTION
        `);
    }

}
