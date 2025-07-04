import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

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

export const exportToPDF = (formData: FinancialData, results: CalculatedResults) => {
  const doc = new jsPDF();
  
  // Configuración de colores UTN
  const redColor: [number, number, number] = [220, 38, 38]; // RGB for red-600
  const blackColor: [number, number, number] = [0, 0, 0];
  
  // Header
  doc.setFontSize(20);
  doc.setTextColor(...redColor);
  doc.text('Costo Fácil - Análisis Financiero', 20, 25);
  
  doc.setFontSize(12);
  doc.setTextColor(...blackColor);
  doc.text('Universidad Técnica del Norte', 20, 35);
  doc.text(`Fecha: ${new Date().toLocaleDateString('es-ES')}`, 20, 45);
  
  // Datos de entrada
  doc.setFontSize(16);
  doc.setTextColor(...redColor);
  doc.text('Datos de Entrada', 20, 65);
  
  doc.setFontSize(12);
  doc.setTextColor(...blackColor);
  const inputData = [
    `Costos Fijos: $${formData.costosFijos.toFixed(2)}`,
    `Costos Variables: $${formData.costosVariables.toFixed(2)}`,
    `Unidades Producidas: ${formData.unidadesProducidas}`,
    `Precio de Venta Actual: $${formData.precioVentaActual.toFixed(2)}`,
    `Margen de Ganancia Deseado: ${formData.margenGananciaDeseado}%`
  ];
  
  inputData.forEach((item, index) => {
    doc.text(item, 25, 80 + (index * 8));
  });
  
  // Resultados calculados
  doc.setFontSize(16);
  doc.setTextColor(...redColor);
  doc.text('Resultados del Análisis', 20, 135);
  
  doc.setFontSize(12);
  doc.setTextColor(...blackColor);
  const resultsData = [
    `Costo Total: $${results.costoTotal.toFixed(2)}`,
    `Costo Unitario: $${results.costoUnitario.toFixed(2)}`,
    `Punto de Equilibrio: ${results.puntoEquilibrioUnidades.toFixed(0)} unidades`,
    `Punto de Equilibrio (Monetario): $${results.puntoEquilibrioMonetario.toFixed(2)}`,
    `Margen de Contribución: $${results.margenContribucion.toFixed(2)}`,
    `Gastos Operativos: ${results.porcentajeGastosOperativos.toFixed(1)}%`,
    `PVP Recomendado: $${results.pvpRecomendado.toFixed(2)}`,
    `Nuevo Punto de Equilibrio: ${results.nuevoPuntoEquilibrio.toFixed(0)} unidades`
  ];
  
  resultsData.forEach((item, index) => {
    doc.text(item, 25, 150 + (index * 8));
  });
  
  // Análisis de rentabilidad
  doc.setFontSize(16);
  doc.setTextColor(...redColor);
  doc.text('Análisis de Rentabilidad', 20, 235);
  
  doc.setFontSize(12);
  doc.setTextColor(...blackColor);
  const ingresoActual = formData.unidadesProducidas * formData.precioVentaActual;
  const gananciaActual = ingresoActual - results.costoTotal;
  const ingresoRecomendado = formData.unidadesProducidas * results.pvpRecomendado;
  const gananciaRecomendada = ingresoRecomendado - results.costoTotal;
  
  const profitabilityData = [
    `Ingresos con precio actual: $${ingresoActual.toFixed(2)}`,
    `Ganancia actual: $${gananciaActual.toFixed(2)}`,
    `Ingresos con PVP recomendado: $${ingresoRecomendado.toFixed(2)}`,
    `Ganancia con PVP recomendado: $${gananciaRecomendada.toFixed(2)}`
  ];
  
  profitabilityData.forEach((item, index) => {
    doc.text(item, 25, 250 + (index * 8));
  });
  
  // Footer
  doc.setFontSize(10);
  doc.setTextColor(128, 128, 128);
  doc.text('Generado por Costo Fácil - Universidad Técnica del Norte', 20, 290);
  
  // Descargar
  doc.save('analisis-financiero-costo-facil.pdf');
};

