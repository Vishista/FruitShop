import React, { Component } from 'react';



class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user:''}
    
  }

  componentWillMount(){
  	const {cookies} = this.props
    cookies.remove('name')

  	//cookies.set('name', "mohan", { path: '/' })
  	this.setState({
  		user:cookies.get('name')
  	})
  }

  render() {
    const {user} = this.state
    const {cookies} = this.props
    return (
              
             <div> from test{this.state.user} {cookies.get('User')}</div>
    	)
      
		        


          
  
  




      
   
  
}
}

export default Test;