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

    // Function to toggle sub-items and show hint
    function toggleSubItems(item) {
        let subItemsContainer = item.querySelector('.sub-items');
        let hint = item.querySelector('.hint');

        // Remove any existing hint
        if (hint) {
            hint.remove();
        }

        if (subItemsContainer.style.display === 'block') {
            subItemsContainer.style.display = 'none';
            if (hint) {
                hint.remove();
            }
        } else {
            if (subItemsContainer.children.length === 0) {
                // If there are no sub-items, show a hint near the item
                if (!hint) {
                    hint = document.createElement('span');
                    hint.classList.add('hint');
                    hint.textContent = 'No sub-items';
                    item.appendChild(hint);
                }
            } else {
                subItemsContainer.style.display = 'block';
            }
        }
    }

    // Click event for items
    document.querySelectorAll('.item').forEach(item => {
        item.addEventListener('click', function() {
            toggleSubItems(this);
        });
    });

    // Click event for sub-items (RESTful and WebSocket request code will be added here)
    const subItems = document.querySelectorAll('.sub-item');
    subItems.forEach(subItem => {
        subItem.addEventListener('click', function(event) {
            event.stopPropagation();
            console.log(`Request for ${this.textContent}`);
            // Add your RESTful and WebSocket request logic
        });
    });
});
