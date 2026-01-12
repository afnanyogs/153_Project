// This controller now fetches from NHTSA Public API (Vehicle Parts Manufacturers)
// Documentation: https://vpic.nhtsa.dot.gov/api/

exports.getAllSpareparts = async (req, res) => {
    try {
        // Fetching Manufacturer Parts data from NHTSA
        const response = await fetch('https://vpic.nhtsa.dot.gov/api/vehicles/GetPartsManufacturers?format=json');
        const data = await response.json();

        // Transform the external data to match our frontend's expected structure
        const transformedData = data.Results.slice(0, 50).map((item, index) => ({
            id: index + 1,
            name: item.OrgName || 'Unknown Part',
            brand: item.ManufacturerName || 'Generic',
            price: Math.floor(Math.random() * (5000000 - 50000) + 50000), // Simulated price
            stock: Math.floor(Math.random() * 100),
            category_name: 'Universal',
            store_name: 'Official Partner',
            description: `Public data from NHTSA for manufacturer: ${item.ManufacturerName}`
        }));

        res.json(transformedData);
    } catch (error) {
        console.error('Public API Error:', error);
        res.status(500).json({ error: 'Failed to fetch data from Public API' });
    }
};

exports.getSparepartById = async (req, res) => {
    res.status(501).json({ message: 'Detail view from public API not implemented' });
};

// Admin operations for local spareparts (optional/read-only in API mode)
exports.createSparepart = async (req, res) => res.status(403).json({ message: 'Cannot add items to Public API' });
exports.updateSparepart = async (req, res) => res.status(403).json({ message: 'Cannot update Public API data' });
exports.deleteSparepart = async (req, res) => res.status(403).json({ message: 'Cannot delete Public API data' });
