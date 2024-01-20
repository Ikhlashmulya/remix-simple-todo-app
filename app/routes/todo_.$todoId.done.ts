import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { prisma } from "~/lib/prisma";

export const action = async ({params}:ActionFunctionArgs) => {
  if (!params.todoId) {
    throw new Error("Missing Todo Id");
  }

  await prisma.todo.update({where: {id: Number(params.todoId)}, data: {status: "finished"}});

  return redirect("/");
}