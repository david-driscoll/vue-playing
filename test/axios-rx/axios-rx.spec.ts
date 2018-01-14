import axios, {
    AxiosAdapter,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
} from 'axios';
import { expect } from 'chai';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { timer } from 'rxjs/observable/timer';
import * as sinon from 'sinon';
import '../../client/axios-rx';

describe('axios-rx', () => {
    it('should call the request as expected', done => {
        const spy = sinon.spy<AxiosAdapter>(async config => {
            return {
                data: 'somevalue',
                status: 1337,
                statusText: 'oh yeah!',
                headers: { Accept: 'awesomeness' },
                config,
            };
        });
        const instance = axios.create({ adapter: spy });

        const request: AxiosRequestConfig = { method: 'get', url: 'http://awesome.me' };

        instance.request$(request).subscribe(response => {
            spy.should.have.been.calledOnce;
            spy.should.not.have.been.calledTwice;
            spy.should.have.been.calledWithMatch(request);
            response.data.should.equal('somevalue');
            done();
        });
    });

    it('should not call unless if not subscribed', () => {
        const spy = sinon.spy<AxiosAdapter>(async config => {
            return {
                data: 'somevalue',
                status: 1337,
                statusText: 'oh yeah!',
                headers: { Accept: 'awesomeness' },
                config,
            };
        });
        const instance = axios.create({ adapter: spy });

        instance.request$({ method: 'get', url: 'http://awesome.me' });
        spy.should.not.be.called;
    });

    it('requests should be awaitable', async () => {
        const spy = sinon.spy<AxiosAdapter>(async config => {
            return {
                data: 'somevalue',
                status: 1337,
                statusText: 'oh yeah!',
                headers: { Accept: 'awesomeness' },
                config,
            };
        });
        const instance = axios.create({ adapter: spy });

        await instance.request$({ method: 'get', url: 'http://awesome.me' });
        spy.should.be.called;
    });

    it('should call multiple times for multiple subscribes (for retry)', done => {
        const spy = sinon.spy<AxiosAdapter>(async config => {
            return {
                data: 'somevalue',
                status: 1337,
                statusText: 'oh yeah!',
                headers: { Accept: 'awesomeness' },
                config,
            };
        });
        const instance = axios.create({ adapter: spy });

        forkJoin(
            instance.request$({ method: 'get', url: 'http://awesome.me' }),
            instance.request$({ method: 'get', url: 'http://awesome.me' }),
            instance.request$({ method: 'get', url: 'http://awesome.me' })
        ).subscribe(c => {
            spy.should.have.been.calledThrice;
            done();
        });
    });

    it('should call multiple times for multiple awaits', async () => {
        const spy = sinon.spy<AxiosAdapter>(async config => {
            return {
                data: 'somevalue',
                status: 1337,
                statusText: 'oh yeah!',
                headers: { Accept: 'awesomeness' },
                config,
            };
        });
        const instance = axios.create({ adapter: spy });

        await instance.request$({ method: 'get', url: 'http://awesome.me' });
        await instance.request$({ method: 'get', url: 'http://awesome.me' });
        await instance.request$({ method: 'get', url: 'http://awesome.me' });
        spy.should.have.been.calledThrice;
    });

    it('should cancel the call when unsubscribed', () => {
        let result = false;
        const spy = sinon.spy();
        const instance = axios.create({ adapter: spy });

        const subscription = instance
            .request$({ method: 'get', url: 'http://awesome.me' })
            .subscribe();

        subscription.unsubscribe();
        expect(result).to.be.false;
    });

    it('should implement the enhanced api', () => {
        expect(axios.request$).to.be.instanceOf(Function);
        expect(axios.get$).to.be.instanceOf(Function);
        expect(axios.post$).to.be.instanceOf(Function);
        expect(axios.delete$).to.be.instanceOf(Function);
        expect(axios.put$).to.be.instanceOf(Function);
        expect(axios.patch$).to.be.instanceOf(Function);
        expect(axios.head$).to.be.instanceOf(Function);
        expect(axios.options$).to.be.instanceOf(Function);
        const instance = axios.create({});
        expect(instance.request$).to.be.instanceOf(Function);
        expect(instance.get$).to.be.instanceOf(Function);
        expect(instance.post$).to.be.instanceOf(Function);
        expect(instance.delete$).to.be.instanceOf(Function);
        expect(instance.put$).to.be.instanceOf(Function);
        expect(instance.patch$).to.be.instanceOf(Function);
        expect(instance.head$).to.be.instanceOf(Function);
        expect(instance.options$).to.be.instanceOf(Function);
    });

    // Provide aliases for supported request methods
    (['delete', 'get', 'head', 'options'] as Array<keyof AxiosInstance>).forEach(
        (method: keyof AxiosInstance) => {
            it(`${method} should work as expected`, done => {
                const spy = sinon.spy<AxiosAdapter>(async config => {
                    return {
                        data: 'somevalue',
                        status: 1337,
                        statusText: 'oh yeah!',
                        headers: { Accept: 'awesomeness' },
                        config,
                    };
                });
                const instance = axios.create({ adapter: spy });

                (instance as any)
                    [method + '$']('http://awesome.me', {})
                    .subscribe((response: AxiosResponse<any>) => {
                        spy.should.have.been.calledOnce;
                        spy.should.not.have.been.calledTwice;
                        response.data.should.equal('somevalue');
                        done();
                    });
            });
        }
    );

    (['post', 'put', 'patch'] as Array<keyof AxiosInstance>).forEach(
        (method: keyof AxiosInstance) => {
            it(`${method} should work as expected`, done => {
                const spy = sinon.spy<AxiosAdapter>(async config => {
                    return {
                        data: 'somevalue',
                        status: 1337,
                        statusText: 'oh yeah!',
                        headers: { Accept: 'awesomeness' },
                        config,
                    };
                });
                const instance = axios.create({ adapter: spy });

                (instance as any)
                    [method + '$']('http://awesome.me', {})
                    .subscribe((response: AxiosResponse<any>) => {
                        spy.should.have.been.calledOnce;
                        spy.should.not.have.been.calledTwice;
                        response.data.should.equal('somevalue');
                        done();
                    });
            });
        }
    );
});
