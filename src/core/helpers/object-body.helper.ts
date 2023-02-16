import { pickBy } from 'lodash';

export class ObjectBody {
  public static isEmpty(...args: any[]): boolean {
    let empty = true;
    args.forEach((arg) => {
      if (arg !== undefined) {
        empty = false;
      }
    });
    return empty;
  }

  public static removeUndefinedFields(object: object): object {
    return pickBy(object, (field) => field !== undefined);
  }

  public static removeEmptyFields(object: object): object {
    return pickBy(object, (field) => field !== "");
  }
}
