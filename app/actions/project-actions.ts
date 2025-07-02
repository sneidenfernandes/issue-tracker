import axios from "axios";

export const fetchProjects = async () => {
  const res = await axios.get('/api/projects');
  return res.data;
};
