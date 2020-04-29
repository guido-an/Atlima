import React from 'react';
import AllPosts from '../components/Post/AllPosts'


class Home extends React.Component {
  componentDidMount(){
    console.log(this.props)
  }
  render() {
    return (
     <div>
         <h1>Home</h1>
         <AllPosts/>
   </div>
    );
  }
}

export default Home;
