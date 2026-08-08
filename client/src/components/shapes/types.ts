export type ShapeProps = {
  img?: string;
  color?: string;
  size?: number;
  borderWidth?: number;
  borderColor?: string;

  hoverable?: boolean;
  onClick?: () => void;
};
