import React from 'react';
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import ShowPaymentInfo from '../cards/ShowPaymentInfo';
import ShowOrderInTable from "../../components/order/OrderTable";

const Orders = ({ orders, handleStatusChange }) => (
  <>
     {orders.map((order) => (
       <div key={order._id} className='row pb-5'>
         <div className="btn btn-block bg-light">
            <ShowPaymentInfo order={order} showStatus={false} />
            <div className="row">
              <div className="col-md-4">
                  Delivery Status
              </div>
              <div className="col-md-10">
                  <select 
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className='form-control'
                    defaultValue={order.orderStatus}
                    name='status'
                  >
                    <option value="Not Processed">Not Processed</option>
                    <option value="Processing">Processing</option>
                    <option value="Dispatched">Dispatched</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Completed">Completed</option>
                    <option value="Cash On Delivery">Cash On Delivery</option>
                  </select>
              </div>
            </div>
         </div>
         <ShowOrderInTable order={order} />
       </div>
     ))}
  </>
);
 
export default Orders;