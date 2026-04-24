import { NextRequest, NextResponse } from "next/server";

const META_API = "https://graph.facebook.com/v19.0";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const adAccountId = searchParams.get("account_id");
  const accessToken = searchParams.get("token");

  if (!adAccountId || !accessToken) {
    return NextResponse.json({ error: "Parâmetros ausentes" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `${META_API}/act_${adAccountId}/insights?` +
      `fields=spend,impressions,clicks,ctr,cpm,cpc,reach,frequency,actions,purchase_roas` +
      `&date_preset=today` +
      `&access_token=${accessToken}`
    );

    const data = await res.json();

    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 400 });
    }

    const insights = data.data?.[0] || {};
    const actions = insights.actions || [];
    const leads = actions.find((a: any) => a.action_type === "lead")?.value || 0;
    const purchases = actions.find((a: any) => a.action_type === "purchase")?.value || 0;
    const spend = parseFloat(insights.spend || 0);

    return NextResponse.json({
      spend,
      impressions: parseInt(insights.impressions || 0),
      clicks: parseInt(insights.clicks || 0),
      ctr: parseFloat(insights.ctr || 0),
      cpm: parseFloat(insights.cpm || 0),
      cpc: parseFloat(insights.cpc || 0),
      reach: parseInt(insights.reach || 0),
      frequency: parseFloat(insights.frequency || 0),
      leads: parseInt(leads),
      purchases: parseInt(purchases),
      roas: parseFloat(insights.purchase_roas?.[0]?.value || 0),
      cpl: parseInt(leads) > 0 ? spend / parseInt(leads) : 0,
      cpa: parseInt(purchases) > 0 ? spend / parseInt(purchases) : 0,
    });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar métricas" }, { status: 500 });
  }
}