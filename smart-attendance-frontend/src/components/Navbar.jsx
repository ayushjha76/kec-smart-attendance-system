function Navbar({ title }) {
  return (
    <div
      style={{
        backgroundColor: "#2563eb",
        color: "white",
        padding: "20px",
        fontSize: "24px",
        fontWeight: "bold",
      }}
    >
      {title}
    </div>
  );
}

export default Navbar;