import React, { useEffect, useState } from 'react';
import UserNav from '../../components/nav/UserNav';
import { getUserOrders } from "../../functions/user";
import { useSelector, useDispatch } from "react-redux";
import { CheckCircleOutlined, ClockCircleOutlined } from "@ant-design/icons";
import ShowPaymentInfo from '../../components/cards/ShowPaymentInfo';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Invoice from '../../components/order/Invoice';

const History = () => {
  const [ orders, setOrders ] = useState([]);
  const { user } = useSelector((state) => ({...state}));

  useEffect(() => {
      loadUserOrders()
  },[]);

  const loadUserOrders = () => getUserOrders(user.token).then(res => {
    // console.log(JSON.stringify(res.data, null, 4));
    setOrders(res.data);
  });

  const showDownloadLink = (order) =>  (
    <PDFDownloadLink document={
       <Invoice order={order} />
    }
    fileName="invoice.pdf"
    className='btn btn-sm btn-block btn-outline-primary'
    > 
      Download PDF
    </PDFDownloadLink>
  );

  const showOrderInTable = (order) => 
  <table className="table table-bordered">
    <thead className="thead-light">
      <tr>
        <th className='col'>Title</th>
        <th className='col'>Price</th>
        <th className='col'>Brand</th>
        <th className='col'>Color</th>
        <th className='col'>Count</th>
        <th className='col'>Shipping</th>
      </tr>
    </thead>

    <tbody>
      {order.products.map((p, i) => (
        <tr key={i}>
          <td><b>{p.product.title}</b></td>
          <td>${p.product.price}</td>
          <td>{p.product.brand}</td>
          <td>{p.color}</td>
          <td>{p.count}</td>
          <td>{p.product.shipping ==='YES'? ( 
            <CheckCircleOutlined style={{ color: 'green'}} />) : (
            <ClockCircleOutlined style={{ color: 'red'}} />
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>

  const showEachOrders = () =>
    orders.map((order, i) => (
      <div key={i} className="m-5 p-3 card">
        <ShowPaymentInfo order={order} /> 
        {showOrderInTable(order)}
        <div className="row">
          <div className="col">
             {showDownloadLink()}
          </div>
        </div>
      </div>
    ));
  

  return (
    <div className='container-fluid'>
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col text-center mt-3">
          <h4>
            {orders.length > 0 ? "User purchase orders" : "No purchase orders"}
          </h4>
          {showEachOrders()}
        </div>
      </div>
    </div> 
  )
}

export default History;