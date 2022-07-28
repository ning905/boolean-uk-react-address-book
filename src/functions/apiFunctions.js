export const apiUrl = "http://localhost:4000";

export function patchToApi(server, object) {
  fetch(`${server}/${object.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...object,
    }),
  });
}

export function postToApi(server, object) {
  fetch(server, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...object,
    }),
  });
}

export function deleteFromApi(server, itemToDelete) {
  fetch(`${server}/${itemToDelete.id}`, {
    method: "DELETE",
  });
}
