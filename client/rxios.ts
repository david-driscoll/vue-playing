import axios, {
    AxiosError,
    AxiosInstance,
    AxiosInterceptorManager,
    AxiosPromise,
    AxiosRequestConfig,
    AxiosResponse,
} from 'axios';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { toPromise } from 'rxjs/operator/toPromise';
import { Subscriber } from 'rxjs/Subscriber';
import { TeardownLogic } from 'rxjs/Subscription';
const Axios = (axios as any).Axios;

export interface RxiosInstance {
    defaults: AxiosRequestConfig;
    interceptors: {
        request: AxiosInterceptorManager<AxiosRequestConfig>;
        response: AxiosInterceptorManager<AxiosResponse>;
    };
    request<T = any>(config: AxiosRequestConfig): AxiosObservable<T>;
    get<T = any>(url: string, config?: AxiosRequestConfig): AxiosObservable<T>;
    options<T = any>(url: string, config?: AxiosRequestConfig): AxiosObservable<T>;
    delete(url: string, config?: AxiosRequestConfig): AxiosObservable;
    head(url: string, config?: AxiosRequestConfig): AxiosObservable;
    post<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): AxiosObservable<T>;
    put<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): AxiosObservable<T>;
    patch<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): AxiosObservable<T>;
}

export interface RxiosStatic extends RxiosInstance {
    (config: AxiosRequestConfig): AxiosObservable;
    (url: string, config?: AxiosRequestConfig): AxiosObservable;
    create(config?: AxiosRequestConfig): RxiosInstance;
}

export class AxiosObservable<T = void, R = AxiosResponse<T>> extends Observable<R> {
    constructor(
        subscribe?: (this: Observable<R>, subscriber: Subscriber<R>) => TeardownLogic
    ) {
        super(subscribe);
    }

    then(
        onfulfilled?: ((value: R) => R | PromiseLike<R>) | undefined | null,
        onrejected?:
            | ((reason: any) => AxiosError | PromiseLike<AxiosError>)
            | undefined
            | null
    ) {
        return (toPromise.call(this, Promise) as PromiseLike<R>).then<R, AxiosError>(
            onfulfilled,
            onrejected
        );
    }
}

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

const axiosRequest = Axios.prototype.request;

export const rxiosRequest = function<T = any>(
    this: AxiosInstance,
    config: AxiosRequestConfig
): AxiosObservable<T> {
    return new AxiosObservable<T>(observer => {
        const source = axios.CancelToken.source();
        const cancelToken = source.token;

        complete(axiosRequest.call(this, { ...config, cancelToken }), observer);

        return () => source.cancel();
    });
};

function Rxios<T = any>(this: any, instanceConfig: AxiosRequestConfig) {
    Axios.call(this, instanceConfig);
}

Object.assign(Rxios.prototype, Axios.prototype);
Rxios.prototype.request = rxiosRequest;

function rxios<T = any>(config: AxiosRequestConfig): AxiosObservable<T>;
function rxios<T = any>(url: string, config?: AxiosRequestConfig): AxiosObservable<T>;
function rxios<T = any>(
    configOrUrl: string | AxiosRequestConfig,
    config?: AxiosRequestConfig
) {
    return rxiosRequest.call(axios, configOrUrl, config);
}

Object.assign(rxios, Rxios.prototype);
(rxios as any).create = (config?: AxiosRequestConfig) => new (Rxios as any)(config || {});

export default rxios as RxiosStatic;
