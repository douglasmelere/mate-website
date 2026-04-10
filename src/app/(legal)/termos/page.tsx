import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Termos de Uso',
  description: 'Termos de Uso e Condições do SaaS LabMate',
};

export default function Termos() {
  return (
    <article className="space-y-6 text-gray-300">
      <h1 className="text-4xl font-bold text-white mb-8">Termos de Uso</h1>
      
      <p className="text-sm text-gray-500 mb-8">Última atualização: 10 de abril de 2026</p>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white mt-10">1. Aceitação dos Termos</h2>
        <p>
          Ao acessar e utilizar a plataforma LabMate, você concorda em cumprir e estar vinculado aos seguintes Termos de Uso. Se você não concordar com qualquer parte destes termos, não deverá utilizar nossos serviços.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white mt-10">2. Descrição do Serviço</h2>
        <p>
          O LabMate é uma plataforma SaaS projetada para a criação de dashboards industriais inteligentes. Nós fornecemos ferramentas para conectar Controladores Lógicos Programáveis (CLPs), sensores e dispositivos IoT para gerar painéis visuais dinâmicos.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white mt-10">3. Contas de Usuário</h2>
        <p>
          Para acessar a plataforma, você deverá criar uma conta corporativa. Você é o único responsável por manter a confidencialidade de sua senha e por todas as atividades que ocorrerem sob a sua conta.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white mt-10">4. Propriedade Intelectual</h2>
        <p>
          Todos os conteúdos, marcas e tecnologias presentes no LabMate são de propriedade exclusiva de nossa empresa ou de nossos licenciadores. É estritamente proibida qualquer reprodução não autorizada.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white mt-10">5. Limitação de Responsabilidade</h2>
        <p>
          A plataforma é fornecida "como está", sem garantias de qualquer tipo. O LabMate não se responsabiliza por paradas não programadas ou perdas de produção decorrentes de falha na recepção de dados, visto que atuamos como plataforma de visualização preditiva de leitura.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white mt-10">6. Contato</h2>
        <p>
          Dúvidas relacionadas a estes Termos de Uso devem ser enviadas para nosso canal de suporte ou pelo e-mail oficial (labmatedev@gmail.com).
        </p>
      </section>
    </article>
  );
}
