import React, {useContext, useState} from 'react';
import { stockContext } from './App';
import { Link, Route, Switch } from 'react-router-dom';

function Card(props) {

    let 재고 = useContext(stockContext);
  
    return(
      <div className="col-md-4">
        <Link to={'/detail/'+props.shoes.id}><img src={'https://codingapple1.github.io/shop/shoes'+ (props.i+1) +'.jpg'} width="100%"></img></Link>
        <h4>{props.shoes.title}</h4>
        <p> {props.shoes.content} & {props.shoes.price} </p>
        {"재고 : "+ 재고[props.i]}
      </div>
    )
  }

  export default Card;