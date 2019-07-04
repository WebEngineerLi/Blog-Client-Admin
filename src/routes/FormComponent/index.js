import React, { Component } from 'react';

class FormComponent extends Component {
	render() {
		const arr = [1, 4, 6, 9, 2, 4, 3, 0];
		let max = -1;
		let secondMax = max;
		for (let i = 0; i < arr.length; i++) {
			if (max < arr[i]) {
				secondMax = max;
				max = arr[i];
			}			
		}
		console.log('secondMax:', secondMax);
		console.log('max:', max);
		
		return (
			<input {...this.props.formData} />
		)
	}
}

export default FormComponent;
