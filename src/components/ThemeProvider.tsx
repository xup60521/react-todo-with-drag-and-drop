/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import { unknown } from "zod";
import type { Theme } from "../type";

const themeContext = createContext({
    theme: "white" as Theme,
    setTheme: unknown as React.Dispatch<React.SetStateAction<Theme>>,
});

export default function ThemeProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [theme, setTheme] = useState<Theme>("white");
    return (
        <themeContext.Provider value={{ theme, setTheme }}>
            {children}
        </themeContext.Provider>
    );
}

export const useTheme = () => useContext(themeContext).theme;
export const useSetTheme = () => useContext(themeContext).setTheme;
