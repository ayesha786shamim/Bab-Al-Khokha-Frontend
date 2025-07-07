
// src/components/LoadingSpinner.jsx
const LoadingSpinner = ({ size = 'medium', color = 'amber', className = "" }) => {
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-8 w-8',
    large: 'h-12 w-12',
    xlarge: 'h-16 w-16'
  };

  const colorClasses = {
    amber: 'border-amber-600',
    gray: 'border-gray-600',
    white: 'border-white',
    blue: 'border-blue-600'
  };

  return (
    <div className={`animate-spin rounded-full border-b-2 ${sizeClasses[size]} ${colorClasses[color]} ${className}`}>
    </div>
  );
};

export default LoadingSpinner;

