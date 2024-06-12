document.addEventListener('DOMContentLoaded', () => {
    fetch('vendors.json')
        .then(response => response.json())
        .then(data => {
            setupVendors(data);
        })
        .catch(error => console.error('Error loading vendors:', error));
});

function setupVendors(vendors) {
    const vendorList = document.getElementById('vendor-list');
    vendors.forEach(vendor => {
        const vendorElement = document.createElement('div');
        vendorElement.className = 'vendor';
        vendorElement.innerHTML = `
            <h2>${vendor.name}</h2>
            <p><strong>Category:</strong> ${vendor.category}</p>
            <p><strong>Features:</strong> ${vendor.features.join(', ')}</p>
            <p><strong>Rating:</strong> <span class="rating">${'★'.repeat(vendor.rating)}</span> (${vendor.rating} / 5)</p>
            <p><strong>Reviews:</strong> ${vendor.reviews.map(review => `<p>"${review}"</p>`).join('')}</p>
        `;
        vendorList.appendChild(vendorElement);
    });
}

function searchVendors() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const vendorList = document.getElementById('vendor-list');
    fetch('vendors.json')
        .then(response => response.json())
        .then(data => {
            const filteredVendors = data.filter(vendor =>
                vendor.name.toLowerCase().includes(query) ||
                vendor.category.toLowerCase().includes(query) ||
                vendor.features.some(feature => feature.toLowerCase().includes(query)) ||
                vendor.reviews.some(review => review.toLowerCase().includes(query))
            );
            vendorList.innerHTML = '';
            setupVendors(filteredVendors);
        })
        .catch(error => console.error('Error loading vendors:', error));
}
