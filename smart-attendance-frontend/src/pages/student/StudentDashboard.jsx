import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

function StudentDashboard() {
  const [attendanceData, setAttendanceData] =
    useState(null);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/attendance/1"
      );

      setAttendanceData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#f1f5f9",
          minHeight: "100vh",
        }}
      >
        {/* Navbar */}
        <Navbar title="Student Dashboard" />

        {/* Dashboard Content */}
        <div style={pageStyle}>
          <h1 style={heading}>
            Attendance Overview
          </h1>

          {attendanceData && (
            <div style={cardContainer}>
              <div style={cardStyle}>
                <h2>
                  Attendance Percentage
                </h2>

                <h1>
                  {
                    attendanceData.percentage
                  }
                  %
                </h1>
              </div>

              <div style={cardStyle}>
                <h2>Total Classes</h2>

                <h1>
                  {
                    attendanceData.total_classes
                  }
                </h1>
              </div>

              <div style={cardStyle}>
                <h2>Present Classes</h2>

                <h1>
                  {
                    attendanceData.present_classes
                  }
                </h1>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const pageStyle = {
  padding: "30px",
};

const heading = {
  fontSize: "32px",
  marginBottom: "25px",
};

const cardContainer = {
  display: "flex",
  gap: "20px",
};

const cardStyle = {
  backgroundColor: "white",
  padding: "30px",
  borderRadius: "10px",
  width: "250px",
  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
};

export default StudentDashboard;