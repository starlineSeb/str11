import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  portfolio_collections: defineTable({
    section: v.string(),
    itemsJson: v.string(),
    updatedAt: v.number()
  }).index("by_section", ["section"]),
  studio_settings: defineTable({
    key: v.string(),
    value: v.string(),
    updatedAt: v.number()
  }).index("by_key", ["key"])
});
