export default async function getImages(inputValue, page = 1) {
    const url = 'https://pixabay.com/api/';
    const API_KEY = '45587801-39d5210ba67e43ddafd5f17b0';

    try {
        const response = await fetch(`${url}?q=${inputValue}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch images');
        }
        
        const data = await response.json();
        return data; 
    } catch (error) {
        console.error('Error fetching images:', error);
        throw error; 
    }
}
