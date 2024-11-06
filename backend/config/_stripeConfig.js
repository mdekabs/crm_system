import Stripe from 'stripe';
import dotenvConfig from './_dotenvConfig.js';

const { stripeApiKey } = dotenvConfig;

const stripe = new Stripe(stripeApiKey, {
    apiVersion: '2022-11-15',  // Ensure compatibility by specifying the Stripe API version
});

export default stripe;
