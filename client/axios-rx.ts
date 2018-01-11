import axios, {
    AxiosInstance,
    AxiosPromise,
    AxiosRequestConfig,
    AxiosResponse,
} from 'axios';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
const Axios = (axios as any).Axios;

function complete<T>(promise: AxiosPromise<T>, observer: Observer<AxiosResponse<T>>) {
    promise.then(
        response => {
            observer.next(response);
            observer.complete();
        },
        failure => {
            if (axios.isCancel(failure)) {
                observer.complete();
            } else {
                observer.error(failure);
            }
        }
    );
}

(axios as any).request$ = Axios.prototype.request$ = function<T = any>(
    this: AxiosInstance,
    config: AxiosRequestConfig
): AxiosObservable<T> {
    return new Observable<AxiosResponse<T>>(observer => {
        const source = axios.CancelToken.source();
        const cancelToken = source.token;

        complete(this.request({ ...config, cancelToken }), observer);

        return () => source.cancel();
    });
};

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

export default axios;
export interface AxiosObservable<T = void> extends Observable<AxiosResponse<T>> {}

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
