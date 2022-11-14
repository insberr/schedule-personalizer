import { createRoot } from "react-dom/client";
import { store } from "./storage";
import { Provider } from "react-redux";
import { MatUIThemer } from "./components/MatUIThemer";
import { Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
async function main() {
  const eleroot = document.getElementById("app") as HTMLDivElement;
  const root = createRoot(eleroot);
  root.render(
    <Provider store={store}>
      <MatUIThemer>
        <Typography variant="h1">Schedule????? Personalizer?????</Typography>
        <Typography variant="body1">
          imagine schedule personalizering. could&apos;nt be me <br />
          use theme/dark and theme/light in the redux devtools to change the
          theme <br />
          <a href="https://mui.com/material-ui">docs</a>
        </Typography>
      </MatUIThemer>
    </Provider>
  );
}

main();
