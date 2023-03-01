import React, { useEffect, useState } from 'react';
import AdminNav from "../../components/nav/AdminNav";

const AdminDashboard = () => {
  
  return ( 
    <div className="container-fluid">
    <div className="row">
      <div className="col-md-2">
        <AdminNav />
      </div>

      <div className="col py-3">
       
        <h4>Admin AdminDashboard</h4>
      </div>
    </div>
  </div>
   );
}
 
export default AdminDashboard;