import React, { Component, Fragment } from 'react';
import { Button, Form, Input, Tag, Icon } from 'antd';
import CSSModules from 'react-css-modules';
import ReactMde from 'react-mde';
import * as Showdown from 'showdown';
import 'react-mde/lib/styles/css/react-mde-all.css';
import BlogMenu from '../../components/BlogMenu'
import MarkDownEditor from '../../components/MarkDownEditor';
import styles from './index.scss';


const FormItem = Form.Item;
const formLayout = {
	labelCol: { offset: 0, span: 5 },
	wrapperCol: { offset: 0, span: 15 }
}

@Form.create()
@CSSModules(styles)
class Blog extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tags: [],
			showInput: false,
			selectedTab: 'write'
		}
		this.converter = new Showdown.Converter({
			tables: true,
			simplifiedAutoLink: true,
			strikethrough: true,
			tasklists: true
		});
		this.saveInputRef = React.createRef();
		this.saveDraft = this.saveDraft.bind(this);
	}

	saveDraft() {
		const { form: { validateFields } } = this.props;
		const { tags } = this.state;
		validateFields((errors, values) => {
			if (errors) {
				return ;
			}
			const params = {
				...values,
				tags: tags.join(','),
			}
			console.log('params:', params);
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

	renderContent() {
		const { form: { getFieldDecorator } } = this.props;
		const { tags, showInput, selectedTab } = this.state;
		return (
			<Form layout="horizontal">
				<FormItem label="标题" {...formLayout}>
					{getFieldDecorator('title', {
						rules: [{ required: true, message: '请输入标题' }]
					})(
						<Input placeholder="请输入标题" />
					)}
				</FormItem>
				<FormItem label="标签" {...formLayout}>
					{this.renderTags(tags)}
					{tags.length < 5 && <Fragment>
						{showInput ? this.renderAddInput() : this.renderAddTag()}
					</Fragment>}
				</FormItem>
				<FormItem label="内容" {...formLayout}>
					{
						getFieldDecorator('markdown')(
							<ReactMde
								selectedTab={selectedTab}
								onTabChange={(selectedTab) => { this.setState({ selectedTab }) }}
								generateMarkdownPreview={markdown =>
									Promise.resolve(this.converter.makeHtml(markdown))
								}
							/>
						)
					}
				</FormItem>
				<FormItem wrapperCol={{ offset: 5 }}>
					<Button styleName="btn" type="primary" onClick={this.saveDraft}>保存草稿</Button>
					<Button styleName="btn">发布</Button>
					<Button styleName="btn">下线</Button>
					<Button styleName="btn" type="danger">删除</Button>
				</FormItem>
			</Form>
		)
	}
	render() {
		return (
			<div styleName="wrap">
				<div styleName="menu">
					<BlogMenu {...this.props} />
				</div>
				<div styleName="content">
					{this.renderContent()}
				</div>
			</div>
		)
	}
}
export default Blog;