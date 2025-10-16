// src/Agg/controllers/users.mjs
import axios from "axios";
import fs from "fs";
import config from "../config.mjs";

const env = config.development;
const headers = env.RANDOMMER_HEADERS;

// --- APIS ORIGINELLES ---

// https://randomuser.me/api/
async function getRandomUser() {
  const res = await axios.get("https://randomuser.me/api/?nat=fr");
  const u = res.data.results[0];
  return {
    name: `${u.name.first} ${u.name.last}`,
    email: u.email,
    gender: u.gender,
    location: `${u.location.city}, ${u.location.country}`,
    picture: u.picture.large
  };
}

// https://randommer.io/api/Phone/Generate
async function getPhoneNumber() {
  const res = await axios.get(
    "https://randommer.io/api/Phone/Generate?CountryCode=FR&Quantity=1",
    { headers }
  );
  return Array.isArray(res.data) ? res.data[0] : res.data;
}

// https://randommer.io/api/Finance/Iban/FR
async function getIban() {
  const res = await axios.get("https://randommer.io/api/Finance/Iban/FR", { headers });
  return res.data;
}

// https://randommer.io/api/Card
async function getCreditCard() {
  const res = await axios.get("https://randommer.io/api/Card", { headers });
  return {
    card_number: res.data.cardNumber,
    card_type: res.data.cardType || "VISA",
    expiration_date: res.data.expiration || "12/2026",
    cvv: res.data.cvv
  };
}

// https://randommer.io/api/Name
async function getRandomName() {
  const res = await axios.get(
    "https://randommer.io/api/Name?nameType=firstname&quantity=1",
    { headers }
  );
  return Array.isArray(res.data) ? res.data[0] : res.data;
}

// https://catfact.ninja/fact
async function getAnimal() {
  const res = await axios.get("https://catfact.ninja/fact");
  return "Cat : " + res.data.fact;
}

// https://zenquotes.io/api/random
async function getQuote() {
  const res = await axios.get("https://zenquotes.io/api/random");
  const q = res.data[0];
  return { content: q.q, author: q.a };
}

// https://v2.jokeapi.dev/joke/Programming?type=single
async function getJoke() {
  const res = await axios.get("https://v2.jokeapi.dev/joke/Programming?type=single");
  return { type: res.data.category, content: res.data.joke };
}

// --- DARK DATA CALCULÉES ---
function computeDarkData(profile) {
  return {
    email_domain: profile.user.email.split("@")[1],
    iban_length: profile.iban.length,
    card_is_valid: profile.credit_card.card_number.length >= 12,
    quote_length: profile.quote.content.length
  };
}

// --- PIPELINE PRINCIPAL ---
export async function generateUserProfile() {
  const [user, phone, iban, creditCard, randomName, pet, quote, joke] = await Promise.all([
    getRandomUser(),
    getPhoneNumber(),
    getIban(),
    getCreditCard(),
    getRandomName(),
    getAnimal(),
    getQuote(),
    getJoke()
  ]);

  const profile = { user, phone_number: phone, iban, credit_card: creditCard, random_name: randomName, pet, quote, joke };
  profile.dark_data = computeDarkData(profile); // ajout des dark data

  fs.writeFileSync("profile.json", JSON.stringify(profile, null, 2)); // sauvegarde locale

  return profile;
}
