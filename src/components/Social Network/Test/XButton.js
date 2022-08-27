import React, {Component} from 'react'
import Radium from 'radium'
import { Button } from 'antd';

class XButton extends Component {

		render(){
			const styling = {
				'backgroundColor': '#dbd2d2', 
				'border':"#ffffff",
				'display': 'inline-block',
				'color':"#000000",
				'margin':'2px',
				'width':'250px',
				    ':hover': {
					  'backgroundColor': '#0074d9'
					}
			}
			
			return(
				<Button key={this.props.value} className="FieldButton" type="primary" 
				style={[styles.base], styles["primary"]}>
					{this.props.value}
				</Button>
			)
		}
}

export default Radium(XButton);

var styles = {
  base: {
    color: '#fff',
	background: 'd32af1',
 
    // Adding interactive state couldn't be easier! Add a special key to your
    // style object (:hover, :focus, :active, or @media) with the additional rules.
    ':hover': {
      background: '#0074d9'
    }
  },
  
  primary: {
    background: '#ba7e1f',
	    ':hover': {
			background: '#0074d9'
		}
  }

};