import { PropsWithChildren } from "react";
import ThemeProvider from "./ThemeContext";
import LoaderProvider from "./LoaderContext";
import CategoriesProvider from "./CategoriesContext";
interface ThemeContext extends PropsWithChildren {}
function Contexts({ children }: ThemeContext) {
  return (
    <LoaderProvider>
      <ThemeProvider>
        <CategoriesProvider>{children}</CategoriesProvider>
      </ThemeProvider>
    </LoaderProvider>
  );
}

export default Contexts;
