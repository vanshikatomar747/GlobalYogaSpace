// OTP email template
export const otpEmail = (name, otp) => {
  return `
    <h2>Hello ${name},</h2>
    <p>Your OTP code for GlobalYogaSpace is: <strong>${otp}</strong></p>
    <p>This code will expire in 10 minutes.</p>
    <p>ॐ सर्वे भवन्तु सुखिनः | GlobalYogaSpace</p>
  `;
};

// Booking confirmation email template
export const bookingEmail = (name, sessionTitle, date, time) => {
  return `
    <h2>Hi ${name},</h2>
    <p>Your session "${sessionTitle}" has been confirmed for ${date} at ${time}.</p>
    <p>Thank you for choosing GlobalYogaSpace!</p>
  `;
};

// Contact form received email template
export const contactEmail = (name, email, phone, message) => {
  return `
    <h2>New contact form submission</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Message:</strong> ${message}</p>
  `;
};
