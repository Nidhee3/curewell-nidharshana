import { BrowserRouter as Router, Routes, Route, Navigate }
    from "react-router-dom";
 
import ViewDoctors
    from "./pages/ViewDoctors/ViewDoctors";
import AddDoctor
    from "./pages/AddDoctor/AddDoctor";
import UpdateDoctor
    from "./pages/UpdateDoctor/UpdateDoctor";
import ViewSpecializations
    from "./pages/ViewSpecializations/ViewSpecializations";
import ViewDoctorsBySpecialization
    from "./pages/ViewDoctorsBySpecialization/ViewDoctorsBySpecialization";
import ViewTodaysSurgery
    from "./pages/ViewTodaysSurgery/ViewTodaysSurgery";
import UpdateSurgery
    from "./pages/UpdateSurgery/UpdateSurgery";
 
import "./App.css";
 
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/view-doctors" />} />
 
                {/* Doctor pages */}
                <Route path="/view-doctors"
                    element={<ViewDoctors />} />
 
                <Route path="/add-doctor"
                    element={<AddDoctor />} />
 
                <Route path="/update-doctor/:doctorId/:doctorName"
                    element={<UpdateDoctor />} />
 
                {/* Specialization pages */}
                <Route path="/view-specializations"
                    element={<ViewSpecializations />} />
 
                <Route path="/view-doctors-by-specialization/:code"
                    element={<ViewDoctorsBySpecialization />} />
 
                {/* Surgery pages */}
                <Route path="/view-todays-surgery"
                    element={<ViewTodaysSurgery />} />
 
                <Route
                    path="/update-surgery/:surgeryId/:surgeryCategory/:surgeryDate/:startTime/:endTime/:doctorId"
                    element={<UpdateSurgery />}
                />

                <Route path="*" element={<Navigate to="/view-doctors" />} />
            </Routes>
        </Router>
    );
}
 
export default App;
