import { request } from "@/utils";

function loginApi(data) {
  return request({
    method: "POST",
    url: "/authorizations",
    data,
  });
}

function getUserInfoApi() {
  return request({
    method: "GET",
    url: "/user/profile",
  });
}

export { loginApi, getUserInfoApi };
