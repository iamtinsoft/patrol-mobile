import client from "./client";
const endpoint = "/upload/single";
const login = (email, password, code) => client.post("/auth", { email, password, code });
const register = (data) => client.post("/users/mobile", data);
const updateProfile = (data) => client.put("/users/mobile/profile/" + data.id, data);
const updateAuthStatus = (data) => client.put("/auth/mobile/update-auth-type", data);
const forgotPassword = (data) => client.post("/auth/mobile/password-reset", data);
const updatePassword = (data) => client.put("/auth/mobile/update-password", data);
export const upload = (listing, onUploadProgress) => {
  console.log(listing.images[0]);
  const data = new FormData();
  // data.append("myFile", listing.images[0]);

  listing.images.forEach((image, index) =>
    data.append("myFile", {
      name: 'image' + index,
      type: 'image/jpeg',
      uri: image,
    })
  );

  // if (listing.location)
  //   data.append("location", JSON.stringify(listing.location));

  return client.post(endpoint, data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};
export default {
  upload,
  login,
  register,
  forgotPassword,
  updatePassword,
  updateProfile,
  updateAuthStatus
};
