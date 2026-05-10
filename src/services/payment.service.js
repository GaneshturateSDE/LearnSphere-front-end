
const createPayment=async (paymentData) => {
    try {
        const response = await fetch('/api/payments/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentData),
        });
        return await response.json();
    } catch (error) {
        console.error('Error creating payment:', error);
        throw error;
    }
}

const verifyPayment=async (verificationData) => {
    try {
        const response = await fetch('/api/payments/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(verificationData),
        });
        return await response.json();
    } catch (error) {
        console.error('Error verifying payment:', error);
        throw error;
    }
}

export const paymentService = { createPayment, verifyPayment };    