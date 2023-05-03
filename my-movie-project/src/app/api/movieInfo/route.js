export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const movieId = searchParams.get('movieId');
  if (!movieId) {
    return new Response('Missing query params', {
      status: 422,
      statusText: 'Query Param Missing',
    });
  }
  const movieInfoResult = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.TMBD_KEY}&language=en-US`;
  let result;
  try {
    result = await fetch(movieInfoResult);
    result = await result.json();
  } catch (err) {
    return new Response('Internal Error', {
      status: 500,
      statusText: 'Internal Error',
    });
  }
  return new Response(JSON.stringify(result));
}

export async function DELETE() {
  return new Response('Hello, Next.js!');
}

