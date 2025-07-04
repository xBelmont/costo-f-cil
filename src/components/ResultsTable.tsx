import { TrendingUp, DollarSign, Calculator, Target } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

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

interface ResultsTableProps {
  results: CalculatedResults;
  formData: FinancialData;
}

const ResultsTable = ({ results, formData }: ResultsTableProps) => {
  const formatCurrency = (value: number) => `$${value.toFixed(2)}`;
  const formatNumber = (value: number) => value.toFixed(0);
  const formatPercentage = (value: number) => `${value.toFixed(1)}%`;

  const resultItems = [
    {
      icon: <DollarSign className="h-5 w-5" />,
      label: "Costo Total",
      value: formatCurrency(results.costoTotal),
      description: "Suma de costos fijos y variables",
      color: "bg-blue-500"
    },
    {
      icon: <Calculator className="h-5 w-5" />,
      label: "Costo Unitario",
      value: formatCurrency(results.costoUnitario),
      description: "Costo por unidad producida",
      color: "bg-green-500"
    },
    {
      icon: <Target className="h-5 w-5" />,
      label: "Punto de Equilibrio",
      value: `${formatNumber(results.puntoEquilibrioUnidades)} unidades`,
      description: "Unidades para no ganar ni perder",
      color: "bg-orange-500"
    },
    {
      icon: <DollarSign className="h-5 w-5" />,
      label: "Punto de Equilibrio ($)",
      value: formatCurrency(results.puntoEquilibrioMonetario),
      description: "Valor monetario del punto de equilibrio",
      color: "bg-purple-500"
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      label: "Margen de Contribución",
      value: formatCurrency(results.margenContribucion),
      description: "Dinero disponible para costos fijos",
      color: "bg-indigo-500"
    },
    {
      icon: <Calculator className="h-5 w-5" />,
      label: "Gastos Operativos",
      value: formatPercentage(results.porcentajeGastosOperativos),
      description: "Porcentaje sobre ingresos totales",
      color: "bg-pink-500"
    },
    {
      icon: <DollarSign className="h-5 w-5" />,
      label: "PVP Recomendado",
      value: formatCurrency(results.pvpRecomendado),
      description: `Con ${formData.margenGananciaDeseado}% de margen`,
      color: "bg-red-500"
    },
    {
      icon: <Target className="h-5 w-5" />,
      label: "Nuevo Punto Equilibrio",
      value: `${formatNumber(results.nuevoPuntoEquilibrio)} unidades`,
      description: "Con el PVP recomendado",
      color: "bg-teal-500"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl text-red-600">Resultados del Análisis</CardTitle>
        <CardDescription>
          Indicadores financieros calculados automáticamente
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {resultItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-3">
                <div className={`${item.color} text-white p-2 rounded-full`}>
                  {item.icon}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{item.label}</p>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
              <Badge variant="secondary" className="text-lg font-bold py-2 px-4">
                {item.value}
              </Badge>
            </div>
          ))}
        </div>

        {/* Resumen de rentabilidad */}
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <h4 className="font-semibold text-red-800 mb-2">📊 Resumen de Rentabilidad</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Ingresos con precio actual:</span>
              <span className="font-bold ml-2">
                {formatCurrency(formData.unidadesProducidas * formData.precioVentaActual)}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Ganancia actual:</span>
              <span className={`font-bold ml-2 ${
                (formData.unidadesProducidas * formData.precioVentaActual - results.costoTotal) >= 0 
                  ? 'text-green-600' 
                  : 'text-red-600'
              }`}>
                {formatCurrency(formData.unidadesProducidas * formData.precioVentaActual - results.costoTotal)}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Ingresos con PVP recomendado:</span>
              <span className="font-bold ml-2">
                {formatCurrency(formData.unidadesProducidas * results.pvpRecomendado)}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Ganancia con PVP recomendado:</span>
              <span className="font-bold ml-2 text-green-600">
                {formatCurrency(formData.unidadesProducidas * results.pvpRecomendado - results.costoTotal)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsTable;