import { useState } from "react";
import { useTheme } from "./ThemeProvider";
import CheckedIcon from "/images/icon-check.svg";
import { useSetAtom } from "jotai";
import { TodosAtom } from "../state";
import { v4 } from "uuid";

export default function NewTodo() {
    const theme = useTheme();
    const [input, setInput] = useState("");
    const [checked, setChecked] = useState(false);
    const setTodos = useSetAtom(TodosAtom);
    function handleEnter(e: React.KeyboardEvent) {
        if (e.key !== "Enter" || input === "") {
            return;
        }
        const id = v4();
        setTodos((prev) => [
            {
                id,
                title: input,
                checked,
            },
            ...prev,
        ]);
        setInput("")
        setChecked(false)
    }

    return (
        <div
            className={`${theme === "dark" ? "bg-[#25273b]" : "bg-white"} 
    md:w-[29rem] w-full px-5 rounded flex items-center gap-4 shadow-2xl 
`}
        >
            <div
                onMouseDown={() => setChecked(!checked)}
                className={`rounded-full border-[1px] size-4 cursor-pointer flex items-center justify-center  
                    ${
                        theme === "white"
                            ? "border-neutral-300 "
                            : "border-neutral-600 "
                    }
                    ${
                        checked
                            ? "bg-gradient-to-br from-[hsl(192,100%,67%)] to-[hsl(280,87%,65%)]"
                            : " "
                    }
    `}
            >
                {checked && (
                    <img src={CheckedIcon} alt="checked" className="size-2" />
                )}
            </div>
            <input
                placeholder="Create a new todo..."
                value={input}
                onKeyDown={handleEnter}
                onChange={(e) => setInput(e.target.value)}
                className={`border-none text-sm flex-grow placeholder-[#77768d] font-josefin bg-transparent py-4 focus:outline-none ${
                    theme === "white" ? "" : "text-white"
                }`}
            />
        </div>
    );
}
