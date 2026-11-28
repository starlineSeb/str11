import { mutationGeneric as mutation, queryGeneric as query } from "convex/server";
import { v } from "convex/values";

export const getPortfolio = query({
  args: { section: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("portfolio_collections")
      .withIndex("by_section", (q: any) => q.eq("section", args.section))
      .first();

    if (!existing) return null;
    try {
      return JSON.parse(existing.itemsJson as string);
    } catch {
      return null;
    }
  }
});

export const savePortfolio = mutation({
  args: {
    section: v.string(),
    itemsJson: v.string()
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("portfolio_collections")
      .withIndex("by_section", (q: any) => q.eq("section", args.section))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        itemsJson: args.itemsJson,
        updatedAt: Date.now()
      });
      return existing._id;
    }

    return await ctx.db.insert("portfolio_collections", {
      section: args.section,
      itemsJson: args.itemsJson,
      updatedAt: Date.now()
    });
  }
});
