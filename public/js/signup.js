const signupForm = async (event) => {
    event.preventDefault();
    const name = document.querySelector('#usernamesignup').value.trim();
    const password = document.querySelector('#passwordsignup').value.trim();
// define const to be used, stringify response to json and post, if successful redirect to dashboard
    if (name, password) {
        const response = await fetch('/api/user', {
            method: 'POST',
            body: JSON.stringify({ name, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if(response.ok) {
            document.location.replace('/dashboard');
        } else { alert('Failed to sign up!')}
    }
};
// add event listener for when event should execute
document.querySelector('#signup-form').addEventListener('submit', signupForm);