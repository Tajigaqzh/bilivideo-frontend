import axios, {AxiosInstance, AxiosRequestConfig,} from "axios";

export class HpRequest {
    private axiosInstance: AxiosInstance | null;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: "/api",
            timeout: 5000
        });
        this.init();
    }


    /**
     * 因为后端用的sa-token框架，所以不用加token了
     * @private
     */
    private init() {
        this.axiosInstance && this.axiosInstance.interceptors.request.use((config) => {
            return config;
        }, (error) => {
            return Promise.reject(error);
        })
        //todo 响应拦截
        this.axiosInstance && this.axiosInstance.interceptors.response.use((response) => {
            return Promise.resolve(response.data);
        }, (error) => {
            return Promise.reject(error);
        })
    }

    // Promise<AxiosResponse<T, R>>
    public post<R>(url: string, params: any, config?: AxiosRequestConfig): Promise<R> {
        if (config) {
            return this.axiosInstance!.post<any, R, any>(
                url, params, config
            )
        }
        return this.axiosInstance!.post<any, R, any>(
            url,
            params
        )
    }

    public get<R>(url: string, params?: any): Promise<R> {
        return this.axiosInstance!.get<any, R, any>(url, {
            params: params,
        });
    }


    /**
     * upload todo 分段上传
     * @param _url
     */
    public upload(_url: string) {
        return Promise.resolve(1);
    }
}

const request = new HpRequest();

export default request;
