import { BrowserRouter, Routes, Route } from "react-router-dom";
import SurveyPage from "./pages/SurveyPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/survey/:officeId" element={<SurveyPage />} />
        <Route
          path="/"
          element={
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
              <div className="bg-white p-8 rounded shadow-md text-center">
                <h1 className="text-2xl font-bold mb-4">
                  Client Satisfaction Survey
                </h1>
                <p>Please scan the QR code in the office you are visiting.</p>
              </div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
