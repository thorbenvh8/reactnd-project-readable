export function getDateString(timestamp) {
  var date = new Date(timestamp)

  // Day part from the timestamp
  var day = date.getDay()
  // Month part from the timestamp
  var month = date.getMonth()
  // Year part from the timestamp
  var year = date.getFullYear()

  // Hours part from the timestamp
  var hours = date.getHours()
  // Minutes part from the timestamp
  var minutes = "0" + date.getMinutes()
  // Seconds part from the timestamp
  var seconds = "0" + date.getSeconds()

  // Will display date with time in 11/02/2017 10:30:23 format
  return month + '/' + day + '/' + year + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)
}
