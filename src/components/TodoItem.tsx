import { useSetAtom } from "jotai";
import type { TodoType } from "../type";
import { TodosAtom } from "../state";
import { useTheme } from "./ThemeProvider";
import CheckedIcon from "/images/icon-check.svg";
import IconCross from "/images/icon-cross.svg";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function TodoItem({ item }: { item: TodoType }) {
    const setTodos = useSetAtom(TodosAtom);
    const theme = useTheme();
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: item.id });
    const style = { transition, transform: CSS.Transform.toString(transform) };

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={style}
            className={`flex px-5 gap-4 items-center border-b-[1px] ${
                theme === "dark" ? "border-neutral-700" : "border-neutral-100"
            }`}
            key={`todo list ${item.id}`}
        >
            <div
                onMouseDown={() =>
                    setTodos((prev) => [
                        ...prev.map((d) => {
                            if (d.id === item.id) {
                                d.checked = !d.checked;
                                return d;
                            }
                            return d;
                        }),
                    ])
                }
                className={`rounded-full border-[1px] size-4 cursor-pointer flex items-center justify-center  
                    ${
                        theme === "white"
                            ? "border-neutral-300 "
                            : "border-neutral-600 "
                    }
                    ${
                        item.checked
                            ? "bg-gradient-to-br from-[hsl(192,100%,67%)] to-[hsl(280,87%,65%)]"
                            : " "
                    }
                `}
            >
                {item.checked && (
                    <img src={CheckedIcon} alt="checked" className="size-2" />
                )}
            </div>
            <p
                className={`border-none text-sm flex-grow placeholder-[#77768d] font-josefin bg-transparent py-4 focus:outline-none ${
                    theme === "white"
                        ? `${
                              item.checked
                                  ? "text-neutral-400 line-through"
                                  : ""
                          }`
                        : `${
                              item.checked
                                  ? "text-neutral-500 line-through"
                                  : "text-white"
                          }`
                }`}
            >
                {item.title}
            </p>
            <div
                className="cursor-pointer lg:opacity-0 lg:hover:opacity-100 transition p-4 px-0"
                onMouseDown={() =>
                    setTodos((prev) => [
                        ...prev.filter((d) => d.id !== item.id),
                    ])
                }
            >
                <img className="size-3" src={IconCross} alt="delete todo" />
            </div>
        </div>
    );
}
