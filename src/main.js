import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';

class Item extends React.Component {
  render() {
    let item = this.props.store.item;

    return (
      <div>
      <h1><a href={item.url}>{item.title}</a></h1>
      <h2>{item.score} - {item.by.id}</h2>
      </div>
    );
  }
};

let item = {
  id : '1337',
  url : 'http://google.com',
  title : 'Google',
  score : 100,
  by : { id : 'clay'}
};

let store = { item };

ReactDOM.render(
  <Item store={store} />,
  document.getElementById('root')
);