export const exportToExcel = (formData: FinancialData, results: CalculatedResults) => {
  // Crear un nuevo workbook
  const wb = XLSX.utils.book_new();
  
  // Datos de entrada
  const inputData = [
    ['COSTO FÁCIL - ANÁLISIS FINANCIERO'],
    ['Universidad Técnica del Norte'],
    [`Fecha: ${new Date().toLocaleDateString('es-ES')}`],
    [''],
    ['DATOS DE ENTRADA'],
    ['Concepto', 'Valor'],
    ['Costos Fijos', formData.costosFijos],
    ['Costos Variables', formData.costosVariables],
    ['Unidades Producidas', formData.unidadesProducidas],
    ['Precio de Venta Actual', formData.precioVentaActual],
    ['Margen de Ganancia Deseado (%)', formData.margenGananciaDeseado],
    [''],
    ['RESULTADOS CALCULADOS'],
    ['Indicador', 'Valor'],
    ['Costo Total', results.costoTotal],
    ['Costo Unitario', results.costoUnitario],
    ['Punto de Equilibrio (Unidades)', results.puntoEquilibrioUnidades],
    ['Punto de Equilibrio (Monetario)', results.puntoEquilibrioMonetario],
    ['Margen de Contribución', results.margenContribucion],
    ['Gastos Operativos (%)', results.porcentajeGastosOperativos],
    ['PVP Recomendado', results.pvpRecomendado],
    ['Nuevo Punto de Equilibrio', results.nuevoPuntoEquilibrio],
    [''],
    ['ANÁLISIS DE RENTABILIDAD'],
    ['Concepto', 'Valor'],
    ['Ingresos con precio actual', formData.unidadesProducidas * formData.precioVentaActual],
    ['Ganancia actual', formData.unidadesProducidas * formData.precioVentaActual - results.costoTotal],
    ['Ingresos con PVP recomendado', formData.unidadesProducidas * results.pvpRecomendado],
    ['Ganancia con PVP recomendado', formData.unidadesProducidas * results.pvpRecomendado - results.costoTotal]
  ];
  
  // Crear hoja de cálculo
  const ws = XLSX.utils.aoa_to_sheet(inputData);
  
  // Configurar ancho de columnas
  ws['!cols'] = [
    { wch: 35 }, // Columna A (conceptos)
    { wch: 20 }  // Columna B (valores)
  ];
  
  // Agregar la hoja al workbook
  XLSX.utils.book_append_sheet(wb, ws, 'Análisis Financiero');
  
  // Crear hoja de comparación
  const comparisonData = [
    ['COMPARACIÓN DE ESCENARIOS'],
    [''],
    ['Escenario', 'Precio Unitario', 'Ingresos Totales', 'Ganancia', 'Margen (%)'],
    [
      'Actual',
      formData.precioVentaActual,
      formData.unidadesProducidas * formData.precioVentaActual,
      formData.unidadesProducidas * formData.precioVentaActual - results.costoTotal,
      ((formData.precioVentaActual - results.costoUnitario) / formData.precioVentaActual * 100)
    ],
    [
      'Recomendado',
      results.pvpRecomendado,
      formData.unidadesProducidas * results.pvpRecomendado,
      formData.unidadesProducidas * results.pvpRecomendado - results.costoTotal,
      formData.margenGananciaDeseado
    ]
  ];
  
  const wsComparison = XLSX.utils.aoa_to_sheet(comparisonData);
  wsComparison['!cols'] = [
    { wch: 15 },
    { wch: 15 },
    { wch: 15 },
    { wch: 15 },
    { wch: 15 }
  ];
  
  XLSX.utils.book_append_sheet(wb, wsComparison, 'Comparación');
  
  // Descargar
  XLSX.writeFile(wb, 'analisis-financiero-costo-facil.xlsx');
};