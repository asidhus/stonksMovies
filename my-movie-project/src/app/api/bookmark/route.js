import { addMovieId, getBookMarkedMovies, deleteMovieId } from '../lib/db';

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch (err) {
    return new Response('Invalid body parameter', {
      status: 422,
      statusText: 'body missing',
    });
  }

  if (!body?.addId) {
    return new Response('Invalid body parameter', {
      status: 422,
      statusText: 'add body param missing',
    });
  }
  try {
    await addMovieId(body.addId);
  } catch (err) {
    return new Response('Internal Error', {
      status: 500,
      statusText: 'Internal Error',
    });
  }
  return new Response('Hello, Next.js!');
}

export async function GET() {
  let result;
  try {
    result = await getBookMarkedMovies();
  } catch (err) {
    return new Response('Internal Error', {
      status: 500,
      statusText: 'Internal Error',
    });
  }
  return new Response(JSON.stringify(result));
}

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const deleteId = searchParams.get('deleteId');
  if (!deleteId) {
    return new Response('Invalid query parameter', {
      status: 422,
      statusText: 'Query Parameter Missin',
    });
  }
  try {
    await deleteMovieId(deleteId);
  } catch (err) {
    return new Response('Internal Error', {
      status: 500,
      statusText: 'Internal Error',
    });
  }
  return new Response('BookMark Removed');
}
