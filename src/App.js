import './App.css';
import AppRouter from "./routing/AppRouter";
import {CssBaseline} from "@mui/material";
import {selectIsGlobalLoading} from "./store/loadingSlice";
import {useSelector} from "react-redux";

function App() {
  return (
      <div>
      <CssBaseline />
      <AppRouter />
      </div>
  );
}

export default App;
