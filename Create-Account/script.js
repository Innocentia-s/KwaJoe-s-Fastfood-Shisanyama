console.log('Hello, HTML Editor!');
document.querySelector('h1').addEventListener('click', () => {
    alert('Welcome to HTML Editor!');
});

// Dynamic content
document.getElementById('demo').innerHTML = '<p> Status: </p>';
