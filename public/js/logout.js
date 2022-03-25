let timer, currsec = 0;

function resetTimer() {
// function to reset interval of timer
    clearInterval(timer);

    // reset timer to 0
    currsec = 0;

// reset interval
    timer =
    setInterval(IdleLogout, 1000);
}

// events that would reset the idle logout timer
window.onload = resetTimer;
window.onmousemove = resetTimer;
window.onmousedown = resetTimer;
window.ontouchstart = resetTimer;
window.onclick = resetTimer;
window.onkeypress = resetTimer;
// idle 
function IdleLogout() {
 // idle logout timer 3 min
    currsec++;
    if (currsec > 180) {
        logOut();
    }
}

// logout functionality
const logout = async () => {
    const response = await fetch('/api/user/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
    });
    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Failed to logout!');
    }
};
// event listener
document.querySelector('#logout').addEventListener('click', logout);
