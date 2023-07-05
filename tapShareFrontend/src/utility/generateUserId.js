export default function generateUserId() {
  //set epoch timestamp + some random text to prevent duplicate userId
  const userId = Math.floor(100000 + Math.random() * 900000);

  // let randomString = "qwertyuiopasdfghjklzxcvbnm";
  // for (let i = 0; i < 2; i++) {
  //   userId +=
  //     randomString[(Math.random() * (randomString.length - 1)).toFixed(0)];
  // }
  return userId;
}
