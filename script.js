document.addEventListener('DOMContentLoaded', () => {
    // Theme switch logic
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    });

    // Expand/collapse items
    document.querySelectorAll('.item').forEach(item => {
        item.addEventListener('click', function () {
            const subItems = this.querySelector('.sub-items');
            if (subItems) {
                subItems.style.display = subItems.style.display === 'block' ? 'none' : 'block';
            }
        });
    })
});

// Example of handling API request and
