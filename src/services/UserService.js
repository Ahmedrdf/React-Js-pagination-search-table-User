import http from "../http-common-Users";

const getAll = () => {
  return http.get("/GetUsers");
};

const get = id => {
  return http.get(`/UserById?id=${id}`);
};


const create = data => {
  return http.post("/Administartion/AddRoles", data);
};

const update = (id, data) => {
  return http.patch(`/${id}`, data);
};

const remove = id => {
  return http.delete(`/DeleteUser?id=${id}`);
};

const removeAll = () => {
  return http.delete(`/roles`);
};

const findByName= Name=> {
  return http.get(`/Administartion/GetRoleByName/${Name}`);
};


const RoleService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByName
};

export default RoleService;
