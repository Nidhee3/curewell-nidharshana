import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import CureWellService from "../../services/CureWellService";

const ViewDoctorsBySpecialization = () => {
    const [doctorList, setDoctorList] = useState(null);
    const [errorMsg, setErrorMsg]     = useState("");

    const { code } = useParams();

    useEffect(() => {
        getDoctors();
    }, []);

    const getDoctors = async () => {
        const response = await CureWellService.getDoctorsBySpecialization(code);

        if (response) {
            setDoctorList(response.data);
        } else {
            setDoctorList(null);
            setErrorMsg("Error fetching doctors");
        }
    };

    return (
        <div>
            <Navbar />

            <div className="container mt-4">
                <h2 className="text-center mb-2">
                    Doctors with Specialization: {code}
                </h2>

                {errorMsg && (
                    <div className="alert alert-danger">{errorMsg}</div>
                )}

                {/* when there are no doctors, it just says that there are no doctors */}
                {doctorList && doctorList.length === 0 && (
                    <div className="alert alert-warning text-center">
                        No doctors found for this specialization.
                    </div>
                )}

                {/* list of doctors are shown when there is a doctor in that specialization */}
                {doctorList && doctorList.length > 0 && (
                    <table className="table table-bordered text-center">
                        <thead className="table-dark">
                            <tr>
                                <th>Doctor Id</th>
                                <th>Doctor Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {doctorList.map((doctor) => (
                                <tr key={doctor.doctorId}>
                                    <td>{doctor.doctorId}</td>
                                    <td>{doctor.doctorName}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default ViewDoctorsBySpecialization;