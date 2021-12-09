import { Subsegment } from 'aws-xray-sdk-core';
import * as AWSXRay from 'aws-xray-sdk-core';
import { createBaseDebugLogger } from './logger';

const debug = createBaseDebugLogger('xray');
const trace = createBaseDebugLogger('xray:trace');

AWSXRay.setContextMissingStrategy((msg: string) => {
  trace`Context missing ${msg}`;
});

export const xrayCaptureAllHttpTraffic = () => {
  try {
    AWSXRay.captureHTTPsGlobal(require('http'), true);
  } catch (e) {
    debug`Xray failed to capture http: ${e}`;
  }

  try {
    AWSXRay.captureHTTPsGlobal(require('https'), true);
  } catch (e) {
    debug`Xray failed to capture http: ${e}`;
  }

  try {
    AWSXRay.capturePromise();
  } catch (e) {
    debug`Xray failed to capture promise: ${e}`;
  }
};

export const withNewSegment = async <T>(name: string, fn: (segment?: Subsegment) => Promise<T> | T) =>
  AWSXRay.captureAsyncFunc(name, fn);

export const xrayAddErrorToSegment = (error: Error | string) => {
  const segment = AWSXRay.getSegment();
  if (!segment) {
    debug`no segment found when adding error`;
    return;
  }
  debug`adding error to segment ${segment.name}: ${segment}`;
  segment.addError(error);
};
