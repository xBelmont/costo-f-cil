import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, Area, AreaChart } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface FinancialData {
  costosFijos: number;
  costosVariables: number;
  unidadesProducidas: number;
  precioVentaActual: number;
  margenGananciaDeseado: number;
}

interface CalculatedResults {
  costoTotal: number;
  costoUnitario: number;
  puntoEquilibrioUnidades: number;
  puntoEquilibrioMonetario: number;
  margenContribucion: number;
  porcentajeGastosOperativos: number;
  pvpRecomendado: number;
  nuevoPuntoEquilibrio: number;
}

interface ResultsChartProps {
  results: CalculatedResults;
  formData: FinancialData;
}

const ResultsChart = ({ results, formData }: ResultsChartProps) => {
  // Datos para gráfico de barras comparativo
  const comparisonData = [
    {
      name: 'Precio Actual',
      precio: formData.precioVentaActual,
      costo: results.costoUnitario,
      ganancia: formData.precioVentaActual - results.costoUnitario
    },
    {
      name: 'PVP Recomendado',
      precio: results.pvpRecomendado,
      costo: results.costoUnitario,
      ganancia: results.pvpRecomendado - results.costoUnitario
    }
  ];

  // Datos para gráfico de composición de costos
  const costCompositionData = [
    { name: 'Costos Fijos', value: formData.costosFijos, color: '#dc2626' },
    { name: 'Costos Variables', value: formData.costosVariables, color: '#ea580c' }
  ];

  // Datos para análisis de punto de equilibrio
  const breakEvenData = [];
  const maxUnits = Math.max(results.puntoEquilibrioUnidades * 2, formData.unidadesProducidas * 1.5, 100);
  const step = Math.max(1, Math.floor(maxUnits / 20));
  
  for (let units = 0; units <= maxUnits; units += step) {
    const costoVariableUnitario = formData.unidadesProducidas > 0 ? formData.costosVariables / formData.unidadesProducidas : 0;
    const ingresos = units * formData.precioVentaActual;
    const costosTotales = formData.costosFijos + (units * costoVariableUnitario);
    
    breakEvenData.push({
      unidades: units,
      ingresos: ingresos,
      costos: costosTotales,
      ganancia: ingresos - costosTotales
    });
  }

  // Colores personalizados
  const COLORS = {
    primary: '#dc2626',
    secondary: '#ea580c',
    success: '#16a34a',
    warning: '#ca8a04',
    info: '#2563eb'
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl text-red-600">Análisis Visual</CardTitle>
        <CardDescription>
          Representación gráfica de tus indicadores financieros
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="comparison" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="comparison">Comparación</TabsTrigger>
            <TabsTrigger value="composition">Composición</TabsTrigger>
            <TabsTrigger value="breakeven">Equilibrio</TabsTrigger>
          </TabsList>
          
          <TabsContent value="comparison" className="space-y-4">
            <div className="h-80">
              <h4 className="text-lg font-semibold mb-4 text-center">Comparación de Precios y Ganancias</h4>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: number) => [`$${value.toFixed(2)}`, '']} 
                    labelStyle={{ color: '#374151' }}
                  />
                  <Legend />
                  <Bar dataKey="costo" stackId="a" fill={COLORS.warning} name="Costo Unitario" />
                  <Bar dataKey="ganancia" stackId="a" fill={COLORS.success} name="Ganancia Unitaria" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="composition" className="space-y-4">
            <div className="h-80">
              <h4 className="text-lg font-semibold mb-4 text-center">Composición de Costos</h4>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={costCompositionData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value, percent }) => `${name}: $${value.toFixed(0)} (${(percent * 100).toFixed(1)}%)`}
                  >
                    {costCompositionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => [`$${value.toFixed(2)}`, '']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="breakeven" className="space-y-4">
            <div className="h-80">
              <h4 className="text-lg font-semibold mb-4 text-center">
                Análisis de Punto de Equilibrio
                <span className="block text-sm text-gray-600 mt-1">
                  Equilibrio en {results.puntoEquilibrioUnidades.toFixed(0)} unidades
                </span>
              </h4>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={breakEvenData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="unidades" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: number) => [`$${value.toFixed(2)}`, '']} 
                    labelFormatter={(value) => `Unidades: ${value}`}
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="ingresos" 
                    stackId="1" 
                    stroke={COLORS.success} 
                    fill={COLORS.success} 
                    fillOpacity={0.6}
                    name="Ingresos"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="costos" 
                    stackId="2" 
                    stroke={COLORS.primary} 
                    fill={COLORS.primary} 
                    fillOpacity={0.6}
                    name="Costos Totales"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="ganancia" 
                    stroke={COLORS.info} 
                    strokeWidth={3}
                    name="Ganancia/Pérdida"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            {/* Indicadores clave del punto de equilibrio */}
            <div className="grid md:grid-cols-3 gap-4 mt-4">
              <div className="bg-red-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600">Unidades Actuales</p>
                <p className="text-2xl font-bold text-red-600">{formData.unidadesProducidas}</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600">Punto de Equilibrio</p>
                <p className="text-2xl font-bold text-orange-600">{results.puntoEquilibrioUnidades.toFixed(0)}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600">Diferencia</p>
                <p className={`text-2xl font-bold ${
                  formData.unidadesProducidas >= results.puntoEquilibrioUnidades 
                    ? 'text-green-600' 
                    : 'text-red-600'
                }`}>
                  {formData.unidadesProducidas >= results.puntoEquilibrioUnidades ? '+' : ''}
                  {(formData.unidadesProducidas - results.puntoEquilibrioUnidades).toFixed(0)}
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ResultsChart;