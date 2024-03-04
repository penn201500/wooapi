const API_SERVER = 'http://localhost:63343';

function syntaxHighlight(json) {
    if (typeof json != 'string') {
        json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|true|false|null|-?\d+(\.\d*)?([eE][+\-]?\d+)?)/g, function (match) {
        let cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

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
                // Format and highlight the JSON
                const formattedData = syntaxHighlight(data);
                outputDiv.innerHTML = `<pre>${formattedData}</pre>`;
                // outputDiv.textContent = JSON.stringify(data, null, 2);
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
                // Format and highlight the JSON
                const formattedData = syntaxHighlight(data);
                outputDiv.innerHTML = `<pre>${formattedData}</pre>`;
                // outputDiv.textContent = JSON.stringify(data, null, 2);
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
