
import dayjs from 'dayjs';

/**
 * Calculates the next payment due date for a subscription or installment plan.
 * 
 * @param {string} startDate - The initial payment date.
 * @param {number} intervalInDays - The interval in days for the next payment.
 * @returns {string} - The formatted next due date.
 */
export const calculateNextDueDate = (startDate, intervalInDays) => {
    return dayjs(startDate).add(intervalInDays, 'day').format('YYYY-MM-DD');
};

/**
 * Checks if a given payment date has passed.
 * 
 * @param {string} paymentDate - The date of the payment to check.
 * @returns {boolean} - Returns true if the payment date has passed, otherwise false.
 */
export const isPaymentDatePassed = (paymentDate) => {
    return dayjs().isAfter(dayjs(paymentDate), 'day');
};

/**
 * Formats a date string to a more readable format (e.g., "YYYY-MM-DD").
 * 
 * @param {string} date - The date to format.
 * @param {string} format - The desired output format.
 * @returns {string} - The formatted date.
 */
export const formatDate = (date, format = 'YYYY-MM-DD') => {
    return dayjs(date).format(format);
};
