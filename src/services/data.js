

// data.js
export const fetchWorksData = async (userId) => {
    try {
        const response = await fetch(`https://api.mashlabs.xyz/artists/${userId}/solo-works`);
        if (!response.ok) {
            throw new Error('Failed to fetch works');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching works:', error);
        return [];
    }
};
export const fetchUserData = async (userId) => {
    try {
        const response = await fetch(`https://api.mashlabs.xyz/artists/${userId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        return [];
    }
};