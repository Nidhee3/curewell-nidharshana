import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Navbar from "../../components/Navbar/Navbar";
import CureWellService from "../../services/CureWellService";
 
const AddDoctor = () => {
    const navigate = useNavigate();

    const [showDiv, setShowDiv]         = useState(false);
    const [msg, setMsg]                 = useState("");
    const [errorAddMsg, setErrorAddMsg] = useState("");
 
    const formik = useFormik({
        initialValues: {
            doctorName: ""
        },
        validationSchema: Yup.object({
            doctorName: Yup.string()
                .required("Name is required")
        }),
        onSubmit: async (values) => {
            await addDoctor(values);
        }
    });

//adding a new doctor
    const addDoctor = async (values) => {
        const response = await CureWellService.addDoctor({
            doctorName: values.doctorName
        });
 
        if (response) {
            setShowDiv(true);
            setMsg("Doctor successfully added");
            console.log("Add doctor completed");
        } else {
            setErrorAddMsg("Some error occured");
            setMsg("Some error occured");
        }
    };
 
    return (
        <div>
            <Navbar />
 
            <div className="container mt-4">
                <h2 className="text-center mb-4">Add a new Doctor</h2>

                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-3 row justify-content-center">
                        <label className="col-sm-2 col-form-label">
                            Doctor Name
                        </label>
                        <div className="col-sm-4">
                            <input
                                type="text"
                                className="form-control"
                                name="doctorName"
                                value={formik.values.doctorName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                           
                            {formik.touched.doctorName && formik.errors.doctorName && (
                                <div className="text-danger mt-1">
                                    {formik.errors.doctorName}
                                </div>
                            )}
                        </div>
                    </div>
 
                    <div className="text-center">
                        <button type="submit" className="btn btn-success me-2">
                            Add Doctor
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => navigate("/view-doctors")}
                        >
                            Cancel
                        </button>
                    </div>
 
                    {/* Success message is shown after doctor is added */}
                    {showDiv && (
                        <div className="text-center mt-3 text-success fw-bold">
                            {msg}
                        </div>
                    )}
 
                    {/* Error message is shown if something went wrong */}
                    {errorAddMsg && (
                        <div className="text-center mt-3 text-danger">
                            {errorAddMsg}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};
 
export default AddDoctor;
