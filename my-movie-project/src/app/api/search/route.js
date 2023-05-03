export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get('search');
  const popularResult = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMBD_KEY}&language=en-US&query=${search}&page=1`;
  const searchResult = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMBD_KEY}`;
  let result;
  try {
    if (search) {
      result = await fetch(popularResult);
    } else {
      result = await fetch(searchResult);
    }
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

