import axios from "axios";
import {SiteCreators} from "../contracts/about/AboutDto";

class AuthService {
    constructor(private authHost: string) {
    }

    getData = async (

    ): Promise<SiteCreators |unknown >  => {

        try {

            const response = await axios.get(
                `${this.authHost}`,
                {

                }

            );
            if (response.data) {
                return response.data;
            }

            return {} as SiteCreators;
        } catch (e: any) {
            return {} as SiteCreators;
        }
    };
}

const authService = new AuthService(`${window.location.origin}/api/about`);
export default authService;