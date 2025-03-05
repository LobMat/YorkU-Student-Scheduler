// this file contains helper methods for accessing browser storage (local, session)

export const readLocal =  (key, base=undefined) => {
  try {
    const loadedJSON = localStorage.getItem(key);
    const parsedLoaded =  JSON.parse(loadedJSON ?? base);
    return parsedLoaded;
  } catch (error) {
    console.log("Local Storage Read Error: " + error);
    return undefined;
  }
}

export const writeLocal =  (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.log("Local Storage Write Error: " + error);
  }
}

export const deleteLocal = (key) => {
    localStorage.removeItem(key);
}

export const readSession =  (key, base=undefined) => {
  try {
    const loadedJSON = sessionStorage.getItem(key);
    const parsedLoaded =  JSON.parse(loadedJSON ?? base);
    return parsedLoaded;
  } catch (error) {
    console.log("Session Storage Read Error: " + error);
    return undefined;
  }
}

export const writeSession =  (key, data) => {
  try {
    sessionStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.log("Session Storage Write Error: " + error);
  }
}

export const deleteSession = (key) => {
  sessionStorage.removeItem(key);
}

export const POST = (body) => (
  {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  }
)