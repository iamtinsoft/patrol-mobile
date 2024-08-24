import client from "./client";
const endpoint = "/upload/single";
const addBooking = (data) => client.post("/appointments/mobile", data);
const deleteBooking = (id) => client.delete(`/appointments/mobile/${id}`);
const rescheduleBooking = (data) => client.put(`/appointments/mobile/${data.id}`, data);
const payBooking = (data) => client.put(`/appointments/pay-mobile/${data.id}`, data);
const getBookings = (id) => client.get(`/appointments/mobile/${id}`);
// const register = (data) => client.post("/users/mobile", data);
// const updateProfile = (data) => client.put("/users/mobile/profile/" + data.id, data);
// const forgotPassword = (data) => client.post("/auth/mobile/password-reset", data);
// const updatePassword = (data) => client.put("/auth/mobile/update-password", data);
// export const upload = (listing, onUploadProgress) => {
//   console.log(listing.images[0]);
//   const data = new FormData();
//   // data.append("myFile", listing.images[0]);

//   listing.images.forEach((image, index) =>
//     data.append("myFile", {
//       name: 'image' + index,
//       type: 'image/jpeg',
//       uri: image,
//     })
//   );

//   // if (listing.location)
//   //   data.append("location", JSON.stringify(listing.location));

//   return client.post(endpoint, data, {
//     onUploadProgress: (progress) =>
//       onUploadProgress(progress.loaded / progress.total),
//   });
// };
export default {
    //upload,
    addBooking,
    deleteBooking,
    getBookings,
    rescheduleBooking,
    payBooking
    //   register,
    //   forgotPassword,
    //   updatePassword,
    //   updateProfile
};
