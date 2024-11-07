import { airtable, adminUsersTable } from "../config/_airtableConfig.js";
import BaseModel from "./_baseModel.js";


class User extends BaseModel {
    constructor({ name, email, role, passwordHash, status, permissions }) {
        super();
        this.name = name;
        this.email = email;
        this.role = role;
        this.passwordHash = passwordHash;
        this.status = status;
        this.permissions = permissions;
    }

    // Create a new user record in Airtable
    createRecord = async () => {
        try {
            const record = await base(tableName).create({
                'Admin Name': this.name,
                'Email': this.email,
                'Role': this.role,
                'Password Hash': this.passwordHash,
                'Status': this.status,
                'Permissions': this.permissions,
            });
            return record;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    };

    // Retrieve a user record by ID
    static getRecordById = async (recordId) => {
        try {
            const record = await base(tableName).find(recordId);
            return record.fields;
        } catch (error) {
            console.error('Error retrieving user:', error);
            throw error;
        }
    };

    // Find a user record by email
    static findUserByEmail = async (email) => {
        try {
            const records = await base(tableName)
                .select({
                    filterByFormula: `{Email} = '${email}'`,
                })
                .firstPage();
            return records[0]?.fields || null;
        } catch (error) {
            console.error('Error finding user by email:', error);
            throw error;
        }
    };

    // Update an existing user record
    updateRecord = async (recordId, fieldsToUpdate) => {
        try {
            const updatedRecord = await base(tableName).update(recordId, fieldsToUpdate);
            return updatedRecord.fields;
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    };

    // Delete a user record by ID
    static deleteRecord = async (recordId) => {
        try {
            await base(tableName).destroy(recordId);
            return { success: true, message: 'User record deleted successfully' };
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    };
}

export default User;
