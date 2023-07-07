import generateUserId from "./generateUserId";
export default function storeUser() {
  if (
    localStorage.getItem("userId") == null ||
    localStorage.getItem("userId") == "" ||
    localStorage.getItem("userId") == undefined
  ) {
    const userId = generateUserId();
    localStorage.setItem("userId", userId);
  }
}
