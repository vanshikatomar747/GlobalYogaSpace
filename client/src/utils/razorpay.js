// Import Razorpay checkout script dynamically
export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

// Trigger Razorpay payment
export const makePayment = async (orderData) => {
  const res = await loadRazorpayScript();
  if (!res) {
    alert("Razorpay SDK failed to load. Are you online?");
    return;
  }

  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY, // Add in .env
    amount: orderData.amount,
    currency: orderData.currency || "INR",
    name: "GlobalYogaSpace",
    description: orderData.description,
    order_id: orderData.id,
    handler: orderData.handler, // Callback after payment
    prefill: {
      name: orderData.name,
      email: orderData.email,
      contact: orderData.phone,
    },
    theme: {
      color: "#FF8A36",
    },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
};
