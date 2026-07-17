'use client';

import React from 'react';

interface RoundedRibbonProps {
  text?: string;
  color?: string;
  children?: React.ReactNode;
  className?: string;
}

const RoundedRibbon: React.FC<RoundedRibbonProps> = ({
  text = 'Etiqueta',
  color = 'bg-indigo-600',
  children,
  className = '',
}) => {
  return (
    <div
      className={`relative rounded-lg border border-gray-200 bg-white p-4 pt-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 ${className}`}
    >
      {/* Ribbon/Badge */}
      <div className="absolute -top-3 left-4 z-10">
        <span
          className={`inline-block rounded-full px-3 py-1 text-xs font-semibold text-white ${color}`}
        >
          {text}
        </span>
      </div>

      {/* Content */}
      <div className="pt-2">{children}</div>
    </div>
  );
};

export default RoundedRibbon;
