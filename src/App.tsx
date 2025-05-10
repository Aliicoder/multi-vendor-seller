import { Route, Routes } from "react-router-dom";
import OrdersPage from "./pages/private/OrdersPage";
import AdminChatPage from "./pages/private/AdminChatPage";
import ProfilePasswordPage from "./pages/private/ProfilePasswordPage";
import MainLayout from "./pages/layouts/MainLayout";
import ProductPagesLayout from "./pages/layouts/ProductPagesLayout";
import ProfileLayout from "./pages/layouts/ProfileLayout";
import PersistLoginMiddleware from "./components/middlewares/PersistLoginMiddleware";
import ProtectedRoutesMiddleware from "./components/middlewares/ProtectedRoutesMiddleware";
import OrderPagesLayout from "./pages/layouts/OrderPagesLayout";
import CategoriesPage from "./pages/private/CategoriesPage";
import ProfileDetailsPage from "./pages/private/ProfileDetailsPage";
import AdminsChatsPage from "./pages/private/AdminsChatsPage";
import PaymentsPage from "./pages/private/PaymentsPage";
import OrderDetailsPage from "./pages/private/OrderDetailsPage";
import AddProductPage from "./pages/private/AddProductPage";
import ProductsPage from "./pages/private/ProductsPage";
import EditProductPage from "./pages/private/EditProductPage";
import LoginPage from "./pages/public/LoginPage";
import SignUpPage from "./pages/public/SignupPage";
import DashboardPage from "./pages/private/DashboardPage";
import ClientChatPage from "./pages/private/ClientChatPage";
import ClientChatsLayout from "./pages/layouts/ClinetChatLayout";
import TransactionsPage from "./pages/private/TransactionsPage";
import OnboardingPage from "./pages/private/OnboardingPage";
import NotAllowedPage from "./pages/private/NotAllowedPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />

      <Route element={<PersistLoginMiddleware />}>
        {/* <Route path="boarding" element={<OnboardingPage />} />
        <Route path="not-allowed" element={<NotAllowedPage />} /> */}
        <Route element={<ProtectedRoutesMiddleware />}>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="categories" element={<CategoriesPage />} />
            <Route path="products" element={<ProductPagesLayout />}>
              <Route index element={<ProductsPage />} />
              <Route path="addProduct" element={<AddProductPage />} />
              <Route
                path="addProduct/categories"
                element={<CategoriesPage />}
              />

              <Route path="edit/:productId" element={<EditProductPage />} />
            </Route>

            <Route path="orders" element={<OrderPagesLayout />}>
              <Route index element={<OrdersPage />} />
              <Route path=":orderId" element={<OrderDetailsPage />} />
            </Route>

            <Route path="transactions" element={<OrderPagesLayout />}>
              <Route index element={<TransactionsPage />} />
              <Route path=":transactionId" element={<OrderDetailsPage />} />
            </Route>

            <Route path="payments" element={<PaymentsPage />} />

            <Route path="adminsChats" element={<AdminsChatsPage />}>
              <Route path=":chatId" element={<AdminChatPage />} />
            </Route>

            <Route path="supportlink" element={<ClientChatsLayout />}>
              <Route path=":chatId" element={<ClientChatPage />} />
            </Route>

            <Route path="profile/details" element={<ProfileLayout />}>
              <Route index element={<ProfileDetailsPage />} />
              <Route path="changePassword" element={<ProfilePasswordPage />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
