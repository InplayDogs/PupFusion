export const Card = ({ children }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">{children}</div>
);

export const CardContent = ({ children, className = '' }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);
