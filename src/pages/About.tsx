import { Users, Target, Heart, Mail, Phone, MapPin, BookOpen, Lightbulb, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

const About = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Acerca del <span className="text-red-600">Proyecto</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Conoce más sobre el semillero de investigación que desarrolló esta herramienta educativa
          </p>
        </div>

        {/* Universidad Section */}
        <section className="mb-16">
          <Card className="border-l-4 border-l-red-600">
            <CardHeader>
              <CardTitle className="text-2xl text-red-600 flex items-center">
                <BookOpen className="mr-3 h-7 w-7" />
                Universidad Técnica del Norte
              </CardTitle>
              <CardDescription className="text-lg">
                Institución comprometida con la educación y el desarrollo regional
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed text-lg">
                La Universidad Técnica del Norte se caracteriza por su compromiso con la excelencia académica 
                y la innovación educativa. A través de sus programas de investigación y desarrollo, busca 
                contribuir al crecimiento económico y social de la región norte del Ecuador, formando 
                profesionales competentes y promoviendo el emprendimiento.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Semillero Section */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-red-600 flex items-center">
                  <Users className="mr-3 h-7 w-7" />
                  Semillero de Investigación
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Nuestro semillero de investigación está conformado por el estudiante coordinador Juan Mendoza; los estudiantes investigadores Isabel Corrales, Christian Rosales y Fabio Picuasi además docentes apasionados 
                  por crear soluciones tecnológicas que respondan a las necesidades reales de la comunidad 
                  emprendedora y académica.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Badge variant="secondary" className="mr-2">Innovación</Badge>
                    <span className="text-gray-600">Desarrollo de herramientas educativas modernas</span>
                  </div>
                  <div className="flex items-center">
                    <Badge variant="secondary" className="mr-2">Colaboración</Badge>
                    <span className="text-gray-600">Trabajo interdisciplinario entre áreas</span>
                  </div>
                  <div className="flex items-center">
                    <Badge variant="secondary" className="mr-2">Impacto Social</Badge>
                    <span className="text-gray-600">Contribución al desarrollo empresarial</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-red-600 flex items-center">
                  <Target className="mr-3 h-7 w-7" />
                  Objetivos del Proyecto
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-red-100 rounded-full p-1 mr-3 mt-1">
                      <Lightbulb className="h-4 w-4 text-red-600" />
                    </div>
                    <span className="text-gray-700">
                      Facilitar el aprendizaje de conceptos financieros básicos
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-red-100 rounded-full p-1 mr-3 mt-1">
                      <TrendingUp className="h-4 w-4 text-red-600" />
                    </div>
                    <span className="text-gray-700">
                      Promover la toma de decisiones empresariales informadas
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-red-100 rounded-full p-1 mr-3 mt-1">
                      <Users className="h-4 w-4 text-red-600" />
                    </div>
                    <span className="text-gray-700">
                      Apoyar el desarrollo del emprendimiento local
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-red-100 rounded-full p-1 mr-3 mt-1">
                      <BookOpen className="h-4 w-4 text-red-600" />
                    </div>
                    <span className="text-gray-700">
                      Proporcionar herramientas didácticas para la educación
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Impact Section */}
        <section className="mb-16">
          <Card className="bg-red-50 border-red-200">
            <CardHeader>
              <CardTitle className="text-2xl text-red-600 flex items-center justify-center">
                <Heart className="mr-3 h-7 w-7" />
                Impacto Esperado en la Comunidad
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BookOpen className="h-8 w-8 text-red-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Educativo</h3>
                    <p className="text-gray-600">
                      Mejorar la comprensión de conceptos financieros en estudiantes y emprendedores
                    </p>
                  </div>
                </div>
                
                <div>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="h-8 w-8 text-red-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Económico</h3>
                    <p className="text-gray-600">
                      Fortalecer las capacidades empresariales de pequeños negocios y emprendimientos
                    </p>
                  </div>
                </div>
                
                <div>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="h-8 w-8 text-red-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Social</h3>
                    <p className="text-gray-600">
                      Democratizar el acceso a herramientas de análisis financiero profesional
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Contact Section */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-red-600 text-center">
                Información de Contacto
              </CardTitle>
              <CardDescription className="text-center text-lg">
                ¿Tienes preguntas o sugerencias? Nos encantaría escucharte
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="flex flex-col items-center">
                  <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                    <Mail className="h-6 w-6 text-red-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-1">Correo Electrónico</h4>
                  <p className="text-gray-600">jsmendozac@utn.edu.ec</p>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                    <Phone className="h-6 w-6 text-red-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-1">Teléfono</h4>
                  <p className="text-gray-600">+593 96 273 0610</p>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                    <MapPin className="h-6 w-6 text-red-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-1">Ubicación</h4>
                  <p className="text-gray-600">Av. 17 de Julio 5-21, Ibarra</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default About;