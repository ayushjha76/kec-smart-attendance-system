import { useEffect, useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

function TeacherDashboard() {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] =
    useState({});

  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  /* ---------------- FETCH STUDENTS ---------------- */

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/students"
      );

      setStudents(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  /* ---------------- HANDLE ATTENDANCE ---------------- */

  const handleAttendance = (id) => {
    setAttendance({
      ...attendance,
      [id]: !attendance[id],
    });
  };

  /* ---------------- SUBMIT ATTENDANCE ---------------- */

  const submitAttendance = async () => {
    const attendanceData = students.map(
      (student) => {
        return {
          student_id: student.id,
          status: attendance[student.id]
            ? "Present"
            : "Absent",
          date: new Date()
            .toISOString()
            .split("T")[0],
        };
      }
    );

    try {
      await axios.post(
        "http://localhost:5000/api/attendance",
        attendanceData
      );

      alert(
        "Attendance Saved Successfully"
      );
    } catch (error) {
      console.log(error);
    }
  };

  /* ---------------- LOGOUT ---------------- */

  const handleLogout = () => {
    localStorage.clear();

    navigate("/");
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
        <Navbar title="Teacher Dashboard" />

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          style={logoutButton}
        >
          Logout
        </button>

        {/* Dashboard Content */}
        <div style={pageStyle}>
          <h1 style={heading}>
            Mark Attendance
          </h1>

          <table style={tableStyle}>
            <thead>
              <tr
                style={{
                  backgroundColor: "#2563eb",
                  color: "white",
                }}
              >
                <th style={tableHeader}>
                  ID
                </th>

                <th style={tableHeader}>
                  Name
                </th>

                <th style={tableHeader}>
                  Roll No
                </th>

                <th style={tableHeader}>
                  Branch
                </th>

                <th style={tableHeader}>
                  Section
                </th>

                <th style={tableHeader}>
                  Semester
                </th>

                <th style={tableHeader}>
                  Attendance
                </th>
              </tr>
            </thead>

            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td style={tableCell}>
                    {student.id}
                  </td>

                  <td style={tableCell}>
                    {student.name}
                  </td>

                  <td style={tableCell}>
                    {student.roll_no}
                  </td>

                  <td style={tableCell}>
                    {student.branch}
                  </td>

                  <td style={tableCell}>
                    {student.section}
                  </td>

                  <td style={tableCell}>
                    {student.semester}
                  </td>

                  <td style={tableCell}>
                    <input
                      type="checkbox"
                      checked={
                        attendance[
                          student.id
                        ] || false
                      }
                      onChange={() =>
                        handleAttendance(
                          student.id
                        )
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            style={submitButton}
            onClick={submitAttendance}
          >
            Submit Attendance
          </button>
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

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  backgroundColor: "white",
  borderRadius: "10px",
  overflow: "hidden",
};

const tableHeader = {
  padding: "15px",
  textAlign: "left",
};

const tableCell = {
  padding: "15px",
  borderBottom: "1px solid #ddd",
};

const submitButton = {
  marginTop: "20px",
  padding: "12px 25px",
  backgroundColor: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "16px",
};

const logoutButton = {
  margin: "20px",
  padding: "10px 20px",
  backgroundColor: "red",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

export default TeacherDashboard;