export function timeConvert(timestamp) {
  var hours = Math.floor(timestamp / 60 / 60);
  var minutes = Math.floor(timestamp / 60) - hours * 60;
  var seconds = timestamp % 60;
  return (
    hours.toString().padStart(1, "0") +
    ":" +
    minutes.toString().padStart(2, "0") +
    ":" +
    seconds.toString().padStart(2, "0")
  );
}
