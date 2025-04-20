export function formatedDate(dateTime: string) {
  const date = new Date(dateTime);
  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  const day = date.getDate();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

interface LocalStorageData {
  [key: string]: any;
}

export const setToLocalStorage = (data: LocalStorageData) => {
  if (typeof window !== "undefined" && window.localStorage) {
    for (const key in data) {
      localStorage.setItem(key, data[key]);
    }
  }
};

export const getFromLocalStorage = (key: string, isArray: boolean = false) => {
  if (typeof window !== "undefined" && window.localStorage) {
    if (isArray) {
      return JSON.parse(localStorage.getItem(`${key}`) || "[]");
    }
    return localStorage.getItem(`${key}`);
  }
  return null;
};

export const removeFromLocalStorage = (key: string) => {
  if (typeof window !== "undefined" && window.localStorage) {
    localStorage.removeItem(key);
  }
};
