import Vue from 'vue';
import VueDI from 'vue-di';
import VueRouter from 'vue-router';
import * as VueRx from 'vue-rx';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject'; // required for domStreams option
import { Subscription } from 'rxjs/Subscription'; // Disposable if using RxJS4

Vue.use(VueRouter);
Vue.use(VueDI);
Vue.use(VueRx, { Observable, Subscription, Subject });

export { Vue };
