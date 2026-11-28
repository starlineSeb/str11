/**
 * STARLINE ATELIER // CONVEX CLOUD SCHEMA
 * Stores Photography & Videography portfolio collections and Admin security hash.
 */
export default {
  portfolio_collections: {
    section: "string", // "photography" | "videography"
    itemsJson: "string",
    updatedAt: "number"
  },
  studio_settings: {
    key: "string", // "admin_passcode_hash"
    value: "string",
    updatedAt: "number"
  }
};
