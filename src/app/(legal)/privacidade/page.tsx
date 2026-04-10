import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidade e LGPD',
  description: 'Como o LabMate coleta, usa e protege seus dados industriais e pessoais.',
};

export default function Privacidade() {
  return (
    <article className="space-y-6 text-gray-300">
      <h1 className="text-4xl font-bold text-white mb-8">Política de Privacidade</h1>
      
      <p className="text-sm text-gray-500 mb-8">Última atualização: 10 de abril de 2026</p>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white mt-10">1. Compromisso com sua Privacidade</h2>
        <p>
          Nós do LabMate valorizamos a sua privacidade e garantimos sigilo total sobre seus dados. Operamos um ambiente seguro para garantir que a proteção de dados não atrapalhe a escalabilidade do monitoramento industrial corporativo.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white mt-10">2. Quais dados coletamos</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Dados de conta:</strong> Nome de usuário, e-mail corporativo, e telefone de contato.</li>
          <li><strong>Dados industriais (IoT/Máquinas):</strong> Telemetria de dispositivos configurados na plataforma, parâmetros dos CLPs, e logs operacionais. Reter o controle destes dados é sempre de exclusividade do cliente.</li>
          <li><strong>Dados de uso (Cookies):</strong> Interações no website (LabMate Copiloto) para melhoria de inteligência e performance.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white mt-10">3. Como utilizamos os dados</h2>
        <p>
          A telemetria de sensores industriais e conectores é usada restritamente para renderização visual em seus painéis e avaliações preditivas internas no contexto do próprio cliente, sem compartilhamento com terceiros.
        </p>
      </section>

      <section id="lgpd" className="space-y-4 scroll-mt-24">
        <h2 className="text-2xl font-semibold text-brand-green mt-10">4. Adequação à LGPD</h2>
        <p>
          Nossa operação está em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018). Como usuário, você detém o direito de:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Confirmar a existência do tratamento de dados.</li>
          <li>Acessar seus dados pessoais processados por nós.</li>
          <li>Solicitar correção, anonimização, bloqueio ou eliminação imediata dos dados.</li>
          <li>Revogar seu consentimento a qualquer momento.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white mt-10">5. Segurança Cibernética</h2>
        <p>
          Todos os dados transitados por MQTT, OPC-UA, e REST são criptografados end-to-end. O LabMate exige políticas de senhas rigorosas e garante auditoria sistêmica dos registros contínuos.
        </p>
      </section>
      
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white mt-10">6. Contatos sobre Privacidade</h2>
        <p>
          Se tiver questões, relativas ao tratamento dos seus dados, contate nosso DPO ou canal comercial pelo (47) 99784-7265.
        </p>
      </section>
    </article>
  );
}
