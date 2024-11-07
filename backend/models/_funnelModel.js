// models/Funnel.js
import { airtable, tableName } from '../config/_airtableConfig.js';
import BaseModel from './_baseModel.js';

class Funnel extends BaseModel {
    constructor({ name, description, funnelUrl }) {
        super();
        this.name = name;
        this.description = description;
        this.funnelUrl = funnelUrl;
    }

    // Create a new funnel record in Airtable
    createRecord = async () => {
        try {
            const record = await airtable(tableName).create({
                'Funnel Name': this.name,
                'Description': this.description,
                'Funnel URL': this.funnelUrl,
            });
            return record;
        } catch (error) {
            console.error('Error creating funnel:', error);
            throw error;
        }
    };

    // Retrieve a funnel record by ID
    static getRecordById = async (recordId) => {
        try {
            const record = await airtable(tableName).find(recordId);
            return record.fields;
        } catch (error) {
            console.error('Error retrieving funnel:', error);
            throw error;
        }
    };

    // Update an existing funnel record
    updateRecord = async (recordId, fieldsToUpdate) => {
        try {
            const updatedRecord = await airtable(tableName).update(recordId, fieldsToUpdate);
            return updatedRecord.fields;
        } catch (error) {
            console.error('Error updating funnel:', error);
            throw error;
        }
    };

    // Delete a funnel record by ID
    static deleteRecord = async (recordId) => {
        try {
            await airtable(tableName).destroy(recordId);
            return { success: true, message: 'Funnel record deleted successfully' };
        } catch (error) {
            console.error('Error deleting funnel:', error);
            throw error;
        }
    };
}

export default Funnel;
