import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { prisma } from "~/lib/prisma";

export const action = async ({params}:ActionFunctionArgs) => {
  if (!params.todoId) {
    throw new Error("Missing Todo Id");
  }

  await prisma.todo.delete({where: {id: Number(params.todoId)}});

  return redirect("/");
}