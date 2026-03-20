import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import CureWellService from "../../services/CureWellService";
 
const ViewDoctors = () => {
    const [doctorList, setDoctorList] = useState(null);
    const [errorMsg, setErrorMsg]     = useState("");
    const [showMsgDiv, setShowMsgDiv] = useState(false);
 
    
    const navigate = useNavigate();
 
    useEffect(() => {
        getDoctor();
    }, []); 
    const getDoctor = async () => {
        const response = await CureWellService.getDoctors();
 
        if (response) {
           
            setDoctorList(response.data);
            setShowMsgDiv(true);
            console.log("Doctors Fetched Successfully");
        } else {
            setDoctorList(null);
            setErrorMsg("Error fetching doctors");
        }
    };
    
    const editDoctorDetails = (doctorId, doctorName) => {
        navigate(`/update-doctor/${doctorId}/${doctorName}`);
    };
 
    const removeDoctor = async (doctorId, doctorName) => {
        const response = await CureWellService.deleteDoctor(doctorId);
 
        if (response) {
            if (response.data === true) {
                alert("Doctor detailed deleted successfully!");
                getDoctor();  
            } else {
                alert("Doctor's name not deleted");
            }
        } else {
            setErrorMsg("Some error occured");
        }
    };
 
    return (
        <div>
            {/* Navbar*/}
            <Navbar />
 
            <div className="container mt-4">
                <h2 className="text-center mb-4">View Doctor</h2>
 
                {/* error message*/}
                {errorMsg && (
                    <div className="alert alert-danger">{errorMsg}</div>
                )}
 
                {/* Only shows the table when doctorList has data */}
                {/* doctorList is null until loaded, so nothing shows during loading */}
                {doctorList && (
                    <table className="table table-bordered text-center">
                        <thead className="table-dark">
                            <tr>
                                <th>Doctor Id</th>
                                <th>Doctor Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {doctorList.map((doctor) => (
                                <tr key={doctor.doctorId}>
                                    <td>{doctor.doctorId}</td>
                                    <td>{doctor.doctorName}</td>
                                    <td>
                                        {/* edit button */}
                                        <button
                                            className="btn btn-primary btn-sm me-2"
                                            onClick={() => editDoctorDetails(doctor.doctorId, doctor.doctorName)}
                                        >
                                            Edit Doctor Details
                                        </button>
                                        {/* remove button */}
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => removeDoctor(doctor.doctorId, doctor.doctorName)}
                                        >
                                            Remove Doctor Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};
 
export default ViewDoctors;
