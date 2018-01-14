import axios, {
    AxiosError,
    AxiosInstance,
    AxiosInterceptorManager,
    AxiosPromise,
    AxiosRequestConfig,
    AxiosResponse,
} from 'axios';
import { AxiosObservable, rxiosRequest } from 'axios-rx';
const Axios = (axios as any).Axios;

const axiosRequest = Axios.prototype.request;

(axios as any).request$ = Axios.prototype.request$ = rxiosRequest;

// Provide aliases for supported request methods
['delete', 'get', 'head', 'options'].forEach(method => {
    (axios as any)[`${method}$`] = Axios.prototype[`${method}$`] = function(
        url: string,
        config: any = {}
    ) {
        return this.request$({
            ...config,
            method,
            url,
        });
    };
});

['post', 'put', 'patch'].forEach(method => {
    (axios as any)[`${method}$`] = Axios.prototype[`${method}$`] = function(
        url: string,
        data: any,
        config: any
    ) {
        return this.request$({
            ...config,
            method,
            url,
            data,
        });
    };
});

declare module 'axios' {
    interface AxiosInstance {
        request$<T = any>(config: AxiosRequestConfig): AxiosObservable<T>;
        get$<T = any>(url: string, config?: AxiosRequestConfig): AxiosObservable<T>;
        delete$(url: string, config?: AxiosRequestConfig): AxiosObservable;
        head$(url: string, config?: AxiosRequestConfig): AxiosObservable;
        options$(url: string, config?: AxiosRequestConfig): AxiosObservable;
        post$<T = any>(
            url: string,
            data?: any,
            config?: AxiosRequestConfig
        ): AxiosObservable<T>;
        put$<T = any>(
            url: string,
            data?: any,
            config?: AxiosRequestConfig
        ): AxiosObservable<T>;
        patch$<T = any>(
            url: string,
            data?: any,
            config?: AxiosRequestConfig
        ): AxiosObservable<T>;
    }
}

export default axios;
