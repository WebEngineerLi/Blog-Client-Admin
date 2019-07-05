import React, { Component, Fragment } from 'react';
import { Form } from 'antd';
import ReactMde from 'react-mde';
import * as Showdown from 'showdown';
import 'react-mde/lib/styles/css/react-mde-all.css';

@Form.create()
class MarkDownEditor extends Component {
	constructor(props) {
		super(props);
		this.converter = new Showdown.Converter({
			tables: true,
			simplifiedAutoLink: true,
			strikethrough: true,
			tasklists: true
		});
	}

	state = {
		selectedTab: 'write'
	}

	render() {
		const { form: { getFieldDecorator } } = this.props;
		const { selectedTab } = this.state;
		return (
			<Fragment>
				{
					getFieldDecorator('markdown')(
						<ReactMde
							selectedTab={selectedTab}
							onChange={this.handleChangeValue}
							onTabChange={( selectedTab ) => { this.setState({ selectedTab }) }}
							generateMarkdownPreview={markdown =>
								Promise.resolve(this.converter.makeHtml(markdown))
							}
						/>
					)
				}
			</Fragment>
		)
	}
}
export default MarkDownEditor;