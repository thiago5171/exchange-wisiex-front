import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/login";
import Order from "./pages/order";
import { Layout } from "antd";

function App() {
  return (
    <Router>
      <Layout style={{ margin: 0, padding: 0 }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/order" element={<Order />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
