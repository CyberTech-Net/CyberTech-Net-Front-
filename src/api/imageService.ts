const imageUrl = 'https://example.com/path/to/your/image.jpg';

class ImageService {
    constructor(private authHost: string) {


    }

    getImageUrl(source: string) {
        return `${this.authHost}/${source}`;
    }
}



const authService = new ImageService(`${window.location.origin}/images`);
export default authService;