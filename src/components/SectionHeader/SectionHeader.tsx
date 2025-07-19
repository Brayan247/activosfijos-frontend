const SectionHeader = ({ title, color }: { title: string; color: string }) => (
  <h3
    style={{
      borderBottom: `2px solid ${color}`,
      paddingBottom: 8,
      marginBottom: "1rem",
    }}
  >
    {title}
  </h3>
);

export default SectionHeader;
