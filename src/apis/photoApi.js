import axios from "axios";

const photoURl = "https://jsonplaceholder.typicode.com/photos";
const getPhotos = async () => {
  try {
    const res = await axios.get(photoURl);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
const getPhoto = async id => {
  try {
    const res = await axios.get(`${photoURl}/${id}`);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
const postPhoto = async data => {
  try {
    const res = await axios.post(photoURl, data);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
const deletePhoto = async id => {
  try {
    const res = await axios.delete(`${photoURl}/${id}`);
  } catch (error) {
    console.log(error);
  }
};
const putPhoto = async () => {
  try {
    const res = await axios.put(`${photoURl}/${id}`, data);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
const patchPhoto = async (id, {}) => {
  try {
    const res = await axios.patch(`${photoURl}/${id}`, {});
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

export { getPhoto, getPhotos, postPhoto, deletePhoto, putPhoto, patchPhoto };
