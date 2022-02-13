import React from "react";
import {Table} from 'react-bootstrap';
import { connect, useDispatch, useSelector } from "react-redux";

function Cart(props) {

    let state = useSelector( (state) => state );
    console.log(state.reducer);
    let dispatch= useDispatch();

    return(
        <div>
            <Table responsive="sm">
                <thead>
                <tr>
                    <th>#</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>변경</th>
                </tr>
                </thead>
                <tbody>
                    {
                        state.reducer.map(function(a,i){
                            // 파라미터 i랑 key={i}는 console창에서 warning 방지하기 위해 넣었음
                            return(
                                <tr key={i}>
                                    <td> {a.id} </td>
                                    <td> {a.name} </td>
                                    <td> {a.quantity} </td>
                                    <td>
                                        <button 
                                            onClick={() => {dispatch({type : '수량증가', data : a.id})}}>
                                        +</button>
                                        <button 
                                            onClick={() => {dispatch({type : '수량감소', data : a.id})}}>
                                        -</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
            
            {
                props.alertOpenOrNot === true
                ? (
                    <div className="my-alert2">
                        <p>지금 구매하시면 신규할인 20%</p>
                        <button onClick={ () => {dispatch({type : 'alert창닫기'})}}>닫기</button>
                    </div>
                )
                : null
            }
            
        </div>
    )
}

// function stateToProps(state) {
//     return { 
//         state : state.reducer,
//         // store안의 모든 데이터(오른쪽 state)를 state(왼쪽 state)라는 이름의 props로 바꿔주기
//         alertOpenOrNot : state.reducer2
//         //alert창 열렸는지 안 열렸는지 alertInitial true/false여부
//     }
// }

// export default connect(stateToProps)(Cart)
export default Cart;