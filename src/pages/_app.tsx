import "@/src/styles/globals.css";
import type { AppProps } from "next/app";
import store from "@/core/redux/store";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
