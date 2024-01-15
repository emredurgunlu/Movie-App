import React from "react";
import { useAuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRouter = () => {
  const { currentUser } = useAuthContext();

  //* Redirect them to the /login page, but save the current location they were
  //* trying to go to when they were redirected. This allows us to send them
  //* along to that page after they login, which is a nicer user experience
  //* than dropping them off on the home page.
  // replace anlamı: movie detail sayfası private route ile sarmalandı. Eğer kullanıcı movie detail sayfasına gitmek için
  // ana sayfada bir film üzerine tıklarsa ama log in olmamışsa burada <Outlet /> olan movie detail sayfasına değil, log in sayfasına yönlendirilir
  // eğer kullnıcı bu şekilde log in sayfasında iken browser üzerinden geri ikonuna tıklarsa sayfalar historisinde bir geride movie detail sayfası olur ama log in olmadığı için
  // ona da gidemez. log in sayfasında sıkışır kalır. eğer replace kelimesi eklersek movie detail sayfası historiye eklenmemiş olur dolayısıyla geri tıklandığında ana sayfaya gidilir.
  return currentUser ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRouter;
