function handleTransmit() {

    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;


    if (!name || !surname || !email || !message) {
        alert('It cant be blank');
        return;
    }

    console.log('Form Data:', {
        name,
        surname,
        email,
        message
    });

    alert('Your pigeon on the way');
    

    document.getElementById('contactForm').reset();
}


document.getElementById('contactForm').addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        handleTransmit();
    }
}); 

