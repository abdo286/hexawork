import { auth } from "../lib/firebase";
import { db } from "../lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

export async function createNewUser(email, password) {
  return await createUserWithEmailAndPassword(auth, email, password);
}

export async function updateUserProfile(values) {
  updateProfile(auth.currentUser, values);
}

export async function signInUser(email, password) {
  return await signInWithEmailAndPassword(auth, email, password);
}

export async function signOutUser() {
  return await signOut(auth);
}

export async function signInWithGoogleAuthentication() {
  const provider = new GoogleAuthProvider();
  return await signInWithPopup(auth, provider);
}

export async function resetPassword(email) {
  return await sendPasswordResetEmail(auth, email);
}

export async function AddUserToFireStore(userData) {
  return await setDoc(doc(db, "users", userData.id), {
    ...userData,
    createAt: serverTimestamp(),
  });
}

export async function AddCategoryToFireStore(category, userId) {
  return await setDoc(
    doc(db, "categories", userId, "categories", category.id),
    category
  );
}

export async function AddNoteToFireStore(note, { userId, bookId }) {
  return await setDoc(
    doc(db, "notes", userId, "notes", bookId, "notes", note.id),
    note
  );
}

export function getNotesRef({userId, bookId}) {
  const booksRef = collection(db, "notes", userId, "notes", bookId, "notes");
  return query(booksRef, orderBy("createdAt"));
}


export async function getCategories(userId) {
  return await getDocs(collection(db, "categories", userId, "categories"));
}

export async function AddBookToFireStore(book, userId) {
  console.log("book", book);
  return await setDoc(doc(db, "books", userId, "books", book.id), book);
}

export async function getBooks(userId) {
  return await getDocs(collection(db, "books", userId, "books"));
}

export async function UpdateFireStoreUserData(values) {
  return await updateDoc(doc(db, "users", values.docId), {
    ...values,
  });
}

export async function getUserByUserId(docId) {
  return await getDoc(doc(db, "users", docId));
}

export function getBooksRef(category, userId) {
  const booksRef = collection(db, "books", userId, "books");
  return query(
    booksRef,
    where("category", "==", category.toLowerCase()),
    orderBy("createdAt")
  );
}

export function getBookRef(category, bookId, userId) {
  const booksRef = doc(db, "books", userId, "books", bookId);
  return booksRef;
}

export function getCategoriesRef(userId) {
  const booksRef = collection(db, "categories", userId, "categories");
  return booksRef;
}
