export default function RestartButton({children, restartHandler}) {
  return (
    <button onClick={restartHandler} className="restartButton">
      {children}
    </button>
  );
}
