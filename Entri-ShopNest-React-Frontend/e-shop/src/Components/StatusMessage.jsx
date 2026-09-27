import { AlertCircle, RefreshCw } from "lucide-react";

function StatusMessage({ title = "A little hiccup", message, onRetry }) {
  return (
    <div className="status-message" role="alert">
      <span className="status-icon"><AlertCircle size={22} /></span>
      <div>
        <h3>{title}</h3>
        <p>{message}</p>
        {onRetry && (
          <button className="text-button retry-button" onClick={onRetry} type="button">
            <RefreshCw size={15} /> Try again
          </button>
        )}
      </div>
    </div>
  );
}

export default StatusMessage;
