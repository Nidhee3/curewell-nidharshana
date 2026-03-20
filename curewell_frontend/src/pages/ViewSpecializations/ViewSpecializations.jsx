import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import CureWellService from "../../services/CureWellService";
 
const ViewSpecializations = () => {
    const [specializationList, setSpecializationList] = useState(null);
    const [errorMsg, setErrorMsg]   = useState("");
    const [showMsgDiv, setShowMsgDiv] = useState(false);
    const navigate = useNavigate();
 
    useEffect(() => {
        getSpecialization();
    }, []);
 
    const getSpecialization = async () => {
        const response = await CureWellService.getAllSpecializations();
 
        if (response) {
            setSpecializationList(response.data);
            setShowMsgDiv(true);
            console.log("Specialization Fetched Successfully");
        } else {
            setSpecializationList(null);
            setErrorMsg("Error fetching specializations");
            setShowMsgDiv(true);
        }
    };
 
    // view doctors from this specialization code
    const viewDoctorsBySpecialization = (code) => {
        navigate(`/view-doctors-by-specialization/${code}`);
    };
 
    return (
        <div>
            <Navbar />
 
            <div className="container mt-4">
                <h2 className="text-center mb-4">View Specialization</h2>
 
                {errorMsg && (
                    <div className="alert alert-danger">{errorMsg}</div>
                )}
 
                {specializationList && (
                    <table className="table table-bordered text-center">
                        <thead className="table-dark">
                            <tr>
                                <th>Specialization Code</th>
                                <th>Specialization Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {specializationList.map((spec) => (
                                <tr key={spec.specializationCode}>
                                    <td>{spec.specializationCode}</td>
                                    <td>{spec.specializationName}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() => viewDoctorsBySpecialization(spec.specializationCode)}
                                        >
                                            View Doctors
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
 
export default ViewSpecializations;
