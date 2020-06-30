# Migration `20200629054724-add-archived-at`

This migration has been generated by Yuji Suzuki at 6/29/2020, 5:47:24 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "TodoStatus" AS ENUM ('TODO', 'IN_PROGRESS', 'WAITING', 'DONE');

ALTER TABLE "public"."Todo" ADD COLUMN "archivedAt" timestamp(3)   ,
ADD COLUMN "status" "TodoStatus" NOT NULL DEFAULT E'TODO';
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200629054704-add-status..20200629054724-add-archived-at
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -40,8 +40,9 @@
   category   Category   @relation(fields: [categoryId], references: [id])
   categoryId Int
   tags       Tag[]
   status     TodoStatus @default(TODO)
+  archivedAt DateTime?
 }
 model Tag {
   id         Int        @default(autoincrement()) @id
```

