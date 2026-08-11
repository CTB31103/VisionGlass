import { useState } from "react";

export const useHoverable = () => {
  const [isHovered, setIsHovered] = useState(false);

  return {
    isHovered,
    register: {
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
    },
  };
};
