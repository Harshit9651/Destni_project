async function searchUsers() {
    const query = document.getElementById('searchInput').value;
    if (!query) return;

    const response = await fetch(`/search?city=${encodeURIComponent(query)}`);
    const users = await response.json();

    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    users.forEach(user => {
        const userElement = document.createElement('div');
        userElement.textContent = `${user.fname} ${user.lname} - ${user.city}`;
        resultsContainer.appendChild(userElement);
    });
}

// Attach event handler after DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('searchInput').addEventListener('input', searchUsers);
});
