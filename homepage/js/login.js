document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    alert('🏰 Welcome traveler! Login successful: ' + email);
});

document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    alert('⚔ Congratulations ' + name + '! Registration successful. Ready for adventure?');
});