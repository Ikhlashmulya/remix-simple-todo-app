import { Form } from "@remix-run/react";
import React from "react";

export default function Todo(props: {id:number; title:string; status:string}) {

  const confirmDelete = (event: React.FormEvent) => {
    const response = confirm(
      "Please confirm you want to delete this record."
    );
    if (!response) {
      event.preventDefault();
    }
  }

  return (
    <>
      <div className="flex mb-4 items-center justify-between">
        <div>
          <h1 className={`text-lg ${props.status === 'finished' ? 'line-through': ''}`}>{props.title}</h1>
        </div>
        <div className="inline-flex">
          <Form action={`/todo/${props.id}/done`} method="post">
            <button className="p-2 ml-2 border-2 rounded border-gray-300" type="submit">Done</button>
          </Form>
          <Form action={`/todo/${props.id}/delete`} method="post" onSubmit={confirmDelete}>
            <button className="p-2 ml-2 border-2 rounded border-gray-300">Remove</button>
          </Form>
        </div>
      </div>
    </>
  )
}