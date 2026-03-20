import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import CureWellService from "../../services/CureWellService";
 
const ViewTodaysSurgery = () => {
    const [surgeryList, setSurgeryList] = useState(null);
    const [errorMsg, setErrorMsg]       = useState("");
    const navigate = useNavigate();
 
    useEffect(() => {
        getTodaySurgery();
    }, []);
 
    const getTodaySurgery = async () => {
        const response = await CureWellService.getSurgeriesForToday();
 
        if (response) {
            setSurgeryList(response.data);
            console.log("Today's Surgery Fetched Successfully");
        } else {
            setSurgeryList(null);
            setErrorMsg("Error fetching surgeries");
        }
    };
 
    // Navigate to UpdateSurgery with all surgery details 
    const editSurgery = (surgeryId, surgeryCategory, surgeryDate, startTime, endTime, doctorId) => {
        navigate(`/update-surgery/${surgeryId}/${surgeryCategory}/${surgeryDate}/${startTime}/${endTime}/${doctorId}`);
    };
 
    return (
        <div>
            <Navbar />
 
            <div className="container mt-4">
                <h2 className='text-center mb-4'>View Today's Surgery</h2>
 
                {errorMsg && (
                    <div className="alert alert-danger">{errorMsg}</div>
                )}
 
                {surgeryList && surgeryList.length === 0 && (
                    <div className="alert alert-info text-center">
                        No surgeries scheduled for today.
                    </div>
                )}
 
                {surgeryList && surgeryList.length > 0 && (
                    <table className="table table-bordered text-center">
                        <thead className="table-dark">
                            <tr>
                                <th>Surgery Id</th>
                                <th>Doctor Id</th>
                                <th>Surgery Date</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th>Surgery Category</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {surgeryList.map((surgery) => (
                                <tr key={surgery.surgeryId}>
                                    <td>{surgery.surgeryId}</td>
                                    <td>{surgery.doctor?.doctorId}</td>
                                    <td>
                                        {new Date(surgery.surgeryDate)
                                            .toLocaleDateString()}
                                    </td>
                                    <td>{surgery.startTime}</td>
                                    <td>{surgery.endTime}</td>
                                    <td>{surgery.surgeryCategory}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() => editSurgery(
                                                surgery.surgeryId,
                                                surgery.surgeryCategory,
                                                surgery.surgeryDate,
                                                surgery.startTime,
                                                surgery.endTime,
                                                surgery.doctor?.doctorId
                                            )}
                                        >
                                            Edit Surgery Time
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
 
export default ViewTodaysSurgery;
