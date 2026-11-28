/**
 * STARLINE ATELIER // CONVEX CLOUD FUNCTIONS
 * Deployable functions for cross-device portfolio persistence (`portfolio:getPortfolio`, `portfolio:savePortfolio`).
 */

export const getPortfolio = async (ctx: any, args: { section: string }) => {
  const existing = await ctx.db
    .query("portfolio_collections")
    .filter((q: any) => q.eq(q.field("section"), args.section))
    .first();
  if (!existing) return null;
  try {
    return JSON.parse(existing.itemsJson);
  } catch {
    return null;
  }
};

export const savePortfolio = async (
  ctx: any,
  args: { section: string; itemsJson: string }
) => {
  const existing = await ctx.db
    .query("portfolio_collections")
    .filter((q: any) => q.eq(q.field("section"), args.section))
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
};
