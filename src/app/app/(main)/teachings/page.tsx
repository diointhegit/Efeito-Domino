import React from "react";
import InvestimentCalculator from "./InvestimentCalculator";
require('./style.css');

export const FinancialPage = () => {
  return (
    <div className="bg-light-bg">

      <div className="financial-page container mx-auto py-10 px-5">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800">Economia e Investimentos Pessoais</h1>
          <p className="text-lg text-gray-600 mt-4">
            Explore as diferentes opções de investimento e entenda qual se encaixa melhor no seu perfil e objetivos financeiros.
          </p>
        </header>

        <section className="investment-types mb-10">
          <h2 className="text-3xl font-semibold text-gray-700">Tipos de Investimentos</h2>
          <p className="text-md text-gray-600 mt-4">
            Os investimentos podem ser divididos em três categorias principais de acordo com o nível de risco e potencial de retorno: baixo, médio e alto risco. Entender esses perfis ajuda a escolher o que combina mais com seus objetivos e tolerância ao risco.
          </p>

          <div className="investment-category mt-8">
            <h3 className="text-2xl font-semibold text-gray-700">Investimentos de Baixo Risco</h3>
            <p className="text-md text-gray-600 mt-2">
              Esses investimentos são mais seguros e previsíveis, ideais para quem não quer arriscar e prefere retorno mais estável.
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li><strong>Poupança:</strong> Super comum, mas com retorno baixo. É mais usado para quem busca liquidez e segurança.</li>
              <li><strong>CDB (Certificado de Depósito Bancário):</strong> Você empresta dinheiro para o banco e recebe juros em troca.</li>
              <li><strong>LCI e LCA:</strong> São investimentos que emprestam dinheiro para áreas específicas e oferecem isenção de IR para pessoas físicas.</li>
            </ul>
          </div>

          <div className="investment-category mt-8">
            <h3 className="text-2xl font-semibold text-gray-700">Investimentos de Médio Risco</h3>
            <p className="text-md text-gray-600 mt-2">
              O retorno pode ser maior, mas o risco também aumenta, ideal para quem aceita um pouco mais de oscilação para ganhos melhores.
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li><strong>Fundos de Investimento:</strong> Aplicam em diversos ativos, misturando opções seguras e outras com um pouco mais de risco.</li>
              <li><strong>Tesouro Direto:</strong> Embora seguros, podem oscilar dependendo das condições econômicas e da escolha do título.</li>
            </ul>
          </div>

          <div className="investment-category mt-8">
            <h3 className="text-2xl font-semibold text-gray-700">Investimentos de Alto Risco</h3>
            <p className="text-md text-gray-600 mt-2">
              Para quem está disposto a correr mais risco em troca de um possível retorno maior, ideal para perfis que entendem o mercado.
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li><strong>Ações:</strong> Comprar ações é adquirir uma parte de uma empresa. O retorno pode ser alto, mas o risco é elevado.</li>
              <li><strong>Criptomoedas:</strong> Conhecidas pela volatilidade, as criptomoedas podem ter altos retornos, mas também grandes quedas.</li>
              <li><strong>Fundos Imobiliários e ETFs:</strong> Aplicam em imóveis ou em uma carteira de ativos, proporcionando diversificação.</li>
            </ul>
          </div>
        </section>
        <section>
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800">Simular investimento</h1>
        </header>
          <InvestimentCalculator/>
        </section>

        <footer className="text-center mt-10 text-gray-500">
          <p>&copy; 2024 Economia e Investimentos Pessoais. Todos os direitos reservados.</p>
        </footer>
      </div>
    </div>
  );
};

export default FinancialPage;