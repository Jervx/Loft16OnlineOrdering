require("dotenv").config();

const baseURL = process.env.REACT_APP_SERVERURL
const tick = process.env.REACT_APP_UPDATE_TICK
const userTick = process.env.REACT_APP_USER_UPDATE_TICK
const chatTick = process.env.REACT_APP_CHAT_TICK

export const getTickUpdate = () => { return Number.parseInt(tick) }
export const getUserTickUpdate = () => { return Number.parseInt(userTick)}
export const getChatTick = () => { return Number.parseInt(chatTick)}

export const getUrl = (path) => { return `${baseURL}${path}` }

export const nShorter = (num, digits) => {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
    : "0";
};

export const numberWithCommas = (x) => {
  x = x.toFixed(2);
  return x.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const parseDate = (date) => {
  let thisDate = new Date(date);

  let wordDate = `${thisDate.toLocaleString("en-us", {
    month: "short",
  })} ${thisDate.getDate()}, ${thisDate.getFullYear()}`;

  return wordDate
};


export const parseDateTime = (date) => {
    let thisDate = new Date(date);
  
    let wordDate = `${thisDate.toLocaleString("en-us", {
      month: "short",
    })}  ${thisDate.getDate()},  ${thisDate.getFullYear()} at ${thisDate.toLocaleString('en-US', { hour: 'numeric', minute : '2-digit' , hour12: true })}`;
  
    return wordDate
  };
  