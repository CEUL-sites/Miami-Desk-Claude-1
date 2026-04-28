export type Locale = 'en' | 'es' | 'pt';

export interface Translation {
  nav: {
    sell: string;
    international: string;
    listings: string;
    intelligence: string;
    about: string;
    whatsapp: string;
  };
  hero: {
    label: string;
    title: {
      line1: string;
      line2: string;
      line3: string;
    };
    subtext: string;
    ctaList: string;
    ctaActivate: string;
    scroll: string;
    heroItalic?: string;
  };
  stats: {
    experience: string;
    members: string;
    volume: string;
  };
  buyerArgument: {
    stat: string;
    statPercent: string;
    statLabel: string;
    title1: string;
    title2: string;
    body: string;
    insight: string;
  };
  distribution: {
    label: string;
    title1: string;
    title2: string;
    sub: string;
    metrics: string[];
    portalsLabel: string;
  };
  paths: {
    seller: {
      label: string;
      title: string;
      cta: string;
    };
    agency: {
      label: string;
      title: string;
      cta: string;
    };
  };
  voice: {
    label: string;
    title: string;
    sub: string;
    agents: {
      [key: string]: {
        title: string;
        sub: string;
        desc: string;
      };
    };
    cta: string;
  };
  listings: {
    propertyTypes: {
      [key: string]: string;
    };
    locations: {
      [key: string]: string;
    };
    beds: string;
    baths: string;
    sqft: string;
    courtesy: string;
    details: string;
    secure: string;
    dossier: string;
    composition: string;
    dimension: string;
    assetClass: string;
    analysis: string;
    broker: string;
    initiate: string;
  };
  contact: {
    title: string;
    sub: string;
    name: string;
    email: string;
    message: string;
    submit: string;
    success: string;
    error: string;
  };
}

