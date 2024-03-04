const API_SERVER = 'http://localhost:63343';
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('change', function () {
        if (this.checked) {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    });

// Click event for "Get Account Info" sub-item
    document.getElementById('getAccountInfo').addEventListener('click', function (event) {
        event.stopPropagation(); // Prevent triggering click event on the parent item
        fetch(`${API_SERVER}/getAccountInfo`)
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

// Click event for "Get Available Symbols" sub-item
        document.getElementById('getAvailableSymbols').addEventListener('click', function (event) {
            event.stopPropagation(); // Prevent triggering click event on the parent item
            const outputDiv = document.querySelector('.right-panel .output');
            outputDiv.textContent = 'Fetching data, please wait...';
            fetch(`${API_SERVER}/getAvailableSymbols`)
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

        const headers = document.querySelectorAll('.item-header');
        headers.forEach(header => {
            header.addEventListener('click', () => {
                const subItems = header.nextElementSibling;
                subItems.classList.toggle('show');
            });
        });
})
