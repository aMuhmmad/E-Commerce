import { Suspense, lazy, useEffect } from "react";


import { Route, Routes } from "react-router-dom";
import { checkUserSession } from "./store/user/user.action";
import { useDispatch } from "react-redux";
import CheckoutForm from "./routes/checkout-form/checkout-form.component";
import Spinner from "./components/spinner/spinner.component";
import { GlobalStyle } from "./global.styles";

const Navigation = lazy(() =>
  import('./routes/navigation/navigation.component')
);
const Shop = lazy(() => import('./routes/shop/shop.component'));
const Checkout = lazy(() => import('./routes/checkout/checkout.component'));
const Home = lazy(() => import('./routes/home/home.component'));
const Authentication = lazy(() =>
  import('./routes/authentication/authentication.component')
);

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession())
  }, []);

  return (
    <Suspense fallback={<Spinner />}>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="shop/*" element={<Shop />} />
          <Route path="auth" element={<Authentication />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="checkout-form" element={<CheckoutForm />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;