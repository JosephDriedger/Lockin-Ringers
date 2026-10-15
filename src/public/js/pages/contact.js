
const form = document.getElementById('contact-form');
const statusBox = document.getElementById('form-status');
const submitButton = form.querySelector('button[type="submit"]');
const submitLabel = submitButton.textContent;

function showStatus(type, message) {
    statusBox.className = `form-status form-status-${type}`;
    statusBox.textContent = message;
    statusBox.hidden = false;
}

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    statusBox.hidden = true;

    const data = Object.fromEntries(new FormData(form).entries());

    if (!data.name.trim() || !data.email.trim() || !data.message.trim()) {
        showStatus('error', 'Please fill in your name, email, and message.');
        return;
    }

    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    try {
        const response = await fetch('/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json().catch(() => ({}));

        if (response.ok) {
            form.reset();
            showStatus('success', result.message || "Thanks! Your message has been sent. We'll get back to you shortly.");
        } else {
            showStatus('error', result.message || 'Sorry, something went wrong. Please try again later.');
        }
    } catch (err) {
        showStatus('error', 'Could not reach the server. Please check your connection and try again.');
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = submitLabel;
        statusBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
});
