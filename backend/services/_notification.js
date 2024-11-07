// services/NotificationService.js
import fetch from 'node-fetch';
import dotenvConfig from '../config/_dotenvConfig.js';

const { slackWebhookUrl } = dotenvConfig;

/**
 * NotificationService class for handling notifications, specifically Slack notifications.
 */
class NotificationService {
    // Sends a Slack message with the provided text
    static sendSlackNotification = async (message) => {
        try {
            const response = await fetch(slackWebhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: message }),
            });

            if (!response.ok) {
                console.error(`Failed to send Slack notification: ${response.statusText}`);
                throw new Error('Slack notification failed');
            }

            console.log('Slack notification sent successfully');
        } catch (error) {
            console.error('Error sending Slack notification:', error.message);
            throw error;
        }
    };

    // Sends a notification for failed payments
    static notifyFailedPayment = async (customerName, paymentId, amount, currency) => {
        const message = `:warning: *Payment Failed*\n*Customer:* ${customerName}\n*Payment ID:* ${paymentId}\n*Amount:* ${amount} ${currency}`;
        await this.sendSlackNotification(message);
    };

    // Sends a notification for successful payments (if needed)
    static notifySuccessfulPayment = async (customerName, paymentId, amount, currency) => {
        const message = `:white_check_mark: *Payment Successful*\n*Customer:* ${customerName}\n*Payment ID:* ${paymentId}\n*Amount:* ${amount} ${currency}`;
        await this.sendSlackNotification(message);
    };

    // Sends a notification for subscription renewals (if applicable)
    static notifySubscriptionRenewal = async (customerName, subscriptionId, renewalDate) => {
        const message = `:repeat: *Subscription Renewed*\n*Customer:* ${customerName}\n*Subscription ID:* ${subscriptionId}\n*Renewal Date:* ${renewalDate}`;
        await this.sendSlackNotification(message);
    };
}

export default NotificationService;
