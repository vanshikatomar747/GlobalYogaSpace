/**
 * Geolocation utility for detecting user location
 * Uses Browser Geolocation API + Nominatim reverse geocoding
 */

// Cache to avoid repeated API calls
let cachedLocation = null;

/**
 * Get user's city using browser geolocation and reverse geocoding
 * @returns {Promise<{city: string, country: string, countryCode: string}>}
 */
export const getUserLocation = async () => {
    // Return cached result if available
    if (cachedLocation) {
        console.log('📍 Returning cached location:', cachedLocation);
        return cachedLocation;
    }

    try {
        console.log('📍 Requesting geolocation permission...');
        // Get coordinates from browser
        const position = await new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation is not supported by your browser'));
                return;
            }

            navigator.geolocation.getCurrentPosition(resolve, reject, {
                timeout: 10000,
                maximumAge: 300000, // Cache for 5 minutes
            });
        });

        const { latitude, longitude } = position.coords;
        console.log('📍 Got coordinates:', { latitude, longitude });

        // Reverse geocoding using Nominatim (OpenStreetMap)
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`;
        console.log('📍 Fetching location from Nominatim...');

        const response = await fetch(url, {
            headers: {
                'User-Agent': 'GlobalYogaSpace/1.0'
            }
        });

        if (!response.ok) {
            throw new Error('Reverse geocoding failed');
        }

        const data = await response.json();
        console.log('📍 Nominatim response:', data);

        const address = data.address || {};

        // Extract city (can be in different fields)
        const city = address.city ||
            address.town ||
            address.village ||
            address.county ||
            address.state ||
            'Unknown';

        const country = address.country || 'Unknown';
        const countryCode = address.country_code?.toUpperCase() || '';

        const locationData = {
            city,
            country,
            countryCode,
            latitude,
            longitude
        };

        console.log('📍 Location detected:', locationData);

        // Cache the result
        cachedLocation = locationData;

        return locationData;
    } catch (error) {
        console.error('📍 Geolocation error:', error);
        console.error('📍 Error details:', {
            name: error.name,
            message: error.message,
            code: error.code
        });

        // Return null to indicate location detection failed
        // Calling code should handle this gracefully
        return null;
    }
};

/**
 * Get country code for phone input
 * Maps country codes to phone codes
 * @returns {Promise<string>} Phone country code (e.g., '+91', '+1')
 */
export const getPhoneCountryCode = async () => {
    try {
        const location = await getUserLocation();

        if (!location || !location.countryCode) {
            return '+91'; // Default fallback
        }

        // Map country code to phone code
        const countryMapping = {
            'IN': '+91',
            'US': '+1',
            'GB': '+44',
            'AU': '+61',
            'AE': '+971',
            'JP': '+81',
            'DE': '+49',
            'FR': '+33',
            'CA': '+1',
            'SG': '+65',
            'NZ': '+64',
            'MY': '+60',
            'TH': '+66',
            'ID': '+62',
        };

        return countryMapping[location.countryCode] || '+91';
    } catch (error) {
        console.error('Error getting phone country code:', error);
        return '+91'; // Default fallback
    }
};

/**
 * Clear cached location (useful for testing or manual refresh)
 */
export const clearLocationCache = () => {
    cachedLocation = null;
};
