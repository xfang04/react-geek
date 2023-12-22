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

export { getChannelsApi, createArticleApi };
