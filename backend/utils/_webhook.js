// utils/webhookUtils.js
import crypto from 'crypto';
import { stripe } from '../config/_stripeConfig.js';


/**
 * Verifies the signature of incoming Stripe webhook events to ensure they are authentic.
 * 
 * @param {Object} headers - The headers from the incoming request.
 * @param {string} body - The raw body of the request.
 * @param {string} secret - The Stripe webhook secret for verification.
 * @returns {boolean} - Returns true if the webhook signature is valid, otherwise false.
 */
export const verifyStripeWebhook = (headers, body, secret) => {
    try {
        const signature = headers['stripe-signature'];
        const event = stripe.webhooks.constructEvent(body, signature, secret);
        return event ? true : false;
    } catch (error) {
        console.error('Stripe webhook verification failed:', error.message);
        return false;
    }
};

/**
 * Logs the received Stripe webhook event for easier debugging.
 * 
 * @param {string} event - The name of the Stripe event.
 * @param {Object} data - The data payload of the event.
 */
export const logStripeWebhookEvent = (event, data) => {
    console.log(`Received Stripe webhook event: ${event}`);
    console.log('Event data:', JSON.stringify(data, null, 2));
};
