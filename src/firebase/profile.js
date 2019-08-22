import {database} from '../config/firebase';
import {coalesce} from "../common/utils";

export async function fetchDBObject(path, fromCache) {
  fromCache = coalesce(fromCache, true);
  if (fromCache) {
    let cached = sessionStorage.getItem(path);
    if (cached) {
      return new Promise((resolve, _) => resolve(JSON.parse(cached)));
    }
  }

  let snap = await database.ref(path).once('value');
  if (snap) {
    let obj = snap.val();
    sessionStorage.setItem(path, JSON.stringify(obj));
    return new Promise((resolve, _) => resolve(obj));
  }
  return new Promise((resolve, _) => resolve(null));
}

export async function addDBObject(path, content) {
  return database.ref(path).push().set(content);
}

export async function updateDBModelText(path, heading, text) {
  let updates = {};
  updates[`${path}/heading`] = heading;
  updates[`${path}/text`] = text;
  try {
    await database.ref().update(updates);
    let cached = sessionStorage.getItem(path);
    if (cached) {
      cached = JSON.parse(cached);
      cached.heading = heading;
      cached.text = text;

      // Re-set the cache
      sessionStorage.setItem(path, JSON.stringify(cached));
    }
    return new Promise((resolve, _) => resolve());
  } catch (err) {
    return new Promise((_, reject) => reject(err));
  }
}

export async function updateDBModelObjs(path, key, content) {
  let updates = {};
  updates[`${path}/objs/${key}`] = content;
  return database.ref().update(updates);
}

export async function updateProfileText(heading, text) {
  return updateDBModelText("/profile/aboutMe", heading, text);
}

export async function fetchAboutMe(fromCache) {
  return fetchDBObject("/profile/aboutMe", fromCache);
}

export async function updateWorkExperienceText(heading, text) {
  return updateDBModelText("/profile/workExperience", heading, text);
}

export async function fetchWorkExperience(fromCache) {
  return fetchDBObject("/profile/workExperience", fromCache);
}

export async function updateWorkExperienceContent(content, key) {
  if (key === null || key === undefined) {
    return new Promise((resolve, _) => resolve(null));
  }
  return updateDBModelObjs("/profile/workExperience", key, content);
}

export async function updateProjectsText(heading, text) {
  return updateDBModelText("/profile/projects", heading, text);
}

export async function fetchProjects(fromCache) {
  return fetchDBObject("/profile/projects", fromCache);
}

export async function updateProjectContent(content, key) {
  if (key === null || key === undefined) {
    return new Promise((resolve, _) => resolve(null));
  }
  return updateDBModelObjs("/profile/projects", key, content);
}

export async function fetchActions() {
  let snap = await database.ref('actions').once('value');
  if (snap) {
    return new Promise((resolve, _) => resolve(snap.val()));
  } else {
    return new Promise((resolve, _) => resolve(null));
  }
}

export async function updateEducationText(heading, text) {
  return updateDBModelText("/profile/education", heading, text);
}

export function updateEducationCourse(content, key) {
  if (key === null || key === undefined) {
    return new Promise((resolve, _) => resolve(null));
  }
  return updateDBModelObjs("/profile/education", key, content);
}

export async function addEducationCourse(content) {
  if (!content) {
    return new Promise((resolve, _) => resolve(null));
  }
  return addDBObject("/profile/education/objs", content);
}

export async function removeEducationCourse(key) {
  return database.ref(`/profile/education/objs/${key}`).remove();
}

export async function fetchEducation(fromCache) {
  return fetchDBObject("/profile/education", fromCache);
}