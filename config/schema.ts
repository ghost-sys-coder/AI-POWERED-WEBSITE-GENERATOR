import { integer, json, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const userTable = pgTable("users", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    name: varchar("name", { length: 256 }).notNull(),
    email: varchar("email", { length: 256 }).unique().notNull(),
    credits: integer("credits").default(10).notNull(),
});

export const projectTable = pgTable("projects", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    projectId: varchar(),
    createdBy: varchar().references(() => userTable.email),
    createdAt: timestamp().defaultNow()
});

export const frameTable = pgTable("frames", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    frameId: varchar(),
    projectId: varchar().references(() => projectTable.projectId),
    createdAt: timestamp().defaultNow(),
});

export const chatTable = pgTable("chats", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    chatMessage: json(),
    createdBy: varchar().references(() => userTable.email),
    createdAt: timestamp().defaultNow()
})