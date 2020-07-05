# Migration `20200704123218-create`

This migration has been generated by Yuji Suzuki at 7/4/2020, 12:32:18 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "TodoStatus" AS ENUM ('TODO', 'IN_PROGRESS', 'WAITING', 'DONE');

CREATE TABLE "public"."User" (
"avatarUrl" text   ,"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"email" text  NOT NULL ,"id" text  NOT NULL ,"name" text   ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."Account" (
"accessToken" text  NOT NULL ,"accessTokenExpires" timestamp(3)   ,"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"id" text  NOT NULL ,"providerAccountId" text  NOT NULL ,"providerId" text  NOT NULL ,"providerType" text  NOT NULL ,"refreshToken" text   ,"userId" text  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."Category" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"id" text  NOT NULL ,"name" text  NOT NULL ,"ownerId" text  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."Todo" (
"archivedAt" timestamp(3)   ,"categoryId" text  NOT NULL ,"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"id" text  NOT NULL ,"ownerId" text  NOT NULL ,"status" "TodoStatus" NOT NULL DEFAULT E'TODO',"text" text  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."Tag" (
"color" text   ,"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"id" text  NOT NULL ,"name" text  NOT NULL ,"ownerId" text  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."_CategoryToTag" (
"A" text  NOT NULL ,"B" text  NOT NULL )

CREATE TABLE "public"."_TagToTodo" (
"A" text  NOT NULL ,"B" text  NOT NULL )

CREATE UNIQUE INDEX "User.email" ON "public"."User"("email")

CREATE UNIQUE INDEX "Account.providerAccountId" ON "public"."Account"("providerAccountId")

CREATE UNIQUE INDEX "_CategoryToTag_AB_unique" ON "public"."_CategoryToTag"("A","B")

CREATE  INDEX "_CategoryToTag_B_index" ON "public"."_CategoryToTag"("B")

CREATE UNIQUE INDEX "_TagToTodo_AB_unique" ON "public"."_TagToTodo"("A","B")

CREATE  INDEX "_TagToTodo_B_index" ON "public"."_TagToTodo"("B")

ALTER TABLE "public"."Account" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Category" ADD FOREIGN KEY ("ownerId")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Todo" ADD FOREIGN KEY ("ownerId")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Todo" ADD FOREIGN KEY ("categoryId")REFERENCES "public"."Category"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Tag" ADD FOREIGN KEY ("ownerId")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."_CategoryToTag" ADD FOREIGN KEY ("A")REFERENCES "public"."Category"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."_CategoryToTag" ADD FOREIGN KEY ("B")REFERENCES "public"."Tag"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."_TagToTodo" ADD FOREIGN KEY ("A")REFERENCES "public"."Tag"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."_TagToTodo" ADD FOREIGN KEY ("B")REFERENCES "public"."Todo"("id") ON DELETE CASCADE  ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200704123218-create
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,77 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource db {
+  provider = "postgresql"
+  url = "***"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model User {
+  id         String     @default(uuid()) @id
+  email      String     @unique
+  avatarUrl  String?
+  name       String?
+  accounts   Account[]
+  categories Category[]
+  todos      Todo[]
+  tags       Tag[]
+  createdAt  DateTime   @default(now())
+}
+
+model Account {
+  id                 String    @default(uuid()) @id
+  userId             String
+  user               User      @relation(fields: [userId], references: [id])
+  providerId         String
+  providerType       String
+  providerAccountId  String    @unique
+  refreshToken       String?
+  accessToken        String
+  accessTokenExpires DateTime?
+  createdAt          DateTime  @default(now())
+}
+
+model Category {
+  id        String   @default(uuid()) @id
+  createdAt DateTime @default(now())
+  name      String
+  owner     User     @relation(fields: [ownerId], references: [id])
+  ownerId   String
+  todos     Todo[]
+  tags      Tag[]
+}
+
+model Todo {
+  id         String     @default(uuid()) @id
+  createdAt  DateTime   @default(now())
+  text       String
+  owner      User       @relation(fields: [ownerId], references: [id])
+  ownerId    String
+  category   Category   @relation(fields: [categoryId], references: [id])
+  categoryId String
+  tags       Tag[]
+  status     TodoStatus @default(TODO)
+  archivedAt DateTime?
+}
+
+model Tag {
+  id         String     @default(uuid()) @id
+  createdAt  DateTime   @default(now())
+  name       String
+  color      String?
+  owner      User       @relation(fields: [ownerId], references: [id])
+  ownerId    String
+  categories Category[] @relation(references: [id])
+  todos      Todo[]     @relation(references: [id])
+}
+
+enum TodoStatus {
+  TODO
+  IN_PROGRESS
+  WAITING
+  DONE
+}
```

