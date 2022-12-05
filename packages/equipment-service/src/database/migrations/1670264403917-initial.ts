import { MigrationInterface, QueryRunner } from "typeorm";

export class initial1670264403917 implements MigrationInterface {
    name = 'initial1670264403917'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."perks_type_enum" AS ENUM('Base', 'Bonus', 'Ultimate')`);
        await queryRunner.query(`CREATE TABLE "perks" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "type" "public"."perks_type_enum" NOT NULL, CONSTRAINT "UQ_30a29864dbf32f353f976e3005c" UNIQUE ("uuid"), CONSTRAINT "PK_7858d2e37891967413d2010a278" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "perk_packages" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "UQ_554bfa8237d39d207654b64f69c" UNIQUE ("uuid"), CONSTRAINT "PK_216348e346b7f6af9e7d9b34572" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "platforms" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "UQ_2d4ddc024b28f4069798478bb6f" UNIQUE ("uuid"), CONSTRAINT "PK_3b879853678f7368d46e52b81c6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."weapons_type_enum" AS ENUM('Assault Rifle')`);
        await queryRunner.query(`CREATE TABLE "weapons" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "type" "public"."weapons_type_enum" NOT NULL, "platformId" integer NOT NULL, CONSTRAINT "UQ_8451b939fee0a89854619a51e31" UNIQUE ("uuid"), CONSTRAINT "PK_a102f55ffbab023a922ac10ab76" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."attachments_attachmentslot_enum" AS ENUM('Barrel', 'Muzzle', 'Underbarrel')`);
        await queryRunner.query(`CREATE TABLE "attachments" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "attachmentSlot" "public"."attachments_attachmentslot_enum" NOT NULL, "tuning" jsonb, CONSTRAINT "UQ_9f90471c974587aa09622e3c1d3" UNIQUE ("uuid"), CONSTRAINT "PK_5e1f050bcff31e3084a1d662412" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "perk_package_perks" ("perkPackagesId" integer NOT NULL, "perksId" integer NOT NULL, CONSTRAINT "PK_d25ad745697cb880cd38b4adc99" PRIMARY KEY ("perkPackagesId", "perksId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_811cb65e4f23f52e054c7abd3a" ON "perk_package_perks" ("perkPackagesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_33db1687df3017022b9bcf0df7" ON "perk_package_perks" ("perksId") `);
        await queryRunner.query(`CREATE TABLE "weapon_attachments" ("weaponsId" integer NOT NULL, "attachmentsId" integer NOT NULL, CONSTRAINT "PK_900a775e6becd393cfd3581b88e" PRIMARY KEY ("weaponsId", "attachmentsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9049cd5a76fec483e5f3e7bc5a" ON "weapon_attachments" ("weaponsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c06dc9fa30b7b05ffbdc7c6ca5" ON "weapon_attachments" ("attachmentsId") `);
        await queryRunner.query(`ALTER TABLE "weapons" ADD CONSTRAINT "FK_64a54e32f3074f9fff1e676a19e" FOREIGN KEY ("platformId") REFERENCES "platforms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "perk_package_perks" ADD CONSTRAINT "FK_811cb65e4f23f52e054c7abd3a4" FOREIGN KEY ("perkPackagesId") REFERENCES "perk_packages"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "perk_package_perks" ADD CONSTRAINT "FK_33db1687df3017022b9bcf0df73" FOREIGN KEY ("perksId") REFERENCES "perks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "weapon_attachments" ADD CONSTRAINT "FK_c06dc9fa30b7b05ffbdc7c6ca5f" FOREIGN KEY ("attachmentsId") REFERENCES "attachments"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "weapon_attachments" ADD CONSTRAINT "FK_9049cd5a76fec483e5f3e7bc5a6" FOREIGN KEY ("weaponsId") REFERENCES "weapons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "weapon_attachments" DROP CONSTRAINT "FK_9049cd5a76fec483e5f3e7bc5a6"`);
        await queryRunner.query(`ALTER TABLE "weapon_attachments" DROP CONSTRAINT "FK_c06dc9fa30b7b05ffbdc7c6ca5f"`);
        await queryRunner.query(`ALTER TABLE "perk_package_perks" DROP CONSTRAINT "FK_33db1687df3017022b9bcf0df73"`);
        await queryRunner.query(`ALTER TABLE "perk_package_perks" DROP CONSTRAINT "FK_811cb65e4f23f52e054c7abd3a4"`);
        await queryRunner.query(`ALTER TABLE "weapons" DROP CONSTRAINT "FK_64a54e32f3074f9fff1e676a19e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c06dc9fa30b7b05ffbdc7c6ca5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9049cd5a76fec483e5f3e7bc5a"`);
        await queryRunner.query(`DROP TABLE "weapon_attachments"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_33db1687df3017022b9bcf0df7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_811cb65e4f23f52e054c7abd3a"`);
        await queryRunner.query(`DROP TABLE "perk_package_perks"`);
        await queryRunner.query(`DROP TABLE "attachments"`);
        await queryRunner.query(`DROP TYPE "public"."attachments_attachmentslot_enum"`);
        await queryRunner.query(`DROP TABLE "weapons"`);
        await queryRunner.query(`DROP TYPE "public"."weapons_type_enum"`);
        await queryRunner.query(`DROP TABLE "platforms"`);
        await queryRunner.query(`DROP TABLE "perk_packages"`);
        await queryRunner.query(`DROP TABLE "perks"`);
        await queryRunner.query(`DROP TYPE "public"."perks_type_enum"`);
    }

}
