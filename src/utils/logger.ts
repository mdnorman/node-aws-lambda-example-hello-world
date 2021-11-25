import debug from 'debug';

const loggerPrefix = 'CHANGEME';

export type TaggedTemplateDebugLogger = (parts: TemplateStringsArray, ...values: any[]) => void;

export const createBaseDebugLogger = (name: string): TaggedTemplateDebugLogger => {
  const debuggerName = `${loggerPrefix}:${name}`;
  const debugLogger = debug(debuggerName);
  debugLogger.log = console.log.bind(console);

  return (parts: TemplateStringsArray, ...values: any[]) => {
    if (!debugLogger.enabled) {
      return;
    }

    const array: any[] = [];
    parts.forEach((part: string, index: number) => {
      array.push(part);
      if (values[index] !== undefined && values[index] !== null) {
        array.push(values[index]);
      }
    });

    debugLogger(array.join(''));
  };
};

class ToJsonContainer {
  private obj: any;
  private space?: string | number;

  constructor(obj: any, space?: string | number) {
    this.obj = obj;
    this.space = space;
  }

  toString() {
    try {
      return JSON.stringify(this.obj, null, this.space);
    } catch (e) {
      console.error('error toJson obj:', this.obj);
      try {
        return (this.obj && this.obj.toString()) || '';
      } catch (e2) {
        console.error('Error toString obj:', e2);
        return 'obj.toString error';
      }
    }
  }
}

/**
 * Creates an object that will stringify the object when toString() is called.
 *
 * @param obj the object that should be stringified
 * @param space (optional) how many spaces to use or the space character
 */
export const toJson = (obj: any, space?: string | number) => new ToJsonContainer(obj, space);
