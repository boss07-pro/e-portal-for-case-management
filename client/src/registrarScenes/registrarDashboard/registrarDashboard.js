import "./registrarDashboard.css";
import Header from "../../Components/Header";
import axios from "axios";
import { useState, useEffect } from "react";
import ViewDetails from "../../Components/Modals/registrar-view-details/registrarViewDetails";
import ViewDocuments from "../../Components/Modals/registrar-view-docs/registrar-view-documents";
import Approve from "../../Components/Modals/registrar-approve/registrar-approve";
import RegistrarDeny from "../../Components/Modals/registrar-deny/registrar-deny";
import { CircularProgress } from "@mui/material";


const RegistrarDashboard = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);
  const [viewDocOpen, setViewDocOpen] = useState(false);
  const [approveOpen, setApproveOpen] = useState(false);
  const [denyOpen, setDenyOpen] = useState(false);
  const [docData, setDocData] = useState(false);
  const [searchinput, setSearchInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [reloadkey, setReloadKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const handleOpen = (id) => {
    setId(id);
    setOpen(true);
  }

  const handleClose = () => setOpen(false);

  const handleViewDocOpen = (id) => {
    setId(id);
    setViewDocOpen(!viewDocOpen);
  }

  const handleViewDocClose = () => setViewDocOpen(false);


  const handleDenyOpen = (id) => {
    setId(id);
    setDenyOpen(!denyOpen);
  }

  const handleApproveOpen = (id,status) => {
    setId(id);
    setStatus(status);
    setApproveOpen(!approveOpen);
  }

  const handleApproveClose = () => setApproveOpen(false);
  const handleDenyClose = () => setDenyOpen(false);


  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  }

  const prevPage = () => {
    
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  useEffect(() => {
    setData([]);
    setLoading(true);
    axios
      .get("http://localhost:64000/casedetails/registrar-case-details?page=" + currentPage + "&limit=" + itemsPerPage + "&search=" + searchinput)
      .then((res) => {
        setData(res.data.data);
        setTotalCount(res.data.totalCount);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [currentPage, itemsPerPage,reloadkey, searchinput]);


  return (
    <div className="registrar-dash-main">
      <Header title="Waiting for Approval Cases" />
      <div className="search-table">
        <input type="text" placeholder="Search" className="search-input" onChange={(e) => { setSearchInput(e.target.value) }} />
      </div>
      {loading && (<div className="loading"><CircularProgress style={{color:"white"}}/><h1>Loading...</h1></div>)}
      <div className="pagination-registrar">
        {currentPage > 1 && <button onClick={prevPage}>Previous</button>}
        {currentPage * itemsPerPage < totalCount && <button onClick={nextPage}>Next</button>}
      </div>
      <div className="registrar-main-inside">
        <table className="registrar-table">
          <thead>
            <tr key="1">
              <th>Regn. Number</th>
              <th>Regn. Date</th>
              <th>Cause Title</th>
              <th>View Details</th>
              <th>Uploaded Documents</th>
              <th>Actions</th>  
            </tr>
          </thead>
          <tbody>
            {data.map((item) => {
              return (
                <tr key={item._id}>
                  <td className="special-td">{item.caseId}</td>
                  <td>{item.registrationDate}</td>
                  <td>
                    {item.plaintDetails.causeTitlePlaintiff} VS{" "}
                    {item.plaintDetails.causeTitleDefendant}
                  </td>
                  <td>
                    <button className="view-btn" onClick={() => handleOpen(item.caseId)}>View Details</button>
                  </td>
                  <td>
                    <button className="view-btn" onClick={() => handleViewDocOpen(item.caseId)}>View Documents</button>
                  </td>
                  <td>
                    <div className="approve-deny">
                      <button className="approve-btn" onClick={() => handleApproveOpen(item.caseId,item.status)}>Assign</button>
                      <button className="deny-btn" onClick={() => handleDenyOpen(item.caseId)}>Reject</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {denyOpen && <RegistrarDeny open={denyOpen} handleClose={handleDenyClose} id={id} />}
      {approveOpen && <Approve open={approveOpen} handleClose={handleApproveClose} id={id} setReloadKey={setReloadKey} reloadkey={reloadkey} status={status}/>}
      {viewDocOpen && <ViewDocuments open={viewDocOpen} handleClose={handleViewDocClose} id={id} />}
      {open && id !== null && <ViewDetails open={open} handleClose={handleClose} id={id} setId={setId} />}


    </div>
  );
};

export default RegistrarDashboard;
