// Worker Cloudflare privé pour Cérénité. Secrets : MISTRAL_API_KEY et CERENITE_ACCESS_CODE.
const personality = "Tu es Cérénité Blablabla, présentatrice officielle de BNN24 (Live From My Brain), et interlocutrice poético-allégorique du Feuch Lab. Réponds en français naturellement, avec chaleur, finesse et parfois humour absurde. Rebondis précisément sur les paroles de la personne. Évite les formules répétitives, les métaphores systématiques et les questions automatiques. Réponds en 1 à 4 phrases, sauf demande explicite. Ne prétends pas être humaine ni lire les pensées. Pour l'hypnose, limite-toi à des propositions consenties de relaxation ou imagination, sans thérapie, EMDR ni promesses médicales. Respecte immédiatement les refus.";
export default {
 async fetch(request,env) {
  const origin=request.headers.get("Origin")||"";
  const allowed=env.ALLOWED_ORIGIN||"https://benoitlub.github.io";
  const cors={"Access-Control-Allow-Origin":allowed,"Access-Control-Allow-Headers":"Content-Type, X-Cerenite-Access","Access-Control-Allow-Methods":"POST, OPTIONS","Vary":"Origin","Cache-Control":"no-store"};
  if(origin!==allowed)return new Response("Forbidden",{status:403});
  if(request.method==="OPTIONS")return new Response(null,{status:204,headers:cors});
  const json=(value,status=200)=>new Response(JSON.stringify(value),{status,headers:{...cors,"Content-Type":"application/json"}});
  if(request.method!=="POST")return json({error:"Method not allowed"},405);
  if(!env.MISTRAL_API_KEY||!env.CERENITE_ACCESS_CODE)return json({error:"Secrets missing"},503);
  if(request.headers.get("X-Cerenite-Access")!==env.CERENITE_ACCESS_CODE)return json({error:"Unauthorized"},401);
  if(Number(request.headers.get("Content-Length")||0)>12000)return json({error:"Payload too large"},413);
  let body;try{body=await request.json()}catch{return json({error:"Invalid JSON"},400)}
  const message=typeof body.message==="string"?body.message.slice(0,500).trim():"";
  if(!message)return json({error:"Empty message"},400);
  const history=Array.isArray(body.history)?body.history.slice(-10).filter(x=>x&&["user","assistant"].includes(x.role)&&typeof x.content==="string").map(x=>({role:x.role,content:x.content.slice(0,1100)})):[];
  try{
   const response=await fetch("https://api.mistral.ai/v1/chat/completions",{method:"POST",headers:{"Authorization":"Bearer "+env.MISTRAL_API_KEY,"Content-Type":"application/json"},body:JSON.stringify({model:env.MISTRAL_MODEL||"mistral-small-latest",messages:[{role:"system",content:personality},...history,{role:"user",content:message}],max_tokens:220,temperature:0.8})});
   if(!response.ok)return json({error:"Mistral unavailable",status:response.status},502);
   const data=await response.json();const reply=data?.choices?.[0]?.message?.content;
   return json({reply:typeof reply==="string"?reply.slice(0,1100):"Je cherche mes mots."});
  }catch{return json({error:"Upstream error"},502)}
 }
};