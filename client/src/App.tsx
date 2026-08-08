import { LightMode } from "./components/ui/color-mode";
import { useScreenSizeService } from "./hooks";
import { RootRouter } from "./routing";

export default function App() {
  useScreenSizeService();

  return (
    <LightMode>
      <RootRouter />
    </LightMode>
  );
}
