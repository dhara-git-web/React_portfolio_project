import { BrowserRouter ,Navigate,Route,Routes} from "react-router-dom";
import Homepage from "./pages/homepage";
import Pricing from "./pages/pricing";
import Product from "./pages/product";
import Login from "./pages/Login";
import CityList from "./components/cityList";
import AppLayout from "./pages/AppLayout";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import { CitiesProvider } from "./contexts/CitiesContext";
export default App;
function App() {

  return (
   <CitiesProvider>
   <BrowserRouter>
   <Routes>
   <Route index element ={<Homepage />} />
    <Route path ="pricing" element ={<Pricing />} />
    <Route  path ="product" element ={<Product/>} />
    <Route path ="login"  element ={<Login />} />
    <Route path ="app"  element ={<AppLayout />}>
    <Route index element={<Navigate replace to="cities"/>} />
      <Route  path="cities" element={<CityList />} />
      <Route  path="cities/:id" element ={<City />}/>
      <Route  path="countries" element={<CountryList  />} />
      <Route  path="form" element={<Form />} />

    </Route>
   </Routes>
   </BrowserRouter>
   </CitiesProvider>
  )
}


