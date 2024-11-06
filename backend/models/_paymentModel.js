// models/Payment.js
import { airtable, tableName } from '../config/_airtableConfig.js';
import BaseModel from './_baseModel.js';

class Payment extends BaseModel {
    constructor({ customerName, productType, paymentStatus, paymentMethod, paymentDate, funnelUsed, nextPaymentDueDate, customerId }) {
        super();
        this.customerName = customerName;
        this.productType = productType;
        this.paymentStatus = paymentStatus;
        this.paymentMethod = paymentMethod;
        this.paymentDate = paymentDate;
        this.funnelUsed = funnelUsed;
        this.nextPaymentDueDate = nextPaymentDueDate;
        this.customerId = customerId;
    }

    // Create a new payment record in Airtable
    static createRecord = async ({ customerName, productType, paymentStatus, paymentMethod, paymentDate, funnelUsed, nextPaymentDueDate, customerId }) => {
        try {
            const record = await airtable(tableName).create({
                'Customer Name': customerName,
                'Product Type': productType,
                'Payment Status': paymentStatus,
                'Payment Method': paymentMethod,
                'Payment Date': paymentDate,
                'Funnel Used': funnelUsed,
                'Next Payment Due Date': nextPaymentDueDate,
                'Customer ID': customerId,
            });
            return record;
        } catch (error) {
            console.error('Error creating payment:', error);
            throw error;
        }
    };

    // Retrieve a payment record by Customer Name or ID
    static getRecordByCustomer = async (customerIdentifier) => {
        try {
            const records = await airtable(tableName).select({
                filterByFormula: `{Customer Name} = "${customerIdentifier}" OR {Customer ID} = "${customerIdentifier}"`,
            }).all();
            return records.length > 0 ? records[0] : null;
        } catch (error) {
            console.error('Error retrieving payment:', error);
            throw error;
        }
    };

    // Update an existing payment record
    static updateRecord = async ({ customerName, ...fieldsToUpdate }) => {
        try {
            const records = await airtable(tableName).select({
                filterByFormula: `{Customer Name} = "${customerName}"`,
            }).all();

            if (records.length === 0) {
                throw new Error(`No payment found for customer: ${customerName}`);
            }

            const updatedRecord = await airtable(tableName).update(records[0].id, fieldsToUpdate);
            return updatedRecord.fields;
        } catch (error) {
            console.error('Error updating payment:', error);
            throw error;
        }
    };

    // Delete a payment record by Customer Name
    static deleteRecord = async (customerName) => {
        try {
            const records = await airtable(tableName).select({
                filterByFormula: `{Customer Name} = "${customerName}"`,
            }).all();

            if (records.length === 0) {
                throw new Error(`No payment found for customer: ${customerName}`);
            }

            await airtable(tableName).destroy(records[0].id);
            return { success: true, message: 'Payment record deleted successfully' };
        } catch (error) {
            console.error('Error deleting payment:', error);
            throw error;
        }
    };
}

export default Payment;
