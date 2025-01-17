/* SystemJS module definition */
declare var module: NodeModule;

declare module 'express-http-proxy';

declare module 'express-robots-txt';

interface NodeModule {}

declare var PRODUCTION_MODE: boolean;

declare var SERVICE_WORKER: boolean;

declare var NGRX_RUNTIME_CHECKS: boolean;

declare var PWA_VERSION: string;
