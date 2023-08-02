function timeStampToMinutes(timeStamp) {
  const trimmedTimestamp = timeStamp.split(':');
  if (typeof timeStamp === 'string' && trimmedTimestamp.length <= 2) {
    trimmedTimestamp[0] = Number(trimmedTimestamp[0]);
    trimmedTimestamp[1] = Number(trimmedTimestamp[1]);
    return Number(trimmedTimestamp[0] * 60 + trimmedTimestamp[1]);
  }
  return null;
}

function checkShiftMatch(shiftStart, shiftEnd, meetStart, meetDuration){
  const timeData = {
    shiftStart: timeStampToMinutes(shiftStart),
    shiftEnd: timeStampToMinutes(shiftEnd),
    meetStart: timeStampToMinutes(meetStart),
    meetEnd: timeStampToMinutes(meetStart) + meetDuration
  };
  if(timeData.shiftStart <= timeData.meetStart && timeData.shiftEnd >= timeData.meetEnd) {
    return true;
  }
  return false;
}
checkShiftMatch('08:00', '17:30', '14:00', 90);
