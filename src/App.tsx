import NewTodo from "./components/NewTodo";
import { useSetTheme, useTheme } from "./components/ThemeProvider";

export default function App() {
    const theme = useTheme();
    const setTheme = useSetTheme();

    return (
        <main
            className={`w-full h-screen flex flex-col items-center 
                        ${theme === "white" ? "bg-[#fafafa]" : "bg-[#181823] "}
        `}
        >
            <div
                className={`w-full flex flex-col items-center py-12 bg-cover gap-6 
                ${
                    theme === "white"
                        ? `
                    md:bg-[url(/images/bg-desktop-light.jpg)] bg-[url(/images/bg-mobile-light.jpg)]
                `
                        : `
                    md:bg-[url(/images/bg-desktop-dark.jpg)] bg-[url(/images/bg-mobile-dark.jpg)]
                `
                }
            `}
            >
                <div className="md:w-[29rem] w-full flex items-center justify-between">
                    <h1
                        className={`text-white text-3xl font-josefin font-bold`}
                    >
                        T O D O
                    </h1>
                    <button
                        onClick={() =>
                            setTheme((prev) =>
                                prev === "dark" ? "white" : "dark"
                            )
                        }
                        className="sr-only"
                    >
                        change theme
                    </button>
                    <div
                        onClick={() =>
                            setTheme((prev) =>
                                prev === "dark" ? "white" : "dark"
                            )
                        }
                        className={`${
                            theme === "dark"
                                ? "bg-[url(/images/icon-sun.svg)]"
                                : "bg-[url(/images/icon-moon.svg)]"
                        } size-6 bg-cover cursor-pointer`}
                    ></div>
                </div>
                <NewTodo />
            </div>
            <div className="md:w-[29rem] w-full">
                <div
                    className={`w-full rounded 
                    ${theme === "dark" ? "bg-[#25273b]" : "bg-white"}
                `}
                >
                    <div className="flex justify-between items-center shadow-2xl text-xs font-josefin py-3 px-5">
                        <span
                            className={`
                            text-neutral-500 
                            ${
                                theme === "white" ? "" : ""
                            }`}
                        >
                            0 items left
                        </span>
                        <div className="flex items-center gap-2">
                            <button className={`font-bold text-neutral-500`}>
                                All
                            </button>
                            <button className={`font-bold text-neutral-500`}>
                                Active
                            </button>
                            <button className={`font-bold text-neutral-500`}>
                                Completed
                            </button>
                        </div>
                        <button
                            className={`
                            text-neutral-500 
                            ${
                                theme === "white" ? "" : ""
                            }`}
                        >
                            Clear Complete
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
