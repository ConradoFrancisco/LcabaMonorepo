export default function DebugInfo({ data }: { data: any }) {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '10px',
        left: '10px',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        zIndex: 1000,
        maxHeight: '200px',
        overflowY: 'auto',
        fontSize: '12px',
      }}
    >
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
