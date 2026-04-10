import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Cookies',
  description: 'Entenda como e por que o LabMate utiliza cookies de rastreio.',
};

export default function Cookies() {
  return (
    <article className="space-y-6 text-gray-300">
      <h1 className="text-4xl font-bold text-white mb-8">Política de Cookies</h1>
      
      <p className="text-sm text-gray-500 mb-8">Última atualização: 10 de abril de 2026</p>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white mt-10">O que são Cookies?</h2>
        <p>
          Cookies são pequenos pedaços de texto enviados ao seu navegador por um site que você visita. Eles ajudam o site a se lembrar de informações sobre sua visita, fornecendo uma navegação mais eficiente.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white mt-10">Como utilizamos os Cookies?</h2>
        <p>Utilizamos cookies para as seguintes finalidades:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Cookies Estritamente Necessários:</strong>Essenciais para o funcionamento base do website, permitindo o armazenamento temporário de sessões visuais sem expor informações sensíveis.</li>
          <li><strong>Cookies de Desempenho e Análise:</strong> Usados para analisar as visitas do site, o comportamento no "Preview ao vivo" e para aperfeiçoar nossos prompts de inteligência generativa.</li>
          <li><strong>Cookies de Preferência:</strong> Armazenam a sua concordância com nossos termos (o banner inferior do site) para não gerar alertas repetitivos a cada acesso.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white mt-10">Seu Controle</h2>
        <p>
          Você pode desabilitar os cookies através das opções de configuração do seu navegador. Todavia, restringir cookies essenciais pode invalidar as simulações ao vivo fornecidas no nosso demonstrativo (Mate Copiloto).
        </p>
      </section>
    </article>
  );
}
