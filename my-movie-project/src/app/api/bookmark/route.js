import { addMovieId, getBookMarkedMovies, deleteMovieId } from "@/app/lib/db";

export async function POST(req, res) {
  let body;
  try {
    body = await req.json();
  } catch (err) {
    return new Response("Invalid body parameter", {
      status: 422,
      statusText: "body missing",
    });
  }

  if (!body?.addId) {
    return new Response("Invalid body parameter", {
      status: 422,
      statusText: "add body param missing",
    });
  }
  try {
    await addMovieId(body.addId);
  } catch (err) {
    return new Response("Internal Error", {
      status: 500,
      statusText: "Internal Error",
    });
  }
  return new Response("Hello, Next.js!");
}

export async function GET(req, res) {
  let result;
  try {
    result = await getBookMarkedMovies();
  } catch (err) {
    return new Response("Internal Error", {
      status: 500,
      statusText: "Internal Error",
    });
  }
  return new Response(JSON.stringify(result));
}

export async function DELETE(req, res) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("deleteId");
  if (!id) {
    return new Response("Invalid body parameter", {
      status: 422,
      statusText: "deleteId query param missing",
    });
  }
  let result;
  try {
    result = await deleteMovieId(id);
  } catch (err) {
    return new Response("Internal Error", {
      status: 500,
      statusText: "Internal Error",
    });
  }

  return new Response("Hello, Next.js!");
}
