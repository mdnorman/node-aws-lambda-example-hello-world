import * as AWSXRay from 'aws-xray-sdk-core';
import * as http from 'http';
import * as https from 'https';
import { createBaseDebugLogger } from './logger';

const debug = createBaseDebugLogger('xray');
const trace = createBaseDebugLogger('xray:trace');

AWSXRay.setContextMissingStrategy((msg: string) => {
  trace`Context missing ${msg}`;
});

export const xrayCaptureAllHttpTraffic = () => {
  try {
    AWSXRay.captureHTTPsGlobal(http, true);
  } catch (e) {
    debug`Xray failed to capture http: ${e}`;
  }

  try {
    AWSXRay.captureHTTPsGlobal(https, true);
  } catch (e) {
    debug`Xray failed to capture http: ${e}`;
  }

  try {
    AWSXRay.capturePromise();
  } catch (e) {
    debug`Xray failed to capture promise: ${e}`;
  }
};
