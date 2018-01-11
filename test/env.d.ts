import 'sinon';



declare module 'sinon' {

    interface SinonSpyStatic {
        <T extends Function>(func: T): SinonSpy & T;
    }
}
