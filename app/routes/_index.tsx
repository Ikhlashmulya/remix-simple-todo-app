import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, json, redirect, useLoaderData } from "@remix-run/react";
import Todo from "~/components/Todo";
import { prisma } from "~/lib/prisma";

export const meta: MetaFunction = () => {
  return [
    { title: "Todo App" },
  ];
};

export const action = async ({request}:ActionFunctionArgs) => {
  const formData = await request.formData();
  const title = String(formData.get('title'));
  
  await prisma.todo.create({data: {title: title, status: "on doing"}});

  return redirect('/');
}

export const loader = async () => {
  const data = await prisma.todo.findMany({});
  return json({data});
}

export default function Index() {
  const {data} = useLoaderData<typeof loader>();
  
  return (
    <>
      <div className="h-100 w-full flex items-center justify-center font-sans">
        <div className="bg-gray-100 rounded border-2 border-gray-400 p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
          <div className="mb-4">
            <h1 className="text-gray-950">Todo List</h1>
            <Form method="post">
              <div className="flex mt-4">
                <input className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" placeholder="Add Todo" name="title" />
                <button className="flex-no-shrink p-2 border-2 rounded text-gray-950 border-gray-300" type="submit">Add</button>
              </div>
            </Form>
          </div>
          {data.map((todo) => (
            <Todo key={todo.id} id={todo.id} title={todo.title} status={todo.status}/>
          ))}
        </div>
      </div>
    </>
  );
}
