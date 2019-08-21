import {database} from '../config/firebase';

export function updateProfileText(heading, text, onSuccess, onFailure) {
  let updates = {};
  updates["/profile/aboutMe/heading"] = heading;
  updates["/profile/aboutMe/text"] = text;

  database.ref().update(updates)
    .then(onSuccess).catch(onFailure);
}

export function fetchAboutMe(onSuccess, onFailure) {
  let cached = sessionStorage.getItem("/profile/aboutMe");
  if (cached) {
    if (onSuccess) {
      onSuccess(JSON.parse(cached));
    }
    return;
  }
  database.ref("/profile/aboutMe").once('value')
    .then((snap) => {
      let obj = snap.val();
      if (onSuccess) {
        onSuccess(snap.val());
      }
      sessionStorage.setItem("/profile/aboutMe", JSON.stringify(obj));
    })
    .catch(onFailure);
}

export function updateWorkExperienceText(heading, text, onSuccess, onFailure) {
  let updates = {};
  updates["/profile/workExperience/heading"] = heading;
  updates["/profile/workExperience/text"] = text;

  database.ref().update(updates)
    .then(onSuccess).catch(onFailure);
}

export function fetchWorkExperience(onSuccess, onFailure) {
  let cached = sessionStorage.getItem("/profile/workExperience");
  if (cached) {
    if (onSuccess) {
      onSuccess(JSON.parse(cached));
    }
    return;
  }
  database.ref("/profile/workExperience").once('value')
    .then((snap) => {
      let obj = snap.val();
      if (onSuccess) {
        onSuccess(obj);
      }
      sessionStorage.setItem("/profile/workExperience", JSON.stringify(obj));
    })
    .catch(onFailure);
}

export function updateWorkExperienceContent(content, key, onSuccess, onFailure) {
  if (key === null || key === undefined) {
    return;
  }
  let updates = {};
  updates[`/profile/workExperience/objs/${key}`] = content;
  database.ref().update(updates)
    .then(onSuccess).catch(onFailure);
}

export function updateProjectsText(heading, text, onSuccess, onFailure) {
  let updates = {};
  updates["/profile/projects/heading"] = heading;
  updates["/profile/projects/text"] = text;

  database.ref().update(updates)
    .then(onSuccess).catch(onFailure);
}

export function fetchProjects(onSuccess, onFailure) {
  let cached = sessionStorage.getItem("/profile/projects");
  if (cached) {
    if (onSuccess) {
      onSuccess(JSON.parse(cached));
    }
    return;
  }

  database.ref("/profile/projects").once('value')
    .then((snap) => {
      let obj = snap.val();
      if (onSuccess) {
        onSuccess(obj);
      }
      sessionStorage.setItem("/profile/projects", JSON.stringify(obj));
    })
    .catch(onFailure);
}

export function updateProjectContent(content, key, onSuccess, onFailure) {
  if (key === null || key === undefined) {
    return;
  }
  let updates = {};
  updates[`/profile/projects/objs/${key}`] = content;
  database.ref().update(updates)
    .then(onSuccess).catch(onFailure);
}

export function fetchActions(onSuccess, onFailure) {
  database.ref('actions').once('value')
    .then((snap) => {
      if (snap && onSuccess) {
        onSuccess(snap.val());
      }
    })
    .catch(onFailure)
}

export function updateEducationText(heading, text, onSuccess, onFailure) {
  let updates = {};
  updates["/profile/education/heading"] = heading;
  updates["/profile/education/text"] = text;

  database.ref().update(updates)
    .then(onSuccess).catch(onFailure);
}

export function updateEducationCourse(content, key, onSuccess, onFailure) {
  if (key === null || key === undefined) {
    return;
  }
  let updates = {};
  updates[`/profile/education/objs/${key}`] = content;
  database.ref().update(updates)
    .then(onSuccess).catch(onFailure);
}

export function addEducationCourse(content, onSuccess, onFailure) {
  if (!content) {
    return;
  }
  database.ref('/profile/education/objs').push().set(content)
    .then(onSuccess).catch(onFailure);
}

export function removeEducationCourse(key, onSuccess, onFailure) {
  database.ref(`/profile/education/objs/${key}`).remove()
    .then(onSuccess).catch(onFailure);
}

export function fetchEducation(onSuccess, onFailure, fromCache) {
  if (fromCache === undefined || fromCache === null) {
    fromCache = true;
  }

  if (fromCache) {
    let cached = sessionStorage.getItem("/profile/education");
    if (cached) {
      if (onSuccess) {
        onSuccess(JSON.parse(cached));
      }
      return;
    }
  }

  database.ref("/profile/education").once('value')
    .then((snap) => {
      let obj = snap.val();
      if (onSuccess) {
        onSuccess(obj);
      }
      sessionStorage.setItem("/profile/education", JSON.stringify(obj));
    })
    .catch(onFailure);
}