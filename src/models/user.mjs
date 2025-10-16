// src/models/user.mjs

// Ce fichier décrit la structure du "profil utilisateur" généré par l'API.

export const UserModel = {
  user: {
    name: "string",
    email: "string",
    gender: "string",
    location: "string",
    picture: "string"
  },
  phone_number: "string",
  iban: "string",
  credit_card: {
    card_number: "string",
    card_type: "string",
    expiration_date: "string",
    cvv: "string"
  },
  random_name: "string",
  pet: "string",
  quote: {
    content: "string",
    author: "string"
  },
  joke: {
    type: "string",
    content: "string"
  }
};
