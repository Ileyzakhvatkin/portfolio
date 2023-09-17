const PREFIX = "http://localhost:3000/apinotes";

const req = (url, options = {}) => {
  const { body } = options;

  return fetch((PREFIX + url).replace(/\/\/$/, ""), {
    ...options,
    body: body ? JSON.stringify(body) : null,
    headers: {
      ...options.headers,
      ...(body
        ? {
            "Content-Type": "application/json",
          }
        : null),
    },
  }).then((res) =>
    res.ok
      ? res.json()
      : res.text().then((message) => {
          throw new Error(message);
        })
  );
};

export const getNotes = async ({ age, search, page } = {}) => {
  if (search !== '') search = search.toLowerCase();
  return await req(`/list?age=${age}&search=${search}&page=${page}`);
};

export const getNote = async (id) => {
  return await req(`/note/${id}`);
};

export const createNote = async (title, text) => {
  return await req('/create', {
    method: 'POST',
    body: { title, text },
  });
};

export const editNote = async (id, title, text) => {
  await req(`/edit/${id}`, {
    method: 'PATCH',
    body: { title, text },
  });
};

export const archiveNote = async (id) => {
  await req(`/archive/${id}`, {
    method: 'PATCH',
  });
};

export const unarchiveNote = async (id) => {
  await req(`/unarchive/${id}`, {
    method: 'PATCH',
  });
};

export const deleteNote = async (id) => {
  return await req(`/delete/${id}`, {
    method: 'PATCH',
  });
};

export const deleteAllArchived = async () => {
  return await req(`/deleteallarchived`, {
    method: 'PATCH',
  });
};

export const notePdfUrl = async (id) => {
  const buttonPDF = document.querySelector('.buttonPDF');
  buttonPDF.disabled = true;
  buttonPDF.innerHTML = 'Loading...';
  req(`/create-pdf/${id}`).then(res => {
    window.open(res.url, '_blank');
    buttonPDF.innerHTML = '<i class="fas fa-file-download" />&nbsp;PDF';
    buttonPDF.disabled = false;
  });
};
