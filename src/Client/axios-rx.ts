import axios, {
    AxiosInstance,
    AxiosPromise,
    AxiosRequestConfig,
    AxiosResponse,
} from 'axios';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
const Axios = (axios as any).Axios;

export default axios;

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

Axios.prototype.request$ = function<T = any>(
    this: AxiosInstance,
    config: AxiosRequestConfig
): AxiosObservable<T> {
    return new Observable<AxiosResponse<T>>(observer => {
        const source = axios.CancelToken.source();
        const cancelToken = source.token;

        complete(this.request({ cancelToken, ...config }), observer);

        return () => source.cancel();
    });
};

Axios.prototype.get$ = function<T = any>(
    url: string,
    config: AxiosRequestConfig = {}
): AxiosObservable<T> {
    return new Observable<AxiosResponse<T>>(observer => {
        const source = axios.CancelToken.source();
        const cancelToken = source.token;

        complete(this.get(url, { cancelToken, ...config }), observer);

        return () => source.cancel();
    });
};

Axios.prototype.delete$ = function(
    url: string,
    config: AxiosRequestConfig = {}
): AxiosObservable<any> {
    return new Observable<AxiosResponse<any>>(observer => {
        const source = axios.CancelToken.source();
        const cancelToken = source.token;

        complete(this.delete(url, { cancelToken, ...config }), observer);

        return () => source.cancel();
    });
};

Axios.prototype.head$ = function(
    url: string,
    config: AxiosRequestConfig = {}
): AxiosObservable<any> {
    return new Observable<AxiosResponse<any>>(observer => {
        const source = axios.CancelToken.source();
        const cancelToken = source.token;

        complete(this.head(url, { cancelToken, ...config }), observer);

        return () => source.cancel();
    });
};

Axios.prototype.post$ = function<T = any>(
    url: string,
    data?: any,
    config: AxiosRequestConfig = {}
): AxiosObservable<T> {
    return new Observable<AxiosResponse<T>>(observer => {
        const source = axios.CancelToken.source();
        const cancelToken = source.token;

        complete(this.post(url, data, { cancelToken, ...config }), observer);

        return () => source.cancel();
    });
};

Axios.prototype.put$ = function<T = any>(
    url: string,
    data?: any,
    config: AxiosRequestConfig = {}
): AxiosObservable<T> {
    return new Observable<AxiosResponse<T>>(observer => {
        const source = axios.CancelToken.source();
        const cancelToken = source.token;

        complete(this.put(url, data, { cancelToken, ...config }), observer);

        return () => source.cancel();
    });
};

Axios.prototype.patch$ = function<T = any>(
    url: string,
    data?: any,
    config: AxiosRequestConfig = {}
): AxiosObservable<T> {
    return new Observable<AxiosResponse<T>>(observer => {
        const source = axios.CancelToken.source();
        const cancelToken = source.token;

        complete(this.patch(url, data, { cancelToken, ...config }), observer);

        return () => source.cancel();
    });
};

export interface AxiosObservable<T = any> extends Observable<AxiosResponse<T>> {}

declare module 'axios' {
    interface AxiosInstance {
        request$<T = any>(config: AxiosRequestConfig): AxiosObservable<T>;
        get$<T = any>(url: string, config?: AxiosRequestConfig): AxiosObservable<T>;
        delete$(url: string, config?: AxiosRequestConfig): AxiosObservable;
        head$(url: string, config?: AxiosRequestConfig): AxiosObservable;
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
