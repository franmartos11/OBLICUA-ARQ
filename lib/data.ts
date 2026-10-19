import { ACCENT } from './config';
import { ART, type Art } from './art';

export type PlanLayer = { n: string; name: string; d: string; sw: number; dash: string; color: string; w: string; cls: string };

export const LAYERS: PlanLayer[] = [
  { n: '01', name: 'EJES', d: '0.2s', sw: 0.8, dash: '9 2 1 2', color: '#6B6A66', w: 'FINA', cls: '' },
  { n: '02', name: 'ESTRUCTURA', d: '1s', sw: 4, dash: '', color: '#F2F1EC', w: 'LLENO', cls: 'dr' },
  { n: '03', name: 'MUROS CORTADOS', d: '1.8s', sw: 2.2, dash: '', color: '#F2F1EC', w: 'GRUESA', cls: 'dr' },
  { n: '04', name: 'ABERTURAS', d: '2.8s', sw: 1.1, dash: '', color: '#F2F1EC', w: 'MEDIA', cls: 'dr' },
  { n: '05', name: 'EQUIPAMIENTO', d: '3.6s', sw: 0.8, dash: '', color: '#A3A29C', w: 'FINA', cls: 'dr' },
  { n: '06', name: 'COTAS Y RÓTULOS', d: '4.4s', sw: 0.7, dash: '', color: '#A3A29C', w: 'FINA', cls: 'dr' },
  { n: '07', name: 'LÍNEA DE CORTE', d: '5.8s', sw: 1.4, dash: '6 2 1 2', color: ACCENT, w: 'A–A', cls: '' },
];

export type Service = { n: string; title: string; text: string; items: string[] };

export const SERVICES: Service[] = [
  { n: '01', title: 'Arquitectura residencial', text: 'Casas y edificios de vivienda pensados desde el terreno, la orientación y la manera de vivir de cada cliente.', items: ['Anteproyecto', 'Proyecto ejecutivo', 'Dirección de obra'] },
  { n: '02', title: 'Interiorismo', text: 'Interiores, mobiliario a medida e iluminación resueltos con la misma precisión que la obra gruesa.', items: ['Diseño de interiores', 'Mobiliario a medida', 'Selección de materiales'] },
  { n: '03', title: 'Ingeniería', text: 'Cálculo estructural e instalaciones resueltos dentro del estudio y coordinados con la arquitectura desde el primer croquis.', items: ['Cálculo estructural', 'Instalaciones sanitarias, eléctricas y termomecánicas', 'Inspección de obra'] },
  { n: '04', title: 'Rehabilitación', text: 'Diagnóstico y reciclaje de edificios existentes: conservamos lo que tiene valor y actualizamos lo que no funciona.', items: ['Relevamiento con dron', 'Inspección técnica de fachadas', 'Cambio de uso y puesta en valor'] },
];

export type Project = { n: string; name: string; type: string; desc: string; loc: string; year: string; area: string; status: string; art: Art };

const PDATA = [
  { n: '01', name: 'Vivienda en pendiente', type: 'RESIDENCIAL', desc: 'Tres niveles que siguen la caída del terreno; cada planta se abre a una vista distinta.' },
  { n: '02', name: 'Pabellón junto al río', type: 'CULTURAL', desc: 'Una cubierta liviana sobre pilotes que deja pasar la crecida y a la gente.' },
  { n: '03', name: 'Edificio entre medianeras', type: 'VIVIENDA COLECTIVA', desc: 'Departamentos en un lote angosto, organizados alrededor de un patio de luz.' },
  { n: '04', name: 'Casa patio', type: 'RESIDENCIAL', desc: 'Todos los ambientes giran alrededor de un patio que ventila, ilumina y ordena la casa.' },
  { n: '05', name: 'Reciclaje de nave industrial', type: 'REHABILITACIÓN', desc: 'Una nave en desuso convertida en oficinas, conservando su estructura de hierro.' },
];

const PMETA = [
  { loc: 'VILLA LA ANGOSTURA, NEUQUÉN', year: '2024', area: '312 m²', status: 'CONSTRUIDO' },
  { loc: 'TIGRE, BUENOS AIRES', year: '2023', area: '540 m²', status: 'CONSTRUIDO' },
  { loc: 'VILLA CRESPO, CABA', year: '2025', area: '1.860 m²', status: 'EN OBRA' },
  { loc: 'PILAR, BUENOS AIRES', year: '2022', area: '245 m²', status: 'CONSTRUIDO' },
  { loc: 'BARRACAS, CABA', year: '2026', area: '1.120 m²', status: 'EN PROYECTO' },
];

export const PROJECTS: Project[] = PDATA.map((p, i) => ({ ...p, ...PMETA[i], art: ART[p.n] }));

export type Step = { n: string; tag: string; title: string; text: string; del: string };

export const STEPS: Step[] = [
  { n: '01', tag: 'VISTA', title: 'Observar', text: 'Relevamos el terreno, el asoleamiento, el programa y la normativa antes de trazar una sola línea.', del: 'Relevamiento y programa de necesidades' },
  { n: '02', tag: 'CORTE', title: 'Proponer', text: 'Croquis, maquetas y modelos 3D para comparar alternativas y elegir juntos el partido.', del: 'Anteproyecto con plantas, cortes y estimación de costo' },
  { n: '03', tag: 'COTAS', title: 'Precisar', text: 'Planos ejecutivos, detalles y cómputos para pedir presupuestos comparables y construir sin sorpresas.', del: 'Proyecto ejecutivo, pliego y cómputo' },
  { n: '04', tag: 'OBRA', title: 'Acompañar', text: 'Dirección de obra con visitas periódicas y control de calidad hasta la entrega de llaves.', del: 'Actas de obra y entrega final' },
];

export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  { q: '¿Cómo empezamos?', a: 'Con una primera reunión sin costo para conocer el terreno, el programa y el presupuesto. En una semana te enviamos una propuesta de honorarios por etapas, con plazos y entregables.' },
  { q: '¿Cómo se calculan los honorarios?', a: 'Por etapa (anteproyecto, proyecto ejecutivo y dirección de obra) o como un porcentaje del costo de obra, tomando como referencia los aranceles del CPAU. Siempre recibís una propuesta cerrada antes de empezar.' },
  { q: '¿Cuánto tarda un proyecto?', a: 'Depende de la escala. Una vivienda unifamiliar suele llevar entre 4 y 6 meses de proyecto y entre 10 y 14 de obra; lo fijamos juntos en el cronograma de la propuesta.' },
  { q: '¿Se encargan de los permisos?', a: 'Sí. Preparamos los planos de permiso y el cálculo estructural, y gestionamos la presentación ante la DGROC en CABA o ante el municipio que corresponda.' },
  { q: '¿Trabajan fuera de Buenos Aires?', a: 'Sí, en todo el país. Para obras a distancia combinamos visitas programadas, seguimiento semanal por videollamada e inspecciones con dron.' },
];
