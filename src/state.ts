import { atom } from "jotai";
import type { TodoType } from "./type";

export const TodosAtom = atom<TodoType[]>([])