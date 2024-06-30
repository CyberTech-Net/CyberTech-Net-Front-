import axios from "axios";
import {NewsList} from "../contracts/news/NewDto";

class NewsService {
    constructor(private authHost: string) {
    }

    getData = async (): Promise<NewsList | unknown> => {

        try {

            const response = await axios.get(
                `${this.authHost}`,
                {}
            );
            if (response.data) {
                return response.data;
            }

            return {} as NewsList;
        } catch (e: any) {
            return {} as NewsList;
        }
    };
}

const newsService = new NewsService(`${window.location.origin}/api/news`);
export default newsService;