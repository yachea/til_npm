const { atom } = require("recoil");

export const KKOLgoinAtom = atom({
  key: "KKOLgoinAtom",
  default: { id: "", nickname: "", thumbnail_image_url: "", email: "" },
});
