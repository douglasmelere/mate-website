export type Locale = "pt" | "en" | "es";

export type Dict = {
  nav: {
    product: string;
    copilotoLabel: string; copilotoDesc: string;
    editorLabel: string; editorDesc: string;
    integrationsLabel: string; integrationsDesc: string;
    howItWorks: string;
    useCases: string;
    pricing: string;
    docs: string;
    cta: string;
    menuOpen: string;
  };

  hero: {
    badge: string;
    headline: string;
    phrases: string[];
    sub: string;
    subHighlight: string;
    ctaPrimary: string;
    ctaSecondary: string;
    floatDashboard: string;
    floatDashboardSub: string;
    teamsLabel: string;
    teamsUnit: string;
    uptimeLabel: string;
    dashLine: string;
    dashLast8h: string;
    dashMainMotor: string;
    dashStatusCLPs: string;
    dashProduction: string;
    dashStops: string;
    dashTempCLP: string;
    dashPressure: string;
    dashVibration: string;
    dashCurrent: string;
    dashFlow: string;
  };

  bento: {
    badge: string;
    headline1: string;
    headline2: string;
    sub: string;
    c1Title: string; c1Sub: string; c1SeeAll: string; c1Body: string;
    c2Title: string; c2Sub: string; c2Protocols: string;
    c3Title: string; c3Sub: string;
    adv1Title: string; adv1Desc: string;
    adv2Title: string; adv2Desc: string;
    adv3Title: string; adv3Desc: string;
    c4Title: string; c4Body: string;
    c5Title: string;
    c6Title: string;
    live: string;
    readingPressure: string; readingTemp: string; readingVib: string; readingCurrent: string;
    readingStable: string;
    seeAll: string;
  };

  como: {
    badge: string;
    headline1: string; headline2: string; sub: string;
    profiles: Array<{ role: string; title: string; description: string; capabilities: string[]; devices: string }>;
    badge2: string;
    headline3: string; headline4: string; sub2: string;
    moduleLabel: string;
    modules: Array<{ title: string; description: string }>;
    ctaPrimary: string; ctaSecondary: string;
  };

  interactive: {
    badge: string;
    headline1: string; headline2: string; sub: string;
    tab1Label: string; tab1Desc: string;
    tab2Label: string; tab2Desc: string;
    prompts: string[];
    steps: string[];
    promptExamples: string;
    editCanvas: string;
    newPrompt: string;
    promptPlaceholder: string;
    generatingPlaceholder: string;
    enterHint: string;
    livePreview: string;
    widgetsHere: string;
    generating: string;
    editable: string;
    clearAll: string;
    canvasEmpty: string;
    canvasEmptyHint: string;
    canvasDrag: string;
    paletteCharts: string; paletteIndicators: string; paletteSystems: string;
    wLineArea: string; wPieDo: string; wRealtime: string; wGauge: string;
    wThermo: string; wKpi: string; wStatusClp: string; wTable: string;
    initialWidgets: Array<{ label: string }>;
    aiWidgets: Array<{ label: string }>;
    ctaPrimary: string; ctaSecondary: string;
    widgetsOnCanvas: string; widget: string; widgets: string;
  };

  casos: {
    badge: string;
    headline1: string; headline2: string; sub: string;
    items: Array<{
      industry: string; title: string; description: string;
      metrics: Array<{ label: string; value: string }>;
      tags: string[];
    }>;
    ctaPrimary: string; ctaSecondary: string;
  };

  precos: {
    badge: string;
    headline1: string; headline2: string; sub: string;
    included: string;
    highlights: string[];
    whatsappPref: string;
    formTitle: string;
    fieldName: string; fieldPhone: string; fieldEmail: string; fieldCompany: string; fieldMessage: string;
    phName: string; phPhone: string; phEmail: string; phCompany: string; phMessage: string;
    submit: string; success: string; error: string;
    faqTitle: string;
    faqs: Array<{ q: string; a: string }>;
  };

  docs: {
    badge: string;
    headline1: string; headline2: string; sub: string;
    cards: Array<{ title: string; description: string; links: string[] }>;
    resources: Array<{ label: string; desc: string }>;
  };

  footer: {
    ctaHeadline1: string; ctaHeadline2: string; ctaSub: string; ctaBtn: string;
    tagline: string; location: string; credit: string;
    catProduct: string; catDevs: string; catCompany: string; catLegal: string;
    productLinks: Array<{ label: string; badge?: string }>;
    devsLinks: Array<{ label: string; badge?: string }>;
    companyLinks: Array<{ label: string }>;
    legalLinks: Array<{ label: string }>;
  };

  cookies: {
    title: string; body: string; lgpdLink: string; body2: string;
    accept: string; essential: string;
  };

  lang: { pt: string; en: string; es: string };
};
