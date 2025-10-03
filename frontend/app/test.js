import { strapi } from '@strapi/strapi';
// Example using a custom controller or service
export async function deleteAllEntries(modelName) {
  try {
    const entries = await strapi.query(modelName).findMany(); // Fetch all entries
    for (const entry of entries) {
      await strapi.query(modelName).delete({ where: { id: entry.id } }); // Delete each entry
    }
    console.log(`All entries in ${modelName} deleted successfully.`);
  } catch (error) {
    console.error(`Error deleting entries in ${modelName}:`, error);
  }
}

deleteAllEntries('students');

// Call the function for your specific collection type
// deleteAllEntries('your-collection-type-name');
