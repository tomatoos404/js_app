const monInput = document.getElementById('monInput');
const monBouton = document.getElementById('monBouton');

monBouton.addEventListener('click', () => {
    fetch('register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: monInput.value })
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});