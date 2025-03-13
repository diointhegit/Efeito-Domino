"use client";

import React, { useState } from "react";
import { NumericFormat } from "react-number-format";
require("./style.css");

const InvestmentCalculator = () => {
  const [investmentType, setInvestmentType] = useState("CDB");
  const [applicationAmount, setApplicationAmount] = useState(0);
  const [monthlyInvestment, setMonthlyInvestment] = useState(0);
  const [term, setTerm] = useState(0);
  const [termType, setTermType] = useState("Meses");
  const [rate, setRate] = useState(100); // Default to 100% for CDB

  const CDI_BASE_RATE = 6.39; // Base CDI rate as a yearly percentage

  const calculateLCIRate = (termInMonths: number) => {
    if (termInMonths <= 6) return 22.5;
    if (termInMonths <= 12) return 20.0;
    if (termInMonths <= 24) return 17.5;
    return 15.0;
  };

  const calculateSavingsComparison = (
    meses: number,
    valorInicial: number,
    valorMensal: number
  ) => {
    const taxaAnual = 0.06; // 6% ao ano
    const taxaMensal = taxaAnual / 12;

    let saldo = valorInicial;
    let rendimentoTotal = 0;

    for (let mes = 1; mes <= meses; mes++) {
      // Calcula o rendimento mensal
      const rendimentoMes = saldo * taxaMensal;
      saldo += rendimentoMes + valorMensal; // Adiciona o rendimento e o valor mensal

      rendimentoTotal += rendimentoMes; // Acumula o rendimento total
    }

    return saldo;
  };

  const calculateInvestment = () => {
    const termInMonths = termType === "Anos" ? term * 12 : term;
    const totalInvestment =
      applicationAmount + monthlyInvestment * termInMonths;
    let grossEarnings, netEarnings;
    const poupanca: number = calculateSavingsComparison(
      termInMonths,
      applicationAmount,
      monthlyInvestment
    );

    if (investmentType === "LCI e LCA") {
      const lciRate = calculateLCIRate(termInMonths);
      grossEarnings = (totalInvestment * (lciRate / 100) * termInMonths) / 12;
      netEarnings = grossEarnings; // No tax for LCI/LCA
    } else if (investmentType === "CDB") {
      const cdbRate = CDI_BASE_RATE * (rate / 100); // Apply the CDI percentage rate
      const irTaxRate =
        termInMonths <= 6
          ? 22.5
          : termInMonths <= 12
            ? 20.0
            : termInMonths <= 24
              ? 17.5
              : 15.0;
      grossEarnings = (totalInvestment * (cdbRate / 100) * termInMonths) / 12;
      netEarnings = grossEarnings - (grossEarnings * irTaxRate) / 100;
    }

    return {
      totalInvestment,
      grossEarnings,
      netEarnings,
      totalWithEarnings: totalInvestment + (netEarnings || 0.0),
      savingsComparison: poupanca,
    };
  };

  const {
    totalInvestment,
    grossEarnings,
    netEarnings,
    totalWithEarnings,
    savingsComparison,
  } = calculateInvestment();

  return (
    <div className="investment-calculator">
      <div className="input-section">
        <div className="asset-type">
          <h3>Tipo de ativo</h3>
          {["CDB", "LCI e LCA"].map((type) => (
            <button
              key={type}
              className={`asset-button ${investmentType === type ? "selected" : ""}`}
              onClick={() => setInvestmentType(type)}
            >
              {type}
            </button>
          ))}
        </div>
        <div className="input-group">
          <label>Valor da aplicação</label>
          <NumericFormat
            value={applicationAmount}
            thousandSeparator="."
            decimalSeparator=","
            prefix="R$ "
            placeholder="R$ 0,00"
            onValueChange={(values) =>
              setApplicationAmount(values.floatValue || 0)
            }
          />
        </div>
        <div className="input-group">
          <label>Investimento mensal</label>
          <NumericFormat
            value={monthlyInvestment}
            thousandSeparator="."
            decimalSeparator=","
            prefix="R$ "
            placeholder="R$ 0,00"
            onValueChange={(values) =>
              setMonthlyInvestment(values.floatValue || 0)
            }
          />
        </div>
        <div className="input-group">
          <label>Prazo</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={term}
              onChange={(e) => setTerm(Number(e.target.value))}
            />

            <select
              value={termType}
              onChange={(e) => setTermType(e.target.value)}
            >
              <option value="Meses">Meses</option>
              <option value="Anos">Anos</option>
            </select>
          </div>
        </div>
        <div className="input-group">
          <label>Taxa (% do CDI para CDB)</label>
          <NumericFormat
            value={rate}
            suffix="%"
            placeholder="100%"
            onValueChange={(values) => setRate(values.floatValue || 100)}
          />
        </div>
      </div>
      <div className="result-section">
        <h3>
          Em {term} {termType} você teria:
        </h3>
        <h1>R$ {totalWithEarnings.toFixed(2)}</h1>
        <p>Valor total com rendimento líquido</p>
        <ul>
          <li>Total investido: R$ {totalInvestment.toFixed(2)}</li>
          <li>
            Rendimento bruto: R${" "}
            {grossEarnings ? grossEarnings.toFixed(2) : "0.00"}
          </li>
          <li>
            Rendimento líquido: R${" "}
            {netEarnings ? netEarnings.toFixed(2) : "0.00"}
          </li>
          <li>Na poupança: R$ {savingsComparison.toFixed(2)}</li>
        </ul>
        <p className="disclaimer">
          Taxa da Poupança em 0.57% a.m., referente a 2024-11-04. Esses valores
          são uma simulação e não são uma garantia de rentabilidade futura.
        </p>
      </div>
    </div>
  );
};

export default InvestmentCalculator;
