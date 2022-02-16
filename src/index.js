import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import LoadMore from './LoadMore';
import InfiniteScoll from './InfiniteScoll';
import LoadMore2 from './LoadMore2';
import InfiniteScroll2 from './InfiniteScroll2';


// ReactDOM.render(What,Where);
ReactDOM.render(
  <React.StrictMode>
    <InfiniteScroll2 />
  </React.StrictMode>,
  document.getElementById('root')
);
