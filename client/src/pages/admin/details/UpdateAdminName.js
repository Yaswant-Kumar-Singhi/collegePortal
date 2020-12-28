import React, { useState } from "react";
import AdminNav from '../../../components/nav/AdminNav'
import { auth } from "../../../firebase";
import { toast } from "react-toastify";

const AdminName = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log(password);

    await auth.currentUser.updateProfile( {
        
    })
      .then(() => {
        setLoading(false);
        setName("");
        toast.success("Name updated");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
      });
  };

  const nameUpdateForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Your Name</label>
        <br />
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          className="form-control"
          placeholder="Enter new name"
          disabled={loading}
          value={name}
        />
        <br />
        <button
          className="btn btn-primary"
         
        >
          Submit
        </button>
      </div>
    </form>
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
         
          {nameUpdateForm()}
        </div>
      </div>
    </div>
  );
};

export default AdminName;
