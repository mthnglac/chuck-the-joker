import { GeneralApiProblem } from "./api-problem"

export interface Joke {
  id: string
  value: string
}

export interface Category {
  title: string
}

export type GetJokeResult = { kind: "ok"; joke: Joke } | GeneralApiProblem

export type GetCategoriesResult = { kind: "ok"; categories: Category[] } | GeneralApiProblem
