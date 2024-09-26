export const deleteDeck = async (id: string) => {
  const response = await fetch(`http://localhost:5088/deck/${id}`, {
    method: "DELETE",
  });
  return response.json();
};
