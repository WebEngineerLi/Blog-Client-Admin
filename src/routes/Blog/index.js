import React, { Component, Fragment } from 'react';
import { Button, Form, Input, Tag, Icon } from 'antd';
import CSSModules from 'react-css-modules';
import styles from './index.scss';
import BlogMenu from '../../components/BlogMenu'

const FormItem = Form.Item;

@Form.create()
@CSSModules(styles)
class Blog extends Component {
	constructor(props) {
		super(props);
		this.state = {
			'tags': [],
			showInput: false,
		}
	}

	handleCloseTag() {

	}

	renderTags(tags) {
		return tags.map(item => (
			<Tag key={item} closable onClose={this.handleCloseTag}>{item}</Tag>
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
		return (
			<Input
				style={{ border: '1px solid red' }}
				ref={this.saveInputRef}
				type="text"
				size="small"
				style={{ width: 78 }}
				onBlur={this.handleInputConfirm}
				onPressEnter={this.handleInputConfirm}
			/>
		)
	}

	renderContent() {
		const { form: { getFieldDecorator } } = this.props;
		const { tags, showInput } = this.state;
		const formLayout = {
			labelCol: { offset: 0, span: 5 },
			wrapperCol: { offset: 0, span: 15 }
		}
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
					{showInput ? this.renderAddInput() : this.renderAddTag()}
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