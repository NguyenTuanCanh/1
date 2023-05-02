import "./App.css";

import Header from './components/header/header'
import Footer from './components/footer/footer'
import AddNetworkKeplr from './components/AddNetworkKeplr/AddNetworkKeplr'

function App() {
  return (
    <div style={container}>
      <Header />
      <AddNetworkKeplr />
      <Footer />
    </div>
  );
}

const container = {
  maxWidth: "1400px",
  height: "100vh",
  padding: "40px",
  margin: "auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

export default App;
