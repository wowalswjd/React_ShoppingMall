import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Navbar, Container, Nav, NavDropdown, Tab, Tabs } from 'react-bootstrap';
import './Detail.scss';
import {CSSTransition} from "react-transition-group";
import { connect } from 'react-redux';

let Box = styled.div`
    padding:20px;
`;

function Detail(props) {

    let { id } = useParams();
    let history = useHistory();
    let foundGoods = props.shoes.find(function(goods){
        return goods.id == id
    })
    // 원래는 props.shoes[id].title이렇게 사용했었음
    // 아이템 정렬 시에 배열의 순서가 완전히 뒤바뀌게 되면 url에 해당숫자를 입력하면 원하는 값이 나오지 않기 때문에
    // id와 props.shoes전체의 id 중에 같은 걸 찾아주는 함수 사용 -> 찾은 결과를 foundGoods에 저장
    
    let [alert, setAlert] = useState(true);
    let [inputData, setInputData] = useState('');

    let [pickedTab, setPickedTab] = useState(0);
    let [aniSwitch, setAniSwitch] = useState(false);

    useEffect(()=>{
        // 2초 후에 alert창을 안보이게
        const alertTimeout = setTimeout(()=>{
            setAlert(false);
        }, 2000);
        return () => {clearTimeout(alertTimeout)};
    },[alert]);


    return(
        <div className="container">
            <Box className="red">Detail</Box>

            {/* <input onChange={(e)=>{setInputData(e.target.value)}}/> */}

            {
                alert === true
                ? (
                    <div className="my-alert">
                        <p>재고가 얼마 남지 않았습니다!</p>
                    </div>
                )
                : null
            }


            <div className="row">
                <div className="col-md-6">
                <img src={"https://codingapple1.github.io/shop/shoes"+(foundGoods.id+1)+".jpg"} width="100%" />
                </div>
                <div className="col-md-6 mt-4">
                <h4 className="pt-5">
                    {foundGoods.title}
                </h4> 
                
                <p>{foundGoods.content}</p>
                <p>{foundGoods.price}원</p>

                <StockInfo stock={props.stock}></StockInfo>
                
                <button 
                    className="btn btn-danger" 
                    onClick={ () => {
                        props.setStock([9,11,12]) 
                        props.dispatch({
                            type : '항목추가', 
                            payload : {id: foundGoods.id, name: foundGoods.title, quantity : 1 }
                        });
                        history.push('/cart');
                    } }>
                주문하기</button>
                <button className="btn btn-danger" onClick={()=>{
                    history.goBack();
                }}>뒤로가기</button>  
                </div>
            </div>

            <Nav className="mt-5" variant="tabs" defaultActiveKey="상세정보">
                <Nav.Item>
                    <Nav.Link eventkey="상세정보" onClick={()=> {setAniSwitch(false); setPickedTab(0)}}>상세정보</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="리뷰" onClick={() => {setAniSwitch(false); setPickedTab(1)}}>Review</Nav.Link>
                </Nav.Item>
            </Nav> 
            
           
            
            {/* 탭 클릭 시 본문 smooth하게 애니메이션 */}
            <CSSTransition in={aniSwitch} classNames="wow" timeout={500}>
                <TabContent pickedTab={pickedTab} setAniSwitch={setAniSwitch}/>
            </CSSTransition>
            

        </div>
    )
  }

  function TabContent(props) {

    useEffect( () => {
        props.setAniSwitch(true);
    } )
      if (props.pickedTab === 0) {
          return(
              <div>0번째 내용입니다.</div>
          )
      } else if (props.pickedTab === 1) {
          return(
              <div>1번째 내용입니다.</div>
          )
      }
  }


  function StockInfo(props) {
      return(
          <p>재고 : {props.stock[0]} </p>
      )
  }

  function stateToProps(state) {
    return { 
        state : state.reducer,
        // store안의 모든 데이터(오른쪽 state)를 state(왼쪽 state)라는 이름의 props로 바꿔주기
        alertOpenOrNot : state.reducer2
        //alert창 열렸는지 안 열렸는지 alertInitial true/false여부
    }
}

export default connect(stateToProps)(Detail)
// export default Detail;