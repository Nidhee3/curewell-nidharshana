import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Navbar from "../../components/Navbar/Navbar";
import CureWellService from "../../services/CureWellService";
 
const UpdateDoctor = () => {
    const navigate = useNavigate();

    const { doctorId, doctorName } = useParams();
 
    const formik = useFormik({
        initialValues: {
            // fills doctor name automatically
            doctorName: doctorName || ""
        },
        validationSchema: Yup.object({
            doctorName: Yup.string()
                .required("Name is required")
        }),
        onSubmit: async (values) => {
            await editDoctorDetails(values);
        }
    });
 
    const editDoctorDetails = async (values) => {
        const response = await CureWellService.editDoctorDetails(doctorId, {
            doctorName: values.doctorName
        });
 
        if (response) {
            if (response.data === true) {
                alert("Doctor's name updated successfully!");
                navigate("/view-doctors");
            } else {
                alert("Doctor's name not updated");
                navigate("/view-doctors");
            }
        } else {
            alert("Some error occurred");
            navigate("/view-doctors");
        }
        console.log("Updated doctor details successfully.");
    };
 
    return (
        <div>
            <Navbar />
 
            <div className="container mt-4">
                <h2 className="text-center mb-2">Update Doctor</h2>
                <p className="text-center text-muted mb-4">
                    All fields are mandatory
                </p>
 
                <form onSubmit={formik.handleSubmit}>
 
                    {/* Doctor Id — cannot be changed because it's auto increasing*/}
                    <div className="mb-3 row justify-content-center">
                        <label className="col-sm-2 col-form-label">Doctor Id</label>
                        <div className="col-sm-4">
                            <input
                                type="text"
                                className="form-control"
                                value={doctorId}
                                readOnly
                            />
                        </div>
                    </div>
 
                    {/* Doctor Name — editable */}
                    <div className="mb-3 row justify-content-center">
                        <label className="col-sm-2 col-form-label">Doctor Name</label>
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
                            Update
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => navigate("/view-doctors")}
                        >
                            Cancel
                        </button>
                    </div>
 
                </form>
            </div>
        </div>
    );
};
 
export default UpdateDoctor;
