import history from '../renders/history';

export function getEditMode() {
  const params = new URLSearchParams(history.location.search);
  let edit = params.get("edit");
  if (edit === "true") {
    edit = true;
  } else if (edit === "false") {
    edit = false;
  } else if (edit !== null && edit !== undefined) {
    alert("edit parameter must be true or false");
    edit = false;
  } else {
    edit = false;
  }
  return edit;
}

export function coalesce(val1, val2) {
  return val1 !== null && val1 !== undefined ? val1 : val2;
}

export function isObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}

export function filter_nulls(obj) {
  let tmp = {};
  for (let key in obj) {
    if (obj[key] !== undefined && obj[key] !== null) {
      if (isObject(obj[key])) {
        tmp[key] = filter_nulls(obj[key]);
      } else {
        tmp[key] = obj[key];
      }
    }
  }
  return tmp;
}