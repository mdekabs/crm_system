import dotenv from 'dotenv';

dotenv.config();

export default {
    airtableApiKey: process.env.AIRTABLE_API_KEY,
    airtableBaseId: process.env.AIRTABLE_BASE_ID,
    tableName: process.env.AIRTABLE_NAME,
    adminUsersTable: process.env.AIRTABLE_ADMIN_USERS_TABLE,
    stripeApiKey: process.env.STRIPE_API_KEY,
    slackWebhookUrl: process.env.SLACK_WEBHOOK_URL,
};
