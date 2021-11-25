import * as AWSXRay from 'aws-xray-sdk-core';
import * as http from 'http';
import * as https from 'https';
import { createBaseDebugLogger } from './logger';

const trace = createBaseDebugLogger('xray:trace');

AWSXRay.setContextMissingStrategy((msg: string) => {
  trace`Context missing ${msg}`;
});

export const xrayCaptureAllHttpTraffic = () => {
  AWSXRay.captureHTTPsGlobal(http, true);
  AWSXRay.captureHTTPsGlobal(https, true);
  AWSXRay.capturePromise();
};
