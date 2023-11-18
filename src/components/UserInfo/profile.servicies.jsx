import { getAuth, updateEmail, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";

const auth = getAuth();

export const FunctionUpdateEmail = async (newEmail, password) => {
  const user = auth.currentUser;
  const credential = EmailAuthProvider.credential(user.email, password);

  try {
    await reauthenticateWithCredential(user, credential);
    await updateEmail(user, newEmail);
    console.log('Correo electrónico actualizado correctamente');
  } catch (error) {
    console.error('Error al actualizar el correo electrónico', error);
  }
};