import { airtable, tableName } from '../config/_airtableConfig.js';
import BaseModel from './_baseModel.js';

class Customer extends BaseModel {
    constructor({ name, contactInfo, assignedSalesRep }) {
        super();
        this.name = name;
        this.contactInfo = contactInfo;
        this.assignedSalesRep = assignedSalesRep;
    }

    // Create a new customer record in Airtable
    static async createRecord({ name, contactInfo, assignedSalesRep }) {
        try {
            const record = await airtable(tableName).create({
                'Customer Name': name,
                'Customer Contact Information': contactInfo,
                'Assigned Sales Representative': assignedSalesRep,
            });
            return record;
        } catch (error) {
            console.error('Error creating customer:', error);
            throw error;
        }
    }

    // Retrieve a customer record by Customer Name
    static async getRecordByCustomerName(name) {
        try {
            const records = await airtable(tableName).select({
                filterByFormula: `{Customer Name} = "${name}"`,
            }).all();
            return records.length > 0 ? records[0] : null;
        } catch (error) {
            console.error('Error retrieving customer:', error);
            throw error;
        }
    }

    // Retrieve a customer record by Customer ID
    static async getRecordByCustomerId(customerId) {
        try {
            const records = await airtable(tableName).select({
                filterByFormula: `{Customer ID} = "${customerId}"`,
            }).all();
            return records.length > 0 ? records[0] : null;
        } catch (error) {
            console.error('Error retrieving customer:', error);
            throw error;
        }
    }

    // Update an existing customer record
    static async updateRecord(recordId, fieldsToUpdate) {
        try {
            const updatedRecord = await airtable(tableName).update(recordId, fieldsToUpdate);
            return updatedRecord.fields;
        } catch (error) {
            console.error('Error updating customer:', error);
            throw error;
        }
    }

    // Delete a customer record by Customer Name
    static async deleteRecord(name) {
        try {
            const records = await airtable(tableName).select({
                filterByFormula: `{Customer Name} = "${name}"`,
            }).all();

            if (records.length === 0) {
                throw new Error(`No customer found with name: ${name}`);
            }

            await airtable(tableName).destroy(records[0].id);
            return { success: true, message: 'Customer record deleted successfully' };
        } catch (error) {
            console.error('Error deleting customer:', error);
            throw error;
        }
    }
}

export default Customer;
