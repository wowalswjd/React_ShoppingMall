import React, {useContext, useState, lazy, Suspense} from 'react';
import { Button } from 'react-bootstrap';
import './App.css';

import Login from "./views/Login";
import Join from "./views/Join";
import Event from './views/Event';
import Cart from './views/Cart';
import Mypage from './views/Mypage';

import axios from 'axios';
import Card from './Card.js';

import { Link, Route, Switch } from 'react-router-dom';

import Data from './data.js';
import Navigation from './Nav.js';
// import Detail from './views/Detail.js';
let Detail = lazy( () => { return import('./views/Detail.js') } );
// lazy loading : <Detail>을 보여줄 때만 import Detail.js를 해옴



export let stockContext = React.createContext();

function App() {

  let [shoes, setShoes] = useState(Data);
  let [stock, setStock] = useState([10,11,12]);

  return (
    <div className="App">
      <Navigation></Navigation>
      <Switch>
        <Route exact path="/" >
          <div className="jumbo">
            <h1>20% Season Off</h1>
            <p>220110 - 220117 7일간의 특가!</p>
            <p>
              <Button variant="primary">Learn More</Button>
            </p>
          </div>
          <div className="container">
            <stockContext.Provider value={stock}>
              <div className="row">
                {
                  shoes.map(function(shoesInfo, i){
                    return(
                      <Card shoes={shoes[i]} i={i} key={i}></Card>
                    )
                  })
                }
              </div>
            </stockContext.Provider>

            <button className="etcbtn" onClick={()=>{
              // 새로고침 없이 데이터 가져오는 것(서버랑 몰래 통신 가능)
              axios.get('https://codingapple1.github.io/shop/data2.json')
              .then((result)=>{
                console.log(result.data);
                //더보기 버튼을 누를 경우 html 하드코딩하지말고 shoes 배열에 result.data를 추가해주기
                setShoes([...shoes, ...result.data]);
                
              })
              .catch(()=>{
                console.log('실패했어요')
              })
            }}>더보기</button>
        </div>
        </Route>

        <Route path="/detail/:id">
          <Suspense fallback={<div>로딩중입니다</div>}>
            <Detail shoes={shoes} stock={stock} setStock={setStock}></Detail>
          </Suspense>
        </Route>

        <Route path="/login" component={Login} />
        
        <Route path="/join" component={Join} />

        <Route path="/event" component={Event} />

        <Route path="/mypage" component={Mypage} />
         
        <Route path="/cart" component={Cart}/>

        <Route path="/:id">
            <div>기타 자료들</div>
        </Route>


      </Switch>
    </div>
  );
}



export default App;

