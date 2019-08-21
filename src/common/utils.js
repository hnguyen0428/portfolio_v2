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