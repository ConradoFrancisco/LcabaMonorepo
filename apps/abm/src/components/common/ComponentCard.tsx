import React from 'react';

interface ComponentCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string; // Additional custom classes for styling
  desc?: string; // Description text
  action?: React.ReactNode;
}

const ComponentCard: React.FC<ComponentCardProps> = ({
  title,
  children,
  className = '',
  desc = '',
  action,
}) => {
  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ${className}`}
    >
      {/* Card Header */}
      {(title || action) && (
        <div className="flex items-center justify-between px-6 py-5">
          <h3 className="text-base font-medium text-gray-800 dark:text-white/90">{title}</h3>
          {action && <div>{action}</div>}
        </div>
      )}
      {/* Card Body */}
      <div
        className={`p-4 ${title || action ? 'border-t' : ''} border-gray-100 sm:p-6 dark:border-gray-800`}
      >
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
};

export default ComponentCard;
