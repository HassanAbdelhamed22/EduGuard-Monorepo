import React from "react";

const Card = ({
  children,
  className = "",
  header,
  footer,
  onClick,
  hoverEffect = false,
}) => {
  return (
    <div
    className={`bg-white rounded-xl shadow-md overflow-hidden ${
      hoverEffect ? "hover:scale-105 hover:shadow-xl transition-all duration-200" : ""
    } ${className}`}
      onClick={onClick}
    >
      {/* Card Header */}
      {header && (
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          {header}
        </div>
      )}

      {/* Card Body */}
      <div className="p-6">{children}</div>

      {/* Card Footer */}
      {footer && (
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
