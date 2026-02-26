// frontend/src/context/PortfolioContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import API from "../api/axios";

const PortfolioContext = createContext();

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) throw new Error("usePortfolio must be used within PortfolioProvider");
  return context;
};

export const PortfolioProvider = ({ children }) => {
  const [portfolio, setPortfolio] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Fetching data..."); // Add this to debug
    const fetchAllData = async () => {
      try {
        const [portfolioRes, projectsRes] = await Promise.all([
          API.get("/portfolio"),
          API.get("/projects")
        ]);
        setPortfolio(portfolioRes.data.data);
        setProjects(projectsRes.data.data);
        console.log("Data fetched successfully");
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []); // ← THIS MUST BE AN EMPTY ARRAY! If missing, infinite loop!

  return (
    <PortfolioContext.Provider value={{ portfolio, projects, loading }}>
      {children}
    </PortfolioContext.Provider>
  );
};