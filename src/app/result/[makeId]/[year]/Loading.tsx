export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "black",
        color: "white",
      }}
    >
      <div
        style={{
          padding: "20px 40px",
          backgroundColor: "white",
          color: "black",
          borderRadius: "10px",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        Loading...
      </div>
    </div>
  );
}