export const translations: Record<Locale, Translation> = {
  en: {
    nav: {
      sell: "Sell",
      international: "International",
      listings: "Listings",
      intelligence: "Intelligence",
      about: "About",
      whatsapp: "WhatsApp"
    },
    hero: {
      label: "CARLOS UZCATEGUI · FLORIDA LICENSED REALTOR® · EST. 2001",
      title: {
        line1: "Real Estate",
        line2: "is Local.",
        line3: "Peak Value Global"
      },
      heroItalic: "Peak Value",
      subtext: "The South Florida principal whose listings activate across 500 global portals, 19 languages, and 1,000,000+ professional agents — simultaneously.",
      ctaList: "List Your Property →",
      ctaActivate: "España · LATAM Desk →",
      scroll: "SCROLL"
    },
    stats: {
      experience: "YEARS EXP.",
      members: "REALTORS®",
      volume: "VOLUME"
    },
    buyerArgument: {
      stat: "87",
      statPercent: "%",
      statLabel: "NAR · BUYERS WHO CLOSE THROUGH A LICENSED AGENT.",
      title1: "Your buyer won't find you.",
      title2: "Their agent will.",
      body: "NAR data is consistent: in nearly nine of every ten residential transactions, the buyer arrives through a professional agent — not a portal, not a sign, not an ad. Their agent is searching the MLS right now, on behalf of a qualified client with capital ready to deploy. The question is not whether your home gets listed. It is whether it reaches every single one of those agents before your neighbor's home does.",
      insight: "When you list with Carlos, your property activates inside the largest local Realtor association in the world — 93,000 member agents, each with their own buyer pipeline. That is not marketing. That is mechanical exposure."
    },
    distribution: {
      label: "THE DISTRIBUTION ENGINE",
      title1: "Maximum syndication.",
      title2: "Maximum valuation.",
      sub: "From the moment your listing goes live, it propagates simultaneously across every major real estate marketplace on the planet — in the language of every serious buyer.",
      metrics: [
        "500+ Global portals",
        "19 Languages",
        "260+ U.S. MLSs",
        "437 Intl. agreements"
      ],
      portalsLabel: "Selected distribution portals"
    },
    paths: {
      seller: {
        label: "FOR SOUTH FLORIDA SELLERS & BUYERS",
        title: "Your property. Every buyer in the world.",
        cta: "List your property →"
      },
      agency: {
        label: "FOR ESPAÑA · LATAM AGENCIES",
        title: "Your inventory. The U.S. MLS. Our license.",
        cta: "Activate your listing →"
      }
    },
    voice: {
      label: "VOICE DESKS",
      title: "Speak directly with the desk you need.",
      sub: "Real-time voice conversations in Spanish, English, or Portuguese. Each desk is purpose-trained for a specific mandate.",
      agents: {
        concierge: { title: "Concierge", sub: "General Inquiries", desc: "For institutional questions about Carlos's practice." },
        listing: { title: "Listing Desk", sub: "Activate Property", desc: "Begin the intake for Spanish or LATAM inventory." },
        buyer: { title: "Buyer Desk", sub: "Brief a Mandate", desc: "Describe your South Florida target requirements." },
        referral: { title: "Referral Desk", sub: "B2B Partnership", desc: "Broker-to-broker referral and co-branding." }
      },
      cta: "Speak now →"
    },
    listings: {
      propertyTypes: {
        "Residential": "Residential",
        "Condo": "Luxury Condo",
        "Single Family": "Estate Home",
        "Land": "Development Land",
        "Commercial": "Commercial Asset"
      },
      locations: {
        "Miami": "Miami, FL",
        "Brickell": "Brickell Financial District",
        "Coral Gables": "Coral Gables",
        "Weston": "Weston, FL",
        "Sunny Isles Beach": "Sunny Isles",
        "Fort Lauderdale": "Ft. Lauderdale"
      },
      beds: "BD",
      baths: "BA",
      sqft: "SF",
      courtesy: "Ref",
      details: "Secure Portfolio",
      secure: "Secure Portfolio",
      dossier: "Institutional Dossier",
      composition: "Composition",
      dimension: "Dimension",
      assetClass: "Asset Class",
      analysis: "Location Analysis",
      broker: "Broker of Record",
      initiate: "Initiate Acquisition Mandate"
    },
    contact: {
      title: "Direct Mandate Office",
      sub: "Institutional inquiries and general mandates.",
      name: "Full Name",
      email: "Email Address",
      message: "Proposed Mandate / Message",
      submit: "Submit Request",
      success: "Request received. We will respond within 24 hours.",
      error: "Error submitting request. Please try again or use WhatsApp."
    }
  },
  es: {
    nav: {
      sell: "Vender",
      international: "Internacional",
      listings: "Propiedades",
      intelligence: "Inteligencia",
      about: "Sobre Carlos",
      whatsapp: "WhatsApp"
    },
    hero: {
      label: "CARLOS UZCATEGUI · REALTOR® LICENCIADO EN FLORIDA · EST. 2001",
      title: {
        line1: "Lo Inmobiliario",
        line2: "es Local.",
        line3: "Valor Máximo Global"
      },
      subtext: "El principal de Florida cuyas propiedades se activan en 500 portales globales, 19 idiomas y más de 1,000,000 de agentes profesionales — simultáneamente.",
      ctaList: "Venda Su Propiedad →",
      ctaActivate: "España · LATAM Desk →",
      scroll: "DESLIZAR"
    },
    stats: {
      experience: "AÑOS EXP.",
      members: "REALTORS®",
      volume: "VOLUMEN"
    },
    buyerArgument: {
      stat: "87",
      statPercent: "%",
      statLabel: "NAR · COMPRADORES QUE CIERRAN CON UN AGENTE LICENCIADO.",
      title1: "Su comprador no lo encontrará.",
      title2: "Su agente lo hará.",
      body: "Los datos de la NAR son consistentes: en casi nueve de cada diez transacciones residenciales, el comprador llega a través de un agente profesional, no por un portal, un cartel o un anuncio. Su agente está buscando en el MLS ahora mismo, en nombre de un cliente cualificado con capital listo para invertir. La pregunta no es si su casa aparece en la lista. Es si llega a cada uno de esos agentes antes que la casa de su vecino.",
      insight: "Al listar con Carlos, su propiedad se activa dentro de la asociación local de Realtors más grande del mundo: 93,000 agentes miembros, cada uno con su propia red de compradores. Eso no es marketing. Es exposición mecánica."
    },
    distribution: {
      label: "EL MOTOR DE DISTRIBUCIÓN",
      title1: "Sindicación máxima.",
      title2: "Valoración máxima.",
      sub: "Desde el momento en que su propiedad se publica, se propaga simultáneamente en todos los principales mercados inmobiliarios del planeta, en el idioma de cada comprador serio.",
      metrics: [
        "500+ Portales globales",
        "19 Idiomas",
        "260+ MLS en EE. UU.",
        "437 Acuerdos internacionales"
      ],
      portalsLabel: "Portales de distribución seleccionados"
    },
    paths: {
      seller: {
        label: "PARA VENDEDORES Y COMPRADORES EN FLORIDA",
        title: "Su propiedad. Cada comprador en el mundo.",
        cta: "Venda su propiedad →"
      },
      agency: {
        label: "PARA AGENCIAS DE ESPAÑA · LATAM",
        title: "Su inventario. El MLS de EE. UU. Nuestra licencia.",
        cta: "Active su propiedad →"
      }
    },
    voice: {
      label: "MESAS DE VOZ",
      title: "Hable directamente con la mesa que necesita.",
      sub: "Conversaciones de voz en tiempo real en español, inglés o portugués. Cada mesa está entrenada para un mandato específico.",
      agents: {
        concierge: { title: "Conserje", sub: "Consultas Generales", desc: "Para preguntas institucionales sobre la práctica de Carlos." },
        listing: { title: "Mesa de Listado", sub: "Activar Propiedad", desc: "Comience el ingreso de inventario español o de LATAM." },
        buyer: { title: "Mesa de Comprador", sub: "Briefing de Mandato", desc: "Describa sus requisitos de búsqueda en el sur de Florida." },
        referral: { title: "Mesa de Referidos", sub: "Asociación B2B", desc: "Referidos entre agentes y co-branding." }
      },
      cta: "Hablar ahora →"
    },
    listings: {
      propertyTypes: {
        "Residential": "Residencial",
        "Condo": "Condominio de Lujo",
        "Single Family": "Residencia Única",
        "Land": "Terreno de Inversión",
        "Commercial": "Activo Comercial"
      },
      locations: {
        "Miami": "Miami, FL",
        "Brickell": "Distrito de Brickell",
        "Coral Gables": "Coral Gables",
        "Weston": "Weston, FL",
        "Sunny Isles Beach": "Sunny Isles",
        "Fort Lauderdale": "Ft. Lauderdale"
      },
      beds: "DORM",
      baths: "BAÑOS",
      sqft: "PIES²",
      courtesy: "Ref",
      details: "Asegurar Cartera",
      secure: "Asegurar Cartera",
      dossier: "Dossier Institucional",
      composition: "Composición",
      dimension: "Dimensión",
      assetClass: "Clase de Activo",
      analysis: "Análisis de Ubicación",
      broker: "Agente de Registro",
      initiate: "Iniciar Mandato de Adquisición"
    },
    contact: {
      title: "Oficina de Mandato Directo",
      sub: "Consultas institucionales y mandatos generales.",
      name: "Nombre Completo",
      email: "Correo Electrónico",
      message: "Mandato Propuesto / Mensaje",
      submit: "Enviar Solicitud",
      success: "Solicitud recibida. Responderemos en 24 horas.",
      error: "Error al enviar la solicitud. Intente de nuevo o use WhatsApp."
    }
  },
  pt: {
    nav: {
      sell: "Vender",
      international: "Internacional",
      listings: "Imóveis",
      intelligence: "Inteligência",
      about: "Sobre Carlos",
      whatsapp: "WhatsApp"
    },
    hero: {
      label: "CARLOS UZCATEGUI · REALTOR® LICENCIADO NA FLORIDA · EST. 2001",
      title: {
        line1: "O Mercado Imobiliário",
        line2: "é Local.",
        line3: "Valor Máximo Global",
      },
      subtext: "O principal da Flórida cujas propriedades são ativadas em 500 portais globais, 19 idiomas e mais de 1.000.000 de agentes profissionais — simultaneamente.",
      ctaList: "Venda Sua Propriedade →",
      ctaActivate: "Espanha · LATAM Desk →",
      scroll: "ROLAR"
    },
    stats: {
      experience: "ANOS EXP.",
      members: "REALTORS®",
      volume: "VOLUME"
    },
    buyerArgument: {
      stat: "87",
      statPercent: "%",
      statLabel: "NAR · COMPRADORES QUE FECHAM COM UM AGENTE LICENCIADO.",
      title1: "Seu comprador não o encontrará.",
      title2: "O agente dele o encontrará.",
      body: "Os dados da NAR são consistentes: em quase nove de cada dez transações residenciais, o comprador chega através de um agente profissional — não por um portal, placa ou anúncio. O agente dele está pesquisando no MLS agora mesmo, em nome de um cliente qualificado com capital pronto para investir. A questão não é se sua casa será listada. É se ela alcançará cada um desses agentes antes da casa do seu vizinho.",
      insight: "Ao listar com Carlos, seu imóvel é ativado dentro da maior associação local de Realtors do mundo — 93.000 agentes membros, cada um com sua própria rede de compradores. Isso não é marketing. É exposição mecânica."
    },
    distribution: {
      label: "MOTOR DE DISTRIBUIÇÃO",
      title1: "Sindicação máxima.",
      title2: "Valorização máxima.",
      sub: "A partir do momento em que seu imóvel é publicado, ele se propaga simultaneamente em todos os principais mercados imobiliários do planeta — no idioma de cada comprador sério.",
      metrics: [
        "500+ Portais globais",
        "19 Idiomas",
        "260+ MLS nos EUA",
        "437 Acordos internacionais"
      ],
      portalsLabel: "Portais de distribuição selecionados"
    },
    paths: {
      seller: {
        label: "PARA VENDEDORES E COMPRADORES NA FLÓRIDA",
        title: "Seu imóvel. Cada comprador no mundo.",
        cta: "Venda seu imóvel →"
      },
      agency: {
        label: "PARA AGÊNCIAS DE ESPANHA · LATAM",
        title: "Seu inventário. O MLS dos EUA. Nossa licença.",
        cta: "Ative seu imóvel →"
      }
    },
    voice: {
      label: "MESAS DE VOZ",
      title: "Fale diretamente com a mesa que você precisa.",
      sub: "Conversas de voz em tempo real em espanhol, inglês ou português. Cada mesa é treinada para um mandato específico.",
      agents: {
        concierge: { title: "Concierge", sub: "Consultas Gerais", desc: "Para perguntas institucionais sobre a prática de Carlos." },
        listing: { title: "Mesa de Listagem", sub: "Ativar Propriedade", desc: "Inicie o cadastro de inventário da Espanha ou LATAM." },
        buyer: { title: "Mesa de Comprador", sub: "Briefing de Mandato", desc: "Descreva seus requisitos de busca no sul da Flórida." },
        referral: { title: "Mesa de Referências", sub: "Parceria B2B", desc: "Encaminhamento entre corretores e co-branding." }
      },
      cta: "Falar agora →"
    },
    listings: {
      propertyTypes: {
        "Residential": "Residencial",
        "Condo": "Condomínio de Luxo",
        "Single Family": "Mansão Única",
        "Land": "Terreno de Investimento",
        "Commercial": "Ativo Comercial"
      },
      locations: {
        "Miami": "Miami, FL",
        "Brickell": "Distrito de Brickell",
        "Coral Gables": "Coral Gables",
        "Weston": "Weston, FL",
        "Sunny Isles Beach": "Sunny Isles",
        "Fort Lauderdale": "Ft. Lauderdale"
      },
      beds: "QUARTOS",
      baths: "BANHEIROS",
      sqft: "PÉS²",
      courtesy: "Ref",
      details: "Garantir Portfólio",
      secure: "Garantir Portfólio",
      dossier: "Dossiê Institucional",
      composition: "Composição",
      dimension: "Dimensão",
      assetClass: "Classe de Ativo",
      analysis: "Análise de Localização",
      broker: "Corretor de Registro",
      initiate: "Iniciar Mandato de Aquisição"
    },
    contact: {
      title: "Escritório de Mandato Direto",
      sub: "Consultas institucionais e mandatos gerais.",
      name: "Nome Completo",
      email: "E-mail",
      message: "Mandato Proposto / Mensagem",
      submit: "Enviar Solicitação",
      success: "Solicitação recebida. Responderemos em 24 horas.",
      error: "Erro ao enviar solicitação. Tente novamente ou use o WhatsApp."
    }
  }
};
