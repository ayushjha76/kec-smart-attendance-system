import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

function AdminDashboard() {
  const [studentData, setStudentData] =
    useState({
      name: "",
      roll_no: "",
      branch: "",
      section: "",
      semester: "",
    });

  const [students, setStudents] =
    useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

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

  const handleChange = (e) => {
    setStudentData({
      ...studentData,
      [e.target.name]: e.target.value,
    });
  };

  const addStudent = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/students",
        studentData
      );

      alert("Student Added Successfully");

      fetchStudents();

      setStudentData({
        name: "",
        roll_no: "",
        branch: "",
        section: "",
        semester: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/students/${id}`
      );

      alert(
        "Student Deleted Successfully"
      );

      fetchStudents();
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
        <Navbar title="Admin Dashboard" />

        {/* Dashboard Content */}
        <div style={pageStyle}>
          <h1 style={heading}>
            Student Management
          </h1>

          {/* Add Student Form */}
          <div style={formContainer}>
            <h2
              style={{
                marginBottom: "20px",
              }}
            >
              Add Student
            </h2>

            <input
              type="text"
              name="name"
              placeholder="Student Name"
              style={inputStyle}
              value={studentData.name}
              onChange={handleChange}
            />

            <input
              type="text"
              name="roll_no"
              placeholder="Roll Number"
              style={inputStyle}
              value={studentData.roll_no}
              onChange={handleChange}
            />

            <input
              type="text"
              name="branch"
              placeholder="Branch"
              style={inputStyle}
              value={studentData.branch}
              onChange={handleChange}
            />

            <input
              type="text"
              name="section"
              placeholder="Section"
              style={inputStyle}
              value={studentData.section}
              onChange={handleChange}
            />

            <input
              type="text"
              name="semester"
              placeholder="Semester"
              style={inputStyle}
              value={studentData.semester}
              onChange={handleChange}
            />

            <button
              style={addButton}
              onClick={addStudent}
            >
              Add Student
            </button>
          </div>

          {/* Students Table */}
          <div style={tableContainer}>
            <h2>All Students</h2>

            <table style={tableStyle}>
              <thead>
                <tr
                  style={{
                    backgroundColor:
                      "#2563eb",
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
                    Roll
                  </th>

                  <th style={tableHeader}>
                    Action
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
                      <button
                        onClick={() =>
                          deleteStudent(
                            student.id
                          )
                        }
                        style={deleteButton}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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

const formContainer = {
  backgroundColor: "white",
  padding: "30px",
  borderRadius: "10px",
  width: "400px",
  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #ccc",
};

const addButton = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

const tableContainer = {
  marginTop: "40px",
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "10px",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
};

const tableHeader = {
  padding: "15px",
  textAlign: "left",
};

const tableCell = {
  padding: "15px",
  borderBottom: "1px solid #ddd",
};

const deleteButton = {
  backgroundColor: "red",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: "5px",
  cursor: "pointer",
};

export default AdminDashboard;