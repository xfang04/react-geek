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

function getArticleApi(id) {
  return request({
    method: "GET",
    url: `/mp/articles/${id}`,
  });
}

function updateArticleApi(data) {
  return request({
    method: "PUT",
    url: `/mp/articles/${data.id}?draft=false`,
    data,
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
  getArticleApi,
  getArticleListApi,
  updateArticleApi,
  deleteArticleApi,
};
