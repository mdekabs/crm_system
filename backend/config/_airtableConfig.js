// config/airtable.js
import Airtable from 'airtable';
import dotenvConfig from './_dotenvConfig.js';

const { airtableApiKey, airtableBaseId, tableName, adminUsersTable } = dotenvConfig;

// Initialize Airtable base
const airtable = new Airtable({ apiKey: airtableApiKey }).base(airtableBaseId);

// Export Airtable instance and table name
export { airtable, tableName, adminUsersTable };
