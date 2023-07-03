export default function generateUserId() {
  //set epoch timestamp + some random text to prevent duplicate userId
  let userId = parseInt(Date.now()).toString().slice(2);
  let randomString = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm";
  for (let i = 0; i <= 5; i++) {
    userId =
      randomString[(Math.random() * (randomString.length - 1)).toFixed(0)] +
      userId;
    userId +=
      randomString[(Math.random() * (randomString.length - 1)).toFixed(0)];
  }
  return userId;
}
