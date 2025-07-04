import { useState, useEffect } from 'react';
import { Calculator as CalculatorIcon, Download, FileSpreadsheet, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/ui/tooltip';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import ResultsTable from '../components/ResultsTable';
import ResultsChart from '../components/ResultsChart';
import { exportToPDF, exportToExcel } from '../utils/exportUtils';
import { useToast } from '../hooks/use-toast';

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

const Calculator = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FinancialData>({
    costosFijos: 0,
    costosVariables: 0,
    unidadesProducidas: 0,
    precioVentaActual: 0,
    margenGananciaDeseado: 0,
  });

  const [results, setResults] = useState<CalculatedResults | null>(null);

  const calculateResults = (data: FinancialData): CalculatedResults => {
    const costoTotal = data.costosFijos + data.costosVariables;
    const costoUnitario = data.unidadesProducidas > 0 ? costoTotal / data.unidadesProducidas : 0;
    const costoVariableUnitario = data.unidadesProducidas > 0 ? data.costosVariables / data.unidadesProducidas : 0;
    
    // Punto de equilibrio (unidades)
    const margenContribucionUnitario = data.precioVentaActual - costoVariableUnitario;
    const puntoEquilibrioUnidades = margenContribucionUnitario > 0 ? data.costosFijos / margenContribucionUnitario : 0;
    
    // Punto de equilibrio (monetario)
    const puntoEquilibrioMonetario = puntoEquilibrioUnidades * data.precioVentaActual;
    
    // Margen de contribución total
    const margenContribucion = data.unidadesProducidas * margenContribucionUnitario;
    
    // Porcentaje de gastos operativos
    const ingresosTotales = data.unidadesProducidas * data.precioVentaActual;
    const porcentajeGastosOperativos = ingresosTotales > 0 ? (data.costosFijos / ingresosTotales) * 100 : 0;
    
    // PVP recomendado basado en margen deseado
    const pvpRecomendado = costoUnitario * (1 + data.margenGananciaDeseado / 100);
    
    // Nuevo punto de equilibrio con PVP recomendado
    const nuevoMargenContribucionUnitario = pvpRecomendado - costoVariableUnitario;
    const nuevoPuntoEquilibrio = nuevoMargenContribucionUnitario > 0 ? data.costosFijos / nuevoMargenContribucionUnitario : 0;

    return {
      costoTotal,
      costoUnitario,
      puntoEquilibrioUnidades,
      puntoEquilibrioMonetario,
      margenContribucion,
      porcentajeGastosOperativos,
      pvpRecomendado,
      nuevoPuntoEquilibrio,
    };
  };

  useEffect(() => {
    // Recalcular automáticamente cuando cambien los datos
    if (Object.values(formData).some(value => value > 0)) {
      const calculatedResults = calculateResults(formData);
      setResults(calculatedResults);
    } else {
      setResults(null);
    }
  }, [formData]);

  const handleInputChange = (field: keyof FinancialData, value: string) => {
    const numericValue = parseFloat(value) || 0;
    setFormData(prev => ({ ...prev, [field]: numericValue }));
  };

  const handleExportPDF = () => {
    if (results) {
      exportToPDF(formData, results);
      toast({ title: "PDF exportado", description: "El archivo PDF se ha descargado correctamente." });
    }
  };

  const handleExportExcel = () => {
    if (results) {
      exportToExcel(formData, results);
      toast({ title: "Excel exportado", description: "El archivo Excel se ha descargado correctamente." });
    }
  };

  const TooltipWrapper = ({ children, content }: { children: React.ReactNode; content: string }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2">
            {children}
            <HelpCircle className="h-4 w-4 text-gray-400 hover:text-red-600 cursor-help" />
          </div>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            <CalculatorIcon className="inline-block mr-3 h-10 w-10 text-red-600" />
            Calculadora de <span className="text-red-600">Indicadores Financieros</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ingresa los datos de tu negocio y obtén automáticamente todos los indicadores financieros esenciales
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Formulario de entrada */}
          <Card className="border-l-4 border-l-red-600">
            <CardHeader>
              <CardTitle className="text-2xl text-red-600">Datos de Entrada</CardTitle>
              <CardDescription>
                Completa todos los campos para obtener cálculos precisos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <TooltipWrapper content="Son los gastos que permanecen constantes independientemente del nivel de producción (alquiler, salarios fijos, seguros, etc.)">
                  <Label htmlFor="costosFijos">Costos Fijos ($)</Label>
                </TooltipWrapper>
                <Input
                  id="costosFijos"
                  type="number"
                  placeholder="Ej: 5000"
                  value={formData.costosFijos || ''}
                  onChange={(e) => handleInputChange('costosFijos', e.target.value)}
                  className="focus:border-red-600"
                />
              </div>

              <div className="space-y-2">
                <TooltipWrapper content="Son los gastos que varían directamente con el nivel de producción (materias primas, mano de obra directa, etc.)">
                  <Label htmlFor="costosVariables">Costos Variables ($)</Label>
                </TooltipWrapper>
                <Input
                  id="costosVariables"
                  type="number"
                  placeholder="Ej: 3000"
                  value={formData.costosVariables || ''}
                  onChange={(e) => handleInputChange('costosVariables', e.target.value)}
                  className="focus:border-red-600"
                />
              </div>

              <div className="space-y-2">
                <TooltipWrapper content="Número total de unidades que produces o planeas producir en el período">
                  <Label htmlFor="unidadesProducidas">Unidades Producidas</Label>
                </TooltipWrapper>
                <Input
                  id="unidadesProducidas"
                  type="number"
                  placeholder="Ej: 1000"
                  value={formData.unidadesProducidas || ''}
                  onChange={(e) => handleInputChange('unidadesProducidas', e.target.value)}
                  className="focus:border-red-600"
                />
              </div>

              <div className="space-y-2">
                <TooltipWrapper content="El precio al que actualmente vendes cada unidad de tu producto">
                  <Label htmlFor="precioVentaActual">Precio de Venta Actual ($)</Label>
                </TooltipWrapper>
                <Input
                  id="precioVentaActual"
                  type="number"
                  step="0.01"
                  placeholder="Ej: 12.50"
                  value={formData.precioVentaActual || ''}
                  onChange={(e) => handleInputChange('precioVentaActual', e.target.value)}
                  className="focus:border-red-600"
                />
              </div>

              <div className="space-y-2">
                <TooltipWrapper content="El porcentaje de ganancia que deseas obtener sobre el costo del producto">
                  <Label htmlFor="margenGananciaDeseado">Margen de Ganancia Deseado (%)</Label>
                </TooltipWrapper>
                <Input
                  id="margenGananciaDeseado"
                  type="number"
                  placeholder="Ej: 25"
                  value={formData.margenGananciaDeseado || ''}
                  onChange={(e) => handleInputChange('margenGananciaDeseado', e.target.value)}
                  className="focus:border-red-600"
                />
              </div>

              {results && (
                <div className="pt-4">
                  <Separator className="mb-4" />
                  <div className="flex gap-3">
                    <Button onClick={handleExportPDF} className="bg-red-600 hover:bg-red-700 flex-1">
                      <Download className="mr-2 h-4 w-4" />
                      Exportar PDF
                    </Button>
                    <Button onClick={handleExportExcel} variant="outline" className="border-red-600 text-red-600 hover:bg-red-50 flex-1">
                      <FileSpreadsheet className="mr-2 h-4 w-4" />
                      Exportar Excel
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Resultados */}
          <div className="space-y-6">
            {results ? (
              <>
                <ResultsTable results={results} formData={formData} />
                <ResultsChart results={results} formData={formData} />
              </>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <CalculatorIcon className="h-16 w-16 text-gray-300 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">Resultados aparecerán aquí</h3>
                  <p className="text-gray-500 text-center">
                    Completa los campos del formulario para ver los cálculos automáticos
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Information Cards */}
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-600 text-lg">💡 Punto de Equilibrio</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Es el número de unidades que necesitas vender para cubrir todos tus costos. 
                En este punto no hay ganancias ni pérdidas.
              </p>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-600 text-lg">📊 Margen de Contribución</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Es el dinero que queda después de cubrir los costos variables. 
                Este dinero ayuda a pagar los costos fijos y generar ganancias.
              </p>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-600 text-lg">💰 PVP Recomendado</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Es el precio sugerido basado en tus costos y el margen de ganancia que deseas obtener. 
                Te ayuda a fijar precios competitivos y rentables.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Calculator;