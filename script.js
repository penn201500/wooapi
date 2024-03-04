document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    });

    // Click event for "Get Account Info" sub-item
    document.getElementById('getAccountInfo').addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent triggering click event on the parent item
        fetch('/getAccountInfo')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                const outputDiv = document.querySelector('.right-panel .output');
                // Assuming the response is JSON and you want to display it as text
                outputDiv.textContent = JSON.stringify(data, null, 2);
            })
            .catch(error => {
                console.error('Error fetching account info:', error);
                const outputDiv = document.querySelector('.right-panel .output');
                outputDiv.textContent = 'Error fetching data: ' + error;
            });
    });
});
