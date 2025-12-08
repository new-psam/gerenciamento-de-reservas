import { MigrationInterface, QueryRunner } from "typeorm";

export class CascadeOnRestaurantCuisine1765153842809 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // 1. Remove a constraint antiga da tabela pivot (restaurant_cuisine)
        await queryRunner.query(`
            ALTER TABLE "restaurant_cuisine" 
            DROP CONSTRAINT "FK_07b25b0a91cc390913afef7870e"
        `);

        // 2. Recria a constraint com ON DELETE CASCADE
        // Isso permite que, ao deletar o restaurante, o vínculo com a cozinha suma.
        await queryRunner.query(`
            ALTER TABLE "restaurant_cuisine" 
            ADD CONSTRAINT "FK_07b25b0a91cc390913afef7870e" 
            FOREIGN KEY ("restaurant_id") 
            REFERENCES "restaurant"("id") 
            ON DELETE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Reverte para o estado original (segurança travada)
        await queryRunner.query(`
            ALTER TABLE "restaurant_cuisine" 
            DROP CONSTRAINT "FK_07b25b0a91cc390913afef7870e"
        `);

        await queryRunner.query(`
            ALTER TABLE "restaurant_cuisine" 
            ADD CONSTRAINT "FK_07b25b0a91cc390913afef7870e" 
            FOREIGN KEY ("restaurant_id") 
            REFERENCES "restaurant"("id") 
            ON DELETE NO ACTION
        `);
    }

}
