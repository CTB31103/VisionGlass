import { createTheme } from "@mui/material";
import { LightMode } from "./components/ui/color-mode";
import { useScreenSizeService } from "./hooks";
import { RootRouter } from "./routing";

export default function App() {
  useScreenSizeService();
  createTheme({ cssVariables: true });

  return (
    <LightMode>
      <RootRouter />
    </LightMode>
  );
}
