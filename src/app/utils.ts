export class Utils {
  static clone(obj): any {
    debugger;
    if (null == obj || "object" != typeof obj) return obj;
    let copy = obj.constructor();
    for (let attr in obj) {
      if (obj.hasOwnProperty(attr)) {
        if (Array.isArray(obj[attr])) {
          let newArray = obj[attr].map(el => Utils.clone(el));
          copy[attr] = newArray;
        }
        else if (typeof obj[attr] == "object") {
          copy[attr] = Utils.clone(obj[attr]);
        }
        else copy[attr] = obj[attr];
      }
    }
    return copy;
  }
}
