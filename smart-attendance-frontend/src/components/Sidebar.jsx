function Sidebar() {
  return (
    <div
      style={{
        width: "220px",
        backgroundColor: "#1e293b",
        color: "white",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <h2>Smart Attendance</h2>

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          marginTop: "30px",
        }}
      >
        <li style={itemStyle}>Dashboard</li>

        <li style={itemStyle}>Students</li>

        <li style={itemStyle}>Attendance</li>

        <li style={itemStyle}>Reports</li>
      </ul>
    </div>
  );
}

const itemStyle = {
  padding: "12px 0",
  cursor: "pointer",
};

export default Sidebar;