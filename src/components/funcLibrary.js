export function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec", 
  ];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time =
    date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
  return time;
}

export function changeTemp(value, option) {
  switch (option) {
    case 1:
      return Math.floor(value - 273.15);
    case 2:
      return value;
    case 3:
      return Math.floor(((value - 273.15) * 9) / 5 + 32);

    default:
      return Math.floor(value - 273.15);
  }
}

export function changT(option){
  switch (option) {
    case 1:
      return "C°";
    case 2:
      return "K";
    case 3:
      return "F°";

    default:
      return "C°";
  }
}