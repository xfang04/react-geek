import { request } from "@/utils";

function getChannelsApi() {
  return request({
    method: "GET",
    url: "/channels",
  });
}

function createArticleApi(data) {
  return request({
    method: "POST",
    url: "/mp/articles",
    data,
  });
}

function getArticleListApi(params) {
  return request({
    method: "GET",
    url: "/mp/articles",
    params,
  });
}

function deleteArticleApi(id) {
  return request({
    method: "DELETE",
    url: `/mp/articles/${id}`,
  });
}

export {
  getChannelsApi,
  createArticleApi,
  getArticleListApi,
  deleteArticleApi,
};
