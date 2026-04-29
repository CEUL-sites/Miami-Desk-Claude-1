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
  valuation: {
    eyebrow: string;
    title: string;
    sub: string;
    steps: string[];
    labels: {
      address: string;
      city: string;
      zip: string;
      beds: string;
      baths: string;
      sqft: string;
      type: string;
      year: string;
      name: string;
      email: string;
      phone: string;
      timeline: string;
      notes: string;
    };
    submit: string;
    success: string;
  };
  buyerMath: {
    eyebrow: string;
    stat: string;
    statLabel: string;
    title: string;
    body: string;
    quote: string;
  };
  sellingProcess: {
    eyebrow: string;
    title: string;
    steps: {
      title: string;
      desc: string;
    }[];
    cta: string;
  };
  testimonials: {
    eyebrow: string;
    placeholder: string;
  };
  international: {
    eyebrow: string;
    title: string;
    body: string;
    cta: string;
  };
  stats: {
    experience: string;
    members: string;
    volume: string;
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
    compliance: string;
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
      label: "CARLOS UZCATEGUI · FLORIDA REALTOR® SINCE 2001 · CLHMS",
      title: {
        line1: "Selling South Florida.",
        line2: "Reaching the world.",
        line3: "Twenty-five years. One desk."
      },
      heroItalic: "Twenty-five years.",
      subtext: "When you list with Carlos, your home enters the largest local Realtor network on earth — 93,000 member agents, 500 global portals, 19 languages.",
      ctaList: "Get my home's value →",
      ctaActivate: "Browse South Florida →",
      scroll: "SCROLL"
    },
    valuation: {
      eyebrow: "INSTANT VALUATION — NO OBLIGATION",
      title: "What is your South Florida home worth in this market?",
      sub: "Carlos returns a personal, data-backed valuation within one business day — drawing on 25 years of South Florida transactions and the live MLS. Not a Zestimate. A Realtor's opinion of value.",
      steps: ["Property Address", "Property Details", "Contact Information"],
      labels: {
        address: "Street Address",
        city: "City",
        zip: "ZIP Code",
        beds: "Bedrooms",
        baths: "Bathrooms",
        sqft: "Approx. Area (SQFT)",
        type: "Property Type",
        year: "Year Built",
        name: "Full Name",
        email: "Email Address",
        phone: "Phone Number",
        timeline: "Listing Timeline",
        notes: "Additional Notes (optional)"
      },
      submit: "Request my valuation →",
      success: "Received. Carlos will personally review your property and respond within one business day from his Weston office."
    },
    buyerMath: {
      eyebrow: "THE BUYER MATH",
      stat: "87%",
      statLabel: "NAR · BUYERS WHO PURCHASE THROUGH A LICENSED AGENT",
      title: "Your buyer is not browsing. Their agent is searching the MLS.",
      body: "Nine of every ten residential transactions close through a buyer's agent — not a portal, not a sign, not a Sunday open house. Their agent is in the MLS right now, on behalf of a qualified, capital-ready client.",
      quote: "List with Carlos and your home activates inside the largest local Realtor association on earth: 93,000 member agents, each with their own pipeline of buyers. That is not marketing. That is mechanical exposure."
    },
    sellingProcess: {
      eyebrow: "THE METHOD",
      title: "How Carlos sells your home",
      steps: [
        { title: "Pre-list valuation", desc: "A walk-through, comparables analysis, and an honest opinion of value — before any commitment." },
        { title: "Preparation & staging direction", desc: "Identify the three to five interventions that demonstrably move price. Coordinate vendors." },
        { title: "Photography & narrative", desc: "Professional photography, drone where applicable, and a listing narrative written for the buyer's agent." },
        { title: "MLS activation & syndication", desc: "Listing goes live on the Miami and South Florida REALTORS® MLS, syndicating to 500+ portals in 19 languages within 24 hours." },
        { title: "Negotiation & close", desc: "Direct, non-delegated representation through inspection, appraisal, financing contingencies, and the closing table." }
      ],
      cta: "Begin the conversation →"
    },
    testimonials: {
      eyebrow: "TWENTY-FIVE YEARS, ONE STANDARD",
      placeholder: "Client references available on request — contact@carlosre.com."
    },
    international: {
      eyebrow: "INTERNATIONAL ACTIVATION BRIDGE",
      title: "Spanish and Latin American agencies: Your inventory. The U.S. MLS. My license.",
      body: "Carlos is the U.S. licensee of record activating European and Latin American luxury inventory into the Miami and South Florida REALTORS® MLS. If you represent a Spanish, PT, or LATAM agency seeking access to the U.S. buyer market, this is the channel.",
      cta: "Open a B2B conversation →"
    },
    stats: {
      experience: "YEARS LICENSED",
      members: "AGENT NETWORK",
      volume: "2025 VOLUME"
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
      initiate: "Initiate Acquisition Mandate",
      compliance: "Listing information is provided in part by the Internet Data Exchange (IDX) program of Miami and South Florida REALTORS®. Information is deemed reliable but is not guaranteed and should be independently verified. The data relating to real estate for sale on this website comes in part from the Miami MLS. Properties displayed may be listed by brokerages other than United Realty Group."
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
      label: "CARLOS UZCATEGUI · REALTOR® LICENCIADO EN FLORIDA DESDE 2001 · CLHMS",
      title: {
        line1: "Vendiendo Florida.",
        line2: "Llegando al mundo.",
        line3: "Veinticinco años. Un escritorio."
      },
      subtext: "Al listar con Carlos, su propiedad entra en la red local de Realtors más grande del mundo: 93,000 agentes miembros, 500 portales globales, 19 idiomas.",
      ctaList: "Valoración de su casa →",
      ctaActivate: "Explorar Florida →",
      scroll: "SCROLL"
    },
    valuation: {
      eyebrow: "VALORACIÓN INSTANTÁNEA — SIN COMPROMISO",
      title: "¿Cuánto vale su propiedad en Florida en este mercado?",
      sub: "Carlos entrega una valoración personal basada en datos en un día hábil, utilizando 25 años de experiencia y el MLS en vivo. Una opinión experta de Realtor.",
      steps: ["Dirección", "Detalles", "Contacto"],
      labels: {
        address: "Dirección",
        city: "Ciudad",
        zip: "Código Postal",
        beds: "Dormitorios",
        baths: "Baños",
        sqft: "Área Aprox. (Pies²)",
        type: "Tipo de Propiedad",
        year: "Año de Constr.",
        name: "Nombre Completo",
        email: "Correo Electrónico",
        phone: "Teléfono",
        timeline: "Plazo de Venta",
        notes: "Notas Adicionales"
      },
      submit: "Solicitar mi valoración →",
      success: "Recibido. Carlos revisará personalmente su propiedad y responderá en un día hábil desde su oficina en Weston."
    },
    buyerMath: {
      eyebrow: "EL CÁLCULO DEL COMPRADOR",
      stat: "87%",
      statLabel: "NAR · COMPRADORES QUE CIERRAN CON UN AGENTE LICENCIADO",
      title: "Su comprador no está navegando. Su agente está buscando en el MLS.",
      body: "Nueve de cada diez transacciones residenciales cierran a través de un agente del comprador. Su agente está en el MLS ahora mismo, en nombre de un cliente cualificado listo para invertir.",
      quote: "Liste con Carlos y su propiedad se activa en la asociación de Realtors más grande del mundo: 93,000 agentes, cada uno con su propia red de compradores."
    },
    sellingProcess: {
      eyebrow: "EL MÉTODO",
      title: "Cómo Carlos vende su propiedad",
      steps: [
        { title: "Valoración pre-listado", desc: "Análisis de comparables y una opinión honesta del valor antes de cualquier compromiso." },
        { title: "Preparación y puesta en escena", desc: "Identificar las intervenciones que realmente mueven el precio. Coordinación de proveedores." },
        { title: "Fotografía y narrativa", desc: "Fotografía profesional, drone y una narrativa escrita para los agentes de los compradores." },
        { title: "Activación MLS y sindicación", desc: "La propiedad entra al MLS de Miami y se sindica a 500+ portales en 19 idiomas en 24 horas." },
        { title: "Negociación y cierre", desc: "Representación directa y no delegada durante la inspección, tasación y hasta la mesa de cierre." }
      ],
      cta: "Iniciar conversación →"
    },
    testimonials: {
      eyebrow: "VEINTICINCO AÑOS, UN ESTÁNDAR",
      placeholder: "Referencias disponibles bajo petición — contact@carlosre.com."
    },
    international: {
      eyebrow: "PUENTE DE ACTIVACIÓN INTERNACIONAL",
      title: "Agencias españolas y latinas: Su inventario. El MLS de EE. UU. Mi licencia.",
      body: "Carlos es el licenciatario en EE. UU. que activa el inventario de lujo europeo y latino al MLS de Miami. Si representa a una agencia buscando acceso al mercado de EE. UU., este es el canal.",
      cta: "Abrir conversación B2B →"
    },
    stats: {
      experience: "AÑOS LICENCIADO",
      members: "RED DE AGENTES",
      volume: "VOLUMEN 2025"
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
      label: "VOICE DESKS",
      title: "Speak directly with the desk you need.",
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
      initiate: "Iniciar Mandato de Adquisición",
      compliance: "La información de los listados es proporcionada en parte por el programa Internet Data Exchange (IDX) de Miami y South Florida REALTORS®. La información se considera confiable pero no está garantizada. Los datos sobre bienes raíces vienen en parte del Miami MLS. Las propiedades pueden estar listadas por otras agencias diferentes a United Realty Group."
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
      label: "CARLOS UZCATEGUI · REALTOR® LICENCIADO NA FLORIDA DESDE 2001 · CLHMS",
      title: {
        line1: "Vendendo a Flórida.",
        line2: "Alcançando o mundo.",
        line3: "Vinte e cinco anos. Uma mesa."
      },
      heroItalic: "Vinte e cinco anos.",
      subtext: "Ao listar com o Carlos, seu imóvel entra na maior rede de Realtors do mundo: 93.000 agentes membros, 500 portais globais, 19 idiomas.",
      ctaList: "Valor do seu imóvel →",
      ctaActivate: "Conheça a Flórida →",
      scroll: "SCROLL"
    },
    valuation: {
      eyebrow: "AVALIAÇÃO INSTANTÂNEA — SEM COMPROMISSO",
      title: "Quanto vale seu imóvel na Flórida hoje?",
      sub: "Carlos entrega uma avaliação pessoal baseada em dados em um dia útil. Uma opinião de especialista com 25 anos de mercado.",
      steps: ["Endereço", "Detalhes", "Contato"],
      labels: {
        address: "Endereço",
        city: "Cidade",
        zip: "CEP",
        beds: "Quartos",
        baths: "Banheiros",
        sqft: "Área (Pés²)",
        type: "Tipo de Imóvel",
        year: "Ano de Constr.",
        name: "Nome Completo",
        email: "E-mail",
        phone: "Telefone",
        timeline: "Prazo para Venda",
        notes: "Notas Adicionais"
      },
      submit: "Solicitar avaliação →",
      success: "Recebido. Carlos revisará pessoalmente seu imóvel e responderá em um dia útil do seu escritório em Weston."
    },
    buyerMath: {
      eyebrow: "A LÓGICA DO COMPRADOR",
      stat: "87%",
      statLabel: "NAR · COMPRADORES QUE FECHAM COM UM AGENTE LICENCIADO",
      title: "Seu comprador não está navegando. O agente dele está no MLS.",
      body: "Nove em cada dez transações residenciais fecham através de um agente de comprador. O agente dele está no MLS agora mesmo, em nome de um cliente qualificado.",
      quote: "Liste com o Carlos e seu imóvel é ativado na maior associação de Realtors do mundo: 93.000 agentes membros."
    },
    sellingProcess: {
      eyebrow: "O MÉTODO",
      title: "Como o Carlos vende seu imóvel",
      steps: [
        { title: "Avaliação pré-listagem", desc: "Análise de comparables e uma opinião honesta do valor antes de qualquer compromisso." },
        { title: "Preparação e staging", desc: "Identificar intervenções que aumentam o preço final. Coordenação de prestadores." },
        { title: "Fotografia e narrativa", desc: "Fotos profissionais, drone e uma descrição escrita para os agentes dos compradores." },
        { title: "Ativação MLS e sindicação", desc: "O imóvel entra no MLS de Miami e é enviado para 500+ portais em 19 idiomas em 24h." },
        { title: "Negociação e fechamento", desc: "Representação direta na inspeção, avaliação e até a mesa de fechamento." }
      ],
      cta: "Iniciar conversa →"
    },
    testimonials: {
      eyebrow: "VINTE E CINCO ANOS, UM PADRÃO",
      placeholder: "Referências disponíveis sob demanda — contact@carlosre.com."
    },
    international: {
      eyebrow: "PONTE DE ATIVAÇÃO INTERNACIONAL",
      title: "Agências espanholas e latinas: Seu inventario. O MLS dos EUA. Minha licença.",
      body: "Carlos é o licenciado nos EUA que ativa o inventário de luxo da Europa e América Latina no MLS de Miami. Se você representa uma agência buscando o mercado americano, este es o canal.",
      cta: "Abrir conversa B2B →"
    },
    stats: {
      experience: "ANOS LICENCIADO",
      members: "RED DE AGENTES",
      volume: "VOLUME 2025"
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
      label: "VOICE DESKS",
      title: "Speak directly with the desk you need.",
      sub: "Conversas de voz em tempo real em espanhol, inglês ou português. Cada mesa está treinada para um mandato específico.",
      agents: {
        concierge: { title: "Concierge", sub: "General Inquiries", desc: "Para perguntas institucionais sobre a prática de Carlos." },
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
      broker: "Agente de Registro",
      initiate: "Iniciar Mandato de Aquisição",
      compliance: "As informações são fornecidas em parte pelo programa Internet Data Exchange (IDX) do Miami e South Florida REALTORS®. As informações são consideradas confiáveis, mas não garantidas. Os dados de imóveis à venda vêm em parte do Miami MLS. Propriedades podem ser listadas por empresas que não a United Realty Group."
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
