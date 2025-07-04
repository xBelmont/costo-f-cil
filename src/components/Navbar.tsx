import { Link, useLocation } from 'react-router-dom';
import { Calculator, Home, Info } from 'lucide-react';
import { Button } from './ui/button';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg border-b-4 border-red-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo y título */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <img 
                src="/logo-costo-facil.jpg" 
                alt="Logo Costo Fácil" 
                className="h-10 w-auto object-contain rounded-md shadow-sm"
              />
            </div>
            <div>
              <p className="text-xs text-red-600 font-medium">Universidad Técnica del Norte</p>
            </div>
          </div>

          {/* Enlaces de navegación */}
          <div className="flex space-x-1">
            <Link to="/">
              <Button
                variant={isActive('/') ? 'default' : 'ghost'}
                className={`flex items-center space-x-2 ${
                  isActive('/') 
                    ? 'bg-red-600 hover:bg-red-700 text-white' 
                    : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                }`}
              >
                <Home className="h-4 w-4" />
                <span>Inicio</span>
              </Button>
            </Link>
            
            <Link to="/calculator">
              <Button
                variant={isActive('/calculator') ? 'default' : 'ghost'}
                className={`flex items-center space-x-2 ${
                  isActive('/calculator') 
                    ? 'bg-red-600 hover:bg-red-700 text-white' 
                    : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                }`}
              >
                <Calculator className="h-4 w-4" />
                <span>Calculadora</span>
              </Button>
            </Link>
            
            <Link to="/about">
              <Button
                variant={isActive('/about') ? 'default' : 'ghost'}
                className={`flex items-center space-x-2 ${
                  isActive('/about') 
                    ? 'bg-red-600 hover:bg-red-700 text-white' 
                    : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                }`}
              >
                <Info className="h-4 w-4" />
                <span>Acerca del Proyecto</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;