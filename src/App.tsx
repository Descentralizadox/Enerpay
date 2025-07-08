import { useState } from 'react';
import Header from './components/Header';
import BottomNavigation from './components/BottomNavigation';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import PayBillPage from './components/PayBillPage';
import LearnPage from './components/LearnPage';
import BusinessPage from './components/BusinessPage';
import DashboardPage from './components/DashboardPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'pay':
        return <PayBillPage />;
      case 'learn':
        return <LearnPage />;
      case 'business':
        return <BusinessPage />;
      case 'dashboard':
        return <DashboardPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage={currentPage} onPageChange={setCurrentPage} />
      
      {/* Contenido principal con padding para la navegación inferior */}
      <main className="pb-20">
        {currentPage === 'home' ? (
          <HomePage onPageChange={setCurrentPage} />
        ) : renderPage()}
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* Navegación inferior */}
      <BottomNavigation currentPage={currentPage} onPageChange={setCurrentPage} />
    </div>
  );
}

export default App;