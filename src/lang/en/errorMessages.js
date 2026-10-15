
class ErrorMessages {
    static internalServerError = "An Internal Server Error has occured.";
    static modeNotSupported = "Game Mode Not Supported in this platform.";
    static serverFailToStop = "No server is currently running.";
    static contactMissingFields = "Please fill in your name, email, and message.";
    static contactInvalidEmail = "Please enter a valid email address.";
    static contactFieldTooLong = "One of the fields is too long. Please shorten it and try again.";
    static contactSendFailed = "Sorry, we couldn't send your message. Please try again later or email us directly at lockinringers@gmail.com.";
    static mailNotConfigured = "SMTP_USER and SMTP_PASS are not set; cannot send booking emails.";
}

module.exports = ErrorMessages;
