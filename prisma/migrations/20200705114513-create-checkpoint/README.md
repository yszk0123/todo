# Migration `20200705114513-create-checkpoint`

This migration has been generated by Yuji Suzuki at 7/5/2020, 11:45:13 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."Checkpoint" (
"endAt" timestamp(3)  NOT NULL ,"id" text  NOT NULL ,"name" text   ,"ownerId" text  NOT NULL ,
    PRIMARY KEY ("id"))

ALTER TABLE "public"."Todo" ADD COLUMN "checkpointId" text   ;

ALTER TABLE "public"."Checkpoint" ADD FOREIGN KEY ("ownerId")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Todo" ADD FOREIGN KEY ("checkpointId")REFERENCES "public"."Checkpoint"("id") ON DELETE SET NULL  ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200704160731-recreate-color-enum..20200705114513-create-checkpoint
--- datamodel.dml
+++ datamodel.dml
@@ -2,25 +2,26 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
 }
 model User {
-  id         String     @default(uuid()) @id
-  email      String     @unique
-  avatarUrl  String?
-  name       String?
-  accounts   Account[]
-  categories Category[]
-  todos      Todo[]
-  tags       Tag[]
-  createdAt  DateTime   @default(now())
+  id          String       @default(uuid()) @id
+  email       String       @unique
+  avatarUrl   String?
+  name        String?
+  accounts    Account[]
+  categories  Category[]
+  todos       Todo[]
+  tags        Tag[]
+  createdAt   DateTime     @default(now())
+  checkpoints Checkpoint[]
 }
 model Account {
   id                 String    @default(uuid()) @id
@@ -45,18 +46,20 @@
   tags      Tag[]
 }
 model Todo {
-  id         String     @default(uuid()) @id
-  createdAt  DateTime   @default(now())
-  text       String
-  owner      User       @relation(fields: [ownerId], references: [id])
-  ownerId    String
-  category   Category   @relation(fields: [categoryId], references: [id])
-  categoryId String
-  tags       Tag[]
-  status     TodoStatus @default(TODO)
-  archivedAt DateTime?
+  id           String      @default(uuid()) @id
+  createdAt    DateTime    @default(now())
+  text         String
+  owner        User        @relation(fields: [ownerId], references: [id])
+  ownerId      String
+  category     Category    @relation(fields: [categoryId], references: [id])
+  categoryId   String
+  checkpoint   Checkpoint? @relation(fields: [checkpointId], references: [id])
+  checkpointId String?
+  tags         Tag[]
+  status       TodoStatus  @default(TODO)
+  archivedAt   DateTime?
 }
 model Tag {
   id         String     @default(uuid()) @id
@@ -68,8 +71,17 @@
   categories Category[] @relation(references: [id])
   todos      Todo[]     @relation(references: [id])
 }
+model Checkpoint {
+  id      String   @default(uuid()) @id
+  name    String?
+  endAt   DateTime
+  owner   User     @relation(fields: [ownerId], references: [id])
+  ownerId String
+  todos   Todo[]
+}
+
 enum TodoStatus {
   TODO
   IN_PROGRESS
   WAITING
```

