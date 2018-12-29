export const formatTime = time => `${time.slice(0, 2)}:${time.slice(2)}`;

export const normalizeInputTime = time => {
  let out = time.replace(":", "");
  if (out.length === 3) out = "0" + out;
  return out;
};

export const dateToStr = date => `${date.getDate()}. ${date.getMonth() + 1}.`; //add 1 because getMonth() returns 0 for January

export const formatRecordTime = (from, to) =>
  `${formatTime(from)} - ${formatTime(to)}`;

export const isDateStr = str =>
  !!new RegExp("^\\d+\\. ?\\d+\\.\\s*$").exec(str);

export const getOwnerByDogID = (dogID, users) =>
  Object.values(users).find(user => user.dogIDs.includes(dogID));
