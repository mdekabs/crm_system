// models/BaseModel.js
class BaseModel {
    constructor() {
        if (new.target === BaseModel) {
            throw new TypeError("Cannot instantiate BaseModel directly");
        }
    }

    // Method for validating required fields
    validateRequiredFields = (fields, data) => {
        fields.forEach((field) => {
            if (!data[field]) {
                throw new Error(`Missing required field: ${field}`);
            }
        });
    };

    // Method for generating unique IDs for records
    static generateId = () => {
        return `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    };
}

export default BaseModel;
