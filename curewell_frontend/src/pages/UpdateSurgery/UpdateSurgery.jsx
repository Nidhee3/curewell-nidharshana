import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Navbar from "../../components/Navbar/Navbar";
import CureWellService from "../../services/CureWellService";
 
const UpdateSurgery = () => {
    const navigate = useNavigate();

    const { surgeryId, surgeryCategory, surgeryDate,
            startTime, endTime, doctorId } = useParams();
 
    const formik = useFormik({
        initialValues: {
            startTime: startTime || "",
            endTime:   endTime   || ""
        },
        //only start and end time can be changed
        validationSchema: Yup.object({
            startTime: Yup.number()
                .required("Start time is required")
                .typeError("Start time must be a number"),
            endTime: Yup.number()
                .required("End time is required")
                .typeError("End time must be a number")
                .test(
                    "endTime-greater",
                    "End time must be greater than start time",
                    function(value) {
                        return value > this.parent.startTime;
                    }
                )
        }),
        onSubmit: async (values) => {
            await editSurgery(values);
        }
    });
 
    const editSurgery = async (values) => {
        const response = await CureWellService.editSurgery(surgeryId, {
            startTime: Number(values.startTime),
            endTime:   Number(values.endTime)
        });
 
        if (response) {
            if (response.data === true) {
                alert("Surgery details updated successfully!");
                navigate("/view-todays-surgery");
            } else {
                alert("Surgery details not updated");
                navigate("/view-todays-surgery");
            }
        } else {
            alert("Some error occurred");
            navigate("/view-todays-surgery");
        }
        console.log("Updated surgery details successfully");
    };
 
    return (
        <div>
            <Navbar />
 
            <div className="container mt-4">
                <h2 className="text-danger mb-4">Update Surgery</h2>
 
                <form onSubmit={formik.handleSubmit}>
 
                    {/* Surgery Id — read only */}
                    <div className="mb-3 row">
                        <label className="col-sm-4 col-form-label">Surgery Id</label>
                        <div className="col-sm-4">
                            <input type="text" className="form-control"
                                value={surgeryId} readOnly />
                        </div>
                    </div>
 
                    {/* Doctor Id — read only */}
                    <div className="mb-3 row">
                        <label className="col-sm-4 col-form-label">Doctor Id</label>
                        <div className="col-sm-4">
                            <input type="text" className="form-control"
                                value={doctorId} readOnly />
                        </div>
                    </div>
 
                    {/* Surgery Date — read only */}
                    <div className="mb-3 row">
                        <label className="col-sm-4 col-form-label">Surgery Date</label>
                        <div className="col-sm-4">
                            <input type="text" className="form-control"
                                value={surgeryDate} readOnly />
                        </div>
                    </div>
 
                    {/* Start Time - can be edited */}
                    <div className="mb-3 row">
                        <label className="col-sm-4 col-form-label">
                            Start Time (24 Hours Format)
                        </label>
                        <div className="col-sm-4">
                            <input
                                type="number"
                                className="form-control"
                                name="startTime"
                                value={formik.values.startTime}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.startTime && formik.errors.startTime && (
                                <div className="text-danger mt-1">
                                    {formik.errors.startTime}
                                </div>
                            )}
                        </div>
                    </div>
 
                    {/* End Time — can be edited */}
                    <div className="mb-3 row">
                        <label className="col-sm-4 col-form-label">
                            End Time (24 Hours Format)
                        </label>
                        <div className="col-sm-4">
                            <input
                                type="number"
                                className="form-control"
                                name="endTime"
                                value={formik.values.endTime}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.endTime && formik.errors.endTime && (
                                <div className="text-danger mt-1">
                                    {formik.errors.endTime}
                                </div>
                            )}
                        </div>
                    </div>
 
                    {/* Surgery Category — read only */}
                    <div className="mb-3 row">
                        <label className="col-sm-4 col-form-label">Surgery Category</label>
                        <div className="col-sm-4">
                            <input type="text" className="form-control"
                                value={surgeryCategory} readOnly />
                        </div>
                    </div>
 
                    <div>
                        <button type="submit" className="btn btn-primary me-2">
                            Update
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => navigate("/view-todays-surgery")}
                        >
                            Cancel
                        </button>
                    </div>
 
                </form>
            </div>
        </div>
    );
};
 
export default UpdateSurgery;
