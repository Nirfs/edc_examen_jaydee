//Fonction qui convertit le format d'une date
export function formatDate(dateInput: string | Date) {
  const date = new Date(dateInput);

  return date.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
