# Migration `20200726105706-add-tag-parent-id`

This migration has been generated by Yuji Suzuki at 7/26/2020, 10:57:06 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Tag" ADD COLUMN "parentId" text   ;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200724140714-add-indexes..20200726105706-add-tag-parent-id
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
@@ -75,8 +75,9 @@
   owner      User       @relation(fields: [ownerId], references: [id])
   ownerId    String
   categories Category[] @relation(references: [id])
   todos      Todo[]     @relation(references: [id])
+  parentId   String?
   @@index([id, ownerId])
 }
```


