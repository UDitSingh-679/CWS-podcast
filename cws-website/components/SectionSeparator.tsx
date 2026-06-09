export default function SectionSeparator() {
  return (
    <div
      aria-hidden
      className="mx-auto"
      style={{
        maxWidth: "1400px",
        paddingLeft: "clamp(20px, 4vw, 60px)",
        paddingRight: "clamp(20px, 4vw, 60px)",
        paddingTop: 0,
        paddingBottom: 0,
      }}
    >
      <div
        style={{
          height: "1px",
          width: "100%",
          background: "rgba(255, 255, 255, 0.06)",
          marginTop: "80px",
          marginBottom: "80px",
        }}
      />
    </div>
  );
}
