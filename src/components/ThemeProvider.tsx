/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";
import { unknown } from "zod";
import type { Theme } from "../type";
import { useAtom } from "jotai";
import { ThemeAtom } from "../state";

const themeContext = createContext({
    theme: "white" as Theme,
    setTheme: unknown as React.Dispatch<React.SetStateAction<Theme>>,
});

export default function ThemeProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [theme, setTheme] = useAtom(ThemeAtom);
    return (
        <themeContext.Provider value={{ theme, setTheme }}>
            {children}
        </themeContext.Provider>
    );
}

export const useTheme = () => useContext(themeContext).theme;
export const useSetTheme = () => useContext(themeContext).setTheme;
