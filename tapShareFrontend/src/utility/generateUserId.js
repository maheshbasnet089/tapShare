export default function generateUserId() {
  //set epoch timestamp + some random text to prevent duplicate userId
  let userId = Math.round(parseInt(Date.now()) / 1000)
    .toString()
    .slice(4);
  let randomString = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm";
  for (let i = 0; i < 2; i++) {
    userId +=
      randomString[(Math.random() * (randomString.length - 1)).toFixed(0)];
  }
  return userId;
}

