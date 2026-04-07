import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Widget IDs disponíveis no demo
// 0: OEE por Turno, 1: Eficiência Linha 2, 2: Temp. CLPs, 3: Cadência, 4: Dist. Paradas
const SYSTEM_PROMPT = `Você é o Mate Copiloto, assistente de IA da plataforma LabMate para criação de dashboards industriais IoT.

Com base no pedido do usuário, selecione quais widgets incluir no dashboard demo e gere uma resposta explicativa.

Widgets disponíveis (use os IDs):
0 - OEE por Turno (gráfico de eficiência global de equipamentos)
1 - Eficiência Linha 2 (gráfico de eficiência de produção)
2 - Temp. CLPs (temperatura dos controladores lógicos programáveis)
3 - Cadência (peças por hora)
4 - Dist. Paradas (distribuição de paradas de produção)

Responda SOMENTE em JSON, sem markdown, no formato:
{
  "explanation": "Mensagem curta (2 frases) em português explicando o dashboard gerado",
  "widgetIds": [array de IDs dos widgets relevantes, mínimo 3, máximo 5],
  "steps": [array com exatamente 4 strings em português descrevendo as etapas de análise]
}`;

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Prompt inválido" }, { status: 400 });
    }

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: prompt },
      ],
      response_format: { type: "json_object" },
      max_tokens: 400,
      temperature: 0.7,
    });

    const raw = completion.choices[0]?.message?.content ?? "{}";
    const data = JSON.parse(raw);

    return NextResponse.json({
      explanation: data.explanation ?? "Dashboard gerado com sucesso.",
      widgetIds: Array.isArray(data.widgetIds) ? data.widgetIds : [0, 1, 2, 3, 4],
      steps: Array.isArray(data.steps) ? data.steps : [
        "Analisando contexto industrial...",
        "Identificando variáveis relevantes...",
        "Selecionando widgets ideais...",
        "Montando layout do dashboard...",
      ],
    });
  } catch (err) {
    console.error("[copilot]", err);
    return NextResponse.json({ error: "Erro ao processar" }, { status: 500 });
  }
}
