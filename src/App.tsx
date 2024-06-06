import { useAtom } from "jotai";
import NewTodo from "./components/NewTodo";
import { useSetTheme, useTheme } from "./components/ThemeProvider";
import TodoList from "./components/TodoList";
import { TodosAtom } from "./state";
import { useState } from "react";
import type { DisplayMode } from "./type";

export default function App() {
    const theme = useTheme();
    const setTheme = useSetTheme();
    const [todos, setTodos] = useAtom(TodosAtom);
    const [displayMode, setDisplayMode] = useState<DisplayMode>("All");
    const displayModeList = ["All", "Active", "Completed"] as DisplayMode[];

    function getFilteredTodos(t: DisplayMode) {
        if (t === "Completed") {
            return todos.filter((d) => d.checked);
        }
        if (t === "Active") {
            return todos.filter((d) => !d.checked);
        }
        return todos;
    }

    return (
        <main
            className={`w-full min-h-screen flex flex-col items-center h-fit 
                        ${theme === "white" ? "bg-[#fafafa]" : "bg-[#181823] "}
        `}
        >
            <div
                className={`w-full flex flex-col items-center py-12 bg-cover gap-8 
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
                <div className="md:w-[29rem] w-11/12 flex items-center justify-between">
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
            <div className="md:w-[29rem] w-11/12 -translate-y-8">
                <div
                    className={`w-full rounded shadow 
                    ${theme === "dark" ? "bg-[#25273b]" : "bg-white"}
                `}
                >
                    <TodoList
                        todos={getFilteredTodos(displayMode)}
                        setTodos={setTodos}
                    />
                    <div className="flex justify-between items-center shadow-2xl text-xs font-josefin py-3 px-5">
                        <span
                            className={`
                            text-neutral-500 
                            ${theme === "white" ? "" : ""}`}
                        >
                            {todos.filter((d) => !d.checked).length} items left
                        </span>
                        <div className="md:flex items-center gap-2 hidden">
                            {displayModeList.map((d) => {
                                const className =
                                    displayMode === d
                                        ? "font-bold text-blue-500"
                                        : "font-bold text-neutral-500";
                                return (
                                    <button
                                        onMouseDown={() => setDisplayMode(d)}
                                        className={className}
                                        key={`display mode button ${d}`}
                                    >
                                        {d}
                                    </button>
                                );
                            })}
                        </div>
                        <button
                            onMouseDown={() =>
                                setTodos((prev) =>
                                    prev.filter((d) => !d.checked)
                                )
                            }
                            className={`
                            text-neutral-500 
                            ${theme === "white" ? "" : ""}`}
                        >
                            Clear Complete
                        </button>
                    </div>
                </div>
                <div className={`md:hidden flex items-center gap-2 my-4 text-sm justify-center py-3 
                    ${theme === "dark" ? "bg-[#25273b]" : "bg-white"}
                `}>
                    {displayModeList.map((d) => {
                        const className =
                            displayMode === d
                                ? "font-bold text-blue-500"
                                : "font-bold text-neutral-500";
                        return (
                            <button
                                onMouseDown={() => setDisplayMode(d)}
                                className={className}
                                key={`display mode button ${d}`}
                            >
                                {d}
                            </button>
                        );
                    })}
                </div>
                <div className="w-full p-12">
                    <p
                        className={`text-xs font-josefin text-center text-neutral-500`}
                    >
                        Drag and drop to reorder list
                    </p>
                </div>
            </div>
        </main>
    );
}
