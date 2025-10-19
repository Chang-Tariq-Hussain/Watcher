import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ConfigProvider, theme } from "antd";
import themeConfig from "../antd.theme.json";
import { Provider } from "react-redux";
import { store } from "./redux/store/store.ts";
const { defaultAlgorithm, darkAlgorithm } = theme;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: themeConfig.token,
          components: themeConfig.components,
          algorithm:
            themeConfig.algorithm === "darkAlgorithm"
              ? darkAlgorithm
              : defaultAlgorithm,
        }}
      >
        <App />
      </ConfigProvider>
    </Provider>
  </StrictMode>
);
