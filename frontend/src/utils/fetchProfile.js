import axiosInstance from "./axiosInstance";

const fetchProfile = async () => {
  const res = await axiosInstance.get("/auth/profile");
  return res.data;
};

export default fetchProfile;