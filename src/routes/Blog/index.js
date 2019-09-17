import React, { Component, Fragment } from 'react';
import { Button, Form, Input, Tag, Icon, Popconfirm, Upload, message, Modal } from 'antd';
import CSSModules from 'react-css-modules';
import ReactMde from 'react-mde';
import imageConversion from 'image-conversion';
import * as Showdown from 'showdown';
import _ from 'lodash';
import 'react-mde/lib/styles/css/react-mde-all.css';
import BlogMenu from '../../components/BlogMenu'
import styles from './index.scss';
import { connect } from 'react-redux';
import { model, selectors } from '../../models/blog';
import Header from '../../components/Header';

const { TextArea } = Input;
const FormItem = Form.Item;
const formLayout = {
  labelCol: { offset: 0, span: 2 },
  wrapperCol: { offset: 0, span: 21 }
}
const mapStateToProps = (state) => ({
  blogList: selectors.blogList(state),
  currentData: selectors.getCurrentData(state)
})
const mapDisaptchToProps = (dispatch) => ({
  saveBlog(params, callback) {
    dispatch({
      type: `${model.namespace}/saveBlog`,
      payload: params,
      callback
    })
  },
  getBlogList() {
    dispatch({
      type: `${model.namespace}/blogList`
    })
  },
  getBlogDetail(params, callback) {
    dispatch({
      type: `${model.namespace}/blogDetail`,
      payload: params,
      callback
    })
  },
  deleteBlog(params, callback) {
    dispatch({
      type: `${model.namespace}/blogDelete`,
      payload: params,
      callback
    })
  },
  modifyBlog(params) {
    dispatch({
      type: `${model.namespace}/modifyBlog`,
      payload: params,
    })
  },
  publishBlog(params) {
    dispatch({
      type: `${model.namespace}/publishBlog`,
      payload: params,
    })
  },
  offlineBlog(params) {
    dispatch({
      type: `${model.namespace}/offlineBlog`,
      payload: params,
    })
  },
  uploadImg(params, callback) {
    dispatch({
      type: `${model.namespace}/uploadImg`,
      payload: params,
      callback
    })
  }
})

