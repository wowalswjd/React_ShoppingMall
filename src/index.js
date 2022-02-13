import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';

let alertInitial = true;

function reducer2(state = alertInitial, action) {
  if(action.type === 'alert창닫기') {
    state = false;
    return state;
  } else {
    return state;
  }
}

let initialState = [
  { id : 0, name : 'White and Black', quantity : 2},
  { id : 1, name : 'Red Knit', quantity : 1}
] ;

function reducer(state = initialState, action) {
    if (action.type === '항목추가') {
      //객체 배열 내에서 payload.id 검색해서 장바구니 목록에 이미 같은 상품이 있는지 찾기
      let findSameGoods = state.findIndex( (obj)=>{return obj.id === action.payload.id} )
      if (findSameGoods >= 0) { // 장바구니에 이미 해당 상품이 있는 경우 - 수량만 증가
        let copy = [...state];
        copy[findSameGoods].quantity++;
        return copy

      } else { //장바구니 내에 중복된 상품이 없는 경우
        let copy = [...state];
        copy.push(action.payload);
        return copy;
      }
      
    } else if (action.type === '수량증가') {
      let copy = [...state];
      console.log(action.data);
      copy[action.data].quantity++;
      return copy
    } else if (action.type === '수량감소') {
      let copy = [...state];
      copy[action.data].quantity--;
        if (copy[action.data].quantity < 0) {
          // 장바구니 개수가 음수가 될 경우
          alert('장바구니에 0보다 작은 수를 담을 수 없습니다!');
          copy[action.data].quantity++;
          // 다시 0으로 복구시켜놓고 copy array 리턴
          return copy;
        }
        else return copy;
    } else {
      return state
    }

}

let store = createStore( combineReducers({reducer, reducer2}) );

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store = {store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
