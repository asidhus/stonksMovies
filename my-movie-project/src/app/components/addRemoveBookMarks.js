export const deleteBookMarks = async (removeBookMarkedMovie, id) => {
  // const url = `/api/bookmark?deleteId=${id}`;
  // let response;
  // try {
  //   response = await fetch(url, {
  //     method: 'DELETE',
  //   });
  // } catch (err) {
  //   return;
  // }
  // if (!response.ok) {
  //   throw new Error('Failed to delete movie');
  // }
  removeBookMarkedMovie(id);
};

export const addBookMarks = async (addBookMarkedMovie, id) => {
  // const url = '/api/bookmark';
  // let response;
  // try {
  //   response = await fetch(url, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ addId: id }),
  //   });
  // } catch (err) {
  //   return;
  // }
  // if (!response.ok) {
  //   throw new Error('Failed to delete movie');
  // }
  addBookMarkedMovie(id);
};

