import {
  Breadcrumb,
  Button,
  Card,
  Form,
  Input,
  message,
  Radio,
  Select,
  Space,
  Upload,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Link, useSearchParams } from "react-router-dom";
import "./index.scss";
import { useEffect, useRef, useState } from "react";
import {
  createArticleApi,
  getArticleApi,
  updateArticleApi,
} from "@/apis/article";
import { useChannel } from "@/hooks/useChannel";

const { Option } = Select;

const Publish = () => {
  const { channelList } = useChannel();
  const [imageList, setImageList] = useState([]);
  const [imageType, setImageType] = useState(0);
  const cacheImageList = useRef([]);
  const [form] = Form.useForm();
  const [searchParams] = useSearchParams();
  const articleId = searchParams.get("id");

  const onUploadChange = (info) => {
    setImageList(info.fileList);
    cacheImageList.current = info.fileList;
  };

  const onTypeChange = (e) => {
    const type = e.target.value;
    setImageType(type);
    if (type === 1) {
      // 单图，截取第一张展示
      const imgList = cacheImageList.current[0]
        ? [cacheImageList.current[0]]
        : [];
      setImageList(imgList);
    } else if (type === 3) {
      // 三图，取所有图片展示
      setImageList(cacheImageList.current);
    }
  };

  const onFinish = async (formValue) => {
    if (imageType !== imageList.length)
      return message.warning("图片类型和数量不一致");
    const { channel_id, content, title } = formValue;
    const formatUrl = (list) => {
      return list.map((item) => {
        if (item.response) {
          return item.response.data.url;
        } else {
          return item.url;
        }
      });
    };
    const reqData = {
      channel_id,
      content,
      title,
      type: imageType,
      cover: {
        type: imageType,
        images: formatUrl(imageList),
      },
    };
    if (articleId) {
      // 编辑
      await updateArticleApi({ ...reqData, id: articleId });
    } else {
      // 新增
      await createArticleApi(reqData);
    }

    message.success(`${articleId ? "编辑" : "发布"}文章成功`);
  };

  useEffect(() => {
    async function getArticle() {
      const res = await getArticleApi(articleId);
      const { cover, ...formValue } = res.data;
      // 设置表单数据
      form.setFieldsValue({ ...formValue, type: cover.type });
      setImageType(cover.type); // 封面类型
      setImageList(cover.images.map((url) => ({ url }))); // 封面list
    }

    if (articleId) {
      // 拉取数据回显
      getArticle();
    }
  }, [articleId, form]);
  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to={"/"}>首页</Link> },
              { title: `${articleId ? "编辑" : "发布"}文章` },
            ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 0 }}
          onFinish={onFinish}
        >
          <Form.Item
            label="标题"
            rules={[{ required: true, message: "请输入文章标题" }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            rules={[{ required: true, message: "请选择文章频道" }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channelList.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={onTypeChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {imageType > 0 && (
              <Upload
                name="image"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList
                action={"http://geek.itheima.net/v1_0/upload"}
                onChange={onUploadChange}
                maxCount={imageType}
                multiple={imageType > 1}
                fileList={imageList}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
          </Form.Item>
          <Form.Item
            label="内容"
            rules={[{ required: true, message: "请输入文章内容" }]}
          >
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                `${articleId ? "编辑" : "发布"}文章`
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Publish;
