import http from "../http-common-Users";

const getAll = () => {
  return http.get("/GetUsers");
};

const get = id => {
  return http.get(`/Administartion/GetRoleById/${id}`);
};


const create = data => {
  return http.post("/Administartion/AddRoles", data);
};

const update = (id, data) => {
  return http.patch(`/Administartion/${id}`, data);
};

const remove = id => {
  return http.delete(`/Administartion/DeleteteRoleById/${id}`);
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