@Form.create()
@connect(mapStateToProps, mapDisaptchToProps)
@CSSModules(styles)
class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      showInput: false,
      selectedTab: 'write',
      blogId: '',
    }
    this.converter = new Showdown.Converter({
      tables: true,
      simplifiedAutoLink: true,
      strikethrough: true,
      tasklists: true
    });
    this.saveInputRef = React.createRef();
    this.saveDraft = this.saveDraft.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    this.props.getBlogList();
    this.timer = setInterval(() => {
      if (this.state.blogId) {
        // 三分钟自动保存一次
        this.saveDraft();
      }
    }, 1000 * 60 * 3)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  handleCreate = () => {
    this.setState({ blogId: '' })
    this.props.form.resetFields();
    this.setState({ tags: [] })
    this.props.form.setFieldsValue({ blogContent: '' })
  }

  handleDelete() {
    const { blogId } = this.state;
    const callback = (res) => {
      if (res) {
        this.props.form.resetFields();
        this.props.form.setFieldsValue({ blogContent: '' })
        this.setState({ tags: [] })
      }
    }
    this.props.deleteBlog({ blogId }, callback)
  }

  handleSelect(node) {
    const { key } = node;
    this.setState({ blogId: key })
    const params = {
      blogId: key
    }
    const callback = (res) => {
      const { form: { setFieldsValue } } = this.props;
      const { blogTags } = res;
      this.setState({ tags: blogTags.split(',') });
      const newData = _.pick(res, ['blogTitle', 'blogContent', 'blogDescription'])
      setFieldsValue(newData);
    }
    this.props.getBlogDetail(params, callback)
  }

  saveDraft() {
    const { form: { validateFields, setFieldsValue } } = this.props;
    const { tags, blogId } = this.state;
    validateFields((errors, values) => {
      if (errors) {
        return;
      }
      const params = {
        ...values,
        blogTags: tags.join(','),
      }
      const callback = (res) => {
        if (res) {
          setFieldsValue({
            blogTitle: '',
            blogContent: '',
            blogDescription: '',
          })
          this.setState({ tags: [] })
        }
      }
      if (blogId) {
        params.blogId = blogId;
        this.props.modifyBlog(params)
      } else {
        this.props.saveBlog(params, callback)
      }
    })
  }

  handleCloseTag(value) {
    const { tags } = this.state;
    const index = tags.indexOf(value);
    tags.splice(index, 1);
    this.setState({ tags })
  }

  handleInputConfirm = () => {
    const { form: { getFieldValue, setFieldsValue } } = this.props;
    const { tags } = this.state;
    const value = getFieldValue('tag');
    if (value) {
      if (tags.indexOf(value) === -1) {
        tags.push(value)
        this.setState({ tags });
        setFieldsValue({ 'tag': '' });
        this.setState({ showInput: false })
      }
    }
  }

  publishBlog = () => {
    const { blogId } = this.state;
    this.props.publishBlog({ blogId })
  }

  offlineBlog = () => {
    const { blogId } = this.state;
    this.props.offlineBlog({ blogId })
  }

  renderTags(tags) {
    return tags.map(item => (
      <Tag key={item} closable onClose={() => this.handleCloseTag(item)}>{item}</Tag>
    ))
  }

  renderAddTag() {
    return (
      <Tag onClick={() => { this.setState({ showInput: true }) }} style={{ background: '#fff', borderStyle: 'dashed' }}>
        <Icon type="plus" /> New Tag
			</Tag>
    )
  }

  renderAddInput() {
    const { form: { getFieldDecorator } } = this.props;
    return (
      <Fragment>
        {getFieldDecorator('tag')(
          <Input
            style={{ border: '1px solid red' }}
            type="text"
            size="small"
            style={{ width: 78 }}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
      </Fragment>
    )
  }

  uploadImg = (file) => {
    const formData = new FormData();
    const { form: { getFieldValue, setFieldsValue } } = this.props;
    // 由于post传输文件的特殊性，所以需要构造form键值对
    formData.append("file", file)
    // 文件上传时不需要添加header
    const callback = (data) => {
      message.success('上传成功');
      const blogContent = getFieldValue('blogContent');
      const newBlogContent = `${blogContent}![](${data.data})`
      setFieldsValue({ blogContent: newBlogContent })
    }
    this.props.uploadImg(formData, callback)
  }

  compressImg = async (file) => {
    const fileAttribute = _.pick(file, ['type', 'lastModified', 'lastModifiedDate']);
    const blogObj = await imageConversion.compressAccurately(file, 1000)
    if (blogObj) {
      const newSize = (blogObj.size / (1024 * 1024)).toFixed(2);
      message.success(`压缩成功，压缩之后的大小为${newSize}MB，开始上传`)
      const fileObj = new File([blogObj], file.name, fileAttribute)
      fileObj.uid = file.uid;
      this.uploadImg(fileObj);
    }
  }

  handleUpload = (files) => {
    const { file } = files;
    if (file.size > (1024 * 1024)) {
      const size = (file.size / (1024 * 1024)).toFixed(1);
      Modal.confirm({
        title: '上传提示',
        onOk: this.compressImg.bind(this, file),
        width: 550,
        okText: '确认',
        cancelText: '取消',
        content: (
          <div>
            <h3>上传的图片大小不能超过1MB，您当前的图片大小为{size}MB</h3>
            <p>点击『确认』我们将自动压缩您的图片并上传</p>
            <p>点击『取消』您可手动压缩图片再次上传</p>
          </div>
        )
      })
    } else {
      this.uploadImg(file);
    }
  }

  renderUplodaImg() {
    const props = {
      customRequest: this.handleUpload,
      accept: '.jpg, .jpeg, .png, .gif',
      showUploadList: false
    }
    return (
      <Upload {...props} styleName="upload">
        <span>上传本地图片</span>
      </Upload>
    )
  }

  renderContent() {
    const { form: { getFieldDecorator }, currentData } = this.props;
    const { tags, showInput, selectedTab, blogId } = this.state;

    return (
      <Form layout="horizontal" styleName="form">
        <FormItem label="标题" {...formLayout}>
          {getFieldDecorator('blogTitle', {
            rules: [{ required: true, message: '请输入标题' }]
          })(
            <Input placeholder="请输入标题" />
          )}
        </FormItem>
        <FormItem label="描述" {...formLayout}>
          {getFieldDecorator('blogDescription', {
            rules: [{ required: true, message: '请输入描述内容' }]
          })(
            <TextArea placeholder="请输入描述内容" />
          )}
        </FormItem>
        <FormItem label="标签" {...formLayout}>
          {this.renderTags(tags)}
          {tags.length < 5 && <Fragment>
            {showInput ? this.renderAddInput() : this.renderAddTag()}
          </Fragment>}
        </FormItem>
        <FormItem label="内容" {...formLayout} styleName="markdown">
          {
            getFieldDecorator('blogContent')(
              <ReactMde
                selectedTab={selectedTab}
                onTabChange={(selectedTab) => { this.setState({ selectedTab }) }}
                generateMarkdownPreview={markdown =>
                  Promise.resolve(this.converter.makeHtml(markdown))
                }
              />
            )
          }
          {selectedTab === "write" && this.renderUplodaImg()}
        </FormItem>
        <FormItem wrapperCol={{ span: 22, offset: 2 }}>
          <Button styleName="btn" type="primary" onClick={this.saveDraft}>保存草稿</Button>
          {blogId && currentData.blogStatus === "0" &&
            <Popconfirm
              title="您确定要发布吗"
              onConfirm={this.publishBlog}
              okText="Yes"
              cancelText="No"
            >
              <Button styleName="btn">发布</Button>
            </Popconfirm>
          }
          {blogId && <Fragment>
            {currentData.blogStatus === "1" &&
              <Popconfirm
                title="您确定要下线吗"
                onConfirm={this.offlineBlog}
                okText="Yes"
                cancelText="No"
              >
                <Button styleName="btn">下线</Button>
              </Popconfirm>
            }
            <Popconfirm
              title="您确定要删除吗"
              onConfirm={this.handleDelete}
              okText="Yes"
              cancelText="No"
            >
              <Button styleName="btn" type="danger">删除</Button>
            </Popconfirm>
          </Fragment>}
        </FormItem>
      </Form>
    )
  }
  render() {
    const { blogList } = this.props;
    const { blogId } = this.state;
    return (
      <Fragment>
        <Header onCreate={this.handleCreate} blogId={blogId} />
        <div styleName="wrap">
          <div styleName="menu">
            <BlogMenu {...this.props} blogList={blogList} onSelect={this.handleSelect} selectedKeys={[this.state.blogId]} />
          </div>
          <div styleName="content">
            {this.renderContent()}
          </div>
        </div>
      </Fragment>
    )
  }
}
export default Blog;