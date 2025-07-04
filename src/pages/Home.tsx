import { Link } from 'react-router-dom';
import { Calculator, TrendingUp, BarChart3, DollarSign, Target, BookOpen } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl font-extrabold mb-6">
              Bienvenido a <span className="text-red-200">Costo Fácil</span>
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Una herramienta educativa y práctica diseñada para emprendedores, estudiantes y pequeños negocios. 
              Calcula automáticamente indicadores financieros esenciales de manera sencilla y visual.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/calculator">
                <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
                  <Calculator className="mr-2 h-5 w-5" />
                  Comenzar Ahora
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="bg-white text-red-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Conocer Más
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              ¿Qué puedes calcular con <span className="text-red-600">Costo Fácil</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Obtén resultados precisos para la toma de decisiones informadas en tu negocio
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-l-4 border-l-red-600 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center text-red-600">
                  <DollarSign className="mr-3 h-6 w-6" />
                  Costos y Precios
                </CardTitle>
                <CardDescription>
                  Calcula costos totales, unitarios y precios de venta recomendados
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-l-4 border-l-red-600 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center text-red-600">
                  <Target className="mr-3 h-6 w-6" />
                  Punto de Equilibrio
                </CardTitle>
                <CardDescription>
                  Determina cuántas unidades necesitas vender para cubrir todos tus costos
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-l-4 border-l-red-600 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center text-red-600">
                  <TrendingUp className="mr-3 h-6 w-6" />
                  Margen de Contribución
                </CardTitle>
                <CardDescription>
                  Analiza cuánto contribuye cada producto a cubrir los costos fijos
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-l-4 border-l-red-600 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center text-red-600">
                  <BarChart3 className="mr-3 h-6 w-6" />
                  Gastos Operativos
                </CardTitle>
                <CardDescription>
                  Calcula el porcentaje de gastos operativos sobre tus ingresos
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-l-4 border-l-red-600 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center text-red-600">
                  <Calculator className="mr-3 h-6 w-6" />
                  PVP Recomendado
                </CardTitle>
                <CardDescription>
                  Obtén sugerencias de precio basadas en tu margen de ganancia deseado
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-l-4 border-l-red-600 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center text-red-600">
                  <TrendingUp className="mr-3 h-6 w-6" />
                  Análisis Visual
                </CardTitle>
                <CardDescription>
                  Visualiza tus resultados con gráficos dinámicos y exporta en PDF/Excel
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-20 bg-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Diseñado para ti
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Sin importar tu nivel de experiencia en finanzas, Costo Fácil está aquí para ayudarte
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Estudiantes</h3>
              <p className="text-gray-600">De administración y carreras afines que buscan aprender</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Emprendedores</h3>
              <p className="text-gray-600">Microemprendedores sin formación contable especializada</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calculator className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Docentes</h3>
              <p className="text-gray-600">Que requieren herramientas didácticas para enseñar</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Pequeños Negocios</h3>
              <p className="text-gray-600">Que necesitan análisis financiero básico y práctico</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            ¿Listo para tomar decisiones financieras informadas?
          </h2>
          <p className="text-xl mb-8">
            Comienza ahora mismo y descubre el potencial de tu negocio
          </p>
          <Link to="/calculator">
            <Button size="lg" className="bg-red-600 hover:bg-red-700 px-8 py-3 text-lg font-semibold">
              <Calculator className="mr-2 h-5 w-5" />
              Usar Calculadora
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;