// ── Token fetcher (injected into page context) ──────────────────────────
window.getSnToken = function() {
  const token =
    window.g_ck ||
    window.top?.g_ck ||
    window.parent?.g_ck ||
    null;

  if (!token) {
    throw new Error('ServiceNow token (g_ck) não encontrado na sessão');
  }

  return token;
};

// ── Main injected function ────────────────────────────────────────────────
window.runEMSOps = function(userMes) {

  // ── Constants ─────────────────────────────────────────────────────────
  const token = getSnToken();

  const headers = {
    'Accept': 'application/json',
    'X-UserToken': token
  };
  const G_IDS     = '1c7c9057db6771d0832ead8ed396197a,673c2170476422503cbfe07a216d430f,ff72689247ee1e143cbfe07a216d4357';
  const GROUP_MEMBERS = {
    '1c7c9057db6771d0832ead8ed396197a': [
      {name:'Alain Lamothe',id:'42cb28908758edd4e41640cd0ebb3546'},{name:'Alexandre Maia',id:'1c1805e9db194950a7f8a334ca9619ec'},{name:'Ahmad Saeed',id:'479e82f0475b8e14b4baa8b5536d4350'},{name:'Andre Muller',id:'42c027c4dba89c10034e6e25ca96196c'},{name:'Andre Sodre',id:'41a509fc4faa0700f5e08e1f0210c73a'},{name:'Andreza Alvares',id:'3665a617dbde60143e6ee2d2ca9619b1'},{name:'Asghar Shamloo',id:'96bfea151b120158a0ab62ca234bcb89'},{name:'Barbara Serain',id:'f3da570847c172d03cbfe07a216d437d'},{name:'Bruna Artioli',id:'46380b503304f6d497e2fba45d5c7bc3'},{name:'Bruno Toledo',id:'eb71bc95dbfbac10fb5d09ccd3961971'},{name:'Bruno Vicente',id:'05a509fc4faa0700f5e08e1f0210c751'},{name:'Cainan Silveira',id:'1a5cdc969317a2506fa8fc0b6aba1003'},{name:'Carlos Nogueira',id:'51a509fc4faa0700f5e08e1f0210c766'},{name:'Carolina Giamassi',id:'7eb85df693d47194ef0af8e74dba103c'},{name:'Danilo Marques',id:'4d4689344fea0700f5e08e1f0210c74c'},{name:'Davi Santos',id:'58f8ba0bdba15550b715aa1d13961964'},{name:'David Neil',id:'eda1c45fdbaec050b9711a8c1396191d'},{name:'Diego Montes',id:'ab04bdf283068e90c149bb447daad3fe'},{name:'Diogo Caldeira',id:'c416817b1b31b410a0ab62ca234bcb0f'},{name:'Fabricio Carvalho',id:'727715dc4f14f744c58b8e1f0210c7fd'},{name:'Felipe Drumond',id:'d9a509fc4faa0700f5e08e1f0210c7b8'},{name:'Felipe Soares',id:'99a509fc4faa0700f5e08e1f0210c7b7'},{name:'Fernando Lima',id:'b3f54d704fea0700f5e08e1f0210c7bb'},{name:'Fernando Meissner',id:'239e2d57db391d50a7f8a334ca9619cd'},{name:'Fábio Brasil',id:'6c643fd44f3efbc8c58b8e1f0210c708'},{name:'Gabriel Cruz',id:'92bdf2a41b79f410a0ab62ca234bcb6c'},{name:'Gabriel Sorroche',id:'0f6c36374767ee901065fa57436d4391'},{name:'Giulia Lopes',id:'b82ff9a8836072d4c149bb447daad390'},{name:'Guilherme Mello',id:'494d8dc44f2f3780f3d33d828110c791'},{name:'Hugo Luna',id:'5335673747eba598c2fd45e8036d4360'},{name:'Jefferson Abreu',id:'5ab87e13875029105ea58628dabb3538'},{name:'Joana Enes',id:'2cac81cd87792d10c48cb845dabb35b1'},{name:'João Miranda',id:'83f109f3dbff8d90fb5d09ccd3961908'},{name:'João Victor Silva',id:'2cf8ba0bdba15550b715aa1d139619c3'},{name:'Julio Araujo',id:'3dcb06418785b514c48cb845dabb35b9'},{name:'Kauê Furtado',id:'c6380b503304f6d497e2fba45d5c7bc7'},{name:'Kevin Ma',id:'8c99bade1b231c54bb580e966e4bcb28'},{name:'Leticia Veiga',id:'46a318b88720bdd45ea58628dabb35e8'},{name:'Lia da Silva',id:'9e9aa79883068a1cc149bb447daad348'},{name:'Lorena Alves',id:'c8657f998326c258c149bb447daad363'},{name:'Luan Salviano',id:'b72e3a8e97fa31180c103486f053af65'},{name:'Lucas Henrique Rocha',id:'4a380b503304f6d497e2fba45d5c7be8'},{name:'Lucas Oliveira Silva',id:'c8e1d213973239980c103486f053af5b'},{name:'Luiz Hernandes',id:'a57afa104f0d2b00f3d33d828110c770'},{name:'Michael Manna',id:'c1993ede1b231c54bb580e966e4bcbe6'},{name:'Michael Rodrigues',id:'0aa549fc4faa0700f5e08e1f0210c7d2'},{name:'Paloma Moreira',id:'525c9c969317a2506fa8fc0b6aba10f4'},{name:'Paulo Henrique Augusto',id:'6c290269db121910a7f8a334ca9619ad'},{name:'Paulo Leal',id:'e92d179e47c22d90c2fd45e8036d43d1'},{name:'Pedro Henrique Bernoldi',id:'41c6e49f97c626149b5a7efe2153af46'},{name:'Raymond Birch',id:'6bc8721a1b231c54bb580e966e4bcb59'},{name:'Rayanne Nascimento',id:'1569409347c1ba103cbfe07a216d4340'},{name:'Renato Neves',id:'97981e64db8c4d14b715aa1d13961963'},{name:'Robert Fischer',id:'8eb501304fea0700f5e08e1f0210c763'},{name:'Roland Szczesny',id:'303afe161b631c54bb580e966e4bcbb2'},{name:'Ruan Mello',id:'e569409347c1ba103cbfe07a216d4378'},{name:'Sergio Procópio',id:'82b501304fea0700f5e08e1f0210c782'},{name:'Syed Sultan Nazar',id:'82b9fe121b631c54bb580e966e4bcbd3'},{name:'Thaina Dias',id:'050542f2c3f8e610c7341f53e40131ab'},{name:'Vernon Ko',id:'b669b29e1b231c54bb580e966e4bcbb5'},{name:'Vinicius Silva',id:'e846c4091b9571101424c8451a4bcb16'}
    ],
    '673c2170476422503cbfe07a216d430f': [
      {name:'Ana Clara Azevedo',id:'358d2145872795545ea58628dabb35f7'},{name:'Barbara Serain',id:'f3da570847c172d03cbfe07a216d437d'},{name:'Cainan Silveira',id:'1a5cdc969317a2506fa8fc0b6aba1003'},{name:'Daniel Raposo',id:'86b8ba13875029105ea58628dabb35ae'},{name:'Felipe Drumond',id:'d9a509fc4faa0700f5e08e1f0210c7b8'},{name:'Felipe Soares',id:'99a509fc4faa0700f5e08e1f0210c7b7'},{name:'Fernando Lima',id:'b3f54d704fea0700f5e08e1f0210c7bb'},{name:'Gabriel Cruz',id:'92bdf2a41b79f410a0ab62ca234bcb6c'},{name:'Guilherme Mello',id:'494d8dc44f2f3780f3d33d828110c791'},{name:'Juliana Caldeira',id:'02543c1cc3be6ed0c7341f53e40131e4'},{name:'Leticia Veiga',id:'46a318b88720bdd45ea58628dabb35e8'},{name:'Luiz Hernandes',id:'a57afa104f0d2b00f3d33d828110c770'},{name:'Paulo Leal',id:'e92d179e47c22d90c2fd45e8036d43d1'},{name:'Pedro Henrique Bernoldi',id:'41c6e49f97c626149b5a7efe2153af46'},{name:'Renato Neves',id:'97981e64db8c4d14b715aa1d13961963'},{name:'Sergio Procópio',id:'82b501304fea0700f5e08e1f0210c782'}
    ],
    'ff72689247ee1e143cbfe07a216d4357': [
      {name:'Abdool Halleem',id:'56393a1e1b231c54bb580e966e4bcbd3'},{name:'Adriano Brigario',id:'fca5c5fc4faa0700f5e08e1f0210c7ff'},{name:'Ahmad Saeed',id:'479e82f0475b8e14b4baa8b5536d4350'},{name:'Alain Lamothe',id:'42cb28908758edd4e41640cd0ebb3546'},{name:'Alexandre Oliveira',id:'87deeb4e1338734426d55d122244b09c'},{name:'Alexander Victorino',id:'eee2842293c74a1018e8bf2a6aba1079'},{name:'Andreza Alvares',id:'3665a617dbde60143e6ee2d2ca9619b1'},{name:'Asghar Shamloo',id:'96bfea151b120158a0ab62ca234bcb89'},{name:'Augusto Almeida Galvao',id:'e6e525ad4f447fc0c58b8e1f0210c74e'},{name:'Bruna Artioli',id:'46380b503304f6d497e2fba45d5c7bc3'},{name:'Brunno Figueiredo',id:'8da509fc4faa0700f5e08e1f0210c749'},{name:'Cainan Silveira',id:'1a5cdc969317a2506fa8fc0b6aba1003'},{name:'Carolina Sequeira',id:'da9aa79883068a1cc149bb447daad345'},{name:'Cleiton Torres',id:'bbbfd92193587ad0771238797bba1018'},{name:'Daniel Philot',id:'d5a509fc4faa0700f5e08e1f0210c776'},{name:'Diego Leite',id:'d5a509fc4faa0700f5e08e1f0210c783'},{name:'Diogo Caldeira',id:'c416817b1b31b410a0ab62ca234bcb0f'},{name:'Eduardo de Abreu',id:'d5a509fc4faa0700f5e08e1f0210c794'},{name:'Fabio Rodrigues',id:'55a509fc4faa0700f5e08e1f0210c7b0'},{name:'Fabricio Carvalho',id:'727715dc4f14f744c58b8e1f0210c7fd'},{name:'Fábio Brasil',id:'6c643fd44f3efbc8c58b8e1f0210c708'},{name:'Gabriel Sorroche',id:'0f6c36374767ee901065fa57436d4391'},{name:'Giulia Lopes',id:'b82ff9a8836072d4c149bb447daad390'},{name:'Gleidson Rocha',id:'a5a509fc4faa0700f5e08e1f0210c7ea'},{name:'Guilherme de Souza',id:'a7f9fa33dbc99150545dee0c139619ee'},{name:'Henrique Almeida',id:'47bbc00887cf9554dfdd64a09bbb354c'},{name:'Janei Araujo',id:'17debbaf13fb67c826d55d122244b0d6'},{name:'Jefferson Souza',id:'2da549fc4faa0700f5e08e1f0210c70b'},{name:'Joana Enes',id:'2cac81cd87792d10c48cb845dabb35b1'},{name:'Jone Colmenero',id:'39a549fc4faa0700f5e08e1f0210c72d'},{name:'Jorge Andrade',id:'625385aa1b61dc5c5deb4199bd4bcbb5'},{name:'José Couto',id:'bb6b8debdbaa8cd47aab710439961965'},{name:'Jose Neto',id:'f5a549fc4faa0700f5e08e1f0210c736'},{name:'Kauê Furtado',id:'c6380b503304f6d497e2fba45d5c7bc7'},{name:'Kevin Ma',id:'8c99bade1b231c54bb580e966e4bcb28'},{name:'Laylla Rangel',id:'f1a549fc4faa0700f5e08e1f0210c757'},{name:'Leonardo Trigo',id:'d647da78c3f3fdd893144f05990131c3'},{name:'Lia da Silva',id:'9e9aa79883068a1cc149bb447daad348'},{name:'Lorena Alves',id:'c8657f998326c258c149bb447daad363'},{name:'Lucas Henrique Rocha',id:'4a380b503304f6d497e2fba45d5c7be8'},{name:'Lucas Oliveira Silva',id:'c8e1d213973239980c103486f053af5b'},{name:'Luiz Hernandes',id:'a57afa104f0d2b00f3d33d828110c770'},{name:'Marco Rosina',id:'92b87e13875029105ea58628dabb3551'},{name:'Michael Manna',id:'c1993ede1b231c54bb580e966e4bcbe6'},{name:'Osvaldo Delfino',id:'46a549fc4faa0700f5e08e1f0210c7e7'},{name:'Paloma Moreira',id:'525c9c969317a2506fa8fc0b6aba10f4'},{name:'Pedro Henrique Bernoldi',id:'41c6e49f97c626149b5a7efe2153af46'},{name:'Priscila Santos',id:'3994cc71dba10d14b715aa1d13961988'},{name:'Raymond Birch',id:'6bc8721a1b231c54bb580e966e4bcb59'},{name:'Rayanne Nascimento',id:'1569409347c1ba103cbfe07a216d4340'},{name:'Roland Szczesny',id:'303afe161b631c54bb580e966e4bcbb2'},{name:'Ruan Mello',id:'e569409347c1ba103cbfe07a216d4378'},{name:'Sidinei Oliveira',id:'bbf54d704fea0700f5e08e1f0210c776'},{name:'Syed Sultan Nazar',id:'82b9fe121b631c54bb580e966e4bcbd3'},{name:'Thaina Dias',id:'050542f2c3f8e610c7341f53e40131ab'},{name:'Thercio Costa',id:'f86d0a84db58b850fb5d09ccd39619c4'},{name:'Tiago Garcia',id:'48657f998326c258c149bb447daad3cd'},{name:'Valmir de Oliveira',id:'40e1cfd04f6cbfc4c58b8e1f0210c76b'},{name:'Vernon Ko',id:'b669b29e1b231c54bb580e966e4bcbb5'},{name:'Vinicius Africo',id:'2c0890354f053b40c58b8e1f0210c74b'},{name:'Vinicius Machado',id:'9eb501304fea0700f5e08e1f0210c7b3'},{name:'Wagner Farias',id:'bd214939dbc3c5d0fb5d09ccd39619dd'},{name:'Wellington Batista',id:'d6b501304fea0700f5e08e1f0210c7c0'},{name:'Ygor Soares',id:'524d6e361ba8d154a62b20622a4bcb5c'}
    ]
  };
  const G_NAMES   = { '1c7c9057db6771d0832ead8ed396197a':'L1 OpsCenter AMER', '673c2170476422503cbfe07a216d430f':'Event Management BR', 'ff72689247ee1e143cbfe07a216d4357':'L2 OpsCenter AMER' };
  const G_KEYS    = { '1c7c9057db6771d0832ead8ed396197a':'l1', '673c2170476422503cbfe07a216d430f':'event', 'ff72689247ee1e143cbfe07a216d4357':'l2' };
  const AWAIT_ST  = new Set(['18','32','5','29','30']);
  const EXCL      = [3,6,7,24,25,33,35].map(v=>`^state!=${v}`).join('');
  const LANE_PRIORITY = { critical:'1', high:'2', medium:'3', normal:'4' };
  const PRIORITY_LANE = { '1':'critical','2':'high','3':'medium','4':'normal','5':'normal' };
  const FIELDS    = 'number,short_description,priority,state,impact,urgency,assigned_to,assignment_group,opened_at,u_escalation_type,u_type,sys_updated_on,resolved_at,closed_at,sys_id,account,category,u_close_code,u_internal_cases';
  const SLA_F     = 'task,planned_end_time,has_breached,percentage,sla,original_breach_time';
  const BATCH     = 50;
  const BASE      = window.location.origin;
  const TZ_BR     = 'America/Sao_Paulo';
  const MES_NAMES = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];

  const nowD      = new Date();
  const YEAR      = nowD.getFullYear();
  const mes       = userMes || (nowD.getMonth() + 1);

  // ── Fetch helpers ──────────────────────────────────────────────────────
  const chunk  = arr => Array.from({length:Math.ceil(arr.length/BATCH)},(_,i)=>arr.slice(i*BATCH,i*BATCH+BATCH));
  const parseJsonSafe = async (response, contextLabel='API') => {
    const raw = await response.text();
    if (!response.ok) {
      const msg = raw ? `: ${raw.slice(0, 180)}` : '';
      throw new Error(`${contextLabel} HTTP ${response.status}${msg}`);
    }
    if (!raw) return {};
    try {
      return JSON.parse(raw);
    } catch (_) {
      throw new Error(`${contextLabel} retornou JSON inválido (HTTP ${response.status})`);
    }
  };
  const fcases = (q, lim=1000) => fetch(`${BASE}/api/now/table/sn_customerservice_case?sysparm_query=${encodeURIComponent(q)}&sysparm_fields=${FIELDS}&sysparm_display_value=all&sysparm_limit=${lim}`,{headers}).then(r=>parseJsonSafe(r,'sn_customerservice_case')).then(d=>d.result||[]);
  const GID_L1='1c7c9057db6771d0832ead8ed396197a',GID_EVENT='673c2170476422503cbfe07a216d430f',GID_L2='ff72689247ee1e143cbfe07a216d4357';
  const fcasesAllGroups = q => {
    // Build per-group queries by replacing the groupIN clause directly
    const mk = gid => q.replace('assignment_groupIN'+G_IDS, 'assignment_group='+gid);
    return Promise.all([
      fcases(mk(GID_L1),   2000),
      fcases(mk(GID_EVENT),2000),
      fcases(mk(GID_L2),   2000),
    ]).then(([a,b,c])=>[...a,...b,...c]);
  };
  const fsla   = q => fetch(`${BASE}/api/now/table/task_sla?sysparm_query=${encodeURIComponent(q)}&sysparm_fields=${SLA_F}&sysparm_display_value=all&sysparm_limit=500`,{headers}).then(r=>parseJsonSafe(r,'task_sla')).then(d=>d.result||[]);
  const bsla   = (ids,f) => !ids.length ? Promise.resolve([]) : Promise.all(chunk(ids).map(b=>fsla(`taskIN${b.join(',')}^${f}`))).then(r=>r.flat());

  const mesRange = m => {
    const ms = String(m).padStart(2,'0');
    const ld = new Date(YEAR,m,0).getDate();
    return { ini:`${YEAR}-${ms}-01 00:00:00`, fim:`${YEAR}-${ms}-${ld} 23:59:59` };
  };

  // ── Build and render ───────────────────────────────────────────────────
  const render = (ativos, postMortem, slaA, slaP, m, resolvedToday, aggData) => {
    const now       = Date.now();
    const fmtH      = h => h===null ? '—' : `${parseFloat(h).toFixed(1)}h`;
    const hFrom     = d => { const x=new Date(d); return isNaN(x)?null:(now-x)/3600000; };
    const fmtOpened = d => {
      const x = new Date(d);
      if (isNaN(x)) return '—';
      return x.toLocaleString('pt-BR', { day:'2-digit', month:'2-digit', hour:'2-digit', minute:'2-digit' }).replace(',', '');
    };
    const initials = name => {
      const txt = (name || '').trim();
      if (!txt) return 'SR';
      return txt.split(/\s+/).slice(0,2).map(p=>p.charAt(0).toUpperCase()).join('') || 'SR';
    };
    const caseUrl   = n => `${BASE}/sn_customerservice_case.do?sysparm_query=number=${n}`;
    const prioColor = p => (['','#CF222E','#BF8700','#0550AE','#1A7F37','#57606A'][p]||'#57606A');
    const mesNome   = MES_NAMES[m-1];

    // SLA map
    const buildMap = list => {
      const map = {};
      list.forEach(s => {
        const id = s.task?.value; if (!id) return;
        const due     = s.planned_end_time?.value ? new Date(s.planned_end_time.value) : null;
        const breach  = s.has_breached?.value === 'true';
        const pct     = parseFloat(s.percentage?.value||'0');
        const name    = s.sla?.display_value||s.sla?.value||'';
        const isEms   = name.includes('EMS-OLA-AMER');
        const ex      = map[id];
        if (!ex||(isEms&&!ex.isEms)||(isEms===ex.isEms&&pct>(ex.pct||0)))
          map[id] = {due,breach,pct,name,isEms};
      });
      return map;
    };
    const mapA = buildMap(slaA);
    const mapP = buildMap(slaP);

    const slaInfo = (entry, active) => {
      if (!entry) return {st:'none',mins:null,pct:null,name:'—'};
      const {due,breach,pct,name} = entry;
      const ms = due ? due-now : null;
      let st;
      if (active) {
        st = (breach||(ms!==null&&ms<0)) ? 'breach' : (ms!==null&&ms<7200000) ? 'risk' : 'ok';
      } else {
        st = breach ? 'breach' : 'ok';
      }
      return {st, mins:ms?Math.round(ms/60000):null, pct:Math.round(pct), name};
    };

    // Classify
    const classify = c => {
      const sl    = slaInfo(mapA[c.sys_id?.value], true);
      const rawDV = (c.priority?.display_value || '').trim();
      const rawV  = c.priority?.value || '5';
      const match = rawDV.match(/^\d/); // Pega apenas o dígito no INÍCIO da string
      let prio = match ? parseInt(match[0], 10) : parseInt(rawV, 10);

      // Proteção Refinada: Só é P1 se o texto REALMENTE começar com "1". 
      // Isso evita que "2 - High (Impact 1)" seja classificado como P1.
      if (prio === 1 && !rawDV.startsWith('1')) prio = 2;
      if (isNaN(prio)) prio = 5;

      const noAss = !c.assigned_to?.value;
      const stV   = String(c.state?.value || '');
      const stD   = (c.state?.display_value || '').toLowerCase();
      const isAw  = AWAIT_ST.has(stV) || stD.includes('awaiting') || stD.includes('aguardando') || stD.includes('info') || stD.includes('pendente');

      let lane;
      if      (isAw)                         lane='awaiting';
      else if (noAss)                        lane='orphan';
      else if (prio===1)                     lane='critical';
      else if (prio===2)                     lane='high';
      else if (prio===3)                     lane='medium';
      else                                   lane='normal';

      if (lane === 'critical' && c.priority?.display_value && !c.priority.display_value.includes('1')) {
        console.warn(`[Priority Bug Check] Caso ${c.number?.display_value} classificado como CRITICAL mas Prioridade Display é "${c.priority.display_value}" (Value: ${c.priority.value})`);
      }

      return {
        number  : c.number?.display_value||'',
        sysId   : c.sys_id?.value||'',
        url     : caseUrl(c.number?.display_value||''),
        desc    : (c.short_description?.display_value||'').substring(0,60),
        priority: c.priority?.display_value||'N/A',
        prio, state:c.state?.display_value||'N/A',
        isAw, noAss,
        uType   : c.u_type?.display_value||'',
        assigned: c.assigned_to?.display_value||null,
        assignedId: c.assigned_to?.value||'',
        impact  : c.impact?.display_value||c.impact?.value||'—',
        impactVal: c.impact?.value||'',
        urgency : c.urgency?.display_value||c.urgency?.value||'—',
        urgencyVal: c.urgency?.value||'',
        gid     : c.assignment_group?.value||'',
        gkey    : G_KEYS[c.assignment_group?.value]||'l1',
        group   : G_NAMES[c.assignment_group?.value]||'—',
        isInternal: c.u_internal_cases?.value==='true'||c.u_internal_cases?.value===true,
        sl, openH:fmtH(hFrom(c.opened_at?.value)), openedAt:c.opened_at?.value||'', lane
      };
    };

    const enrichPost = c => {
      const sl     = slaInfo(mapP[c.sys_id?.value], false);
      const opened = new Date(c.opened_at?.value);
      const resol  = new Date(c.resolved_at?.value||c.closed_at?.value);
      const mttr   = (!isNaN(opened)&&!isNaN(resol)) ? (resol-opened)/3600000 : null;
      return {
        number    : c.number?.display_value||'',
        url       : caseUrl(c.number?.display_value||''),
        desc      : (c.short_description?.display_value||'').substring(0,55),
        priority  : c.priority?.display_value||'N/A',
        prio      : parseInt(c.priority?.value||'5'),
        uType     : c.u_type?.display_value||'—',
        account   : c.account?.display_value||'—',
        category  : c.category?.display_value||'—',
        closeCode : c.u_close_code?.display_value||'—',
        assigned  : c.assigned_to?.display_value||'—',
        group     : G_NAMES[c.assignment_group?.value]||'—',
        stateLabel: c.state?.display_value||'—',
        resolvedAt: c.resolved_at?.display_value||c.closed_at?.display_value||'—',
        mttr, sl,
        slaBreach : sl.st==='breach',
        slaLabel  : !mapP[c.sys_id?.value] ? 'Sem SLA' : sl.st==='breach' ? 'BREACH' : 'OK'
      };
    };

    const classified = ativos.map(classify);
    const postList   = postMortem.map(enrichPost);

    // Single-pass aggregation to reduce array scans when rendering large boards
    const BACKLOG_DAYS = 20;
    const BACKLOG_MS   = BACKLOG_DAYS * 86400000;
    const laneNames    = ['critical','high','medium','awaiting','normal','orphan'];
    const groupKeys    = ['l1','l2','event','all'];
    const createGroupMap = () => {
      const out = {};
      groupKeys.forEach(g => {
        out[g] = { total: 0 };
        laneNames.forEach(l => { out[g][l] = []; });
      });
      return out;
    };
    const ativosMap = createGroupMap();
    const backlogMap = createGroupMap();

    let totalBreach = 0;
    let totalRisk = 0;
    let totalOrphan = 0;
    let totalAwait = 0;

    const nowMs = Date.now();
    classified.forEach(c => {
      const target = (nowMs - new Date(c.openedAt || 0)) >= BACKLOG_MS ? backlogMap : ativosMap;
      target[c.gkey].total += 1;
      target[c.gkey][c.lane].push(c);
      target.all.total += 1;
      target.all[c.lane].push(c);

      if (c.sl.st === 'breach') totalBreach += 1;
      if (c.sl.st === 'risk') totalRisk += 1;
      if (c.noAss) totalOrphan += 1;
      if (c.isAw) totalAwait += 1;
    });

    const lanesMap = ativosMap; // kept for KPI compat
    const pctHealth = classified.length ? Math.round(((classified.length - totalBreach) / classified.length) * 100) : 0;

    let pmBreach = 0;
    let mttrTotal = 0;
    let mttrCount = 0;
    postList.forEach(p => {
      if (p.slaBreach) pmBreach += 1;
      if (p.mttr !== null) {
        mttrTotal += p.mttr;
        mttrCount += 1;
      }
    });
    const avgMTTR = mttrCount ? (mttrTotal / mttrCount).toFixed(1) : '—';
    const ativosCount = ativosMap.all.total;
    const backlogCount = backlogMap.all.total;

    // Card renderer
    const renderSlaBar = sl => {
      if (sl.st==='none') return `<div class="sla-bar-wrap"><span class="sla-bar-name" style="color:#57606A">Sem SLA</span></div>`;
      const pct   = Math.min(sl.pct||0,100);
      const color = sl.st==='breach' ? '#CF222E' : sl.st==='risk' ? '#BF8700' : '#1A7F37';
      const time  = sl.st==='breach'
        ? `<span class="sla-time" style="color:#CF222E;font-weight:700">BREACH</span>`
        : sl.mins!==null ? `<span class="sla-time">${sl.mins>=60?(sl.mins/60).toFixed(1)+'h':sl.mins+'min'} rest.</span>` : '';
      return `<div class="sla-bar-wrap">
        <div class="sla-bar-label">
          <span class="sla-bar-name">${sl.name!=='—'?sl.name:'SLA'}</span>
          <span class="sla-bar-pct" style="color:${color}">${sl.pct}%</span>
        </div>
        <div class="sla-bar-track"><div class="sla-bar-fill" style="width:${pct}%;background:${color}"></div></div>
        ${time}</div>`;
    };

    const renderCard = c => `
      <div class="card card-${c.lane}" data-sysid="${c.sysId}" data-assignedid="${c.assignedId||''}" data-assignedname="${c.assigned||''}" data-impact="${c.impactVal||''}" data-urgency="${c.urgencyVal||''}" onclick="openCaseModal('${c.sysId}','${c.number}',this)">
        <div class="card-top">
          <a class="card-num" href="${c.url}" target="_blank">${c.number} ↗</a>
          <span class="card-prio-badge card-prio-${c.prio}">${c.priority}</span>
          ${c.isAw?`<span class="badge-await">⏳ ${c.state}</span>`:''}
          ${c.isInternal?`<span class="badge-internal">🔒 Internal</span>`:''}
          <button class="card-reassign-btn" title="Reatribuir" data-sysid="${c.sysId}" data-gid="${c.gid}" data-assigned="${c.assigned||''}" onclick="openReassignBtn(event,this)">👤 ✎</button>
        </div>
        <p class="card-desc">${c.desc||'—'}</p>
        ${renderSlaBar(c.sl)}
        <div class="card-tags">
          <span class="tag tag-state">${c.state}</span>
          ${c.uType?`<span class="tag tag-type">${c.uType}</span>`:''}
          <span class="tag tag-iu">I:${c.impactVal||'—'} · U:${c.urgencyVal||'—'}</span>
        </div>
        <div class="card-footer">
          <span class="card-assigned ${c.noAss?'unassigned':''}">
            <span class="card-avatar">${c.noAss?'!':initials(c.assigned)}</span>
            <span>${c.noAss?'Sem responsável':c.assigned}</span>
          </span>
          <span class="card-time">📅 ${fmtOpened(c.openedAt)}</span>
        </div>
      </div>`;

    const renderLane = (laneKey,label,color,icon,items) => `
      <div class="lane" data-lane="${laneKey}">
        <div class="lane-hdr" style="border-top:3px solid ${color}">
          <div class="lane-title"><span class="lane-dot" style="background:${color}"></span>${icon} ${label}</div>
          <span class="lane-count" style="color:${color}">${items.length}</span>
        </div>
        <div class="lane-body">${items.length?items.map(renderCard).join(''):'<div class="lane-empty">Sem chamados</div>'}</div>
      </div>`;

    // Resolved Today lane
    const buildResolvedChart = key => {
      const gid = G_ID_MAP[key];
      const rt  = (resolvedToday||[]).filter(c => c.assignment_group?.value === gid);
      const map = {};
      rt.forEach(c => {
        const name = c.assigned_to?.display_value || '— Sem responsável';
        map[name] = (map[name]||0)+1;
      });
      return Object.entries(map)
        .map(([name,count]) => ({ name, count }))
        .sort((a,b) => b.count - a.count);
    };

    const COLORS_RT = ['#0969DA','#1A7F37','#BF8700','#CF222E','#8250DF','#0550AE','#116329','#7D4E00','#A40E26','#6E40C9','#1A7F37','#0969DA','#BF8700','#CF222E','#8250DF'];
    const renderResolvedToday = key => {
      const data = buildResolvedChart(key==='all'?'l1':key);
      const total = data.reduce((s,d)=>s+d.count,0);
      const max   = data.length ? Math.max(...data.map(d=>d.count)) : 1;
      const renderRows = rows => !rows.length ? '<div class="lane-empty">Nenhum hoje</div>' :
        rows.map((d,i) => `
          <div class="rt-row">
            <div class="rt-name" title="${d.name}">${d.name.split(' ').slice(0,2).join(' ')}</div>
            <div class="rt-track">
              <div class="rt-fill" style="width:${Math.round((d.count/max)*100)}%;background:${COLORS_RT[i%COLORS_RT.length]}"></div>
            </div>
            <span class="rt-val">${d.count}</span>
          </div>`).join('');
      if(key==='all'){
        const dL1=buildResolvedChart('l1'), dL2=buildResolvedChart('l2'), dEV=buildResolvedChart('event');
        const initialTotal = dL1.reduce((s,d)=>s+d.count,0);
        return `
          <div class="lane lane-rt">
            <div class="lane-hdr" style="border-top:3px solid #6E40C9">
              <div class="lane-title"><span class="lane-dot" style="background:#6E40C9"></span>✅ Resolvidos Hoje</div>
              <span class="lane-count" style="color:#6E40C9;margin-left:auto;margin-right:8px;">${initialTotal}</span>
              <select onchange="switchResolvedTodayQueue(this.value)" style="font-size:11px;padding:2px 6px;border:1px solid #d0d7de;border-radius:6px;">
                <option value="l1">L1</option><option value="l2">L2</option><option value="event">Event</option>
              </select>
            </div>
            <div class="lane-body">
              <div id="rt-l1" class="rt-group">${renderRows(dL1)}</div>
              <div id="rt-l2" class="rt-group" style="display:none">${renderRows(dL2)}</div>
              <div id="rt-event" class="rt-group" style="display:none">${renderRows(dEV)}</div>
            </div>
          </div>`;
      }
      return `
        <div class="lane lane-rt">
          <div class="lane-hdr" style="border-top:3px solid #6E40C9">
            <div class="lane-title"><span class="lane-dot" style="background:#6E40C9"></span>✅ Resolvidos Hoje</div>
            <span class="lane-count" style="color:#6E40C9">${total}</span>
          </div>
          <div class="lane-body">
            ${renderRows(data)}
          </div>
        </div>`;
    };

    const renderBoard = (key, lmap, showRT=true) => {
      const ln = lmap[key];
      return `
        <div class="board-inner">
          ${renderLane('critical', 'Crítico',    '#CF222E','🔴',ln.critical)}
          ${renderLane('high',     'Alto Risco', '#BF8700','🟠',ln.high)}
          ${renderLane('medium',   'Atenção',    '#0550AE','🔵',ln.medium)}
          ${renderLane('normal',   'Normal',     '#1A7F37','🟢',ln.normal)}
          ${renderLane('awaiting', 'Aguardando', '#0969DA','⏳',ln.awaiting)}
          ${renderLane('orphan',   'Órfãos',     '#57606A','⚫',ln.orphan)}
          ${showRT ? renderResolvedToday(key) : ''}
        </div>`;
    };

    const slaBarPM = p => {
      if (p.sl.pct===null) return '<span class="muted-val">—</span>';
      const color = p.slaBreach ? '#CF222E' : p.sl.pct>=90 ? '#BF8700' : '#1A7F37';
      return `<div class="pm-sla-wrap">
        <span class="pm-sla-pct" style="color:${color}">${p.sl.pct}%</span>
        <div class="pm-sla-track"><div class="pm-sla-fill" style="width:${Math.min(p.sl.pct,100)}%;background:${color}"></div></div>
      </div>`;
    };

    const renderRow = p => `
      <tr>
        <td><a class="case-link" href="${p.url}" target="_blank">${p.number} ↗</a></td>
        <td class="td-desc">${p.desc}</td>
        <td><span style="color:${prioColor(p.prio)};font-weight:600">${p.priority}</span></td>
        <td><span class="tag tag-type">${p.uType}</span></td>
        <td><span class="tag">${p.group}</span></td>
        <td class="td-sm">${p.account}</td>
        <td>${p.assigned}</td>
        <td><span class="tag tag-state">${p.stateLabel}</span></td>
        <td class="mono">${p.resolvedAt}</td>
        <td class="mono ${p.mttr&&p.mttr>48?'val-red':''}">${fmtH(p.mttr)}</td>
        <td>${slaBarPM(p)}</td>
        <td><span class="sla-pill ${p.slaBreach?'pill-breach':p.slaLabel==='Sem SLA'?'pill-none':'pill-ok'}">${p.slaLabel}</span></td>
        <td class="td-sm">${p.category}</td>
        <td class="td-sm">${p.closeCode}</td>
      </tr>`;

    const pmByGroup = postList.reduce((a,p)=>{ a[p.group]=(a[p.group]||0)+1; return a; },{});
    const pmByType  = postList.reduce((a,p)=>{ a[p.uType]=(a[p.uType]||0)+1; return a; },{});
    const ts        = new Date().toLocaleString('pt-BR',{timeZone:TZ_BR});
    const gmembersJson = JSON.stringify(GROUP_MEMBERS);

    // ── Analytics: table by analyst + resolved today chart ─────────────
    const G_ID_MAP = {
      'l1'   : '1c7c9057db6771d0832ead8ed396197a',
      'l2'   : 'ff72689247ee1e143cbfe07a216d4357',
      'event': '673c2170476422503cbfe07a216d430f'
    };

    // Analyst table from Aggregate API data
    const buildAggTable = key => {
      const agg = aggData?.[key];
      if (!agg || !agg.rows || !agg.rows.length) return null;
      const map = {};
      agg.rows.forEach(row => {
        const analyst = row.groupby_fields?.find(f=>f.field==='assigned_to')?.display_value || '—';
        const typeVal  = row.groupby_fields?.find(f=>f.field==='u_type')?.value || '';
        const count    = parseInt(row.stats?.count||0);
        if (!map[analyst]) map[analyst] = {sr:0, tt:0};
        if (typeVal==='0') map[analyst].sr += count;
        else if (typeVal==='1') map[analyst].tt += count;
      });
      return Object.entries(map)
        .map(([name,v]) => ({name, sr:v.sr, tt:v.tt, total:v.sr+v.tt}))
        .sort((a,b) => b.total - a.total);
    };

    const analystTableHTML = key => {
      const rows = buildAggTable(key);
      const gid  = G_ID_MAP[key];
      if (!rows || !rows.length) return '<div class="ana-empty">Sem dados</div>';
      const totSR  = rows.reduce((s,r)=>s+r.sr, 0);
      const totTT  = rows.reduce((s,r)=>s+r.tt, 0);
      const totAll = totSR + totTT;
      const RODRIGO_IDS_HTML = ['1a8b95014fc1af00f3d33d828110c7cf','1d2a4cd84f347788c58b8e1f0210c767','38483f9fdbb7b0d0545dee0c139619ab','46b501304fea0700f5e08e1f0210c770','5a1ed5054fc1af00f3d33d828110c7ce'];
      const rodrigoEx = RODRIGO_IDS_HTML.map(id=>`^assigned_to!=${id}`).join('');
      const baseFilter = `assigned_toANYTHING^u_typeIN0,1^u_operating_country=BR^stateIN1,10,21,8,2^u_internal_cases=false${rodrigoEx}^assignment_group=${gid}`;
      const mkUrl = (analyst, type) => {
        let q = baseFilter;
        if (analyst) q += `^assigned_to.display_name=${analyst}`;
        if (type==='SR') q += `^u_type=0`;
        if (type==='TT') q += `^u_type=1`;
        return `${BASE}/sn_customerservice_case_list.do?sysparm_query=${encodeURIComponent(q)}`;
      };
      let html = '<table class="ana-table"><thead><tr>';
      html += '<th>Analista</th>';
      html += '<th class="ana-num">Service Request</th>';
      html += '<th class="ana-num">Trouble</th>';
      html += '<th class="ana-num">Total</th>';
      html += '</tr></thead><tbody>';
      rows.forEach(r => {
        html += '<tr>';
        html += '<td class="ana-name">' + r.name + '</td>';
        html += '<td class="ana-num">' + (r.sr>0 ? '<a class="ana-link" href="' + mkUrl(r.name,'SR') + '" target="_blank">' + r.sr + '</a>' : '<span class="ana-zero">0</span>') + '</td>';
        html += '<td class="ana-num">' + (r.tt>0 ? '<a class="ana-link" href="' + mkUrl(r.name,'TT') + '" target="_blank">' + r.tt + '</a>' : '<span class="ana-zero">0</span>') + '</td>';
        html += '<td class="ana-num ana-total"><a class="ana-link ana-total-link" href="' + mkUrl(r.name,'') + '" target="_blank">' + r.total + '</a></td>';
        html += '</tr>';
      });
      html += '</tbody><tfoot><tr class="ana-foot">';
      html += '<td><a class="ana-link ana-total-link" href="' + mkUrl('','') + '" target="_blank">Total</a></td>';
      html += '<td class="ana-num">' + totSR + '</td>';
      html += '<td class="ana-num">' + totTT + '</td>';
      html += '<td class="ana-num ana-total">' + totAll + '</td>';
      html += '</tr></tfoot></table>';
      return html;
    };

    const analyticsL1    = analystTableHTML('l1');
    const analyticsL2    = analystTableHTML('l2');
    const analyticsEvent = analystTableHTML('event');
    const analyticsAll   = (() => {
      const map = {};
      ['l1','l2','event'].forEach(k=>{
        (buildAggTable(k)||[]).forEach(r=>{
          if(!map[r.name]) map[r.name]={sr:0,tt:0,total:0};
          map[r.name].sr += r.sr||0;
          map[r.name].tt += r.tt||0;
          map[r.name].total += r.total||0;
        });
      });
      const rows = Object.entries(map).map(([name,v])=>({name, sr:v.sr, tt:v.tt, total:v.total})).sort((a,b)=>b.total-a.total);
      if(!rows.length) return '<div class="ana-empty">Sem dados</div>';
      let html = '<table class="ana-table"><thead><tr><th>Analista</th><th class="ana-num">Service Request</th><th class="ana-num">Trouble</th><th class="ana-num">Total</th></tr></thead><tbody>';
      rows.forEach(r=>{html += '<tr><td class="ana-name">'+r.name+'</td><td class="ana-num">'+r.sr+'</td><td class="ana-num">'+r.tt+'</td><td class="ana-num ana-total">'+r.total+'</td></tr>';});
      const totSR=rows.reduce((s,r)=>s+r.sr,0), totTT=rows.reduce((s,r)=>s+r.tt,0), tot=totSR+totTT;
      html += '</tbody><tfoot><tr class="ana-foot"><td>Total</td><td class="ana-num">'+totSR+'</td><td class="ana-num">'+totTT+'</td><td class="ana-num ana-total">'+tot+'</td></tr></tfoot></table>';
      return html;
    })();

    const resolvedChartHTML = (groupKey) => {
      const data = buildResolvedChart(groupKey);
      if (!data.length) return '<div class="ana-empty">Nenhum caso resolvido hoje neste grupo</div>';
      const max  = Math.max(...data.map(d=>d.count));
      const total = data.reduce((s,d)=>s+d.count,0);
      const COLORS = ['#0969DA','#1A7F37','#BF8700','#CF222E','#8250DF','#0550AE','#116329','#7D4E00','#A40E26','#6E40C9','#0969DA','#1A7F37','#BF8700','#CF222E','#8250DF','#0550AE','#116329','#7D4E00','#A40E26','#6E40C9','#0969DA','#1A7F37','#BF8700','#CF222E','#8250DF','#0550AE','#116329','#7D4E00','#A40E26','#6E40C9'];
      return `
        <div class="chart-wrap">
          <div class="chart-header">
            <span class="chart-title">Resolvidos Hoje</span>
            <span class="chart-total">${total} casos</span>
          </div>
          <div class="chart-bars">
            ${data.map((d,i) => `
              <div class="chart-row">
                <div class="chart-label" title="${d.name}">${d.name.split(' ').slice(0,2).join(' ')}</div>
                <div class="chart-bar-track">
                  <div class="chart-bar-fill" style="width:${Math.round((d.count/max)*100)}%;background:${COLORS[i%COLORS.length]}"></div>
                </div>
                <span class="chart-val">${d.count}</span>
              </div>`).join('')}
          </div>
        </div>`;
    };



    return `<!DOCTYPE html><html lang="pt-BR"><head>
<meta charset="UTF-8"><title>EMS Ops — ${mesNome} ${YEAR}</title>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>
:root{
  --bg:#F6F8FA;--surface:#FFFFFF;--surface2:#F6F8FA;
  --border:#D0D7DE;--border2:#BFC8D3;
  --text:#24292F;--text2:#57606A;--muted:#8C959F;
  --red:#CF222E;--ora:#BF8700;--blue:#0550AE;
  --green:#1A7F37;--gray:#57606A;--await:#0969DA;--z-idx-side:100;--z-idx-hdr:200;--z-idx-modal:500;--z-idx-popover:600;--z-idx-max:9999;
  --sans:'Inter',system-ui,sans-serif;--mono:'IBM Plex Mono',monospace;
}
*{margin:0;padding:0;box-sizing:border-box;}
body{background:var(--bg);color:var(--text);font-family:var(--sans);font-size:14px;padding-left:56px;}
a{text-decoration:none;}
.side-nav{position:fixed;left:0;top:0;bottom:0;width:56px;background:#1f2937;border-right:1px solid #111827;z-index:var(--z-idx-side);display:flex;flex-direction:column;align-items:center;padding-top:10px;gap:6px;}
.side-btn{width:42px;height:42px;border:none;border-radius:8px;background:transparent;color:#D1D5DB;cursor:pointer;font-size:10px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;}
.side-btn:hover{background:#374151;color:#fff;}
.side-btn.active{background:#2563EB;color:#fff;}
.side-ico{font-size:14px;line-height:1;}
.header-icons{display:flex;align-items:center;gap:6px;margin-left:8px;}
.top-icon-btn{width:28px;height:28px;border:1px solid var(--border);border-radius:50%;background:var(--surface);color:var(--muted);cursor:pointer;font-size:13px;display:inline-flex;align-items:center;justify-content:center;}
.top-icon-btn:hover{border-color:#0969DA;color:#0969DA;background:#EFF6FF;}

/* HEADER */
.header{background:var(--surface);border-bottom:1px solid var(--border);padding:10px 20px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:var(--z-idx-hdr);box-shadow:0 1px 3px rgba(27,31,36,.04);}
.logo{display:flex;align-items:center;gap:10px;}
.logo-mark{width:28px;height:28px;background:#0969DA;border-radius:6px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:15px;}
.logo-text{font-size:15px;font-weight:600;color:var(--text);}
.header-right{display:flex;align-items:center;gap:12px;}
.h-ts{font-family:var(--mono);font-size:11px;color:var(--muted);}
.h-count{font-size:12px;font-weight:500;color:var(--text2);background:var(--bg);padding:3px 10px;border-radius:20px;border:1px solid var(--border);}

/* TABS */
.tabs{background:var(--surface);border-bottom:1px solid var(--border);display:flex;padding:0 20px;gap:2px;position:sticky;top:49px;z-index:100;}
.tab{padding:9px 16px;font-size:13px;font-weight:500;cursor:pointer;color:var(--muted);border-bottom:2px solid transparent;transition:all .15s;white-space:nowrap;}
.tab:hover{color:var(--text);background:var(--bg);}
.tab.active{color:#0969DA;border-bottom-color:#0969DA;font-weight:600;}
.refresh-wrap{margin-left:auto;display:flex;align-items:center;gap:8px;padding:0 4px;}
.refresh-track{width:72px;height:3px;background:var(--border);border-radius:4px;overflow:hidden;}
.refresh-fill{height:100%;width:100%;background:#0969DA;border-radius:4px;transition:width 1s linear;}
.refresh-txt{font-family:var(--mono);font-size:11px;color:var(--muted);min-width:40px;}
.refresh-btn{background:var(--surface);border:1px solid var(--border);border-radius:6px;padding:2px 8px;font-size:13px;cursor:pointer;color:var(--text2);transition:all .15s;}
.refresh-btn:hover{background:var(--bg);border-color:var(--border2);}

/* MONTH BAR */
.month-bar{background:var(--surface);border-bottom:1px solid var(--border);padding:7px 20px;display:flex;align-items:center;gap:10px;}
.month-lbl{font-size:11px;font-weight:500;color:var(--muted);text-transform:uppercase;letter-spacing:.6px;white-space:nowrap;}
.month-btns{display:flex;gap:4px;flex-wrap:wrap;}
.mbtn{background:var(--surface);border:1px solid var(--border);border-radius:6px;padding:3px 10px;font-size:12px;font-weight:400;color:var(--text2);cursor:pointer;transition:all .15s;font-family:var(--sans);}
.mbtn:hover:not(:disabled){background:var(--bg);border-color:var(--border2);color:var(--text);}
.mbtn.active{background:#0969DA;color:#fff;border-color:#0969DA;font-weight:600;}
.mbtn:disabled{opacity:.5;cursor:not-allowed;}

/* KPI */
.kpi-bar{background:var(--surface);border-bottom:1px solid var(--border);display:flex;}
.kpi{flex:1;padding:10px 14px;text-align:center;border-right:1px solid var(--border);}
.kpi:last-child{border-right:none;}
.kpi:hover{background:var(--bg);}
.kpi-val{font-family:var(--mono);font-size:22px;font-weight:600;line-height:1.1;display:block;}
.kpi-lbl{font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:.7px;margin-top:2px;display:block;}

/* SLA STRIP */
.sla-strip{background:var(--surface);border-bottom:1px solid var(--border);padding:7px 20px;display:flex;align-items:center;gap:12px;}
.sla-strip-lbl{font-size:11px;font-weight:500;color:var(--muted);text-transform:uppercase;letter-spacing:.6px;white-space:nowrap;}
.sla-track-outer{flex:1;height:5px;background:var(--border);border-radius:4px;overflow:hidden;display:flex;}
.sla-seg{height:100%;}
.sla-legend{display:flex;gap:10px;}
/* ACCORDION */
.accordion-wrap{background:var(--surface);border-bottom:1px solid var(--border);}
.accordion-item{border-bottom:1px solid var(--border);}
.accordion-item:last-child{border-bottom:none;}
.accordion-hdr{display:flex;align-items:center;gap:10px;padding:10px 20px;cursor:pointer;user-select:none;transition:background .15s;}
.accordion-hdr:hover{background:var(--bg);}
.acc-icon{font-size:14px;}
.acc-title{font-size:13px;font-weight:600;color:var(--text);flex:1;}
.acc-badge{font-family:var(--mono);font-size:11px;color:var(--muted);background:var(--bg);padding:2px 8px;border-radius:10px;border:1px solid var(--border);}
.acc-arrow{font-size:12px;color:var(--muted);transition:transform .2s;margin-left:4px;}
.accordion-body{padding:10px 16px 12px;border-top:1px solid var(--border);background:var(--bg);}
.acc-grid{display:flex;gap:8px;align-items:flex-start;justify-content:flex-start;}
.acc-report-card{background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:8px 10px;flex-shrink:0;}
/* Analyst table */
.acc-report-card.acc-analyst{width:250px;overflow:hidden;}
.acc-report-card.acc-analyst .ana-table{table-layout:fixed;width:100%;}
.acc-report-card.acc-analyst .ana-table th:first-child,
.acc-report-card.acc-analyst .ana-table td:first-child{width:auto;overflow:hidden;text-overflow:ellipsis;}
.acc-report-card.acc-analyst .ana-table th.ana-num,
.acc-report-card.acc-analyst .ana-table td.ana-num{width:42px;}
.acc-analyst-wrap{display:flex;gap:8px;flex-wrap:nowrap;align-items:flex-start;overflow-x:auto;padding-bottom:2px;}
/* score cards */
.acc-kpis-col{display:flex;flex-direction:column;gap:8px;min-width:max-content;max-width:100%;}
.acc-scores-wrap{display:flex;max-width:100%;overflow-x:auto;padding-bottom:2px;}
.acc-scores-row{display:flex;gap:8px;align-items:stretch;flex-wrap:nowrap;}
.acc-report-card.acc-score-card{width:132px;display:flex;flex-direction:column;justify-content:center;}
/* Resolved chart — fixed width */
.acc-report-card.acc-resolved-card{width:280px;flex-shrink:0;}
.acc-report-title{font-size:9px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:var(--muted);margin-bottom:4px;display:flex;align-items:center;justify-content:space-between;}
.acc-report-link{font-size:10px;color:#0969DA;text-decoration:none;font-weight:400;text-transform:none;letter-spacing:0;}
.acc-report-link:hover{text-decoration:underline;}
.acc-score-wrap{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:6px 0;}
.acc-score-num{font-size:26px;font-weight:700;color:#CF222E;line-height:1;}
.acc-score-lbl{font-size:10px;color:var(--muted);margin-top:4px;text-align:center;}
.acc-score-rating{color:#BF8700;}
.acc-score-month{color:#0969DA;}
/* resolved handled above */
.res-chart-wrap{display:flex;flex-direction:column;gap:5px;padding:4px 0;}
.res-chart-row{display:flex;align-items:center;gap:6px;margin-bottom:2px;}
.res-chart-name{font-size:10px;color:var(--text);width:110px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex-shrink:0;}
.res-chart-bar-wrap{flex:1;background:var(--border);border-radius:2px;height:10px;overflow:hidden;}
.res-chart-bar{height:100%;border-radius:2px;background:#2563EB;transition:width .4s ease;}
.res-chart-count{font-size:10px;font-weight:700;color:#2563EB;min-width:20px;text-align:right;}
.res-chart-total{font-size:10px;color:var(--muted);padding:4px 0 2px;border-top:1px solid var(--border);margin-top:4px;text-align:right;}
.sla-li{display:flex;align-items:center;gap:4px;font-size:11px;color:var(--text2);}
/* COLLAPSIBLE SECTIONS */
.board-section{border-bottom:2px solid var(--border);}
.section-hdr{display:flex;align-items:center;gap:10px;padding:9px 20px;cursor:pointer;background:var(--surface);user-select:none;transition:background .15s;border-bottom:1px solid var(--border);}
.section-hdr:hover{background:#EBF0F5;}
.section-icon{font-size:12px;color:var(--muted);transition:transform .2s;display:inline-block;width:14px;}
.section-title{font-size:13px;font-weight:600;color:var(--text);}
.section-badge{font-size:11px;color:var(--muted);background:var(--bg);padding:2px 10px;border-radius:10px;border:1px solid var(--border);margin-left:auto;}
.section-body{overflow:hidden;}
.section-body.collapsed{display:none;}
.section-refresh-btn{margin-left:8px;background:none;border:1px solid var(--border);border-radius:5px;padding:2px 7px;font-size:12px;cursor:pointer;color:var(--muted);transition:all .15s;}
.section-refresh-btn:hover{background:var(--bg);color:var(--text);border-color:var(--border2);}
.sla-dot{width:7px;height:7px;border-radius:50%;}

/* PAGES */
.page{display:none;}.page.active{display:block;}

/* BOARD */
.board-toolbar{background:var(--surface);border-bottom:1px solid var(--border);padding:8px 20px;display:flex;align-items:center;gap:10px;}
.board-toolbar label{font-size:12px;font-weight:500;color:var(--text2);}
.toolbar-sep{width:1px;height:20px;background:var(--border);margin:0 4px;}
.requests-toolbar{background:var(--surface);border-bottom:1px solid var(--border);padding:8px 20px;display:flex;align-items:center;gap:10px;position:relative;}
.requests-left{position:relative;display:flex;align-items:center;}
.req-all-btn{border:none;background:transparent;color:var(--text);font-size:14px;cursor:pointer;font-weight:600;display:flex;align-items:center;gap:6px;padding:2px 0;}
.requests-actions{display:flex;align-items:center;gap:8px;position:relative;}
.req-icon-btn{border:1px solid var(--border);background:var(--surface);color:var(--muted);border-radius:6px;padding:4px 8px;cursor:pointer;font-size:12px;}
.req-icon-btn.active{background:#EFF6FF;color:#0969DA;border-color:#0969DA;}
.req-menu{position:absolute;top:34px;left:0;background:var(--surface);border:1px solid var(--border2);border-radius:8px;box-shadow:0 8px 24px rgba(27,31,36,.12);padding:8px;z-index:400;display:flex;flex-direction:column;gap:6px;min-width:200px;}
.req-menu button{background:var(--surface);border:1px solid var(--border);border-radius:6px;padding:6px 8px;text-align:left;font-size:12px;cursor:pointer;color:var(--text);}
.req-menu button:hover{background:var(--bg);}
.req-filter-menu{left:auto;right:0;min-width:260px;}
.req-filter-menu label{font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:.45px;font-weight:700;}
.req-filter-menu select{font-size:12px;padding:5px 8px;border:1px solid var(--border);border-radius:6px;background:var(--surface);color:var(--text);}
.req-clear-btn{text-align:center!important;font-weight:600;}
.reports-toolbar{background:var(--surface);border-bottom:1px solid var(--border);padding:10px 16px;display:flex;align-items:center;gap:10px;flex-wrap:wrap;}
.reports-toolbar label{font-size:11px;font-weight:600;color:var(--text2);text-transform:uppercase;letter-spacing:.35px;}
.reports-toolbar select{font-size:12px;padding:4px 10px;border:1px solid var(--border);border-radius:6px;background:var(--surface);color:var(--text);}
.chip-filters{display:flex;align-items:flex-start;gap:10px;min-width:170px;max-width:280px;}
.chip-filter-block{display:flex;flex-direction:column;gap:4px;min-width:0;}
.chip-filter-label{font-size:10px;text-transform:uppercase;letter-spacing:.45px;color:var(--muted);font-weight:700;}
.filter-chip-group{display:flex;gap:6px;overflow-x:auto;padding-bottom:2px;max-width:100%;}
.filter-chip-group::-webkit-scrollbar{height:4px;}
.filter-chip-group::-webkit-scrollbar-thumb{background:var(--border);border-radius:3px;}
.filter-chip{border:1px solid var(--border);background:var(--surface);color:var(--text2);padding:3px 9px;border-radius:999px;font-size:12px;white-space:nowrap;cursor:pointer;display:inline-flex;align-items:center;gap:4px;}
.filter-chip:hover{background:var(--bg);border-color:var(--border2);}
.filter-chip.active{background:#0969DA;color:#fff;border-color:#0969DA;font-weight:600;}
.filter-chip-count{font-family:var(--mono);font-size:11px;opacity:.9;}
.chip-clear-btn{border:1px solid var(--border);background:var(--surface);color:var(--muted);padding:6px 10px;border-radius:8px;font-size:12px;cursor:pointer;white-space:nowrap;margin-left:auto;}
.chip-clear-btn:hover{border-color:#0969DA;color:#0969DA;background:#EFF6FF;}
.filter-select-hidden{display:none!important;}
.refresh-btn{background:none;border:1px solid var(--border);border-radius:6px;padding:3px 8px;font-size:14px;cursor:pointer;color:var(--text2);transition:all .2s;line-height:1;}
.refresh-btn:hover{background:var(--bg);color:#0969DA;border-color:#0969DA;transform:rotate(90deg);}
.board-toolbar select{font-size:13px;padding:4px 10px;border:1px solid var(--border);border-radius:6px;background:var(--surface);color:var(--text);cursor:pointer;font-family:var(--sans);}
.board-toolbar select:hover{border-color:var(--border2);}
.backlog-filters{display:flex;align-items:center;gap:10px;flex-wrap:wrap;}
.board-wrap{padding:14px 16px;overflow-x:auto;}
.board-inner{display:flex;gap:10px;align-items:flex-start;min-width:max-content;}

/* LANES */
.lane{width:258px;background:var(--surface);border:1px solid var(--border);border-radius:8px;display:flex;flex-direction:column;max-height:calc(100vh - 280px);}
.lane-hdr{padding:9px 12px;border-bottom:1px solid var(--border);border-radius:8px 8px 0 0;display:flex;align-items:center;justify-content:space-between;}
.lane-title{display:flex;align-items:center;gap:6px;font-size:12px;font-weight:600;color:var(--text);}
.lane-dot{width:7px;height:7px;border-radius:50%;}
.lane-count{font-family:var(--mono);font-size:12px;font-weight:600;padding:0 7px;border-radius:10px;background:var(--bg);border:1px solid var(--border);}
.lane-body{padding:8px;overflow-y:auto;flex:1;display:flex;flex-direction:column;gap:8px;}
.lane-body::-webkit-scrollbar{width:3px;}
.lane-body::-webkit-scrollbar-thumb{background:var(--border);border-radius:3px;}
.lane-empty{color:var(--muted);font-size:12px;text-align:center;padding:20px 0;}
.analytics-wrap{background:var(--surface);border-bottom:1px solid var(--border);padding:10px 16px;}
.ana-section{min-width:0;}
.ana-section-title{font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.6px;color:var(--muted);margin-bottom:8px;}
.ana-table{border-collapse:collapse;font-size:11px;width:100%;}
.ana-table thead th{padding:4px 6px;text-align:left;font-size:9px;font-weight:600;text-transform:uppercase;letter-spacing:.4px;color:var(--muted);border-bottom:2px solid var(--border);background:var(--bg);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.ana-table thead th.ana-num{text-align:right;width:44px;max-width:44px;}
.ana-table tbody tr:hover td{background:#F0F6FF;}
.ana-table tbody td{padding:3px 6px;border-bottom:1px solid var(--bg);vertical-align:middle;}
.ana-table tbody td.ana-num{text-align:right;width:44px;max-width:44px;}
.ana-table tbody td:first-child{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:110px;}
.ana-name{color:var(--text);white-space:nowrap;}
.ana-num{text-align:center;}
.ana-zero{color:var(--muted);}
.ana-link{color:#0969DA;font-weight:600;text-decoration:none;}
.ana-link:hover{text-decoration:underline;}
.ana-total{font-weight:700;color:var(--text);}
.ana-total-link{color:var(--text)!important;font-weight:700;}
.ana-foot td{padding:5px 10px;font-weight:700;border-top:2px solid var(--border);color:var(--text);background:var(--bg);}
.ana-empty{font-size:12px;color:var(--muted);padding:8px 0;}
.lane-rt{width:220px;min-width:220px;}
.lane-bl{width:258px;min-width:258px;}
.mbtn-backlog{background:#EDE9FE;color:#6E40C9;border-color:#C4B5FD;font-weight:600;}
.mbtn-backlog.active{background:#6E40C9;color:#fff;border-color:#6E40C9;}

/* REASSIGN BUTTON */
.card-reassign-btn{display:inline-flex;align-items:center;background:none;border:1px solid var(--border);border-radius:4px;padding:1px 5px;font-size:10px;cursor:pointer;color:var(--muted);transition:all .15s;margin-left:auto;}
.card-reassign-btn:hover{background:#EFF6FF;color:#0969DA;border-color:#0969DA;}
.tag-iu{font-variant-numeric:tabular-nums;}
.card.dragging{opacity:.55;transform:scale(.99);}
.lane-body.drop-target{outline:2px dashed #0969DA;outline-offset:-4px;border-radius:8px;}
/* REASSIGN DROPDOWN */
.reassign-dd{position:fixed;background:var(--surface);border:1px solid var(--border2);border-radius:8px;box-shadow:0 8px 24px rgba(27,31,36,.15);z-index:var(--z-idx-popover);width:210px;max-height:280px;display:flex;flex-direction:column;}
.iu-dd{position:fixed;background:var(--surface);border:1px solid var(--border2);border-radius:8px;box-shadow:0 8px 24px rgba(27,31,36,.15);z-index:var(--z-idx-popover);width:230px;padding:10px;display:flex;flex-direction:column;gap:8px;}
.iu-dd label{font-size:10px;font-weight:600;color:#57606A;text-transform:uppercase;}
.iu-dd select{width:100%;font-size:12px;padding:5px 6px;border:1px solid #D0D7DE;border-radius:4px;}
.iu-dd-actions{display:flex;justify-content:flex-end;gap:6px;}
.reassign-title{font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:var(--muted);padding:8px 12px 4px;}
.reassign-search{padding:6px 10px;border:none;border-bottom:1px solid var(--border);font-size:12px;outline:none;font-family:var(--sans);color:var(--text);}
.reassign-list{overflow-y:auto;flex:1;}
.reassign-opt{padding:7px 12px;font-size:12px;cursor:pointer;color:var(--text);}
.reassign-opt:hover{background:var(--bg);}
.reassign-current{color:#0969DA;font-weight:600;}
/* TOAST */
.toast{position:fixed;bottom:24px;right:24px;background:#24292F;color:#fff;padding:10px 18px;border-radius:8px;font-size:13px;font-weight:500;z-index:var(--z-idx-max);opacity:0;transform:translateY(8px);transition:all .25s;}
.toast.toast-show{opacity:1;transform:none;}
.toast.toast-error{background:#CF222E;}
.toast.toast-warn{background:#BF8700;}
/* ANALYST BOARD */
.analyst-board-wrap{background:var(--bg);border-top:2px solid var(--border);}
.analyst-board-toolbar{background:var(--surface);border-bottom:1px solid var(--border);padding:8px 20px;display:flex;align-items:center;gap:10px;}
.analyst-board-toolbar label{font-size:12px;font-weight:500;color:var(--text2);}
.analyst-board-toolbar select{font-size:13px;padding:4px 10px;border:1px solid var(--border);border-radius:6px;background:var(--surface);color:var(--text);font-family:var(--sans);cursor:pointer;min-width:220px;}
.analyst-board-header{display:flex;align-items:center;justify-content:space-between;padding:8px 20px;background:var(--surface);border-bottom:1px solid var(--border);}
.analyst-board-name{font-size:14px;font-weight:600;color:var(--text);}
.analyst-board-count{font-family:var(--mono);font-size:12px;color:var(--muted);background:var(--bg);padding:2px 8px;border-radius:10px;border:1px solid var(--border);}
.analyst-loading,.analyst-empty{padding:24px 20px;font-size:13px;color:var(--muted);text-align:center;}
/* CASE MODAL */
.modal-detail-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:4px;}
.modal-detail-item{display:flex;flex-direction:column;gap:2px;}
.modal-detail-lbl{font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:#57606A;}
.modal-detail-val{font-size:12px;color:#24292F;}
.modal-section-title{font-size:11px;font-weight:600;color:#57606A;text-transform:uppercase;letter-spacing:.5px;border-bottom:1px solid #D0D7DE;padding-bottom:4px;margin-bottom:6px;}
.modal-desc{font-size:12px;color:#24292F;line-height:1.5;background:#F6F8FA;border-radius:4px;padding:8px;}
.modal-journal{border-left:4px solid #D0D7DE;padding:10px 12px;margin-bottom:8px;border-radius:0 6px 6px 0;}
.modal-j-meta{font-size:10px;color:#57606A;margin-bottom:4px;display:flex;align-items:center;gap:6px;}
.modal-j-author{font-weight:700;color:#24292F;font-size:11px;}
.modal-j-time{font-size:10px;color:#8B949E;}
.modal-j-text{font-size:12px;color:#24292F;line-height:1.5;white-space:pre-wrap;margin-top:4px;}
.modal-j-code{background:#F6F8FA;border:1px solid #D0D7DE;border-radius:6px;padding:8px;white-space:pre-wrap;font-size:11px;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;}
.modal-j-badge{font-size:9px;padding:2px 7px;border-radius:10px;font-weight:600;letter-spacing:.3px;}
.modal-j-wn{background:#DBEAFE;color:#1D4ED8;}
.modal-j-cm{background:#F3F4F6;color:#374151;}
/* work note = analista interno = azul */
.modal-journal-wn{background:#F0F7FF;border-left-color:#2563EB;}
.modal-journal-wn .modal-j-author{color:#1D4ED8;}
/* comment = externo/cliente = laranja quente */
.modal-journal-client{background:#FFFBF5;border-left-color:#F97316;}
.modal-journal-client .modal-j-author{color:#C2410C;}
/* comment de sistema/automação = cinza */
.modal-journal-cm{background:#F9FAFB;border-left-color:#9CA3AF;}
.modal-account-btn{background:none;border:none;padding:0;text-align:left;font-size:12px;color:#0969DA;cursor:pointer;text-decoration:underline;font-family:inherit;}
.modal-account-btn:hover{color:#1D4ED8;}
.account-products-list{display:flex;flex-direction:column;gap:8px;max-height:42vh;overflow:auto;padding-right:4px;}
.account-product-item{padding:8px 10px;background:#F6F8FA;border:1px solid #D0D7DE;border-radius:6px;font-size:12px;color:#24292F;}
.account-product-empty{font-size:12px;color:#57606A;padding:8px;border:1px dashed #D0D7DE;border-radius:6px;background:#fff;}
.acc-sec{margin-bottom:12px;border:1px solid #D0D7DE;border-radius:8px;overflow:hidden;background:#fff;}
.acc-sec-h{padding:8px 10px;background:#F6F8FA;border-bottom:1px solid #D0D7DE;font-size:12px;font-weight:700;color:#1f2937;display:flex;justify-content:space-between;align-items:center;}
.acc-sec-sub{font-size:11px;font-weight:500;color:#57606A;}
.acc-table-wrap{max-height:260px;overflow:auto;}
.acc-table{width:100%;border-collapse:collapse;font-size:12px;}
.acc-table th{position:sticky;top:0;background:#fff;border-bottom:1px solid #D0D7DE;text-align:left;padding:8px;color:#57606A;font-size:11px;text-transform:uppercase;letter-spacing:.3px;}
.acc-table td{padding:8px;border-bottom:1px solid #EEF2F7;color:#1f2937;vertical-align:top;}
.acc-cell-muted{color:#57606A;font-size:11px;}
.acc-sec-warn{color:#CF222E !important;}
.acc-sec-tm{font-size:11px;font-weight:600;color:#1A7F37;background:#DCFCE7;padding:1px 7px;border-radius:8px;border:1px solid #86EFAC;margin-left:6px;}
.acc-badge{display:inline-block;font-size:10px;color:#57606A;background:#F6F8FA;padding:1px 6px;border-radius:8px;border:1px solid #D0D7DE;}
.acc-badge-tm{color:#1A7F37;background:#DCFCE7;border-color:#86EFAC;font-weight:600;}
.acc-badge-ok{color:#0550AE;background:#EFF6FF;border-color:#BFDBFE;}
.acc-sep-row td{background:#F6F8FA !important;border-bottom:1px solid #D0D7DE !important;}
.acc-sec-ok{color:#1A7F37 !important;font-weight:600;}
.modal-state-badge{display:inline-block;padding:1px 8px;border-radius:10px;font-size:11px;font-weight:500;}
.card.modal-active{outline:2px solid #0969DA;outline-offset:1px;}
.rt-row{display:flex;align-items:center;gap:5px;margin-bottom:3px;}
.rt-name{font-size:11px;color:var(--text2);width:90px;flex-shrink:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.rt-track{flex:1;height:12px;background:var(--bg);border-radius:3px;overflow:hidden;border:1px solid var(--border);}
.rt-fill{height:100%;border-radius:3px;}
.rt-val{font-family:var(--mono);font-size:11px;font-weight:600;color:var(--text);width:20px;text-align:right;flex-shrink:0;}



/* CARDS */
.card{background:var(--surface);border:1px solid var(--border);border-left:3px solid;border-radius:6px;padding:10px 10px 8px;transition:box-shadow .15s,transform .18s,outline-color .2s;animation:su .2s ease;}
@keyframes su{from{opacity:0;transform:translateY(3px)}to{opacity:1;transform:none}}
.card:hover{box-shadow:0 2px 8px rgba(27,31,36,.1);transform:translateY(-1px);}
.card-new{animation:cardNew .75s ease;}
.card-updated{animation:cardPulse .95s ease;outline:2px solid #0969DA;outline-offset:1px;}
.card-moved{animation:cardMoved .55s ease;}
@keyframes cardNew{0%{transform:translateY(8px) scale(.985);opacity:.6}60%{transform:translateY(-2px) scale(1.01);opacity:1}100%{transform:none;opacity:1}}
@keyframes cardPulse{0%{box-shadow:0 0 0 0 rgba(9,105,218,.35)}70%{box-shadow:0 0 0 10px rgba(9,105,218,0)}100%{box-shadow:none}}
@keyframes cardMoved{0%{transform:translateX(-8px) scale(.99)}60%{transform:translateX(2px) scale(1.008)}100%{transform:none}}
.card-critical{border-left-color:var(--red)}.card-high{border-left-color:var(--ora)}
.card-medium{border-left-color:var(--blue)}.card-normal{border-left-color:var(--green)}
.card-awaiting{border-left-color:var(--await)}.card-orphan{border-left-color:var(--gray)}
.card-top{display:flex;align-items:center;justify-content:flex-start;margin-bottom:4px;gap:6px;flex-wrap:wrap;}
.card-num{font-family:var(--mono);font-size:11px;font-weight:600;color:#0969DA;}
.card-num:hover{text-decoration:underline;}
.card-prio-badge{font-size:10px;font-weight:700;border-radius:999px;padding:2px 8px;color:#fff;line-height:1.3;}
.card-prio-1{background:#CF222E;}
.card-prio-2{background:#BF8700;}
.card-prio-3{background:#0550AE;}
.card-prio-4{background:#1A7F37;}
.card-prio-5{background:#6E7781;}
.badge-await{font-size:10px;background:#DBEAFE;color:#1D4ED8;border:1px solid #BFDBFE;padding:1px 6px;border-radius:4px;}
.badge-internal{font-size:9px;padding:1px 6px;border-radius:4px;background:#F3E8FF;color:#7C3AED;font-weight:600;border:1px solid #DDD6FE;}
.card-desc{font-size:12px;line-height:1.45;color:var(--text);margin-bottom:8px;}
.sla-bar-wrap{margin-bottom:7px;}
.sla-bar-label{display:flex;justify-content:space-between;margin-bottom:2px;}
.sla-bar-name{font-size:10px;color:var(--muted);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:160px;}
.sla-bar-pct{font-family:var(--mono);font-size:10px;font-weight:600;}
.sla-bar-track{height:4px;background:var(--bg);border-radius:3px;overflow:hidden;border:1px solid var(--border);}
.sla-bar-fill{height:100%;border-radius:3px;}
.sla-time{font-size:10px;color:var(--muted);display:block;margin-top:2px;text-align:right;}
.card-tags{display:flex;flex-wrap:wrap;gap:3px;margin-bottom:7px;}
.tag{font-size:10px;padding:1px 6px;border-radius:4px;border:1px solid var(--border);background:var(--bg);color:var(--text2);}
.tag-state{background:#EFF2F5;color:#0550AE;border-color:#B6C4D1;}
.tag-type{background:#FFF8C5;color:#7D4E00;border-color:#E3B34160;}
.card-footer{display:flex;justify-content:space-between;align-items:center;}
.card-assigned{font-size:10px;color:var(--muted);display:inline-flex;align-items:center;gap:6px;max-width:70%;}
.card-assigned.unassigned{color:var(--ora);font-weight:600;}
.card-avatar{width:20px;height:20px;border-radius:50%;background:#DDF4FF;color:#0550AE;font-size:9px;font-weight:700;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;border:1px solid #BFDBFE;}
.card-assigned.unassigned .card-avatar{background:#FFF8C5;color:#9A6700;border-color:#E3B341;}
.card-assigned span:last-child{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.card-time{font-family:var(--mono);font-size:10px;color:#0550AE;background:#EFF6FF;border:1px solid #BFDBFE;padding:2px 6px;border-radius:999px;}
body.compact-ui .lane-body{gap:6px;padding:6px;}
body.compact-ui .card{padding:8px 8px 6px;}
body.compact-ui .card-desc{margin-bottom:5px;font-size:11px;}

/* POST-MORTEM */
.pm-wrap{padding:18px 20px;}
.pm-title{font-size:17px;font-weight:600;margin-bottom:14px;color:var(--text);}
.pm-stats{display:flex;gap:10px;margin-bottom:18px;}
.pm-stat{flex:1;background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:12px 14px;}
.pm-stat-val{font-family:var(--mono);font-size:24px;font-weight:600;line-height:1;}
.pm-stat-lbl{font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:.7px;margin-top:4px;}
.pm-stat-hint{font-size:10px;color:var(--muted);margin-top:2px;font-style:italic;}
.pm-breakdown{display:flex;gap:10px;margin-bottom:18px;}
.pm-break{flex:1;background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:12px 14px;}
.pm-break-title{font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.7px;color:var(--muted);margin-bottom:8px;}
.pm-break-row{display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px solid var(--bg);font-size:12px;}
.pm-break-row:last-child{border:none;}
.pm-break-val{font-family:var(--mono);font-weight:600;}

/* TABLE */
.table-wrap{background:var(--surface);border:1px solid var(--border);border-radius:8px;overflow:hidden;}
.filter-bar{display:flex;flex-wrap:wrap;gap:5px;padding:7px 12px;background:#F0F6FF;border-bottom:1px solid #B6C4D1;}
.filter-bar:empty{display:none;}
.pm-pagination{display:flex;align-items:center;justify-content:space-between;padding:8px 14px;background:var(--surface);border:1px solid var(--border);border-radius:8px 8px 0 0;border-bottom:none;margin-top:4px;}
.pg-info{font-size:12px;color:var(--muted);}
.pg-btns{display:flex;align-items:center;gap:6px;}
.pg-btn{background:var(--surface);border:1px solid var(--border);border-radius:6px;padding:3px 12px;font-size:12px;font-weight:500;cursor:pointer;color:var(--text2);font-family:var(--sans);}
.pg-btn:hover:not(:disabled){background:var(--bg);border-color:var(--border2);color:var(--text);}
.pg-btn:disabled{opacity:.4;cursor:not-allowed;}
.pg-pages{display:flex;gap:3px;}
.pg-page{background:var(--surface);border:1px solid var(--border);border-radius:4px;padding:2px 7px;font-size:12px;cursor:pointer;color:var(--text2);min-width:28px;text-align:center;}
.pg-page:hover{background:var(--bg);}
.pg-page.active{background:#0969DA;color:#fff;border-color:#0969DA;font-weight:600;}
.filter-tag{display:flex;align-items:center;gap:4px;background:var(--surface);border:1px solid #B6C4D1;border-radius:4px;padding:2px 8px;color:#0550AE;font-size:11px;}
.filter-tag button{background:none;border:none;cursor:pointer;color:#0550AE;font-size:13px;line-height:1;padding:0;}
table{width:100%;border-collapse:collapse;font-size:13px;}
thead{background:var(--bg);}
th{padding:8px 12px;text-align:left;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:var(--muted);border-bottom:1px solid var(--border);white-space:nowrap;}
th[data-col]{cursor:pointer;user-select:none;}
th[data-col]:hover{background:#EBF0F5;color:var(--text);}
th[data-col].active-filter{color:#0969DA;}
.th-arr{font-size:9px;color:var(--muted);margin-left:3px;}
td{padding:8px 12px;border-bottom:1px solid var(--bg);vertical-align:middle;color:var(--text);}
tr:last-child td{border:none;}
tr:hover td{background:#F6F8FA;}
.td-desc{color:var(--text2);max-width:190px;}
.td-sm{color:var(--text2);font-size:12px;max-width:130px;}
.mono{font-family:var(--mono);font-size:11px;}
.val-red{color:var(--red);font-weight:600;}
.muted-val{color:var(--muted);}
.case-link{font-family:var(--mono);font-size:11px;font-weight:600;color:#0969DA;}
.case-link:hover{text-decoration:underline;}
.sla-pill{font-size:10px;font-weight:600;padding:2px 7px;border-radius:10px;}
.pill-breach{background:#FFEBE9;color:#CF222E;border:1px solid #FFD1CC;}
.pill-ok{background:#DAFBE1;color:#116329;border:1px solid #A7F3C0;}
.pill-none{background:#F6F8FA;color:#57606A;border:1px solid #D0D7DE;}
.pm-sla-wrap{min-width:70px;}
.pm-sla-pct{font-family:var(--mono);font-size:11px;font-weight:600;display:block;margin-bottom:2px;}
.pm-sla-track{height:3px;background:var(--bg);border-radius:2px;overflow:hidden;border:1px solid var(--border);}
.pm-sla-fill{height:100%;border-radius:2px;}

/* FILTER DROPDOWN */
.fdd{position:fixed;background:var(--surface);border:1px solid var(--border2);border-radius:8px;box-shadow:0 8px 24px rgba(27,31,36,.12);z-index:1000;min-width:200px;max-width:280px;max-height:320px;display:flex;flex-direction:column;}
.fdd-search{padding:8px 10px;border:none;border-bottom:1px solid var(--border);font-size:13px;outline:none;width:100%;font-family:var(--sans);color:var(--text);}
.fdd-opts{overflow-y:auto;flex:1;}
.fdd-opt{display:flex;align-items:center;gap:8px;padding:7px 12px;cursor:pointer;font-size:13px;color:var(--text);}
.fdd-opt:hover{background:var(--bg);}
.fdd-opt input{flex-shrink:0;accent-color:#0969DA;}
.fdd-foot{padding:7px 10px;border-top:1px solid var(--border);display:flex;gap:6px;justify-content:flex-end;}
.fdd-foot button{font-size:12px;padding:4px 12px;border-radius:6px;cursor:pointer;border:1px solid var(--border);font-family:var(--sans);}
.fdd-apply{background:#0969DA;color:#fff;border-color:#0969DA!important;}
.fdd-clear{background:var(--surface);color:var(--text2);}

/* TOKEN ERROR */
#tok-err{position:fixed;inset:0;background:rgba(27,31,36,.5);z-index:var(--z-idx-max);display:none;align-items:center;justify-content:center;}
.tok-modal{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:28px 36px;text-align:center;max-width:360px;box-shadow:0 8px 24px rgba(27,31,36,.12);}
.settings-ov{position:fixed;inset:0;background:rgba(27,31,36,.45);z-index:var(--z-idx-modal);display:flex;align-items:center;justify-content:center;}
.settings-md{width:min(520px,92vw);background:var(--surface);border:1px solid var(--border2);border-radius:12px;box-shadow:0 12px 36px rgba(27,31,36,.24);padding:16px;}
.settings-h{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;}
.settings-ttl{font-size:14px;font-weight:700;color:var(--text);}
.settings-grid{display:grid;grid-template-columns:1fr auto;gap:10px 14px;align-items:center;}
.settings-grid label{font-size:12px;color:var(--text2);}
.settings-grid select,.settings-grid input[type="checkbox"]{font-size:12px;}
.settings-actions{display:flex;justify-content:flex-end;gap:8px;margin-top:14px;}
</style></head><body>

<div id="tok-err" style="display:none">
  <div class="tok-modal">
    <div style="font-size:32px;margin-bottom:10px">⚠️</div>
    <div style="font-size:15px;font-weight:600;margin-bottom:6px">Sessão expirada</div>
    <div style="font-size:13px;color:var(--muted);margin-bottom:18px">Token expirou. Clique no ícone da extensão para gerar novo painel.</div>
    <button onclick="document.getElementById('tok-err').style.display='none'" style="background:#0969DA;color:#fff;border:none;border-radius:6px;padding:7px 18px;font-size:13px;font-weight:600;cursor:pointer">OK</button>
  </div>
</div>

<div class="header">
  <div class="logo">
    <div class="logo-mark">🖥</div>
    <div class="logo-text">EMS Ops Dashboard</div>
  </div>
  <div class="header-right">
    <span class="h-ts">${ts}</span>
    <span class="h-count">${mesNome} ${YEAR} · Ativos: ${classified.length} (${ativosCount} ativos / ${backlogCount} backlog) · Post-mortem: ${postList.length}</span>
    <div class="header-icons">
      <button class="top-icon-btn" title="Buscar" onclick="topAction('search')">🔍</button>
      <button class="top-icon-btn" title="Favoritos" onclick="topAction('fav')">✦</button>
      <button class="top-icon-btn" title="Histórico" onclick="topAction('refresh')">↻</button>
      <button class="top-icon-btn" title="Notificações" onclick="topAction('alerts')">🔔</button>
      <button class="top-icon-btn" title="Configurações" onclick="topAction('settings')">⚙️</button>
    </div>
  </div>
</div>

<div class="side-nav">
  <button class="side-btn active" onclick="activateSide(this);showPage('kanban')"><span class="side-ico">🏠</span><span>Home</span></button>
  <button class="side-btn" onclick="activateSide(this);showPage('backlog')"><span class="side-ico">📦</span><span>Backlog</span></button>
  <button class="side-btn" onclick="activateSide(this);showPage('postmortem')"><span class="side-ico">🔎</span><span>Post</span></button>
  <button class="side-btn" onclick="activateSide(this);showPage('reports')"><span class="side-ico">📊</span><span>Reports</span></button>
</div>

<div class="tabs" style="display:none">
  <div class="tab active" onclick="showPage('kanban',this)">📋 Cases Ativos</div>
  <div class="tab" onclick="showPage('backlog',this)">📦 Backlog</div>
  <div class="tab" onclick="showPage('postmortem',this)">🔍 Post-mortem</div>
  <div class="tab" style="display:none" onclick="showPage('reports',this)">📊 Reports</div>
  <div style="display:flex;align-items:center;gap:6px;margin-left:auto;">
    <span id="refresh-status" style="font-size:11px;color:var(--muted);"></span>
  </div>
</div>

<div class="page active" id="page-kanban">
  <div class="month-bar">
  <span class="month-lbl">Mês:</span>
  <div class="month-btns" id="mbtns">
    <button class="mbtn active" onclick="changeMes(${mes})">${MES_NAMES[mes-1].substring(0,3)}</button>
  </div>
</div>

<div class="page" id="page-reports">
  <div class="reports-toolbar">
    <label for="rpt-fila-sel">📌 Fila</label>
    <select id="rpt-fila-sel" onchange="switchReportsFila(this.value)">
      <option value="all">Todos</option>
      <option value="l1">L1</option>
      <option value="l2">L2</option>
      <option value="event">Event</option>
    </select>
    <label for="rpt-manager-sel">👔 Manager</label>
    <select id="rpt-manager-sel" onchange="switchReportsManager(this.value)">
      <option value="">— Todos —</option>
    </select>
    <label for="rpt-analyst-sel">👤 Analista</label>
    <select id="rpt-analyst-sel" onchange="switchReportsAnalyst(this.value)">
      <option value="">— Todos —</option>
    </select>
  </div>
  <div id="reports-page-wrap"></div>
</div>

<div class="kpi-bar">
  <div class="kpi"><span class="kpi-val">${classified.length}</span><span class="kpi-lbl">Cases Ativos</span></div>
  <div class="kpi"><span class="kpi-val" style="color:var(--red)">${totalBreach}</span><span class="kpi-lbl">SLA Breach</span></div>
  <div class="kpi"><span class="kpi-val" style="color:var(--ora)">${totalRisk}</span><span class="kpi-lbl">SLA em Risco</span></div>
  <div class="kpi"><span class="kpi-val" style="color:var(--await)">${totalAwait}</span><span class="kpi-lbl">Aguardando</span></div>
  <div class="kpi"><span class="kpi-val" style="color:var(--ora)">${totalOrphan}</span><span class="kpi-lbl">Sem Responsável</span></div>
  <div class="kpi"><span class="kpi-val" style="color:var(--green)">${pctHealth}%</span><span class="kpi-lbl">SLA Saudável</span></div>
</div>

<div class="sla-strip">
  <span class="sla-strip-lbl">SLA Health</span>
  <div class="sla-track-outer">
    <div class="sla-seg" style="width:${classified.length?Math.round(totalBreach/classified.length*100):0}%;background:#CF222E"></div>
    <div class="sla-seg" style="width:${classified.length?Math.round(totalRisk/classified.length*100):0}%;background:#BF8700"></div>
    <div class="sla-seg" style="flex:1;background:#1A7F37"></div>
  </div>
  <div class="sla-legend">
    <div class="sla-li"><div class="sla-dot" style="background:#CF222E"></div>Breach (${totalBreach})</div>
    <div class="sla-li"><div class="sla-dot" style="background:#BF8700"></div>Risco (${totalRisk})</div>
    <div class="sla-li"><div class="sla-dot" style="background:#1A7F37"></div>OK (${classified.length-totalBreach-totalRisk})</div>
  </div>
</div>

<!-- Reports Accordion -->
  <div class="requests-toolbar">
    <div class="requests-left">
      <button class="req-all-btn" onclick="toggleQueueMenu(event)" id="req-all-btn">🛡️ Todos os casos ▾</button>
      <div class="req-menu" id="req-queue-menu" style="display:none;">
        <button type="button" onclick="switchFila('all');closeReqMenus();">Todos os casos</button>
        <button type="button" onclick="switchFila('l1');closeReqMenus();">EMS OPS L1</button>
        <button type="button" onclick="switchFila('l2');closeReqMenus();">EMS OPS L2</button>
        <button type="button" onclick="switchFila('event');closeReqMenus();">EMS Event BR</button>
      </div>
    </div>
    <div class="requests-actions">
      <button class="req-icon-btn" onclick="toggleFilterMenu(event)" title="Filtrar Manager e Analista">⚙️</button>
      <div class="req-menu req-filter-menu" id="req-filter-menu" style="display:none;">
        <label for="manager-sel">Manager</label>
        <select id="manager-sel" onchange="switchManager(this.value)">
          <option value="">— Todos —</option>
        </select>
        <label for="analyst-sel">Analista</label>
        <select id="analyst-sel" onchange="switchAnalyst(this.value)">
          <option value="">— Todos —</option>
          ${(GROUP_MEMBERS['1c7c9057db6771d0832ead8ed396197a']||[]).sort((a,b)=>a.name.localeCompare(b.name)).map(a=>`<option value="${a.id}">${a.name}</option>`).join('')}
        </select>
        <button type="button" class="req-clear-btn" onclick="clearToolbarFilters();closeReqMenus();">Limpar filtros</button>
      </div>
      <button class="req-icon-btn" onclick="toggleSlaSort()" id="sla-sort-btn" title="Ordenar por SLA">⇅ SLA</button>
    </div>
    <div class="toolbar-sep"></div>
    <div class="toolbar-search-wrap">
      <input id="board-search" type="text" placeholder="🔍 Buscar CS... ou Account..." oninput="boardSearch(this.value)" style="font-size:12px;padding:4px 10px;border:1px solid var(--border);border-radius:6px;width:220px;font-family:var(--sans);color:var(--text);">
      <button onclick="boardSearch('');document.getElementById('board-search').value='';" style="font-size:11px;padding:3px 7px;border:1px solid var(--border);border-radius:6px;background:var(--surface);color:var(--muted);cursor:pointer;margin-left:3px;">✕</button>
    </div>
    <div class="toolbar-sep"></div>
    <button onclick="refreshKanban()" class="refresh-btn" title="Atualizar Cases Ativos">↻</button>
    <select id="fila-sel" class="filter-select-hidden" onchange="switchFila(this.value)">
      <option value="all">Todos</option>
      <option value="l1">L1</option>
      <option value="l2">L2</option>
      <option value="event">Event</option>
    </select>
  </div>
  <!-- Reports accordion (only in Cases Ativos) -->
  <div class="accordion-wrap" id="accordion-wrap" style="display:none;">
  <div class="accordion-item" id="acc-analyst">
    <div class="accordion-hdr" id="acc-hdr-analyst">
      <span class="acc-icon">📊</span>
      <span class="acc-title">Reports</span>
      <span class="acc-badge" id="acc-badge-analyst"></span>
      <span class="acc-arrow" id="acc-arrow-analyst" style="transform:rotate(180deg)">▾</span>
      <button class="refresh-btn" onclick="event.stopPropagation();refreshReports()" title="Atualizar Reports" style="font-size:13px;margin-left:4px;">↻</button>
    </div>
    <div class="accordion-body" id="acc-body-analyst" data-open="0" style="display:none">
      <div class="acc-grid">
        <div class="acc-analyst-wrap">
          <div class="acc-report-card acc-analyst">
            <div class="acc-report-title">Cases Ativos por Analista · L1</div>
            <div id="ana-table-wrap-acc-l1"></div>
          </div>
          <div class="acc-report-card acc-analyst">
            <div class="acc-report-title">Cases Ativos por Analista · L2</div>
            <div id="ana-table-wrap-acc-l2"></div>
          </div>
          <div class="acc-report-card acc-analyst">
            <div class="acc-report-title">Cases Ativos por Analista · Event</div>
            <div id="ana-table-wrap-acc-event"></div>
          </div>
        </div>
        <div class="acc-kpis-col">
          <div class="acc-scores-wrap">
            <div class="acc-scores-row">
              <div class="acc-report-card acc-score-card">
                <div class="acc-report-title">Sem Type
                  <a href="https://equinixcsm.service-now.com/sys_report_template.do?jvar_report_id=afec7b28933bb290771238797bba106e" target="_blank" class="acc-report-link">Abrir no Snow ↗</a>
                </div>
                <div class="acc-score-wrap">
                  <div class="acc-score-num" id="sem-type-score">—</div>
                  <div class="acc-score-lbl">sem tipo</div>
                </div>
              </div>
              <div class="acc-report-card acc-score-card">
                <div class="acc-report-title">Last Client
                  <a href="https://equinixcsm.service-now.com/sys_report_template.do?jvar_report_id=132e7da233211ed497e2fba45d5c7bb5" target="_blank" class="acc-report-link">Abrir no Snow ↗</a>
                </div>
                <div class="acc-score-wrap">
                  <div class="acc-score-num" id="last-interacted-score">—</div>
                  <div class="acc-score-lbl">últ. interação cliente</div>
                </div>
              </div>
              <div class="acc-report-card acc-score-card">
                <div class="acc-report-title">Support Attention
                  <a href="#" target="_blank" class="acc-report-link" id="support-attention-link">Abrir no Snow ↗</a>
                </div>
                <div class="acc-score-wrap">
                  <div class="acc-score-num" id="support-attention-score">—</div>
                  <div class="acc-score-lbl">requerem atenção</div>
                </div>
              </div>
              <div class="acc-report-card acc-score-card">
                <div class="acc-report-title">Rating EMS (Ano)</div>
                <div class="acc-score-wrap">
                  <div class="acc-score-num acc-score-rating" id="rating-score">—</div>
                  <div class="acc-score-lbl">nota média</div>
                </div>
              </div>
              <div class="acc-report-card acc-score-card">
                <div class="acc-report-title">Customer Satisfaction</div>
                <div class="acc-score-wrap">
                  <div class="acc-score-num acc-score-rating" id="customer-satisfaction-score">—</div>
                  <div class="acc-score-lbl">(% promotors - detractors) / total</div>
                </div>
              </div>
            </div>
          </div>
          <div class="acc-scores-wrap">
            <div class="acc-scores-row">
              <div class="acc-report-card acc-score-card">
                <div class="acc-report-title">Resolvidos no Mês · L1</div>
                <div class="acc-score-wrap">
                  <div class="acc-score-num acc-score-month" id="resolved-month-score-l1">—</div>
                  <div class="acc-score-lbl">casos resolvidos</div>
                </div>
              </div>
              <div class="acc-report-card acc-score-card">
                <div class="acc-report-title">Resolvidos no Mês · L2</div>
                <div class="acc-score-wrap">
                  <div class="acc-score-num acc-score-month" id="resolved-month-score-l2">—</div>
                  <div class="acc-score-lbl">casos resolvidos</div>
                </div>
              </div>
              <div class="acc-report-card acc-score-card">
                <div class="acc-report-title">Resolvidos no Mês · Event</div>
                <div class="acc-score-wrap">
                  <div class="acc-score-num acc-score-month" id="resolved-month-score-event">—</div>
                  <div class="acc-score-lbl">casos resolvidos</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  <!-- Hidden data source for analytics (used by accordion + switchFila) -->
  <div id="ana-table-wrap" style="display:none">${analyticsL1}</div>
  <div id="_at_all" style="display:none">${analyticsAll}</div>
  <div id="_at_l1" style="display:none">${analyticsL1}</div>
  <div id="_at_l2" style="display:none">${analyticsL2}</div>
  <div id="_at_event" style="display:none">${analyticsEvent}</div>
  <!-- Section 1: Ativos -->
  <div class="board-section" id="section-ativos">
    <div class="section-hdr" onclick="toggleSection('ativos')" style="display:none;">
      <span class="section-icon" id="section-icon-ativos">▾</span>
      <span class="section-title">📋 Cases Ativos</span>
      <span class="section-badge" id="section-badge-ativos">${ativosCount} cases · <20 dias</span>
      <button class="section-refresh-btn" onclick="event.stopPropagation();refreshKanban()" title="Atualizar Cases Ativos">↺</button>
    </div>
    <div class="section-body" id="section-body-ativos">
      <div class="board-wrap" id="board-wrap">
        ${renderBoard('all', ativosMap)}
      </div>
    </div>
  </div>

  <!-- Backlog moved to its own tab -->

  <!-- Analyst board (no separate section — shown inline below active cases) -->
  <div id="analyst-board-content"></div>


</div>

<div class="page" id="page-backlog">
  <div class="board-toolbar" style="padding:8px 20px;">
    <div class="backlog-filters">
      <label for="backlog-fila-sel">📌 Fila:</label>
      <select id="backlog-fila-sel" onchange="switchFilaBacklog(this.value)">
        <option value="all">Todos</option>
        <option value="l1">L1</option>
        <option value="l2">L2</option>
        <option value="event">Event</option>
      </select>
      <div class="toolbar-sep"></div>
      <label for="backlog-analyst-sel">👤 Analista:</label>
      <select id="backlog-analyst-sel" onchange="switchAnalystBacklogFromToolbar(this.value)">
        <option value="">— Todos —</option>
      </select>
    </div>
    <div class="toolbar-sep"></div>
    <button onclick="refreshBacklog()" class="refresh-btn" title="Atualizar Backlog">↻</button>
  </div>
  <div class="board-section" style="border:none;">
    <div class="section-hdr" onclick="toggleSection('backlog-tab')">
      <span class="section-icon" id="section-icon-backlog-tab">▾</span>
      <span class="section-title">📦 Backlog</span>
      <span class="section-badge" id="section-badge-backlog-tab">${backlogCount} cases · ≥20 dias</span>
      <button class="section-refresh-btn" onclick="event.stopPropagation();refreshBacklog()" title="Atualizar Backlog">↺</button>
    </div>
    <div class="section-body" id="section-body-backlog-tab">
      <div class="board-wrap" id="board-wrap-backlog-tab">
        ${renderBoard('all', backlogMap, false)}
      </div>
    </div>
  </div>
</div>

<div class="page" id="page-postmortem">
  <div class="pm-wrap">
    <div class="pm-title" style="display:flex;align-items:center;justify-content:space-between;">
      <span>Post-mortem — Resolvidos em ${mesNome} ${YEAR}</span>
      <button class="refresh-btn" onclick="refreshPostmortem()" title="Atualizar Post-mortem" style="font-size:13px;">↻</button>
    </div>
    <div class="pm-stats">
      <div class="pm-stat"><div class="pm-stat-val">${postList.length}</div><div class="pm-stat-lbl">Total Resolvidos</div></div>
      <div class="pm-stat"><div class="pm-stat-val" style="color:var(--red)">${pmBreach}</div><div class="pm-stat-lbl">Tiveram Breach</div></div>
      <div class="pm-stat"><div class="pm-stat-val" style="color:var(--blue)">${avgMTTR}h</div><div class="pm-stat-lbl">MTTR Médio</div><div class="pm-stat-hint">Abertura → Resolução</div></div>
      <div class="pm-stat"><div class="pm-stat-val" style="color:var(--green)">${postList.filter(p=>p.slaLabel==='OK').length}</div><div class="pm-stat-lbl">Dentro do SLA</div></div>
      <div class="pm-stat"><div class="pm-stat-val">${postList.length?Math.round((pmBreach/postList.length)*100):0}%</div><div class="pm-stat-lbl">% com Breach</div></div>
    </div>
    <div class="pm-breakdown">
      <div class="pm-break"><div class="pm-break-title">Por Fila</div>${Object.entries(pmByGroup).map(([k,v])=>`<div class="pm-break-row"><span>${k}</span><span class="pm-break-val">${v}</span></div>`).join('')||'<span style="color:var(--muted);font-size:12px">Sem dados</span>'}</div>
      <div class="pm-break"><div class="pm-break-title">Por Tipo</div>${Object.entries(pmByType).map(([k,v])=>`<div class="pm-break-row"><span>${k}</span><span class="pm-break-val">${v}</span></div>`).join('')||'<span style="color:var(--muted);font-size:12px">Sem dados</span>'}</div>
    </div>
    ${postList.length?`
    <div class="pm-pagination" id="pm-pg-wrap">
      <div class="pg-info" id="pg-info">Mostrando 1-50 de ${postList.length}</div>
      <div class="pg-btns">
        <button class="pg-btn" id="pg-prev" onclick="pgNav(-1)" disabled>‹ Anterior</button>
        <span class="pg-pages" id="pg-pages"></span>
        <button class="pg-btn" id="pg-next" onclick="pgNav(1)">Próximo ›</button>
      </div>
    </div>
    <div class="table-wrap">
      <div class="filter-bar" id="fbar"></div>
      <table><thead><tr>
        <th data-col="0">Número <span class="th-arr">▾</span></th>
        <th data-col="1">Descrição <span class="th-arr">▾</span></th>
        <th data-col="2">Prioridade <span class="th-arr">▾</span></th>
        <th data-col="3">Tipo <span class="th-arr">▾</span></th>
        <th data-col="4">Fila <span class="th-arr">▾</span></th>
        <th data-col="5">Cliente <span class="th-arr">▾</span></th>
        <th data-col="6">Resolvido por <span class="th-arr">▾</span></th>
        <th data-col="7">Status <span class="th-arr">▾</span></th>
        <th data-col="8">Resolvido em <span class="th-arr">▾</span></th>
        <th data-col="9">MTTR <span class="th-arr">▾</span></th>
        <th data-col="10">% SLA <span class="th-arr">▾</span></th>
        <th data-col="11">SLA <span class="th-arr">▾</span></th>
        <th data-col="12">Categoria <span class="th-arr">▾</span></th>
        <th data-col="13">Motivo <span class="th-arr">▾</span></th>
      </tr></thead>
      <tbody id="pmtbody">${postList.map(renderRow).join('')}</tbody></table>
    </div>`:`<div style="background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:60px;text-align:center;color:var(--muted);">Nenhum caso resolvido em ${mesNome} ${YEAR}</div>`}
  </div>
</div>

<script>
let _TOK = (window.opener && !window.opener.closed) ? (window.opener.g_ck || window.opener.top?.g_ck || window.opener.parent?.g_ck) : null;
let _HEADERS_OBJ = { 'Accept': 'application/json', 'X-UserToken': _TOK };
const _BASE='${BASE}',_IDS='${G_IDS}',_MES=${m};
const _MN=['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
const _GN={'1c7c9057db6771d0832ead8ed396197a':'L1 OpsCenter AMER','673c2170476422503cbfe07a216d430f':'Event Management BR','ff72689247ee1e143cbfe07a216d4357':'L2 OpsCenter AMER'};
const _GK={'1c7c9057db6771d0832ead8ed396197a':'l1','673c2170476422503cbfe07a216d430f':'event','ff72689247ee1e143cbfe07a216d4357':'l2'};

// Helper de busca centralizado com renovação de sessão e tratamento de erro
async function snFetch(url, opts = {}) {
  // Tenta obter o token mais recente da janela pai se o atual for nulo ou falhar
  if (!_TOK && window.opener && !window.opener.closed) {
    _TOK = window.opener.g_ck || window.opener.top?.g_ck || window.opener.parent?.g_ck;
  }

  opts.headers = opts.headers || { ..._HEADERS_OBJ };
  opts.headers['X-UserToken'] = _TOK;
  
  let r = await fetch(url, opts);
  
  // Se der erro de autenticação, tenta ler o token novo da aba 'mãe'
  if ((r.status === 401 || r.status === 403) && window.opener && !window.opener.closed) {
    try {
      const nt = window.opener.g_ck || window.opener.top?.g_ck || window.opener.parent?.g_ck;
      if (nt && nt !== _TOK) {
        console.log('[Dashboard] Sessão renovada via ServiceNow.');
        _TOK = nt;
        _HEADERS_OBJ['X-UserToken'] = nt;
        opts.headers['X-UserToken'] = nt;
        r = await fetch(url, opts);
      }
    } catch(e) {}
  }
  return r;
}

// Per-module refresh (no auto-refresh)
function refreshKanban(){
  setRefreshStatus('↻ Atualizando...');
  if(window.opener&&!window.opener.closed&&typeof window.opener._emsOpsRender==='function'){
    window.opener._emsOpsRender(_TOK,_MES,window);
  } else {
    changeMes(_MES);
  }
}
function refreshBacklog(){
  refreshKanban();
}
function refreshPostmortem(){
  setRefreshStatus('↻ Atualizando post-mortem...');
  if(window.opener&&!window.opener.closed&&typeof window.opener._emsOpsRender==='function'){
    window.opener._emsOpsRender(_TOK,_MES,window);
  } else {
    changeMes(_MES);
  }
}
function refreshReports(){
  setRefreshStatus('↻ Atualizando reports...');
  ['sem-type-score','last-interacted-score','support-attention-score','rating-score','customer-satisfaction-score'].forEach(id=>{const e=document.getElementById(id);if(e){e.textContent='—';e.style.color='';}});
  ['resolved-month-score-l1','resolved-month-score-l2','resolved-month-score-event'].forEach(id=>{
    const elR=document.getElementById(id);
    if(elR)elR.innerHTML='<div style="color:var(--muted);font-size:12px;padding:8px 0;">Carregando...</div>';
  });
  // Also reload analyst tables
  initAccordion();
}
function refreshMyCases(){
  initMyCases();
}

let currentFila='all';
let currentBacklogFila='all';
let currentBacklogAnalyst='';
let currentReportsFila='all';
let currentReportsManager='';
let currentReportsAnalyst='';
window._GMEMBERS=${gmembersJson};
window._GID_MAP={'all':_IDS,'l1':'1c7c9057db6771d0832ead8ed396197a','l2':'ff72689247ee1e143cbfe07a216d4357','event':'673c2170476422503cbfe07a216d430f'};
window._MANAGER_CACHE={};
window._MSH_NOC_GID=undefined;
window._REPORTS_FETCH_CACHE={ttlMs:30000,entries:{},inflight:{}};
window._ACCOUNT_PRODUCTS_CACHE={ttlMs:120000,entries:{}};
    window._UI_SETTINGS={pollingMs:120000,compact:false,defaultSort:'none'};
try{
  const saved=JSON.parse(localStorage.getItem('ems_ops_ui_settings')||'{}');
  window._UI_SETTINGS={...window._UI_SETTINGS,...saved};
}catch(e){}

function applyUiSettings(){
  document.body.classList.toggle('compact-ui', !!window._UI_SETTINGS.compact);
  if(window._UI_SETTINGS.defaultSort==='sla'&&!window._slaSortOn){
    setTimeout(()=>toggleSlaSort(),0);
  }
}

function closeSettingsModal(){
  document.getElementById('settings-overlay')?.remove();
}
function openSettingsModal(){
  closeSettingsModal();
  const s=window._UI_SETTINGS||{};
  const ov=document.createElement('div');
  ov.id='settings-overlay';
  ov.className='settings-ov';
  ov.innerHTML='<div class="settings-md">'+
    '<div class="settings-h"><div class="settings-ttl">⚙️ Configurações do Painel</div><button type="button" onclick="closeSettingsModal()" class="refresh-btn">✕</button></div>'+
    '<div class="settings-grid">'+
      '<label for="set-polling">Intervalo do polling em tempo real</label>'+
      '<select id="set-polling"><option value="15000">15s</option><option value="30000">30s</option><option value="60000">60s</option><option value="120000">120s</option></select>'+
      '<label for="set-compact">Modo compacto (menos espaçamento)</label><input id="set-compact" type="checkbox">'+
      '<label for="set-sort">Ordenação padrão</label><select id="set-sort"><option value="none">Padrão</option><option value="sla">SLA</option></select>'+
    '</div>'+
    '<div class="settings-actions"><button type="button" class="refresh-btn" onclick="closeSettingsModal()">Cancelar</button><button type="button" class="refresh-btn" id="set-save-btn">Salvar</button></div>'+
  '</div>';
  document.body.appendChild(ov);
  ov.querySelector('#set-polling').value=String(s.pollingMs||30000);
  ov.querySelector('#set-compact').checked=!!s.compact;
  ov.querySelector('#set-sort').value=s.defaultSort||'none';
  ov.querySelector('#set-save-btn').onclick=()=>{
    window._UI_SETTINGS.pollingMs=parseInt(ov.querySelector('#set-polling').value,10)||30000;
    window._UI_SETTINGS.compact=!!ov.querySelector('#set-compact').checked;
    window._UI_SETTINGS.defaultSort=ov.querySelector('#set-sort').value||'none';
    localStorage.setItem('ems_ops_ui_settings',JSON.stringify(window._UI_SETTINGS));
    applyUiSettings();
    if(typeof window.__setDeltaPollingInterval==='function') window.__setDeltaPollingInterval(window._UI_SETTINGS.pollingMs);
    closeSettingsModal();
    showToast('✅ Configurações aplicadas');
  };
}

function fetchJsonCached(url, options){
  const now=Date.now();
  const cache=window._REPORTS_FETCH_CACHE;
  const key=url;
  const hit=cache.entries[key];
  if(hit && now-hit.ts<cache.ttlMs) return Promise.resolve(hit.data);
  if(cache.inflight[key]) return cache.inflight[key];
  cache.inflight[key]=snFetch(url,options)
    .then(r=>r.json())
    .then(data=>{
      cache.entries[key]={ts:Date.now(),data};
      return data;
    })
    .finally(()=>{delete cache.inflight[key];});
  return cache.inflight[key];
}

async function ensureMshNocGroupId(){
  if(window._MSH_NOC_GID!==undefined) return window._MSH_NOC_GID;
  try{
    const r=await fetch(_BASE+'/api/now/table/sys_user_group?sysparm_query='+encodeURIComponent('name=MSH_NOC')+'&sysparm_fields=sys_id&sysparm_limit=1',{
      headers:{'Accept':'application/json','X-UserToken':_TOK}
    });
    const d=await r.json();
    window._MSH_NOC_GID=d.result?.[0]?.sys_id?.value||d.result?.[0]?.sys_id||'';
  }catch(e){window._MSH_NOC_GID='';}
  return window._MSH_NOC_GID;
}

async function ensureManagerData(gid){
  if(!gid) return {members:[],managers:[]};
  if(window._MANAGER_CACHE[gid]) return window._MANAGER_CACHE[gid];
  let baseMembers=(window._GMEMBERS?.[gid]||[]).slice();
  if(!baseMembers.length&&gid.includes(',')){
    const byId={};
    Object.keys(window._GMEMBERS||{}).forEach(k=>{
      (window._GMEMBERS[k]||[]).forEach(m=>{if(m?.id&&!byId[m.id])byId[m.id]={id:m.id,name:m.name};});
    });
    baseMembers=Object.values(byId);
    // Add MSH_NOC members so manager/analyst filters include this queue as well.
    try{
      const rGm=await fetch(_BASE+'/api/now/table/sys_user_grmember?sysparm_query='+encodeURIComponent('group=3469cd95dbe9dbc0b3cd73e1ba9619b3')+'&sysparm_fields=user&sysparm_display_value=all&sysparm_limit=500',{
        headers:{'Accept':'application/json','X-UserToken':_TOK}
      });
      const dGm=await rGm.json();
      (dGm.result||[]).forEach(row=>{
        const uid=row.user?.value||'';
        const uname=row.user?.display_value||'';
        if(uid&&!byId[uid]) byId[uid]={id:uid,name:uname||uid};
      });
      baseMembers=Object.values(byId);
    }catch(e){}
  }
  const ids=baseMembers.map(m=>m.id).filter(Boolean);
  if(!ids.length){
    const empty={members:[],managers:[]};
    window._MANAGER_CACHE[gid]=empty;
    return empty;
  }
  try{
    const r=await fetch(_BASE+'/api/now/table/sys_user?sysparm_query='+encodeURIComponent('sys_idIN'+ids.join(','))+'&sysparm_fields=sys_id,name,manager&sysparm_display_value=all&sysparm_limit=500',{
      headers:{'Accept':'application/json','X-UserToken':_TOK}
    });
    const d=await r.json();
    const byId={};
    (d.result||[]).forEach(u=>{byId[u.sys_id?.value||u.sys_id]=u;});
    const members=baseMembers.map(m=>{
      const u=byId[m.id]||{};
      return {
        id:m.id,
        name:m.name,
        managerId:u.manager?.value||'',
        managerName:u.manager?.display_value||'Sem manager'
      };
    });
    const mgrMap={};
    members.forEach(m=>{if(m.managerId)mgrMap[m.managerId]=m.managerName;});
    const managers=Object.entries(mgrMap).map(([id,name])=>({id,name})).sort((a,b)=>a.name.localeCompare(b.name,'pt'));
    window._MANAGER_CACHE[gid]={members,managers};
  }catch(e){
    const fallback={members:baseMembers.map(m=>({id:m.id,name:m.name,managerId:'',managerName:''})),managers:[]};
    window._MANAGER_CACHE[gid]=fallback;
  }
  return window._MANAGER_CACHE[gid];
}

function getMembersByManager(gid, managerId){
  const cached=window._MANAGER_CACHE?.[gid];
  const members=(cached?.members||window._GMEMBERS?.[gid]||[]).slice();
  if(!managerId) return members;
  return members.filter(m=>m.managerId===managerId);
}

async function populateManagerDropdown(selectId,key){
  const sel=document.getElementById(selectId); if(!sel) return;
  const gid=window._GID_MAP?.[key]||'';
  const prev=sel.value||'';
  const data=await ensureManagerData(gid);
  const sig=gid+'|'+data.managers.length;
  if(sel.dataset.sig!==sig){
    sel.innerHTML='<option value="">— Todos —</option>'+data.managers.map(m=>'<option value="'+m.id+'">'+m.name+'</option>').join('');
    sel.dataset.sig=sig;
  }
  if(prev&&Array.from(sel.options).some(o=>o.value===prev)) sel.value=prev;
}

function populateAnalystDropdown(selectId,key,managerId,placeholder){
  const sel=document.getElementById(selectId); if(!sel) return;
  const gid=window._GID_MAP?.[key]||'';
  const prev=sel.value||'';
  const members=getMembersByManager(gid,managerId).slice().sort((a,b)=>a.name.localeCompare(b.name,'pt'));
  const sig=gid+'|'+(managerId||'all')+'|'+members.length;
  if(sel.dataset.sig!==sig){
    sel.innerHTML='<option value="">'+(placeholder||'— Todos —')+'</option>'+members.map(a=>'<option value="'+a.id+'">'+a.name+'</option>').join('');
    sel.dataset.sig=sig;
  }
  if(prev&&Array.from(sel.options).some(o=>o.value===prev)) sel.value=prev;
}

function renderFilterChips(){
  const esc=s=>String(s??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const filaSel=document.getElementById('fila-sel');
  const filaGroup=document.getElementById('fila-chip-group');
  if(!filaSel||!filaGroup) return;

  const queueCounts=window._queueCaseCounts||{};
  const currentBoardCount=document.querySelectorAll('#board-wrap .card').length;
  filaGroup.innerHTML=Array.from(filaSel.options).map(o=>{
    const count=(queueCounts[o.value]??(o.value===filaSel.value?currentBoardCount:0));
    const active=o.value===filaSel.value?' active':'';
    return '<button class="filter-chip'+active+'" data-chip-type="fila" data-chip-value="'+esc(o.value)+'" type="button">'+
      '<span>'+esc(o.textContent)+'</span><span class="filter-chip-count">'+count+'</span></button>';
  }).join('');

  document.querySelectorAll('.filter-chip[data-chip-type]').forEach(btn=>{
    if(btn.dataset.bound==='1') return;
    btn.dataset.bound='1';
    btn.addEventListener('click',()=>{
      const type=btn.dataset.chipType||'';
      const value=btn.dataset.chipValue||'';
      if(type==='fila') switchFila(value);
    });
  });
}

function clearToolbarFilters(){
  const managerSel=document.getElementById('manager-sel');
  const analystSel=document.getElementById('analyst-sel');
  if(managerSel) managerSel.value='';
  if(analystSel) analystSel.value='';
  switchManager('');
}

function closeReqMenus(){
  const qm=document.getElementById('req-queue-menu');
  const fm=document.getElementById('req-filter-menu');
  if(qm) qm.style.display='none';
  if(fm) fm.style.display='none';
}

function toggleQueueMenu(e){
  e?.stopPropagation?.();
  const qm=document.getElementById('req-queue-menu');
  const fm=document.getElementById('req-filter-menu');
  if(!qm) return;
  if(fm) fm.style.display='none';
  qm.style.display=(qm.style.display==='none'||!qm.style.display)?'flex':'none';
}

function toggleFilterMenu(e){
  e?.stopPropagation?.();
  const qm=document.getElementById('req-queue-menu');
  const fm=document.getElementById('req-filter-menu');
  if(!fm) return;
  if(qm) qm.style.display='none';
  fm.style.display=(fm.style.display==='none'||!fm.style.display)?'flex':'none';
}

let _slaSortOn=false;
function getCardSlaScore(card){
  if(!card) return 0;
  const pct=parseInt((card.querySelector('.sla-bar-pct')?.textContent||'0').replace(/\D/g,''),10)||0;
  const timeTxt=(card.querySelector('.sla-time')?.textContent||'').toUpperCase();
  if(timeTxt.includes('BREACH')) return 1000+pct;
  return pct;
}
function applySlaSort(){
  document.querySelectorAll('#board-wrap .lane .lane-body').forEach(body=>{
    const cards=Array.from(body.querySelectorAll('.card'));
    cards.sort((a,b)=>getCardSlaScore(b)-getCardSlaScore(a));
    cards.forEach(c=>body.appendChild(c));
  });
}
function toggleSlaSort(){
  _slaSortOn=!_slaSortOn;
  const btn=document.getElementById('sla-sort-btn');
  if(btn) btn.classList.toggle('active',_slaSortOn);
  if(_slaSortOn){
    applySlaSort();
  }else{
    switchFila(currentFila);
  }
}

function updateRequestsLabel(){
  const labels={all:'Todos os casos',l1:'EMS OPS L1',l2:'EMS OPS L2',event:'EMS Event BR'};
  const btn=document.getElementById('req-all-btn');
  if(btn) btn.textContent='🛡️ '+(labels[currentFila]||'Todos os casos')+' ▾';
}

function topAction(kind){
  if(kind==='search'){
    const inp=document.getElementById('board-search');
    if(inp){inp.focus();inp.select?.();}
    return;
  }
  if(kind==='refresh'){
    refreshKanban();
    return;
  }
  if(kind==='settings'){
    openSettingsModal();
    return;
  }
  if(kind==='alerts'){
    showToast('🔔 Sem novas notificações');
    return;
  }
  if(kind==='fav'){
    showToast('⭐ Favoritos em breve');
  }
}

function switchReportsFila(value){
  const safeKey=['all','l1','l2','event'].includes(value)?value:'all';
  currentReportsFila=safeKey;
  const rptFila=document.getElementById('rpt-fila-sel');
  if(rptFila&&rptFila.value!==safeKey) rptFila.value=safeKey;
  populateManagerDropdown('rpt-manager-sel', safeKey).then(()=>{
    const managerSel=document.getElementById('rpt-manager-sel');
    if(managerSel&&managerSel.value!==currentReportsManager) managerSel.value=currentReportsManager||'';
    if(managerSel&&!Array.from(managerSel.options).some(o=>o.value===managerSel.value)){
      managerSel.value='';
      currentReportsManager='';
    }
    populateAnalystDropdown('rpt-analyst-sel', safeKey, currentReportsManager, '— Todos —');
    const analystSel=document.getElementById('rpt-analyst-sel');
    if(analystSel&&analystSel.value!==currentReportsAnalyst) analystSel.value=currentReportsAnalyst||'';
    if(analystSel&&!Array.from(analystSel.options).some(o=>o.value===analystSel.value)){
      analystSel.value='';
      currentReportsAnalyst='';
    }
    updateReportsByFila();
    applyAnalystTableFilter();
    fetchAccordionScores();
  });
}
function switchReportsManager(value){
  currentReportsManager=value||'';
  const managerSel=document.getElementById('rpt-manager-sel');
  if(managerSel&&managerSel.value!==currentReportsManager) managerSel.value=currentReportsManager;
  populateAnalystDropdown('rpt-analyst-sel', currentReportsFila, currentReportsManager, '— Todos —');
  const analystSel=document.getElementById('rpt-analyst-sel');
  if(analystSel){
    if(!Array.from(analystSel.options).some(o=>o.value===currentReportsAnalyst)){
      currentReportsAnalyst='';
    }
    analystSel.value=currentReportsAnalyst;
  }
  applyAnalystTableFilter();
  fetchAccordionScores();
}
function switchReportsAnalyst(value){
  currentReportsAnalyst=value||'';
  const analystSel=document.getElementById('rpt-analyst-sel');
  if(analystSel&&analystSel.value!==currentReportsAnalyst) analystSel.value=currentReportsAnalyst;
  applyAnalystTableFilter();
  fetchAccordionScores();
}

function getReportAssigneeFilter(gid){
  const analystId=currentReportsAnalyst||document.getElementById('rpt-analyst-sel')?.value||'';
  const managerId=currentReportsManager||document.getElementById('rpt-manager-sel')?.value||'';
  if(analystId) return '^assigned_to='+analystId;
  if(managerId){
    const ids=getMembersByManager(gid,managerId).map(m=>m.id).filter(Boolean);
    return ids.length?'^assigned_toIN'+ids.join(','):'^sys_id=-1';
  }
  return '';
}

function getRatingAssigneeFilter(){
  const analystId=currentReportsAnalyst||document.getElementById('rpt-analyst-sel')?.value||'';
  const managerId=currentReportsManager||document.getElementById('rpt-manager-sel')?.value||'';
  if(analystId) return {type:'analyst',id:analystId};
  if(managerId) return {type:'manager',id:managerId};
  return {type:'none'};
}

function applyAnalystTableFilter(){
  const managerId=currentReportsManager||document.getElementById('rpt-manager-sel')?.value||'';
  const analystId=currentReportsAnalyst||document.getElementById('rpt-analyst-sel')?.value||'';
  const queueCfg=[
    {key:'l1', gid:window._GID_MAP?.l1||''},
    {key:'l2', gid:window._GID_MAP?.l2||''},
    {key:'event', gid:window._GID_MAP?.event||''}
  ];
  let visible=0;
  queueCfg.forEach(cfg=>{
    const wrap=document.getElementById('ana-table-wrap-acc-'+cfg.key);
    const src=document.getElementById('_at_'+cfg.key)?.innerHTML||'';
    if(wrap && src && wrap.dataset.src!==cfg.key){wrap.innerHTML=src;wrap.dataset.src=cfg.key;}
    const rows=document.querySelectorAll('#ana-table-wrap-acc-'+cfg.key+' .ana-table tbody tr');
    let allowNames=null;
    if(analystId){
      let foundName='';
      const member=(window._MANAGER_CACHE?.[cfg.gid]?.members||window._GMEMBERS?.[cfg.gid]||[]).find(m=>m.id===analystId);
      if(member?.name) foundName=member.name;
      allowNames=new Set(foundName?[foundName]:[]);
    }else if(managerId){
      const members=getMembersByManager(cfg.gid,managerId);
      allowNames=new Set(members.map(m=>m.name));
    }
    rows.forEach(r=>{
      const name=(r.cells?.[0]?.innerText||r.cells?.[0]?.textContent||'').trim();
      const show=!allowNames||allowNames.has(name);
      r.style.display=show?'':'none';
      if(show) visible++;
    });
  });
  const badge=document.getElementById('acc-badge-analyst');
  if(badge) badge.textContent=visible?visible+' analistas':'';
}

function showPage(id,el){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
  const page=document.getElementById('page-'+id);
  if(page) page.classList.add('active');
  if(el) el.classList.add('active');
  else {
    const tabMap={kanban:0,backlog:1,postmortem:2,reports:3};
    const idx=tabMap[id];
    const tab=document.querySelectorAll('.tab')[idx];
    if(tab) tab.classList.add('active');
  }
  if(id==='postmortem') pgInit();
  if(id==='backlog'){
    switchAnalystBacklog(currentBacklogAnalyst||document.getElementById('backlog-analyst-sel')?.value||'');
  }
  if(id==='reports'){
    switchReportsFila(currentReportsFila||document.getElementById('rpt-fila-sel')?.value||'all');
  }
  if(id==='kanban'){
    // Re-init accordion in case it wasn't loaded yet
    const anaL1=document.getElementById('ana-table-wrap-acc-l1');
    if(!anaL1||!anaL1.innerHTML||anaL1.innerHTML.trim().length<10){
      initAccordion();
    }
  }
}
function activateSide(btn){
  document.querySelectorAll('.side-btn').forEach(b=>b.classList.remove('active'));
  if(btn) btn.classList.add('active');
}


const _LANE_IU_MAP={
  critical:{impact:'1',urgency:'1'},
  high:{impact:'1',urgency:'2'},
  medium:{impact:'2',urgency:'2'},
  awaiting:{impact:'3',urgency:'3'},
  normal:{impact:'3',urgency:'3'},
  orphan:{impact:'3',urgency:'3'}
};
let _dragCard=null;

function refreshLaneCountersInBoard(boardInner){
  if(!boardInner) return;
  boardInner.querySelectorAll('.lane[data-lane]').forEach(lane=>{
    const countEl=lane.querySelector('.lane-count');
    if(countEl) countEl.textContent=String(Array.from(lane.querySelectorAll('.lane-body .card')).filter(c=>c.style.display!=='none').length);
  });
}

function applyImpactUrgencyFromLane(card,laneKey){
  const map=_LANE_IU_MAP[laneKey];
  const sysId=card?.dataset?.sysid;
  if(!card||!map||!sysId) return Promise.resolve(false);
  return patchCase(sysId,{impact:map.impact,urgency:map.urgency}).then(ok=>{
    if(ok){
      syncImpactUrgencyInUI(sysId,map.impact,map.urgency);
      showToast('✅ Impact/Urgency ajustado para '+laneKey);
      if(_modalSysId===sysId){
        const numEl=document.getElementById('modal-num');
        if(numEl) setTimeout(()=>openCaseModal(sysId,numEl.textContent,_modalActiveCard||card),250);
      }
      return true;
    }
    showToast('❌ Não foi possível ajustar Impact/Urgency','error');
    return false;
  });
}

function initCardDragAndDrop(){
  const board=document.getElementById('board-wrap');
  if(!board) return;
  board.querySelectorAll('.card').forEach(card=>{
    if(card.dataset.dragReady==='1') return;
    card.dataset.dragReady='1';
    card.draggable=true;
    card.addEventListener('dragstart',()=>{_dragCard=card;card.classList.add('dragging');});
    card.addEventListener('dragend',()=>{card.classList.remove('dragging');_dragCard=null;board.querySelectorAll('.lane-body.drop-target').forEach(el=>el.classList.remove('drop-target'));});
  });

  board.querySelectorAll('.lane .lane-body').forEach(body=>{
    if(body.dataset.dropReady==='1') return;
    body.dataset.dropReady='1';
    body.addEventListener('dragover',e=>{e.preventDefault();body.classList.add('drop-target');});
    body.addEventListener('dragleave',()=>body.classList.remove('drop-target'));
    body.addEventListener('drop',e=>{
      e.preventDefault();
      body.classList.remove('drop-target');
      if(!_dragCard) return;
      if(_dragCard.parentElement!==body){
        body.insertBefore(_dragCard,body.firstChild);
      }
      const laneEl=body.closest('.lane');
      const laneKey=laneEl?.dataset?.lane||'';
      if(laneKey){
        Array.from(_dragCard.classList).filter(c=>c.startsWith('card-')).forEach(c=>_dragCard.classList.remove(c));
        _dragCard.classList.add('card-'+laneKey);
      }
      refreshLaneCountersInBoard(board.querySelector('.board-inner'));
      if(laneKey) applyImpactUrgencyFromLane(_dragCard,laneKey);
      reapplyAnalystFilters();
    });
  });
}

function switchFila(key){
  const safeKey=['all','l1','l2','event'].includes(key)?key:'all';
  currentFila=safeKey;
  updateRequestsLabel();
  closeReqMenus();
  const filaSel=document.getElementById('fila-sel');
  if(filaSel && filaSel.value!==safeKey) filaSel.value=safeKey;
  const ativosBoards={'all':${JSON.stringify(renderBoard('all',ativosMap))},'l1':${JSON.stringify(renderBoard('l1',ativosMap))},'l2':${JSON.stringify(renderBoard('l2',ativosMap))},'event':${JSON.stringify(renderBoard('event',ativosMap))}};
  window._queueCaseCounts=Object.fromEntries(Object.entries(ativosBoards).map(([k,html])=>{
    const c=(html||'').match(/data-count="(\d+)"/g)||[];
    const total=c.reduce((s,m)=>s+parseInt(m.replace(/\D/g,''),10),0);
    return [k,total];
  }));
  const bAtivos=document.getElementById('board-wrap');
  if(bAtivos)bAtivos.innerHTML=ativosBoards[safeKey]||'';
  initCardDragAndDrop();
  const ba=document.getElementById('section-badge-ativos');
  if(ba){const c=(ativosBoards[safeKey]||'').match(/data-count="(\d+)"/g)||[];const tot=c.reduce((s,m)=>s+parseInt(m.replace(/\D/g,'')),0);ba.textContent=tot+' cases · <20 dias';}
  const tbl=document.getElementById('_at_'+safeKey)?.innerHTML||'';
  document.getElementById('ana-table-wrap').innerHTML=tbl;
  populateManagerDropdown('manager-sel', safeKey).then(()=>{
    const managerId=document.getElementById('manager-sel')?.value||'';
    populateAnalystDropdown('analyst-sel', safeKey, managerId, '— Todos —');
    switchAnalyst(document.getElementById('analyst-sel')?.value||'');
    renderFilterChips();
  });
  document.getElementById('analyst-board-content').innerHTML='';
  renderFilterChips();
  if(_slaSortOn) applySlaSort();
}

function updateReportsByFila(){
  const key=currentReportsFila||'all';
  const showAll=key==='all';
  const accGrid=document.querySelector('.acc-grid');
  if(accGrid) accGrid.style.justifyContent=showAll?'space-between':'flex-start';
  const analystWrap=document.querySelector('.acc-analyst-wrap');
  if(analystWrap) analystWrap.style.display=showAll?'none':'flex';
  const kpiCol=document.querySelector('.acc-kpis-col');
  if(kpiCol){
    kpiCol.style.flex=showAll?'':'1';
    kpiCol.style.width=showAll?'100%':'';
    kpiCol.style.maxWidth=showAll?'100%':'';
  }
  ['l1','l2','event'].forEach(k=>{
    const tableWrap=document.getElementById('ana-table-wrap-acc-'+k);
    const tableCard=tableWrap?.closest('.acc-report-card');
    if(tableCard) tableCard.style.display=(showAll||k===key)?'':'none';
    const rmEl=document.getElementById('resolved-month-score-'+k);
    const rmCard=rmEl?.closest('.acc-report-card');
    if(rmCard) rmCard.style.display=(showAll||k===key)?'':'none';
  });
}

function switchManager(managerId){
  populateAnalystDropdown('analyst-sel', currentFila, managerId, '— Todos —');
  const analystId=document.getElementById('analyst-sel')?.value||'';
  switchAnalyst(analystId);
  renderFilterChips();
}

function syncBacklogAnalystDropdown(){
  populateAnalystDropdown('backlog-analyst-sel', currentBacklogFila, '', '— Todos —');
  const dst=document.getElementById('backlog-analyst-sel');
  if(!dst) return;
  if(Array.from(dst.options).some(o=>o.value===currentBacklogAnalyst)){
    dst.value=currentBacklogAnalyst;
  }else{
    currentBacklogAnalyst='';
    dst.value='';
  }
}

function switchFilaBacklog(key){
  const safeKey=['all','l1','l2','event'].includes(key)?key:'all';
  currentBacklogFila=safeKey;
  const filaSelBacklog=document.getElementById('backlog-fila-sel');
  if(filaSelBacklog && filaSelBacklog.value!==safeKey) filaSelBacklog.value=safeKey;
  const backlogBoards={'all':${JSON.stringify(renderBoard('all',backlogMap,false))},'l1':${JSON.stringify(renderBoard('l1',backlogMap,false))},'l2':${JSON.stringify(renderBoard('l2',backlogMap,false))},'event':${JSON.stringify(renderBoard('event',backlogMap,false))}};
  const bBacklog=document.getElementById('board-wrap-backlog-tab');
  if(bBacklog)bBacklog.innerHTML=backlogBoards[safeKey]||'';
  syncBacklogAnalystDropdown();
  switchAnalystBacklog(currentBacklogAnalyst);
}

function switchAnalystBacklogFromToolbar(analystId){
  currentBacklogAnalyst=analystId||'';
  const bsel=document.getElementById('backlog-analyst-sel');
  if(bsel&&bsel.value!==currentBacklogAnalyst) bsel.value=currentBacklogAnalyst;
  switchAnalystBacklog(currentBacklogAnalyst);
}

function switchAnalystBacklog(analystId){
  const bb=document.getElementById('board-wrap-backlog-tab');
  if(!bb)return;
  const cards=bb.querySelectorAll('.card');
  cards.forEach(card=>{
    const assignedId=card.dataset.assignedid||'';
    const passesAnalyst=!analystId||assignedId===analystId;
    if(passesAnalyst){
      card.style.display='';
    } else {
      card.style.display='none';
    }
  });
  // Update lane counts and empty states
  bb.querySelectorAll('.lane').forEach(lane=>{
    const laneCards=lane.querySelectorAll('.card');
    const visible=Array.from(laneCards).filter(c=>c.style.display!=='none').length;
    const countEl=lane.querySelector('.lane-count');
    if(countEl)countEl.textContent=visible;
    let emptyEl=lane.querySelector('.lane-empty');
    const bodyEl=lane.querySelector('.lane-body');
    if(visible===0){
      if(!emptyEl&&bodyEl){
        emptyEl=document.createElement('div');
        emptyEl.className='lane-empty lane-empty-filter';
        emptyEl.textContent='Sem chamados';
        bodyEl.appendChild(emptyEl);
      }
    } else {
      if(emptyEl&&emptyEl.classList.contains('lane-empty-filter'))emptyEl.remove();
    }
  });
  // Update section badge
  const totalVisible=Array.from(cards).filter(c=>c.style.display!=='none').length;
  const badge=document.getElementById('section-badge-backlog-tab');
  if(badge){
    const suffix=analystId?' (filtrado)':'';
    badge.textContent=totalVisible+' cases · ≥20 dias'+suffix;
  }
}

function changeMes(m){
  document.querySelectorAll('.mbtn').forEach((b,i)=>{b.classList.toggle('active',i+1===m);b.disabled=true;});
  if (window.opener && !window.opener.closed && window.opener.g_ck) {
    _TOK = window.opener.g_ck;
  }
  if(window.opener&&!window.opener.closed&&typeof window.opener._emsOpsRender==='function'){
    window.opener._emsOpsRender(_TOK,m,window);
  } else {
    // Fallback: reload via changeMes in parent context
    fetch(_BASE+'/api/now/table/sn_customerservice_case?sysparm_limit=1',{headers:{'Accept':'application/json','X-UserToken':_TOK}})
    .then(r=>{
      if(r.status===401||r.status===403){
        document.getElementById('tok-err')?.style && (document.getElementById('tok-err').style.display='flex');
      } else {
        location.reload();
      }
    }).catch(()=>location.reload());
  }
}

function toggleAcc(key){
  const body=document.getElementById('acc-body-'+key);
  const arrow=document.getElementById('acc-arrow-'+key);
  if(!body)return;
  const open=(body.dataset.open==='1') || (body.style.display!=='none');
  if(open){
    body.style.display='none';
    body.dataset.open='0';
    if(arrow)arrow.style.transform='';
    return;
  }
  body.style.display='block';
  body.dataset.open='1';
  if(arrow)arrow.style.transform='rotate(180deg)';
  fetchAccordionScores();
}

function initAccordion(){
  updateReportsByFila();
  const queues=['l1','l2','event'];
  queues.forEach(q=>{
    const wrap=document.getElementById('ana-table-wrap-acc-'+q);
    const src=document.getElementById('_at_'+q)?.innerHTML||'';
    if(!wrap) return;
    if(src&&src.trim()!==''){
      wrap.innerHTML=src;
      wrap.dataset.src=q;
    }else{
      wrap.innerHTML='<div style="color:var(--muted);font-size:12px;padding:8px;">Sem dados disponíveis para esta fila.</div>';
    }
  });
  const badge=document.getElementById('acc-badge-analyst');
  if(badge){
    const rows=document.querySelectorAll('#ana-table-wrap-acc-l1 .ana-table tbody tr,#ana-table-wrap-acc-l2 .ana-table tbody tr,#ana-table-wrap-acc-event .ana-table tbody tr');
    badge.textContent=rows.length?rows.length+' analistas':'';
  }
  applyAnalystTableFilter();
  fetchAccordionScores();
}

function setRefreshStatus(msg){const el=document.getElementById('refresh-status');if(el)el.textContent=msg;setTimeout(()=>{if(el&&el.textContent===msg)el.textContent='';},3000);}

function fetchAccordionScores(){
  const h={'Accept':'application/json','X-UserToken':_TOK};
  const gid=window._GID_MAP?.[currentReportsFila]||'1c7c9057db6771d0832ead8ed396197a';
  const grpQ=gid.includes(',')?'assignment_groupIN'+gid:'assignment_group='+gid;
  const assigneeF=getReportAssigneeFilter(gid);
  const allGid=window._GID_MAP?.['all']||_IDS;
  const yearOpenedF='^opened_atONThis year@javascript:gs.beginningOfThisYear()@javascript:gs.endOfThisYear()';

  // Sem Type
  const elST=document.getElementById('sem-type-score');
  if(elST){elST.textContent='…';
    fetchJsonCached(_BASE+'/api/now/stats/sn_customerservice_case?sysparm_query='+encodeURIComponent('stateIN1,10,21^u_typeISEMPTY^'+grpQ+assigneeF+yearOpenedF)+'&sysparm_count=true&sysparm_display_value=all',{headers:h})
    .then(d=>{const c=parseInt(d.result?.stats?.count||0);elST.textContent=c;elST.style.color=c===0?'#1A7F37':'#CF222E';}).catch(()=>{elST.textContent='?';});
  }

  // Last Interacted by Client
  const elLI=document.getElementById('last-interacted-score');
  if(elLI){elLI.textContent='…';
    const liQ='stateIN32,1,10,21,90,18,8,5,29,30,2^u_customer_last_interactionISNOTEMPTY^u_type!=7^'+grpQ+assigneeF+yearOpenedF;
    fetchJsonCached(_BASE+'/api/now/stats/sn_customerservice_case?sysparm_query='+encodeURIComponent(liQ)+'&sysparm_count=true&sysparm_display_value=all',{headers:h})
    .then(d=>{const c=parseInt(d.result?.stats?.count||0);elLI.textContent=c;elLI.style.color=c>0?'#0969DA':'#1A7F37';}).catch(()=>{elLI.textContent='?';});
  }

  // Resolvidos no Mês — 3 cards KPI (L1/L2/Event)
  const rmTargets = [
    {key:'l1', id:'resolved-month-score-l1'},
    {key:'l2', id:'resolved-month-score-l2'},
    {key:'event', id:'resolved-month-score-event'}
  ];
  rmTargets.forEach(t=>{
    const elRM=document.getElementById(t.id);
    if(!elRM) return;
    elRM.textContent='…';
    const qGid=window._GID_MAP?.[t.key]||'';
    const rmQ='resolved_atONThis month@javascript:gs.beginningOfThisMonth()@javascript:gs.endOfThisMonth()^assignment_group='+qGid+assigneeF+'^stateIN33,34,6,3^contact_typeNOT INautomation^u_recurrence_case=false^u_operating_countryINBR';
    fetchJsonCached(_BASE+'/api/now/stats/sn_customerservice_case?sysparm_query='+encodeURIComponent(rmQ)+'&sysparm_count=true',{headers:h})
    .then(d=>{
      const total=parseInt(d.result?.stats?.count||0);
      elRM.textContent=total;
    }).catch(()=>{elRM.textContent='?';});
  });

  // Support Attention — segmentado por fila
  const elSA=document.getElementById('support-attention-score');
  if(elSA){elSA.textContent='…';
    const saQ='u_typeIN0,1,3,4^stateIN32,10,21,18,8,5,29,30,2^resolved_byISEMPTY^u_support_attentionISNOTEMPTY^'+grpQ+assigneeF+yearOpenedF;
    fetchJsonCached(_BASE+'/api/now/stats/sn_customerservice_case?sysparm_query='+encodeURIComponent(saQ)+'&sysparm_count=true&sysparm_display_value=all',{headers:h})
    .then(d=>{
      const c=parseInt(d.result?.stats?.count||0);
      elSA.textContent=c;
      elSA.style.color=c>0?'#BF8700':'#1A7F37';
      // Update link with correct gid
      const link=document.getElementById('support-attention-link');
      if(link){
        const qEnc=encodeURIComponent('u_typeIN0,1,3,4^stateIN32,10,21,18,8,5,29,30,2^resolved_byISEMPTY^u_support_attentionISNOTEMPTY^'+grpQ+assigneeF+yearOpenedF);
        link.href=_BASE+'/sn_customerservice_case_list.do?sysparm_query='+qEnc;
      }
    }).catch(()=>{elSA.textContent='?';});
  }

  // Rating EMS Year + Customer Satisfaction
  // Wait for allGid cache to be ready so MSH_NOC members are included in the filter
  const elRating=document.getElementById('rating-score');
  const elCSPre=document.getElementById('customer-satisfaction-score');
  if(elRating) elRating.textContent='…';
  if(elCSPre) elCSPre.textContent='…';
  const _ratingF=getRatingAssigneeFilter();
  const _ratingBase='mr_sys_created_onONThis year@javascript:gs.beginningOfThisYear()@javascript:gs.endOfThisYear()^cse_accountNOT LIKEEQUINIX^mr_metric=e7d1c39ddb56df00448b01a3ca961972';
  const _ratingGids='1c7c9057db6771d0832ead8ed396197a,ff72689247ee1e143cbfe07a216d4357,673c2170476422503cbfe07a216d430f,61d7da1edb71a450c6445457dc9619f9,52cd04fbdbe71700b3cd73e1ba961949,6c67c13bdbeb1700b3cd73e1ba9619b9,5d4cb3f1db90a050e0e15cb8dc961970,5d77053bdbeb1700b3cd73e1ba9619ca,8b3850eddb1adf00448b01a3ca9619ce,7dbeba001ba173004948ece03d4bcb7a,01d511c2db68cc10fddc7bedae9619de,3469cd95dbe9dbc0b3cd73e1ba9619b3';
  // Build assignee+group suffix:
  // - manager → dot-walk only (no group filter, avoids excluding cross-group evaluations)
  // - analyst → group filter + exact assignee
  // - none    → group filter only
  function _buildRatingSuffix(extraGids){
    const gids=extraGids?_ratingGids+','+extraGids:_ratingGids;
    if(_ratingF.type==='manager') return '^cse_assigned_to.manager='+_ratingF.id;
    if(_ratingF.type==='analyst') return '^cse_assignment_groupIN'+gids+'^cse_assigned_to='+_ratingF.id;
    return '^cse_assignment_groupIN'+gids;
  }

  // Rating EMS Year
  if(elRating){
    const rQ=_ratingBase+_buildRatingSuffix(null);
    fetchJsonCached(_BASE+'/api/now/stats/u_ticket_evaluation?sysparm_query='+encodeURIComponent(rQ)+'&sysparm_avg_fields=mr_actual_value&sysparm_count=true&sysparm_display_value=all',{headers:h})
    .then(d=>{
      const avg=parseFloat(d.result?.stats?.avg?.mr_actual_value||0);
      elRating.textContent=avg>0?avg.toFixed(2):'—';
      elRating.style.color=avg>=4?'#1A7F37':avg>=3?'#BF8700':'#CF222E';
    }).catch(()=>{elRating.textContent='?';});
  }

  // Customer Satisfaction
  const elCS=elCSPre;
  if(elCS){
    ensureMshNocGroupId().then(mshGid=>{
    const csQ=_ratingBase+_buildRatingSuffix(mshGid||'');
    // group_by=mr_actual_value,cse_assigned_to — note: SN returns fields in order [assigned_to, value]
    fetchJsonCached(_BASE+'/api/now/stats/u_ticket_evaluation?sysparm_query='+encodeURIComponent(csQ)+'&sysparm_group_by=mr_actual_value,cse_assigned_to&sysparm_count=true&sysparm_display_value=all&sysparm_limit=200',{headers:h})
    .then(d=>{
      const rows=d.result||[];
      let promoters=0,detractors=0,total=0;
      rows.forEach(row=>{
        const cnt=parseInt(row.stats?.count||0);
        if(cnt<=0) return;
        // SN returns groupby_fields[0]=cse_assigned_to, [1]=mr_actual_value
        const val=Number(row.groupby_fields?.[1]?.value??row.groupby_fields?.[0]?.value);
        total+=cnt;
        if(val===5) promoters+=cnt;
        else if(val===1||val===2||val===3) detractors+=cnt;
      });
      if(total<=0){elCS.textContent='—';elCS.style.color='';return;}
      const cs=((promoters-detractors)/total)*100;
      elCS.textContent=cs.toFixed(1)+'%';
      elCS.style.color=cs>=80?'#1A7F37':cs>=60?'#BF8700':'#CF222E';
    }).catch(()=>{elCS.textContent='?';});
    }).catch(()=>{elCS.textContent='?';});
  }
}
function fetchSemTypeScore(){fetchAccordionScores();}

// ── Layered Polling ──────────────────────────────────────────────────────────
let _pollL1=null, _pollL2=null, _pollL3=null;
let _lastActivesCount = -1;

function startPolling(){
  stopPolling();
  window.__deltaPollingActive = true;

  // Layer 1: KPIs (60s) — 3 lightweight aggregate calls
  _pollL1 = setInterval(()=>pollKPIs(), 60000);

  // Layer 2: Reports/Scores (3min) — staggered
  _pollL2 = setInterval(()=>{
    ['sem-type-score','last-interacted-score','support-attention-score','customer-satisfaction-score'].forEach(id=>{
      const e=document.getElementById(id); if(e) e.dataset.dirty='1';
    });
    ['resolved-month-score-l1','resolved-month-score-l2','resolved-month-score-event'].forEach(id=>{
      const elR=document.getElementById(id);
      if(elR) elR.dataset.dirty='1';
    });
    // Only refresh if accordion is open
    const body=document.getElementById('acc-body-analyst');
    if(body&&body.style.display!=='none') fetchAccordionScores();
  }, 180000);

  // Layer 3: Full board (10min) — disabled re-render, using delta polling instead
  // _pollL3 = setInterval(()=>{
  //   if(_lastActivesCount>=0){
  //     pollKPIs(true);
  //   }
  // }, 600000);

  // Delta polling: restart if already initialized (e.g. tab re-focus after hidden)
  if (typeof window.__restartDeltaPolling === 'function') window.__restartDeltaPolling();
}

function stopPolling(){
  if(_pollL1)clearInterval(_pollL1);
  if(_pollL2)clearInterval(_pollL2);
  if(_pollL3)clearInterval(_pollL3);
  _pollL1=_pollL2=_pollL3=null;
  if(window.__deltaPollingTimerId){clearInterval(window.__deltaPollingTimerId);window.__deltaPollingTimerId=null;}
  window.__deltaPollingActive=false;
}

function pollKPIs(checkDelta){
  const h={'Accept':'application/json','X-UserToken':_TOK};
  const gid=window._GID_MAP?.[currentFila]||'1c7c9057db6771d0832ead8ed396197a';
  const EXCL=[3,6,7,24,25,33,35].map(v=>'^state!='+v).join('');

  // 1. Active count
  fetch(_BASE+'/api/now/stats/sn_customerservice_case?sysparm_query='+encodeURIComponent('assignment_groupIN'+_IDS+EXCL)+'&sysparm_count=true',{headers:h})
  .then(r=>r.json()).then(d=>{
    const count=parseInt(d.result?.stats?.count||0);
    const el=document.querySelector('.kpi-val'); // first KPI = Cases Ativos
    if(el&&el.textContent!==String(count)) el.textContent=count;
    if(checkDelta&&_lastActivesCount>=0){
      const delta=Math.abs(count-_lastActivesCount);
      const pct=_lastActivesCount>0?(delta/_lastActivesCount):0;
      if(pct>=0.05||delta>=10){
        // Significant change — trigger full refresh
        if(window.opener&&!window.opener.closed&&typeof window.opener._emsOpsRender==='function'){
          window.opener._emsOpsRender(_TOK,_MES,window);
        }
      }
    }
    _lastActivesCount=count;
  }).catch(()=>{});

  // 2. SLA Breach count
  fetch(_BASE+'/api/now/stats/sn_customerservice_case?sysparm_query='+encodeURIComponent('assignment_group='+gid+EXCL)+'&sysparm_count=true',{headers:h})
  .then(r=>r.json()).then(d=>{}).catch(()=>{});

  // 3. Orphan count (assigned_to empty)
  fetch(_BASE+'/api/now/stats/sn_customerservice_case?sysparm_query='+encodeURIComponent('assignment_groupIN'+_IDS+'^assigned_toISEMPTY'+EXCL)+'&sysparm_count=true',{headers:h})
  .then(r=>r.json()).then(d=>{
    const count=parseInt(d.result?.stats?.count||0);
    // Update orphan KPI if visible
    document.querySelectorAll('.kpi-val').forEach((el,i)=>{
      if(i===4&&el.textContent!==String(count)) el.textContent=count;
    });
  }).catch(()=>{});
}

window._SECTION_STATE = window._SECTION_STATE || {};
function toggleSection(key) {
  const body  = document.getElementById('section-body-' + key);
  const icon  = document.getElementById('section-icon-' + key);
  if (!body) return;
  const nextCollapsed = !body.classList.contains('collapsed');
  body.classList.toggle('collapsed', nextCollapsed);
  body.style.display = nextCollapsed ? 'none' : '';
  window._SECTION_STATE[key] = nextCollapsed;
  const collapsed = nextCollapsed;
  if (icon) icon.style.transform = collapsed ? 'rotate(-90deg)' : '';
}

function switchResolvedTodayQueue(key){
  const lane = document.querySelector('.lane-rt');
  const badge = lane?.querySelector('.lane-count');
  let total = 0;
  ['l1','l2','event'].forEach(k=>{
    const el=document.getElementById('rt-'+k);
    if(el) {
      const active = (k === key);
      el.style.display = active ? '' : 'none';
      if (active) {
        total = Array.from(el.querySelectorAll('.rt-val')).reduce((acc, v) => acc + parseInt(v.textContent || 0), 0);
      }
    }
  });
  if (badge) badge.textContent = total;
}

function dedupeManagerToolbar(){
  const toolbar=document.querySelector('#page-kanban .board-toolbar');
  if(!toolbar) return;
  const children=Array.from(toolbar.children);
  const managerPairs=[];
  for(let i=0;i<children.length;i++){
    const el=children[i];
    const nxt=children[i+1];
    if(el?.tagName==='LABEL' && /manager/i.test(el.textContent||'') && nxt?.tagName==='SELECT'){
      managerPairs.push({label:el,select:nxt,index:i});
    }
  }
  managerPairs.slice(1).forEach(p=>{
    const prev=p.label.previousElementSibling;
    if(prev?.classList?.contains('toolbar-sep')) prev.remove();
    p.label.remove();
    p.select.remove();
  });
}


// ── Reassign Dropdown ──────────────────────────────────────────────────────
let _reassignDd=null;
function openReassignBtn(e,btn){
  e.stopPropagation();
  openReassign(e,btn.dataset.sysid||'',btn.dataset.gid||'',btn.dataset.assigned||'');
}

const _ALL_GROUPS = [
  {id:'1c7c9057db6771d0832ead8ed396197a', name:'L1 OpsCenter AMER'},
  {id:'ff72689247ee1e143cbfe07a216d4357', name:'L2 OpsCenter AMER'},
  {id:'673c2170476422503cbfe07a216d430f', name:'Event Management BR'},
];

function openReassign(e,sysId,gid,currentAssigned){
  e.stopPropagation();e.preventDefault();
  if(_reassignDd){_reassignDd.remove();_reassignDd=null;return;}

  const dd=document.createElement('div');dd.className='reassign-dd';dd.style.width='260px';

  // Title
  const title=document.createElement('div');title.className='reassign-title';title.textContent='Reatribuir caso';dd.appendChild(title);

  // Group selector
  const grpLbl=document.createElement('div');grpLbl.style.cssText='font-size:10px;font-weight:600;color:#57606A;text-transform:uppercase;padding:6px 12px 2px;';grpLbl.textContent='Fila';dd.appendChild(grpLbl);
  const grpSel=document.createElement('select');grpSel.style.cssText='margin:0 12px 8px;width:calc(100% - 24px);font-size:12px;padding:4px 6px;border:1px solid #D0D7DE;border-radius:4px;';
  // Only show groups the analyst belongs to (based on _GMEMBERS)
  const analystGroups=_ALL_GROUPS.filter(g=>(window._GMEMBERS?.[g.id]||[]).some(m=>m.name===currentAssigned||g.id===gid));
  (analystGroups.length?analystGroups:_ALL_GROUPS).forEach(g=>{
    const opt=document.createElement('option');opt.value=g.id;opt.textContent=g.name;if(g.id===gid)opt.selected=true;grpSel.appendChild(opt);
  });
  dd.appendChild(grpSel);

  // Analyst list
  const analystLbl=document.createElement('div');analystLbl.style.cssText='font-size:10px;font-weight:600;color:#57606A;text-transform:uppercase;padding:0 12px 4px;';analystLbl.textContent='Analista';dd.appendChild(analystLbl);
  const inp=document.createElement('input');inp.className='reassign-search';inp.placeholder='Buscar analista...';inp.oninput=function(){filterReassign(this);};dd.appendChild(inp);
  const list=document.createElement('div');list.className='reassign-list';list.id='reassign-list';dd.appendChild(list);

  const populateList=selectedGid=>{
    list.innerHTML='';
    const members=(window._GMEMBERS?.[selectedGid]||[]).slice().sort((a,b)=>a.name.localeCompare(b.name));
    members.forEach(m=>{
      const opt=document.createElement('div');
      opt.className='reassign-opt'+(m.name===currentAssigned?' reassign-current':'');
      opt.textContent=(m.name===currentAssigned?'✓ ':'')+m.name;
      opt.dataset.uid=m.id;opt.dataset.uname=m.name;opt.dataset.sysid=sysId;opt.dataset.gid=selectedGid;
      opt.onclick=function(){doReassign(this.dataset.sysid,this.dataset.uid,this.dataset.uname,this.dataset.gid,this);};
      list.appendChild(opt);
    });
  };

  populateList(gid);
  grpSel.onchange=function(e){e.stopPropagation();populateList(this.value);inp.value='';};

  document.body.appendChild(dd);_reassignDd=dd;
  const rect=e.target?.getBoundingClientRect?.()|| {bottom:window.innerHeight/2,left:window.innerWidth/2};
  dd.style.top=Math.min(rect.bottom+4,window.innerHeight-320)+'px';
  dd.style.left=Math.min(rect.left,window.innerWidth-270)+'px';
  setTimeout(()=>{inp.focus();document.addEventListener('click',closeReassignOutside);},0);
}
function filterReassign(input){
  const q=input.value.toLowerCase();
  document.querySelectorAll('.reassign-opt').forEach(o=>{o.style.display=o.textContent.toLowerCase().includes(q)?'':'none';});
}

function closeReassignOutside(e){
  if(_reassignDd&&!_reassignDd.contains(e.target)){_reassignDd.remove();_reassignDd=null;document.removeEventListener('click',closeReassignOutside);}
}
function doReassign(sysId,userId,userName,groupId,el){
  if(_reassignDd){_reassignDd.remove();_reassignDd=null;}
  document.removeEventListener('click',closeReassignOutside);
  const payload={assigned_to:userId};
  if(groupId) payload.assignment_group=groupId;
  patchCase(sysId,payload).then(ok=>{
    if(ok){
      const groupName=_ALL_GROUPS.find(g=>g.id===groupId)?.name||'';
      showToast('✅ Reatribuído para '+userName+(groupName?' ('+groupName+')':''));
      document.querySelectorAll('[data-sysid="'+sysId+'"] .card-assigned').forEach(el2=>{
        const avatar=el2.querySelector('.card-avatar');
        if(avatar) avatar.textContent=(userName||'').split(/\s+/).slice(0,2).map(p=>p.charAt(0).toUpperCase()).join('')||'SR';
        const label=el2.querySelector('span:last-child');
        if(label) label.textContent=userName;
        el2.classList.remove('unassigned');
      });
      // Update reassign btn data
      document.querySelectorAll('[data-sysid="'+sysId+'"] .card-reassign-btn').forEach(b=>{
        b.dataset.assigned=userName;if(groupId)b.dataset.gid=groupId;
      });
      // Update modal if open
      if(_modalSysId===sysId){
        const numEl=document.getElementById('modal-num');
        if(numEl) setTimeout(()=>openCaseModal(sysId,numEl.textContent,_modalActiveCard||document.createElement('div')),300);
      }
    } else { showToast('❌ Erro ao reatribuir','error'); }
  });
}


let _iuDd=null;
function openImpactUrgencyBtn(e,btn){
  e.stopPropagation();
  openImpactUrgencyEditor(e,btn.dataset.sysid||'',btn.dataset.impact||'',btn.dataset.urgency||'');
}

function openImpactUrgencyEditor(e,sysId,currentImpact,currentUrgency){
  e.stopPropagation();e.preventDefault();
  if(_iuDd){_iuDd.remove();_iuDd=null;return;}

  const dd=document.createElement('div');dd.className='iu-dd';
  dd.innerHTML =
    '<label>Impact</label>' +
    '<select id="iu-impact"><option value="1">1 - Alto</option><option value="2">2 - Médio</option><option value="3">3 - Baixo</option></select>' +
    '<label>Urgency</label>' +
    '<select id="iu-urgency"><option value="1">1 - Alto</option><option value="2">2 - Médio</option><option value="3">3 - Baixo</option></select>' +
    '<div class="iu-dd-actions">' +
      '<button type="button" onclick="closeImpactUrgencyEditor()" style="font-size:11px;padding:4px 8px;border:1px solid #D0D7DE;background:#fff;border-radius:4px;cursor:pointer;">Cancelar</button>' +
      '<button type="button" id="iu-save-btn" style="font-size:11px;padding:4px 8px;border:1px solid #0969DA;background:#0969DA;color:#fff;border-radius:4px;cursor:pointer;">Salvar</button>' +
    '</div>';

  document.body.appendChild(dd);_iuDd=dd;
  const rect=e.target?.getBoundingClientRect?.()|| {bottom:window.innerHeight/2,left:window.innerWidth/2};
  dd.style.top=Math.min(rect.bottom+4,window.innerHeight-220)+'px';
  dd.style.left=Math.min(rect.left,window.innerWidth-240)+'px';

  const impactSel=dd.querySelector('#iu-impact');
  const urgencySel=dd.querySelector('#iu-urgency');
  if(impactSel) impactSel.value=(currentImpact||'3');
  if(urgencySel) urgencySel.value=(currentUrgency||'3');
  dd.querySelector('#iu-save-btn').onclick=()=>saveImpactUrgency(sysId,impactSel?.value||'3',urgencySel?.value||'3');

  setTimeout(()=>{document.addEventListener('click',closeImpactUrgencyOutside);},0);
}

function closeImpactUrgencyOutside(e){
  if(_iuDd&&!_iuDd.contains(e.target)){closeImpactUrgencyEditor();}
}

function closeImpactUrgencyEditor(){
  if(_iuDd){_iuDd.remove();_iuDd=null;}
  document.removeEventListener('click',closeImpactUrgencyOutside);
}

function syncImpactUrgencyInUI(sysId,impact,urgency){
  document.querySelectorAll('.card[data-sysid="'+sysId+'"]').forEach(card=>{
    card.dataset.impact=impact;card.dataset.urgency=urgency;
    const tag=card.querySelector('.tag-iu');
    if(tag) tag.textContent='I:'+impact+' · U:'+urgency;
    const iuBtn=card.querySelector('.card-iu-btn');
    if(iuBtn){iuBtn.dataset.impact=impact;iuBtn.dataset.urgency=urgency;}
  });
}

function saveImpactUrgency(sysId,impact,urgency){
  patchCase(sysId,{impact,urgency}).then(ok=>{
    if(ok){
      syncImpactUrgencyInUI(sysId,impact,urgency);
      showToast('✅ Impact/Urgency atualizado');
      closeImpactUrgencyEditor();
      if(_modalSysId===sysId){
        const numEl=document.getElementById('modal-num');
        if(numEl) setTimeout(()=>openCaseModal(sysId,numEl.textContent,_modalActiveCard||document.createElement('div')),250);
      }
    } else {
      showToast('❌ Erro ao atualizar Impact/Urgency','error');
    }
  });
}

// ── API patch ──────────────────────────────────────────────────────────────
async function patchCase(sysId,data){
  try{
    const r=await fetch(_BASE+'/api/now/table/sn_customerservice_case/'+sysId,{
      method:'PATCH',
      headers:{'Accept':'application/json','Content-Type':'application/json','X-UserToken':_TOK},
      body:JSON.stringify(data)
    });
    return r.status===200;
  }catch(e){console.error('patchCase:',e);return false;}
}

// ── Toast notification ─────────────────────────────────────────────────────
function showToast(msg,type='success'){
  const t=document.createElement('div');
  t.className='toast toast-'+type;
  t.textContent=msg;
  document.body.appendChild(t);
  setTimeout(()=>t.classList.add('toast-show'),10);
  setTimeout(()=>{t.classList.remove('toast-show');setTimeout(()=>t.remove(),300);},2500);
}

// ── Analyst board ──────────────────────────────────────────────────────────
function switchAnalyst(userId){
  const asel=document.getElementById('analyst-sel');
  if(asel&&asel.value!==userId) asel.value=userId||'';
  // Filter existing boards by analyst instead of rendering separate section
  const analystContent=document.getElementById('analyst-board-content');
  if(analystContent) analystContent.innerHTML='';

  // Filter all cards in both boards
  const boards=['board-wrap'];
  const gid=window._GID_MAP?.[currentFila]||'';
  const managerId=document.getElementById('manager-sel')?.value||'';
  const managerAllowed=new Set(getMembersByManager(gid,managerId).map(m=>m.id));
  boards.forEach(bid=>{
    const bw=document.getElementById(bid); if(!bw)return;
    bw.querySelectorAll('.card').forEach(card=>{
      const cardAssignedId=card.dataset.assignedid||'';
      const passesAnalyst=!userId||cardAssignedId===userId;
      const passesManager=!managerId||managerAllowed.has(cardAssignedId);
      card.style.display=(passesAnalyst&&passesManager)?'':'none';
    });
    // Hide empty lanes
    bw.querySelectorAll('.lane').forEach(lane=>{
      const visible = Array.from(lane.querySelectorAll('.card')).filter(c=>c.style.display!=='none').length;
      const countEl = lane.querySelector('.lane-count');
      if(countEl) countEl.textContent = String(visible);
      // Just dim instead of hide so layout stays stable
    });
  });

  renderFilterChips();
  if(_slaSortOn) applySlaSort();
  // Don't fetch separately — boards are filtered.
  // Keep this function side-effect free for polling callbacks
  // (avoid optional data lookups that may throw and interrupt delta updates).
  return;

  // DEAD CODE BELOW (kept for reference)
  const content=document.getElementById('analyst-board-content');
  if(!content)return;
  content.innerHTML='<div class="analyst-loading">⏳ Carregando casos de '+name+'...</div>';
  // Fetch cases for this analyst in current group
  const excl=[3,6,7,24,25,33,35].map(v=>'^state!='+v).join('');
  const q='assignment_group='+gid+'^assigned_to='+userId+excl;
  fetch(_BASE+'/api/now/table/sn_customerservice_case?sysparm_query='+encodeURIComponent(q)+'&sysparm_fields=number,short_description,priority,state,assigned_to,assignment_group,opened_at,u_type,sys_id&sysparm_display_value=all&sysparm_limit=500',{
    headers:{'Accept':'application/json','X-UserToken':_TOK}
  }).then(r=>r.json()).then(d=>{
    const cases=d.result||[];
    if(!cases.length){content.innerHTML='<div class="analyst-empty">Nenhum caso ativo para '+name+'</div>';return;}
    renderAnalystBoard(cases,name,gid,content);
  }).catch(()=>{content.innerHTML='<div class="analyst-empty">Erro ao carregar casos</div>';});
}

function reapplyAnalystFilters(){
  const activeSel=document.getElementById('analyst-sel');
  if(activeSel) switchAnalyst(activeSel.value||'');
  switchAnalystBacklog(currentBacklogAnalyst||document.getElementById('backlog-analyst-sel')?.value||'');
}

function renderAnalystBoard(cases,analystName,gid,container){
  const now=Date.now();
  const AWAIT_S=new Set(['18','32','5','29','30']);
  const fmtH=h=>h===null?'—':parseFloat(h).toFixed(1)+'h';
  const hFrom=d=>{const x=new Date(d);return isNaN(x)?null:(now-x)/3600000;};
  const caseUrl=n=>_BASE+'/sn_customerservice_case.do?sysparm_query=number='+n;
  const PRIO_LANE={'1':'critical','2':'high','3':'medium','4':'normal','5':'normal'};
  const classify=c=>{
    const rawDisplayValue = c.priority?.display_value;
    const rawValue = c.priority?.value;
    let prio;
    const firstChar = rawDisplayValue?.charAt(0);

    if (firstChar && !isNaN(parseInt(firstChar, 10))) {
      prio = parseInt(firstChar, 10);
    } else {
      prio = parseInt(rawValue || '5', 10);
    }
    console.log(`[Priority Debug - renderAnalystBoard.classify] Case ${c.number?.display_value}: Display="${rawDisplayValue}", Value="${rawValue}", Calculated Prio="${prio}", State Value="${c.state?.value}"`);

    const isAw=AWAIT_S.has(c.state?.value||'');
    const noAss=!c.assigned_to?.value;
    let lane;
    if      (isAw)      lane='awaiting';
    else if (noAss)     lane='orphan';
    else                lane=PRIORITY_LANE[String(prio)]||'normal';

    if (lane === 'critical' && c.priority?.display_value && !c.priority.display_value.includes('1')) {
      console.warn(`[Priority Bug Check - renderAnalystBoard.classify] Caso ${c.number?.display_value} classificado como CRITICAL mas Prioridade Display é "${c.priority.display_value}" (Value: ${c.priority.value})`);
    }

    return{number:c.number?.display_value||'',sysId:c.sys_id?.value||'',url:caseUrl(c.number?.display_value||''),
      desc:(c.short_description?.display_value||'').substring(0,60),priority:c.priority?.display_value||'N/A',
      prio,state:c.state?.display_value||'N/A',isAw,uType:c.u_type?.display_value||'',
      assigned:c.assigned_to?.display_value||null,gid,
      openedAt:c.opened_at?.value||'',openH:fmtH(hFrom(c.opened_at?.value)),sl:{st:'none',mins:null,pct:null,name:'—'},lane};
  };
  const classified=cases.map(classify);
  const lanes={critical:classified.filter(c=>c.lane==='critical'),high:classified.filter(c=>c.lane==='high'),
    medium:classified.filter(c=>c.lane==='medium'),normal:classified.filter(c=>c.lane==='normal'),
    awaiting:classified.filter(c=>c.lane==='awaiting')};
  const renderSlaA=sl=>{
    if(!sl||sl.st==='none')return '<div class="sla-bar-wrap"><span class="sla-bar-name" style="color:#57606A">Sem SLA</span></div>';
    const pct=Math.min(sl.pct||0,100);
    const color=sl.st==='breach'?'#CF222E':sl.st==='risk'?'#BF8700':'#1A7F37';
    const time=sl.st==='breach'?'<span class="sla-time" style="color:#CF222E;font-weight:700">BREACH</span>'
      :(sl.mins!==null?'<span class="sla-time">'+(sl.mins>=60?(sl.mins/60).toFixed(1)+'h':sl.mins+'min')+' rest.</span>':'');
    return '<div class="sla-bar-wrap"><div class="sla-bar-label"><span class="sla-bar-name">'+(sl.name||'SLA')+'</span><span class="sla-bar-pct" style="color:'+color+'">'+sl.pct+'%</span></div><div class="sla-bar-track"><div class="sla-bar-fill" style="width:'+pct+'%;background:'+color+'"></div></div>'+time+'</div>';
  };
  const fmtOpenedA=d=>{
    const x=new Date(d);
    if(isNaN(x)) return '—';
    return x.toLocaleString('pt-BR',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'}).replace(',','');
  };
  const initialsA=name=>{
    const txt=(name||'').trim();
    if(!txt) return 'SR';
    return txt.split(/\s+/).slice(0,2).map(p=>p.charAt(0).toUpperCase()).join('')||'SR';
  };
  const renderC=c=>'<div class="card card-'+c.lane+'" data-sysid="'+c.sysId+'" data-num="'+c.number+'" onclick="openCaseModalBtn(this)">'+
    '<div class="card-top"><a class="card-num" href="'+c.url+'" target="_blank" onclick="event.stopPropagation()">'+c.number+' ↗</a>'+
    '<span class="card-prio-badge card-prio-'+(c.prio||5)+'">'+(c.priority||'N/A')+'</span>'+
    (c.isAw?'<span class="badge-await">⏳ '+c.state+'</span>':'')+
    '<button class="card-reassign-btn" title="Reatribuir" data-sysid="'+c.sysId+'" data-gid="'+c.gid+'" data-assigned="'+(c.assigned||'')+'" onclick="event.stopPropagation();openReassignBtn(event,this)">👤 ✎</button></div>'+
    '<p class="card-desc">'+c.desc+'</p>'+
    (c.sl?renderSlaA(c.sl):'')+
    '<div class="card-tags"><span class="tag tag-state">'+c.state+'</span>'+
    (c.uType?'<span class="tag tag-type">'+c.uType+'</span>':'')+
    '</div><div class="card-footer">'+
    '<span class="card-assigned"><span class="card-avatar">'+initialsA(analystName)+'</span><span>'+analystName+'</span></span>'+
    '<span class="card-time">📅 '+fmtOpenedA(c.openedAt)+'</span></div></div>';
  const renderL=(laneKey,label,color,icon,items)=>'<div class="lane" data-lane="'+laneKey+'">'+
    '<div class="lane-hdr" style="border-top:3px solid '+color+'">'+
    '<div class="lane-title"><span class="lane-dot" style="background:'+color+'"></span>'+icon+' '+label+'</div>'+
    '<span class="lane-count" style="color:'+color+'">'+items.length+'</span></div>'+
    '<div class="lane-body">'+
    (items.length?items.map(renderC).join(''):'<div class="lane-empty">Sem chamados</div>')+
    '</div></div>';
  container.innerHTML='<div class="analyst-board-header"><span class="analyst-board-name">👤 '+analystName+'</span><span class="analyst-board-count">'+classified.length+' casos</span></div>'+
    '<div class="board-wrap"><div class="board-inner">'+
    renderL('critical','Crítico','#CF222E','🔴',lanes.critical)+
    renderL('high','Alto Risco','#BF8700','🟠',lanes.high)+
    renderL('medium','Atenção','#0550AE','🔵',lanes.medium)+
    renderL('normal','Normal','#1A7F37','🟢',lanes.normal)+
    renderL('awaiting','Aguardando','#0969DA','⏳',lanes.awaiting)+
    '</div></div>';
}

// ── Post-mortem Pagination ────────────────────────────────────────────────
const _PG=50; let _pgPage=0,_pgRows=[];
function pgInit(){const tb=document.getElementById('pmtbody');if(!tb)return;_pgRows=Array.from(tb.rows);_pgPage=0;pgRender();}
function pgRender(){
  const total=_pgRows.length,pages=Math.ceil(total/_PG);
  const s=_pgPage*_PG,e=Math.min(s+_PG,total);
  _pgRows.forEach((r,i)=>{r.style.display=(i>=s&&i<e)?'':'none';});
  const info=document.getElementById('pg-info');
  if(info)info.textContent=total?'Mostrando '+(s+1)+'–'+e+' de '+total:'Sem resultados';
  const prev=document.getElementById('pg-prev'),next=document.getElementById('pg-next');
  if(prev)prev.disabled=_pgPage===0;
  if(next)next.disabled=_pgPage>=pages-1;
  const pgp=document.getElementById('pg-pages');
  if(!pgp)return;
  let arr=[];
  if(pages<=7){arr=Array.from({length:pages},(_,i)=>i);}
  else{arr=[0];let ss=Math.max(1,_pgPage-2),ee=Math.min(pages-2,_pgPage+2);if(ss>1)arr.push('…');for(let i=ss;i<=ee;i++)arr.push(i);if(ee<pages-2)arr.push('…');arr.push(pages-1);}
  pgp.innerHTML=arr.map(p=>p==='…'?'<span class="pg-page" style="border:none;cursor:default">…</span>':'<span class="pg-page'+(p===_pgPage?' active':'')+'" onclick="pgGoTo('+p+')">'+(p+1)+'</span>').join('');
}
function pgNav(d){const t=_pgRows.length,p=Math.ceil(t/_PG);_pgPage=Math.max(0,Math.min(_pgPage+d,p-1));pgRender();document.getElementById('pm-pg-wrap')?.scrollIntoView({behavior:'smooth',block:'start'});}
function pgGoTo(p){_pgPage=p;pgRender();document.getElementById('pm-pg-wrap')?.scrollIntoView({behavior:'smooth',block:'start'});}

// ── Case Modal ────────────────────────────────────────────────────────────
let _modalSysId = null;
let _modalActiveCard = null;

function emsEscapeHtml(v) {
  return String(v ?? '').replace(/[&<>"']/g, ch => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[ch]));
}

function formatJournalValue(rawValue) {
  if (!rawValue) return '';
  let out = String(rawValue);
  out = out.split(String.fromCharCode(13,10)).join(String.fromCharCode(10));
  out = out.split('[code]').join('<pre class="modal-j-code">');
  out = out.split('[/code]').join('</pre>');
  out = out.split(String.fromCharCode(10)).join('<br>');
  return out;
}

function renderContactInfo(contact, caseData) {
  const el = document.getElementById('modal-contact-info');
  if (!el) return;
  if (!contact) {
    const contactName = caseData?.contact?.display_value || '—';
    el.innerHTML = '<span class="modal-detail-lbl">Contato</span><span class="modal-detail-val">'+contactName+'</span>';
    return;
  }
  const name  = contact.name?.display_value  || contact.name?.value  || caseData?.contact?.display_value || '—';
  const phone = contact.phone?.display_value || contact.phone?.value || '';
  const mobile= contact.mobile_phone?.display_value || contact.mobile_phone?.value || '';
  const tel   = phone || mobile || '—';
  el.innerHTML = '<span class="modal-detail-lbl">Contato</span>' +
    '<span class="modal-detail-val">'+name+'</span>' +
    (tel !== '—' ? '<span class="modal-detail-val" style="font-size:11px;color:#57606A;">📞 '+tel+'</span>' : '');
}

function openCaseModalBtn(el) {
  openCaseModal(el.dataset.sysid||'', el.dataset.num||'', el);
}
function openCaseModal(sysId, number, cardEl) {
  _modalSysId = sysId;
  if (_modalActiveCard) _modalActiveCard.classList.remove('modal-active');
  _modalActiveCard = cardEl;
  cardEl.classList.add('modal-active');
  closeCaseModal();
  const url = '/sn_customerservice_case.do?sys_id='+encodeURIComponent(sysId)+'&sysparm_view=case&sysparm_nostack=true&sysparm_query=no_related_lists=true';

  const overlay = document.createElement('div');
  overlay.id = 'case-iframe-overlay';
  overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.75);z-index:9999;display:flex;align-items:center;justify-content:center;';

  const modal = document.createElement('div');
  modal.style.cssText = 'width:95%;height:95%;background:#fff;border-radius:5px;overflow:hidden;display:flex;flex-direction:column;';

  const header = document.createElement('div');
  header.style.cssText = 'background:#111;color:#fff;padding:8px 16px;display:flex;justify-content:space-between;align-items:center;font-size:13px;';
  header.innerHTML = '<div style="flex:1"></div><img src="https://i.postimg.cc/NFB5VZyG/equinix-logo-icon-169199-resized.png" style="height:26px;display:block;"><div style="flex:1;display:flex;justify-content:flex-end;gap:12px;"><button id="reloadBtn" style="background:transparent;border:none;color:#fff;cursor:pointer;opacity:0.8;">🔄</button><button id="closeBtn" style="background:transparent;border:none;color:#fff;cursor:pointer;font-size:16px;">✕</button></div>';

  const bodyWrap = document.createElement('div');
  bodyWrap.style.cssText = 'flex:1;display:flex;min-height:0;';

  const iframe = document.createElement('iframe');
  iframe.src = url;
  iframe.style.cssText = 'flex:1;border:none;width:100%;';

  const sidecar = document.createElement('div');
  sidecar.style.cssText = 'width:min(36vw,520px);min-width:320px;border-left:1px solid #D0D7DE;background:#fff;display:flex;flex-direction:column;';
  sidecar.innerHTML = '<div style="padding:10px 12px;border-bottom:1px solid #D0D7DE;background:#F6F8FA;font-size:12px;font-weight:700;color:#1f2937;">CI Details <span id="case-sidecar-account" style="font-weight:500;color:#57606A;">—</span></div><div id="case-sidecar-list" style="padding:10px 12px;overflow:auto;flex:1;"></div>';

  // Captura referências diretas ANTES de qualquer operação assíncrona
  // para evitar race condition ao abrir múltiplos modais em sequência.
  const titleEl = header.querySelector('#case-iframe-title');
  const accLbl  = sidecar.querySelector('#case-sidecar-account');
  const listEl  = sidecar.querySelector('#case-sidecar-list');

  bodyWrap.appendChild(iframe);
  bodyWrap.appendChild(sidecar);
  modal.appendChild(header);
  modal.appendChild(bodyWrap);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  header.querySelector('#closeBtn').onclick = () => closeCaseModal();
  header.querySelector('#reloadBtn').onclick = () => { iframe.src = iframe.src; };

  const h = {'Accept':'application/json','X-UserToken':_TOK};
  fetch(_BASE+'/api/now/table/sn_customerservice_case/'+sysId+'?sysparm_fields=number,account,cmdb_ci&sysparm_display_value=all',{headers:h})
    .then(r=>r.json())
    .then(data=>{
      const c = data.result || {};
      const accId = c.account?.value || '';
      const accName = c.account?.display_value || c.account?.value || '—';
      const ciId = c.cmdb_ci?.value || '';
      const ciName = c.cmdb_ci?.display_value || c.cmdb_ci?.value || '—';
      const num = c.number?.display_value || c.number?.value || number;
      // Usa referências locais capturadas na criação do modal, não getElementById
      if (titleEl) titleEl.textContent = num || 'Case';
      if (accLbl) accLbl.textContent = ciName;
      if (listEl) populateAccountProducts(listEl, accId, accName, ciId, ciName);
    })
    .catch(()=>{
      // listEl local garante que o erro vai para o modal correto
      if (listEl) listEl.innerHTML = '<div class="account-product-empty">Não foi possível carregar dados do account.</div>';
    });
}

function detailItem(label, valueHtml) {
  return '<div class="modal-detail-item"><span class="modal-detail-lbl">'+label+'</span><span class="modal-detail-val">'+valueHtml+'</span></div>';
}

function toggleCiPassword(btn){
  const value = btn?.dataset?.value || '';
  const targetId = btn?.dataset?.target || '';
  const target = document.getElementById(targetId);
  if(!target) return;
  const masked = '••••••••';
  const showing = target.textContent !== masked;
  target.textContent = showing ? masked : value || masked;
  btn.textContent = showing ? 'Show password' : 'Hide password';
}

function populateAccountProducts(listEl, accountId, accountName, ciId, ciName){
  if(!listEl) return;
  listEl.innerHTML='<div class="account-product-empty">⏳ Carregando detalhes do CI...</div>';
  if(!ciId){
    listEl.innerHTML='<div class="account-product-empty">Chamado sem Configuration item (cmdb_ci).</div>';
    return;
  }

  const h={'Accept':'application/json','X-UserToken':_TOK};
  const cache = window._ACCOUNT_PRODUCTS_CACHE || { ttlMs: 120000, entries: {} };
  const cacheKey = 'ci::' + ciId;
  const now = Date.now();
  const hit = cache.entries?.[cacheKey];
  if (hit && (now - hit.ts) < (cache.ttlMs || 120000)) {
    listEl.innerHTML = hit.html;
    return;
  }

  const fetchTable = (table, query, fields, limit) => {
    const url = _BASE+'/api/now/table/'+table
      +'?sysparm_query='+encodeURIComponent(query)
      +'&sysparm_fields='+fields
      +'&sysparm_display_value=all'
      +'&sysparm_limit='+(limit||500);
    return fetch(url,{headers:h}).then(async r=>{
      if(!r.ok){ const e=new Error('HTTP '+r.status); e.status=r.status; throw e; }
      return r.json();
    }).then(d=>d.result||[]);
  };

  const fetchSingleCi = async () => {
    const fields = 'sys_id,name,comments,ip_address,host_name,os,sys_class_name';
    try{
      const one = await fetch(_BASE+'/api/now/table/cmdb_ci_server/'+ciId+'?sysparm_fields='+fields+'&sysparm_display_value=all',{headers:h}).then(r=>r.json());
      if(one?.result) return one.result;
    }catch(e){}
    try{
      const one = await fetch(_BASE+'/api/now/table/cmdb_ci/'+ciId+'?sysparm_fields='+fields+'&sysparm_display_value=all',{headers:h}).then(r=>r.json());
      return one?.result || null;
    }catch(e){ return null; }
  };

  const fetchCredentials = async () => {
    // Lógica correta:
    // 1. Busca filhos do CI via cmdb_rel_ci (parent=ciId)
    // 2. Coleta os sys_ids dos filhos (deduplicados)
    // 3. Busca direto na tabela u_ci_credentials com sys_idIN<ids>
    //    — isso garante que só retorna credenciais reais do CI,
    //      sem depender de campos de filtro que o Snow pode ignorar.
    try {
      const relRes = await fetch(
        _BASE+'/api/now/table/cmdb_rel_ci?sysparm_query='+encodeURIComponent('parent='+ciId)+'&sysparm_display_value=all&sysparm_limit=100',
        {headers:h}
      ).then(r=>r.json());

      const childIds = [...new Set(
        (relRes.result || []).map(r => r.child?.value).filter(Boolean)
      )];

      if (!childIds.length) return [];

      const credRes = await fetch(
        _BASE+'/api/now/table/u_ci_credentials?sysparm_query='+encodeURIComponent('sys_idIN'+childIds.join(','))+'&sysparm_display_value=all&sysparm_limit=100',
        {headers:h}
      ).then(r=>r.json());

      return credRes.result || [];
    } catch(e) {
      return [];
    }
  };

  const getVal = (obj, ...keys) => {
    for (const k of keys){
      const v = obj?.[k]?.display_value ?? obj?.[k]?.value ?? obj?.[k];
      if(v!==undefined && v!==null && String(v).trim()!=='') return String(v);
    }
    return '—';
  };

  const esc = v => String(v ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));

  // ── Zabbix: busca via postMessage → content.js → background.js (sem CORS) ──
  // Tentativa 1: consulta direta (mesma lógica validada no DevTools).
  // Tentativa 2 (fallback): ponte content/background.
  const ZABBIX_URL = 'https://monbr1.equinix.com.br/api_jsonrpc.php';
  const ZABBIX_TOKEN = 'd888495a0fd1c258205c7c78bd4d941e5d63aa63621fb74cd01a2d1caa611c7b';
  const ZABBIX_CHART_BASE_URL = 'https://monbr1.equinix.com.br/chart.php';
  const ZABBIX_DIRECT_TIMEOUT_MS = 7000;

  const zabbixDirectCall = async (method, params) => {
    const ctl = new AbortController();
    const timer = setTimeout(() => ctl.abort(), ZABBIX_DIRECT_TIMEOUT_MS);
    try {
      const res = await fetch(ZABBIX_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + ZABBIX_TOKEN
        },
        body: JSON.stringify({ jsonrpc: '2.0', method, params, id: 1 }),
        signal: ctl.signal
      });
      const payload = await res.json();
      if (!res.ok) throw new Error('Zabbix HTTP ' + res.status);
      if (payload.error) throw new Error(payload.error.data || payload.error.message || 'Erro API');
      return payload.result || [];
    } finally {
      clearTimeout(timer);
    }
  };

  const fetchZabbixDirect = async (ciNameVal) => {
    const term = String(ciNameVal || '').trim();
    if (!term || term === '—') throw new Error('CI sem nome para busca direta');
    const hosts = await zabbixDirectCall('host.get', {
      search: { name: term },
      output: ['hostid', 'name'],
      limit: 10
    });
    if (!hosts.length) {
      return { ok: true, data: { ciName: term, hostFound: false, hasAlert: false, alerts: [], hosts: [], problems: [] } };
    }
    const host = hosts[0];
    const problems = await zabbixDirectCall('problem.get', {
      hostids: host.hostid,
      output: ['eventid', 'name', 'severity', 'clock', 'objectid'],
      sortfield: 'eventid',
      sortorder: 'DESC',
      limit: 30
    });
    const classifiedProblems = (problems || []).filter(p => parseInt(p.severity || 0, 10) > 0);
    const topProblems = [...classifiedProblems]
      .sort((a, b) => (parseInt(b.severity || 0, 10) - parseInt(a.severity || 0, 10)))
      .slice(0, 3);
    const triggerIds = [...new Set(topProblems.map(p => p.objectid).filter(Boolean))];
    let triggerToItem = {};
    if (triggerIds.length) {
      const triggers = await zabbixDirectCall('trigger.get', {
        triggerids: triggerIds,
        output: ['triggerid'],
        selectItems: ['itemid', 'name']
      });
      triggerToItem = (triggers || []).reduce((acc, trg) => {
        const firstItem = Array.isArray(trg.items) && trg.items.length ? trg.items[0] : null;
        if (trg.triggerid && firstItem && firstItem.itemid) acc[trg.triggerid] = firstItem.itemid;
        return acc;
      }, {});
    }

    const alerts = topProblems.map(p => {
      const itemid = p.objectid ? triggerToItem[p.objectid] : null;
      const graph = itemid
        ? (ZABBIX_CHART_BASE_URL + '?itemids[]=' + encodeURIComponent(itemid) + '&type=0&width=1200&height=500&period=86400&legend=1&showworkperiod=1&showtriggers=1')
        : undefined;
      return {
        severity: parseInt(p.severity || 0, 10),
        description: p.name || '',
        time: p.clock ? new Date(Number(p.clock) * 1000).toISOString() : '',
        ...(graph ? { graph } : {})
      };
    });
    const historyEvents = await zabbixDirectCall('event.get', {
      hostids: host.hostid,
      output: ['eventid', 'name', 'severity', 'clock', 'value', 'objectid'],
      value: 0,
      sortfield: 'clock',
      sortorder: 'DESC',
      limit: 5
    });
    const historyTriggerIds = [...new Set((historyEvents || []).map(ev => ev.objectid).filter(Boolean))];
    let historyTriggerToItem = {};
    if (historyTriggerIds.length) {
      const histTriggers = await zabbixDirectCall('trigger.get', {
        triggerids: historyTriggerIds,
        output: ['triggerid'],
        selectItems: ['itemid']
      });
      historyTriggerToItem = (histTriggers || []).reduce((acc, trg) => {
        const firstItem = Array.isArray(trg.items) && trg.items.length ? trg.items[0] : null;
        if (trg.triggerid && firstItem && firstItem.itemid) acc[trg.triggerid] = firstItem.itemid;
        return acc;
      }, {});
    }
    const history = (historyEvents || []).map(ev => {
      const itemid = ev.objectid ? historyTriggerToItem[ev.objectid] : null;
      const graph = itemid
        ? (ZABBIX_CHART_BASE_URL + '?itemids[]=' + encodeURIComponent(itemid) + '&type=0&width=1200&height=500&period=86400&legend=1&showworkperiod=1&showtriggers=1')
        : undefined;
      return {
      severity: parseInt(ev.severity || 0, 10),
      description: ev.name || '',
      time: ev.clock ? new Date(Number(ev.clock) * 1000).toISOString() : '',
      status: String(ev.value) === '1' ? 'PROBLEM' : 'RESOLVED',
      ...(graph ? { graph } : {})
    };});
    return {
      ok: true,
      data: {
        ciName: host.name || term,
        hostFound: true,
        hasAlert: alerts.length > 0,
        alerts,
        history,
        hosts: [host],
        problems
      }
    };
  };

  // O dashboard roda em aba ServiceNow com content.js injetado.
  // Tentamos primeiro a própria aba (window), e opcionalmente também opener.
  const ZABBIX_BRIDGE_TIMEOUT_MS = 20000;
  const fetchZabbixViaBackground = (ciNameVal, ciIpVal, ciHostnameVal) => new Promise(resolve => {
    const requestId = 'zbx-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8);
    const timeout = setTimeout(() => {
      window.removeEventListener('message', handler);
      resolve({
        ok: false,
        error: 'Timeout ao aguardar resposta do Zabbix (' + Math.round(ZABBIX_BRIDGE_TIMEOUT_MS / 1000) + 's).'
      });
    }, ZABBIX_BRIDGE_TIMEOUT_MS);

    function handler(event) {
      if (!event.data || event.data.type !== 'EMS_ZABBIX_RESPONSE') return;
      if (event.data.requestId !== requestId) return;
      clearTimeout(timeout);
      window.removeEventListener('message', handler);
      resolve(event.data.response);
    }

    window.addEventListener('message', handler);
    const payload = { type: 'EMS_ZABBIX_REQUEST', requestId, ciName: ciNameVal, ciIp: ciIpVal, ciHostname: ciHostnameVal };
    console.log('[EMS dashboard] Enviando EMS_ZABBIX_REQUEST via window.postMessage, requestId:', requestId);
    window.postMessage(payload, '*');

    if (window.opener && !window.opener.closed) {
      try {
        console.log('[EMS dashboard] Enviando EMS_ZABBIX_REQUEST também via opener.postMessage, requestId:', requestId);
        window.opener.postMessage(payload, '*');
      } catch (_) {
        // sem ação: tentativa auxiliar
      }
    }
  });

  const buildZabbixHtml = (zbx, ciNameVal) => {
    const SEV_LABEL = ['Not classified','Information','Warning','Average','High','Disaster'];
    const SEV_COLOR = ['#8C959F','#0969DA','#BF8700','#E36209','#CF222E','#82071E'];
    const SEV_BG    = ['#F6F8FA','#EFF6FF','#FFF8C5','#FFEDCB','#FFEBE9','#FFF0F0'];
    const SEV_ICON  = ['⚪','🔵','🟡','🟠','🔴','🚨'];

    if (!zbx.ok) {
      const hasAttempts = !!(zbx && zbx.debug && Array.isArray(zbx.debug.attempts) && zbx.debug.attempts.length);
      const dbg = hasAttempts
        ? '<div style="margin-top:6px;font-size:11px;color:#8C959F;">'+
            'Debug: '+esc(zbx.debug.attempts.map(a => {
              if (a.mode === 'error') return (a.term || 'term') + ': ' + (a.error || 'erro');
              return (a.mode || 'mode') + ':' + (a.term || 'term') + ' (' + (a.ms || 0) + 'ms, found=' + (a.found || 0) + ')';
            }).join(' | '))+
          '</div>'
        : '';
      return '<div class="acc-sec">'+
        '<div class="acc-sec-h">🔔 Alertas Zabbix</div>'+
        '<div style="padding:10px;font-size:12px;color:#BF8700;">⚠️ Não foi possível consultar o Zabbix: '+esc(zbx.error||'erro desconhecido')+dbg+'</div>'+
      '</div>';
    }

    const d = zbx.data;
    if (!d.hostFound) {
      return '<div class="acc-sec">'+
        '<div class="acc-sec-h">🔔 Alertas Zabbix</div>'+
        '<div style="padding:10px;font-size:12px;color:#57606A;">Host não encontrado no Zabbix.<br>'+
        '<span style="font-size:11px;color:#8C959F;">Buscado por: '+esc((d.searchedTerms||[ciNameVal]).join(', '))+'</span></div>'+
      '</div>';
    }

    const problems = d.problems || [];
    const rawAlerts = d.alerts || problems.map(p => ({
        severity: parseInt(p.severity || 0, 10),
        description: p.name || '',
        time: p.clock ? new Date(parseInt(p.clock, 10) * 1000).toISOString() : '',
        historyValues: p.historyValues || []
    }));
    const alerts = rawAlerts.filter(a => parseInt(a.severity || 0, 10) > 0);

    const hostNames = (d.hosts||[]).map(h=>h.name||h.host).join(', ');
    const debugInfo = (d && d.debug && d.debug.totalMs)
      ? '<div style="padding:0 10px 8px;font-size:10px;color:#8C959F;">Tempo consulta Zabbix: '+esc(String(d.debug.totalMs))+'ms</div>'
      : '';
    const resolvedHistory = (d.history || [])
      .filter(h => String(h.status || '').toUpperCase().includes('RESOLVED'))
      .slice(0, 5);

    const chartViewerId = 'zbx-chart-img-' + Math.random().toString(36).slice(2,8);
    const chartLinkId = 'zbx-chart-link-' + Math.random().toString(36).slice(2,8);

    const rows = alerts.map(p => {
      const sev = parseInt(p.severity) || 0;
      const color = SEV_COLOR[sev] || '#57606A';
      const bg    = SEV_BG[sev]    || '#F6F8FA';
      const icon  = SEV_ICON[sev]  || '⚪';
      const label = SEV_LABEL[sev] || sev;
      const dt    = p.time ? new Date(p.time).toLocaleString('pt-BR', {
        day:'2-digit', month:'2-digit', hour:'2-digit', minute:'2-digit'
      }).replace(',','') : '—';
      const graphCell = p.graph
        ? '<a href="'+esc(p.graph)+'" target="_blank" style="font-size:10px;border:1px solid #D0D7DE;background:#fff;border-radius:4px;padding:2px 6px;cursor:pointer;display:inline-block;text-decoration:none;color:#0969DA;">📊 gráfico</a>'
        : '<span style="font-size:10px;color:#8C959F;">—</span>';
      return '<tr style="background:'+bg+'">'+
        '<td><span style="color:'+color+';font-weight:700;font-size:11px;">'+icon+' '+esc(label)+'</span></td>'+
        '<td style="font-size:12px;color:#24292F;">'+esc(p.description)+'</td>'+
        '<td style="font-size:11px;color:#57606A;white-space:nowrap;">'+esc(dt)+'</td>'+
        '<td>'+graphCell+'</td>'+
      '</tr>';
    }).join('');

    const alertCount = alerts.length;
    const hasHigh = alerts.some(p => parseInt(p.severity) >= 4);
    const badgeColor = hasHigh ? '#CF222E' : '#BF8700';
    const badgeBg    = hasHigh ? '#FFEBE9' : '#FFF8C5';
    const badgeBorder= hasHigh ? '#FFD1CC' : '#E3B341';

    const historyRows = resolvedHistory.map(h => {
      const statusColor = h.status === 'PROBLEM' ? '#CF222E' : '#1A7F37';
      const dt = h.time ? new Date(h.time).toLocaleString('pt-BR', {
        day:'2-digit', month:'2-digit', hour:'2-digit', minute:'2-digit'
      }).replace(',', '') : '—';
      const historyGraphCell = h.graph
        ? '<a href="'+esc(h.graph)+'" target="_blank" style="font-size:10px;border:1px solid #D0D7DE;background:#fff;border-radius:4px;padding:2px 6px;cursor:pointer;display:inline-block;text-decoration:none;color:#0969DA;">📊 gráfico</a>'
        : '<span style="font-size:10px;color:#8C959F;">—</span>';
      return '<tr>'+
        '<td style="font-size:11px;color:'+statusColor+';font-weight:700;">'+esc(h.status || '—')+'</td>'+
        '<td style="font-size:12px;color:#24292F;">'+esc(h.description || '—')+'</td>'+
        '<td style="font-size:11px;color:#57606A;">'+esc(dt)+'</td>'+
        '<td>'+historyGraphCell+'</td>'+
      '</tr>';
    }).join('');

    return '<div class="acc-sec">'+
      '<div class="acc-sec-h" style="display:flex;align-items:center;justify-content:space-between;">'+
        '<span>🔔 Alertas Zabbix</span>'+
        '<span style="font-size:10px;font-weight:700;color:'+(alertCount?badgeColor:'#1A7F37')+';background:'+(alertCount?badgeBg:'#DAFBE1')+';padding:2px 8px;border-radius:10px;border:1px solid '+(alertCount?badgeBorder:'#A7F3C0')+';">'+(alertCount?alertCount+' alerta'+(alertCount>1?'s':'')+' ativo'+(alertCount>1?'s':''):'✅ Sem alertas ativos')+'</span>'+
      '</div>'+
      '<div style="padding:4px 10px 6px;font-size:11px;color:#57606A;">Host: <b>'+esc(hostNames)+'</b></div>'+
      debugInfo+
      '<div class="acc-table-wrap">'+
        '<table class="acc-table">'+
          '<thead><tr><th>Severidade</th><th>Problema</th><th>Desde</th><th>Gráfico</th></tr></thead>'+
          '<tbody>'+(rows || '<tr><td colspan="4" style="font-size:11px;color:#57606A;padding:8px;">Sem alertas ativos</td></tr>')+'</tbody>'+
        '</table>'+
      '</div>'+
      '<div style="padding:8px 10px 4px;font-size:11px;font-weight:700;color:#57606A;">Histórico (últimos 5 resolvidos)</div>'+
      '<div class="acc-table-wrap"><table class="acc-table"><thead><tr><th>Status</th><th>Evento</th><th>Quando</th><th>Gráfico</th></tr></thead><tbody>'+(historyRows || '<tr><td colspan="4" style="font-size:11px;color:#57606A;padding:8px;">Sem eventos resolvidos recentes</td></tr>')+'</tbody></table></div>'+
    '</div>';
  };

  Promise.all([fetchSingleCi(), fetchCredentials()])
  .then(([ci, creds]) => {
    const ciComments = getVal(ci, 'comments');
    const ciHtml =
      '<div class="acc-sec">'+
        '<div class="acc-sec-h">CI do chamado <span class="acc-sec-sub acc-sec-ok">'+esc(ciName || getVal(ci,'name'))+'</span></div>'+
        '<div style="padding:10px;display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:12px;">'+
          '<div><b>Nome:</b> '+esc(getVal(ci,'name'))+'</div>'+
          '<div><b>IP:</b> '+esc(getVal(ci,'ip_address'))+'</div>'+
          '<div><b>Hostname:</b> '+esc(getVal(ci,'host_name'))+'</div>'+
          '<div><b>Classe:</b> '+esc(getVal(ci,'sys_class_name'))+'</div>'+
        '</div>'+
      '</div>';

    const commentsHtml =
      '<div class="acc-sec">'+
        '<div class="acc-sec-h">Comments (cmdb_ci_server)</div>'+
        '<div style="padding:10px;font-size:12px;white-space:pre-wrap;background:#fff;">'+esc(ciComments)+'</div>'+
      '</div>';

    const credRows = creds.map((r,idx) => {
      const user = getVal(r,'u_user','u_username','name','u_portal_display_name');
      const pass = getVal(r,'u_password','u_password_clear','password');
      const type = getVal(r,'u_type');
      const desc = getVal(r,'u_description','short_description','comments');
      const rowId = 'ci-cred-pass-'+idx+'-'+Math.random().toString(36).slice(2,8);
      return '<tr>'+
        '<td>'+esc(user)+'</td>'+
        '<td><span id="'+rowId+'">••••••••</span> <button type="button" data-target="'+rowId+'" data-value="'+esc(pass)+'" onclick="toggleCiPassword(this)" style="font-size:10px;">Show password</button></td>'+
        '<td>'+esc(type)+'</td>'+
        '<td>'+esc(desc)+'</td>'+
      '</tr>';
    }).join('');

    const credsHtml =
      '<div class="acc-sec">'+
        '<div class="acc-sec-h">Usuários / Credenciais (u_ci_credentials) <span class="acc-sec-sub">'+creds.length+' registros</span></div>'+
        (creds.length
          ? '<div class="acc-table-wrap"><table class="acc-table"><thead><tr><th>User</th><th>Password</th><th>Type</th><th>Description</th></tr></thead><tbody>'+credRows+'</tbody></table></div>'
          : '<div style="padding:10px;"><div class="account-product-empty">Nenhuma credencial encontrada para este CI.</div></div>'
        )+
      '</div>';

    // ── Original: monta e exibe o html ────────────────────────────────────
    const html = ciHtml + commentsHtml + credsHtml;
    listEl.innerHTML = html;
    if(!cache.entries) cache.entries = {};
    cache.entries[cacheKey] = { ts: Date.now(), html };
    window._ACCOUNT_PRODUCTS_CACHE = cache;

    // ── ADIÇÃO: seção Zabbix inserida após o conteúdo original ────────────
    const zabbixPlaceholder = document.createElement('div');
    zabbixPlaceholder.id = 'zabbix-section-'+ciId;
    zabbixPlaceholder.className = 'acc-sec';
    zabbixPlaceholder.innerHTML =
      '<div class="acc-sec-h">🔔 Alertas Zabbix</div>'+
      '<div style="padding:10px;font-size:12px;color:#57606A;">⏳ Consultando Zabbix...</div>';
    listEl.prepend(zabbixPlaceholder);

    const ciIpVal       = getVal(ci, 'ip_address');
    const ciHostnameVal = getVal(ci, 'host_name');

    const ciLookupName = ciName || getVal(ci,'name');
    fetchZabbixDirect(ciLookupName)
      .catch(() => fetchZabbixViaBackground(ciLookupName, ciIpVal, ciHostnameVal))
      .then(zbx => {
        const el = listEl.querySelector('#zabbix-section-'+ciId);
        if (!el) return;
        el.outerHTML = buildZabbixHtml(zbx, ciLookupName);
        // Atualiza cache com Zabbix incluído (TTL menor se há alertas)
        const hasProblem = zbx.ok && zbx.data?.problems?.length > 0;
        if(cache.entries) {
          cache.entries[cacheKey] = { ts: Date.now(), html: listEl.innerHTML };
          cache.ttlMs = hasProblem ? 30000 : 120000;
          window._ACCOUNT_PRODUCTS_CACHE = cache;
        }
      });
  })
  .catch(err => {
    listEl.innerHTML='<div class="account-product-empty">❌ Erro ao carregar CI ('+( err?.status||err?.message||'desconhecido')+').</div>';
  });
}

function openAccountProductsModal(accountId, accountName){
  const ov=document.getElementById('account-products-overlay');
  const nameEl=document.getElementById('account-products-name');
  const listEl=document.getElementById('account-products-list');
  if(!ov||!nameEl||!listEl) return;
  nameEl.textContent=accountName||'—';
  ov.style.display='flex';
  populateAccountProducts(listEl, accountId, accountName, '', '');
}

function closeAccountProductsModal(){
  const ov=document.getElementById('account-products-overlay');
  if(ov) ov.style.display='none';
}

function filterManagedItemsRows(query){
  const q=(query||'').toLowerCase().trim();
  document.querySelectorAll('#account-products-list .managed-item-row').forEach(row=>{
    const hay=(row.getAttribute('data-mi-search')||'').toLowerCase();
    row.style.display = !q || hay.includes(q) ? '' : 'none';
  });
}

function closeCaseModal() {
  const dynamicOverlay = document.getElementById('case-iframe-overlay');
  if (dynamicOverlay) dynamicOverlay.remove();
  const overlay = document.getElementById('case-modal-overlay');
  if (overlay) overlay.style.display = 'none';
  if (_modalActiveCard) { _modalActiveCard.classList.remove('modal-active'); _modalActiveCard = null; }
  _modalSysId = null;
}

async function uploadModalAttachment(){
  if(!_modalSysId) return;
  const input = document.getElementById('modal-attach-file');
  const file = input?.files?.[0];
  if(!file){ showToast('Selecione um arquivo','warn'); return; }
  const fd = new FormData();
  fd.append('file', file);
  const url = _BASE + '/api/now/attachment/file?table_name=sn_customerservice_case&table_sys_id=' + encodeURIComponent(_modalSysId) + '&file_name=' + encodeURIComponent(file.name);
  try{
    const r = await fetch(url, {method:'POST', headers:{'X-UserToken':_TOK}, body:fd});
    if(!r.ok) throw new Error('HTTP '+r.status);
    showToast('✅ Anexo enviado');
    const numEl=document.getElementById('modal-num');
    if(numEl) openCaseModal(_modalSysId, numEl.textContent, _modalActiveCard||document.createElement('div'));
  }catch(e){
    showToast('❌ Erro ao anexar arquivo','error');
  }
}

let _modalNoteType = 'work_notes';
function modalTabSwitch(type) {
  _modalNoteType = type === 'wn' ? 'work_notes' : 'comments';
  const ta = document.getElementById('modal-note-ta');
  const btnWN = document.getElementById('tab-wn');
  const btnCM = document.getElementById('tab-cm');
  if (ta) ta.placeholder = type === 'wn' ? 'Adicionar work note (interno)...' : 'Adicionar comentário (visível ao cliente)...';
  if (btnWN) { btnWN.style.background=type==='wn'?'#0969DA':'#fff'; btnWN.style.color=type==='wn'?'#fff':'#24292F'; btnWN.style.borderColor=type==='wn'?'#0969DA':'#D0D7DE'; }
  if (btnCM) { btnCM.style.background=type==='cm'?'#0969DA':'#fff'; btnCM.style.color=type==='cm'?'#fff':'#24292F'; btnCM.style.borderColor=type==='cm'?'#0969DA':'#D0D7DE'; }
}
function saveModal() {
  if (!_modalSysId) return;
  const note = document.getElementById('modal-note-ta')?.value?.trim();
  if (!note) { showToast('Adicione uma nota para salvar','warn'); return; }

  const body = {};
  body[_modalNoteType] = note;

  fetch(_BASE+'/api/now/table/sn_customerservice_case/'+_modalSysId, {
    method:'PATCH',
    headers:{'Accept':'application/json','Content-Type':'application/json','X-UserToken':_TOK},
    body:JSON.stringify(body)
  }).then(r => {
    if (r.status === 200) {
      showToast('✅ Salvo no Snow');
      document.getElementById('modal-note-ta').value = '';
      // Refresh modal content
      const numEl = document.getElementById('modal-num');
      if (numEl) openCaseModal(_modalSysId, numEl.textContent, _modalActiveCard||document.createElement('div'));
    } else {
      showToast('❌ Erro ao salvar','error');
    }
  }).catch(() => showToast('❌ Erro de conexão','error'));
}


function saveModalImpactUrgency(){
  if(!_modalSysId) return;
  const impact=document.getElementById('modal-impact')?.value;
  const urgency=document.getElementById('modal-urgency')?.value;
  if(!impact||!urgency){showToast('Selecione Impact e Urgency','warn');return;}
  patchCase(_modalSysId,{impact,urgency}).then(ok=>{
    if(ok){
      syncImpactUrgencyInUI(_modalSysId,impact,urgency);
      showToast('✅ Impact/Urgency salvo');
      const numEl=document.getElementById('modal-num');
      if(numEl) setTimeout(()=>openCaseModal(_modalSysId,numEl.textContent,_modalActiveCard||document.createElement('div')),250);
    }else showToast('❌ Erro ao salvar Impact/Urgency','error');
  });
}

function modalReassign() {
  if (!_modalSysId) return;
  const gid = window._GID_MAP?.[currentFila] || '';
  const btn = document.querySelector('#case-modal button[onclick="modalReassign()"]');
  const fakeEvent = {
    stopPropagation:()=>{},
    preventDefault:()=>{},
    target: btn || document.getElementById('modal-footer')
  };
  openReassign(fakeEvent, _modalSysId, gid, '');
}

// ── Board Search ────────────────────────────────────────────────────────────
function boardSearch(q) {
  const term = q.trim().toLowerCase();
  const boards = ['board-wrap','board-wrap-backlog'];
  boards.forEach(bid => {
    const bw = document.getElementById(bid); if (!bw) return;
    bw.querySelectorAll('.card').forEach(card => {
      if (!term) { card.style.display = ''; return; }
      const num  = (card.querySelector('.card-num')?.textContent||'').toLowerCase();
      const desc = (card.querySelector('.card-desc')?.textContent||'').toLowerCase();
      const assi = (card.querySelector('.card-assigned')?.textContent||'').toLowerCase();
      card.style.display = (num.includes(term)||desc.includes(term)||assi.includes(term)) ? '' : 'none';
    });
  });
}

// Close modal on overlay click
document.addEventListener('click', e => {
  const overlay = document.getElementById('case-modal-overlay');
  const modal   = document.getElementById('case-modal');
  if (overlay && overlay.style.display !== 'none' && modal && !modal.contains(e.target) && !e.target.closest('.card')) {
    closeCaseModal();
  }

  const accOverlay=document.getElementById('account-products-overlay');
  if(accOverlay && accOverlay.style.display!=='none' && e.target===accOverlay){
    closeAccountProductsModal();
  }
});

// ── Column filters ─────────────────────────────────────────────────────────
const _fil={};let _dd=null;
const _FILTER_VALUES_CACHE = {};
function getCT(row,col){const c=row.cells[col];return c?(c.innerText||c.textContent||'').trim():'';}
function applyFil(){
  const tb=document.getElementById('pmtbody');if(!tb)return;
  Array.from(tb.rows).forEach(r=>{r.style.display=Object.entries(_fil).every(([c,v])=>!v||v.size===0||v.has(getCT(r,parseInt(c))))?'':'none';});
  renderFTags();
}
function renderFTags(){
  const bar=document.getElementById('fbar');if(!bar)return;
  bar.innerHTML='';
  Object.entries(_fil).forEach(([col,vals])=>{
    if(!vals||vals.size===0)return;
    const th=document.querySelector('th[data-col="'+col+'"]');
    const lbl=th?th.innerText.replace('▾','').trim():'Col '+col;
    vals.forEach(v=>{const t=document.createElement('div');t.className='filter-tag';t.innerHTML='<span><b>'+lbl+':</b> '+v+'</span><button onclick="remFil('+col+',this)" data-val="'+v+'">×</button>';bar.appendChild(t);});
  });
  document.querySelectorAll('th[data-col]').forEach(th=>{th.classList.toggle('active-filter',_fil[th.getAttribute('data-col')]?.size>0);});
}
function remFil(col,btn){if(_fil[col])_fil[col].delete(btn.getAttribute('data-val'));applyFil();closeDd();}
function closeDd(){if(_dd){_dd.remove();_dd=null;}}
function openFil(th,ci){
  closeDd();
  const tb=document.getElementById('pmtbody');if(!tb)return;
  const vals=_FILTER_VALUES_CACHE[ci] || ([...new Set(Array.from(tb.rows).map(r=>getCT(r,ci)).filter(Boolean))].sort());
  _FILTER_VALUES_CACHE[ci]=vals;
  const cur=_fil[ci]||new Set();
  const dd=document.createElement('div');dd.className='fdd';
  const renderOpts=list=>list.map(v=>'<label class="fdd-opt"><input type="checkbox" value="'+v.replace(/"/g,'&quot;')+'"'+(cur.has(v)?' checked':'')+' ><span>'+v+'</span></label>').join('');
  const firstBatch=vals.slice(0,250);
  dd.innerHTML='<input class="fdd-search" placeholder="Buscar..." oninput="filtOpts(this)" data-ci="'+ci+'"><div class="fdd-opts" id="ddopts" data-ci="'+ci+'">'+
    renderOpts(firstBatch)+
    (vals.length>250?'<div class="fdd-opt" style="color:var(--muted)">Mostrando 250/'+vals.length+' · digite para filtrar</div>':'')+
    '</div><div class="fdd-foot"><button class="fdd-clear" onclick="clrCol('+ci+')">Limpar</button><button class="fdd-apply" onclick="applyCol('+ci+')">Aplicar</button></div>';
  document.body.appendChild(dd);_dd=dd;
  const rect=th.getBoundingClientRect(),dw=240;
  let lft=rect.left;if(lft+dw>window.innerWidth)lft=window.innerWidth-dw-8;
  dd.style.top=(rect.bottom+2)+'px';dd.style.left=lft+'px';dd.style.width=dw+'px';
  setTimeout(()=>document.addEventListener('click',oc),0);
}
function oc(e){if(_dd&&!_dd.contains(e.target)){closeDd();document.removeEventListener('click',oc);}}
function filtOpts(i){
  const q=i.value.toLowerCase();
  const ci=parseInt(i.dataset.ci||'-1',10);
  const wrap=document.getElementById('ddopts');
  if(ci<0||!wrap) return;
  const vals=_FILTER_VALUES_CACHE[ci]||[];
  const filtered=(q?vals.filter(v=>v.toLowerCase().includes(q)):vals).slice(0,250);
  const cur=_fil[ci]||new Set();
  wrap.innerHTML=filtered.map(v=>'<label class="fdd-opt"><input type="checkbox" value="'+v.replace(/"/g,'&quot;')+'"'+(cur.has(v)?' checked':'')+' ><span>'+v+'</span></label>').join('')+
    ((q?vals.filter(v=>v.toLowerCase().includes(q)).length:vals.length)>250?'<div class="fdd-opt" style="color:var(--muted)">Refine para ver mais...</div>':'');
}
function applyCol(ci){const ch=Array.from(document.querySelectorAll('#ddopts input:checked')).map(i=>i.value);_fil[ci]=ch.length?new Set(ch):new Set();applyFil();closeDd();document.removeEventListener('click',oc);}
function clrCol(ci){_fil[ci]=new Set();applyFil();closeDd();document.removeEventListener('click',oc);}
document.addEventListener('visibilitychange',()=>{
  if(document.hidden) stopPolling();
  else startPolling();
});
document.addEventListener('DOMContentLoaded',()=>{
  const accHdr=document.getElementById('acc-hdr-analyst');
  if(accHdr && !accHdr.dataset.bound){
    accHdr.dataset.bound='1';
    accHdr.addEventListener('click',e=>{
      if(e.target.closest('.refresh-btn')) return;
      toggleAcc('analyst');
    });
  }
  dedupeManagerToolbar();
  updateRequestsLabel();
  applyUiSettings();
  currentBacklogFila=document.getElementById('backlog-fila-sel')?.value||'all';
  currentBacklogAnalyst=document.getElementById('backlog-analyst-sel')?.value||'';
  currentReportsFila=document.getElementById('rpt-fila-sel')?.value||'all';
  currentReportsManager=document.getElementById('rpt-manager-sel')?.value||'';
  currentReportsAnalyst=document.getElementById('rpt-analyst-sel')?.value||'';
  populateManagerDropdown('manager-sel', currentFila).then(()=>{
    const managerId=document.getElementById('manager-sel')?.value||'';
    populateAnalystDropdown('analyst-sel', currentFila, managerId, '— Todos —');
    syncBacklogAnalystDropdown();
    renderFilterChips();
  });
  document.querySelectorAll('th[data-col]').forEach(th=>{th.addEventListener('click',e=>{e.stopPropagation();openFil(th,parseInt(th.getAttribute('data-col')));});});
  pgInit();
  // Load analyst table — try immediately, then watch for content via MutationObserver
  function tryInitAccordion(){
    const src=document.getElementById('_at_'+currentFila)?.innerHTML||document.getElementById('_at_l1')?.innerHTML||'';
    if(src&&src.trim().length>10){initAccordion();return true;}
    return false;
  }
  if(!tryInitAccordion()){
    const obs=new MutationObserver(()=>{if(tryInitAccordion())obs.disconnect();});
    const target=document.getElementById('_at_l1');
    if(target)obs.observe(target,{childList:true,subtree:true,characterData:true});
    else setTimeout(tryInitAccordion,500);
  }
  const reportsWrap=document.getElementById('reports-page-wrap');
  const reportsPage=document.getElementById('page-reports');
  const kanbanPage=document.getElementById('page-kanban');
  if(reportsPage&&kanbanPage&&reportsPage.parentElement===kanbanPage){
    kanbanPage.insertAdjacentElement('afterend',reportsPage);
  }
  const accWrap=document.getElementById('accordion-wrap');
  if(reportsWrap&&accWrap){
    accWrap.style.display='block';
    reportsWrap.appendChild(accWrap);
    const accBody=document.getElementById('acc-body-analyst');
    const accArrow=document.getElementById('acc-arrow-analyst');
    if(accBody){accBody.style.display='block';accBody.dataset.open='1';}
    if(accArrow) accArrow.style.transform='rotate(180deg)';
  }
  switchReportsFila(currentReportsFila);
  switchFilaBacklog(currentBacklogFila);
  renderFilterChips();
  document.addEventListener('click',e=>{
    const queueWrap=document.getElementById('req-queue-menu');
    const filterWrap=document.getElementById('req-filter-menu');
    const actions=e.target?.closest?.('.requests-toolbar');
    if(actions) return;
    if(queueWrap) queueWrap.style.display='none';
    if(filterWrap) filterWrap.style.display='none';
  });
  // Start layered polling
	  startPolling();
    initCardDragAndDrop();
	});

  Object.assign(window,{
    showPage,activateSide,changeMes,boardSearch,refreshKanban,refreshBacklog,refreshPostmortem,
    switchFila,switchFilaBacklog,switchManager,switchAnalyst,switchAnalystBacklogFromToolbar,switchResolvedTodayQueue,
    clearToolbarFilters,toggleQueueMenu,toggleFilterMenu,closeReqMenus,toggleSlaSort,topAction,
    switchReportsFila,switchReportsManager,switchReportsAnalyst,
    toggleSection,openCaseModal,openCaseModalBtn,
    openImpactUrgencyBtn,openReassignBtn,closeImpactUrgencyEditor,
    closeCaseModal,modalReassign,
    modalTabSwitch,saveModal,saveModalImpactUrgency,uploadModalAttachment,
    closeAccountProductsModal,toggleCiPassword,pgNav,pgGoTo,remFil,clrCol,applyCol
  });

  // ── Delta Polling (Real-time updates) ──────────────────────────────────
  (function() {
    // Clear any previous interval (survives document.write re-renders)
    if (window.__deltaPollingTimerId) { clearInterval(window.__deltaPollingTimerId); window.__deltaPollingTimerId = null; }
    window.__deltaPollingActive = true;
    console.log('[DeltaPolling] Inicializando...');

    let POLLING_INTERVAL = window._UI_SETTINGS?.pollingMs || 120000;
    // Inicia 5 minutos no passado para garantir que nada foi perdido no carregamento inicial
    let lastSyncTime = new Date(Date.now() - 300000).toISOString().split('.')[0].replace('T', ' ');
    let isFetching = false;
    
    const _G_IDS = '1c7c9057db6771d0832ead8ed396197a,673c2170476422503cbfe07a216d430f,ff72689247ee1e143cbfe07a216d4357';
    const _FIELDS = 'number,short_description,priority,state,impact,urgency,assigned_to,assignment_group,opened_at,u_escalation_type,u_type,sys_updated_on,resolved_at,closed_at,sys_id,account,category,u_close_code,u_internal_cases';
    const isTerminalState = st => ['3','6','7','24','25','33','35'].includes(String(st||''));

    function updateResolvedTodayUI(data) {
      const gid = data.assignment_group?.value || '';
      const gkey = _GK[gid];
      if (!gkey) return;

      const analystName = data.assigned_to?.display_value || '— Sem responsável';
      // Procura nos containers de grupo (rt-l1, etc) e no corpo da lane (caso seja board filtrado)
      const targets = [];
      const groupContainer = document.getElementById('rt-' + gkey);
      if (groupContainer) targets.push(groupContainer);
      
      const standardBody = document.querySelector('.lane-rt .lane-body');
      if (standardBody && !standardBody.querySelector('.rt-group')) targets.push(standardBody);

      targets.forEach(container => {
        let row = Array.from(container.querySelectorAll('.rt-row')).find(r => 
          (r.querySelector('.rt-name').title === analystName) || 
          (r.querySelector('.rt-name').textContent.trim() === analystName.split(' ').slice(0,2).join(' '))
        );

        if (row) {
          const valEl = row.querySelector('.rt-val');
          if (valEl) valEl.textContent = parseInt(valEl.textContent) + 1;
        } else {
          const empty = container.querySelector('.lane-empty');
          if (empty) empty.remove();
          
          const colors = ['#0969DA','#1A7F37','#BF8700','#CF222E','#8250DF','#0550AE','#116329','#7D4E00','#A40E26','#6E40C9'];
          const newIdx = container.querySelectorAll('.rt-row').length;
          const rowHtml = `
            <div class="rt-row">
              <div class="rt-name" title="${escapeHtml(analystName)}">${escapeHtml(analystName.split(' ').slice(0,2).join(' '))}</div>
              <div class="rt-track">
                <div class="rt-fill" style="width:0%;background:${colors[newIdx % colors.length]}"></div>
              </div>
              <span class="rt-val">1</span>
            </div>`;
          container.insertAdjacentHTML('beforeend', rowHtml);
          row = container.lastElementChild;
        }

        // Recalcula escalas das barras
        const rows = Array.from(container.querySelectorAll('.rt-row'));
        const counts = rows.map(r => parseInt(r.querySelector('.rt-val').textContent || '0'));
        const max = Math.max(...counts, 1);
        
        rows.forEach(r => {
          const c = parseInt(r.querySelector('.rt-val').textContent || '0');
          const fill = r.querySelector('.rt-fill');
          if (fill) fill.style.width = Math.round((c / max) * 100) + '%';
        });

        // Atualiza o contador no cabeçalho da lane
        const laneHdr = container.closest('.lane');
        const dropdown = laneHdr?.querySelector('select');
        const currentView = dropdown ? dropdown.value : null;
        const countBadge = laneHdr?.querySelector('.lane-count');

        if (countBadge) {
          // Se houver dropdown, só incrementa o badge se a fila do caso for a fila visível
          if (!currentView || currentView === gkey) {
            countBadge.textContent = parseInt(countBadge.textContent || '0') + 1;
          }
        }
      });
    }

    async function fetchDeltas() {
      if (!window.__deltaPollingActive) return;
      if (!outWin || outWin.closed) return;
      if (isFetching) return;
      isFetching = true;

      const targetDoc = outWin.document;

      // Se o estado for resolvido/fechado, queremos garantir que ele apareça na lista de hoje
      const isResolvedToday = c => {
        if (!c.resolved_at?.value && !c.closed_at?.value) return false;
        const resDate = (c.resolved_at?.value || c.closed_at?.value).split(' ')[0];
        const today = new Date().toISOString().split('T')[0];
        return resDate === today;
      };

      const fetchStartTime = new Date(Date.now() - 2000).toISOString().split('.')[0].replace('T', ' '); // Overlap de 2s para segurança

      const baseQuery = 'assignment_groupIN' + _G_IDS + '^sys_updated_on>=' + lastSyncTime + '^ORDERBYDESCsys_updated_on';
      const endpoint = _BASE + '/api/now/table/sn_customerservice_case';
      const params = '&sysparm_fields=' + _FIELDS + '&sysparm_display_value=all&sysparm_limit=100';

      async function fetchByQuery(query) {
        const url = endpoint + '?sysparm_query=' + encodeURIComponent(query) + params;
        const response = await snFetch(url);
        const raw = await response.text();
        if (!response.ok) {
          const msg = raw ? ': ' + raw.slice(0, 180) : '';
          throw new Error('delta_polling HTTP ' + response.status + msg);
        }
        let data = {};
        if (raw) {
          try { data = JSON.parse(raw); }
          catch (_) { throw new Error('delta_polling retornou JSON inválido (HTTP ' + response.status + ')'); }
        }
        return data.result || [];
      }

      try {
        const out = [];
        const seen = new Set();
        const addCases = list => {
          list.forEach(c => {
            const sid = c?.sys_id?.value || c?.sys_id;
            if (!sid || seen.has(sid)) return;
            seen.add(sid);
            out.push(c);
          });
        };

        // Otimização: A query por grupo captura todas as atualizações relevantes.
        // Removido o loop por ID individual para poupar dezenas de chamadas de rede e melhorar a velocidade.
        addCases(await fetchByQuery(baseQuery));
        const cases = out;

        if (cases.length > 0) {
          console.log('[DeltaPolling] ' + cases.length + ' casos alterados.');
          cases.forEach(c => {
            console.log(`[DeltaPolling] Processando ${c.number?.display_value}: Prio Value=${c.priority?.value}, State=${c.state?.value}`);
            const cards = targetDoc.querySelectorAll('.card[data-sysid="' + (c.sys_id.value || c.sys_id) + '"]');
            if (cards.length > 0) {
              if (isTerminalState(c?.state?.value)) {
                cards.forEach(card => {
                  const board = card.closest('.board-inner');
                if (isResolvedToday(c)) updateResolvedTodayUI(c);
                  card.remove();
                  if (board) updateLaneCounters(board);
                });
                return;
              }
              cards.forEach(card => updateCard(card, c));
            } else {
              if (isTerminalState(c?.state?.value)) {
                if (isResolvedToday(c)) updateResolvedTodayUI(c);
                return;
              }
              console.log('[DeltaPolling] Novo caso detectado: ' + c.number.display_value);
              insertNewCaseCard(c);
            }
          });
          reapplyAnalystFilters();
        }
        lastSyncTime = fetchStartTime;
      } catch (err) { console.error('[DeltaPolling] Erro:', err); }
      finally { isFetching = false; }
    }

    // Mantém a sessão ativa e verifica token a cada 5 minutos
    setInterval(() => {
      snFetch(_BASE + '/api/now/table/sys_user?sysparm_limit=1').catch(() => {});
    }, 300000);

    const LANE_CLASSES = new Set(['card-critical','card-high','card-medium','card-normal','card-awaiting','card-orphan']);

    function resolveLaneFromDelta(data) {
      const stV = String(data?.state?.value || '');
      const stD = (data?.state?.display_value || '').toLowerCase();
      const isAwaiting = ['18','32','5','29','30'].includes(stV) || stD.includes('awaiting') || stD.includes('aguardando') || stD.includes('info');

      const hasAssigned = !!data?.assigned_to?.value;
      const rawDV = (data?.priority?.display_value || '').trim();
      const match = rawDV.match(/^\d/);
      let prio = match ? parseInt(match[0], 10) : parseInt(data?.priority?.value || '5', 10);
      if (prio === 1 && !rawDV.startsWith('1')) prio = 2;

      if (isAwaiting) return 'awaiting';
      if (!hasAssigned) return 'orphan';

      if (prio === 1) return 'critical';
      if (prio === 2) return 'high';
      if (prio === 3) return 'medium';
      return 'normal';
    }

    function resolveLaneWithSla(data, card) {
      return resolveLaneFromDelta(data);
    }

    function moveCardToLane(card, lane) {
      const board = card.closest('.board-inner');
      if (!board || !lane) return;
      const targetBody = board.querySelector('.lane[data-lane="' + lane + '"] .lane-body');
      if (!targetBody || card.parentElement === targetBody) return;
      targetBody.insertBefore(card, targetBody.firstChild);
      updateLaneCounters(board);
    }

    function queueMatchesFila(groupId, filaKey) {
      if (filaKey === 'all') return true;
      const selected = window._GID_MAP?.[filaKey] || '';
      return !selected || selected.split(',').includes(groupId);
    }

    function escapeHtml(v) {
      return String(v ?? '').replace(/[&<>"']/g, ch => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[ch]));
    }

    function pulseCard(card, changedLane) {
      card.classList.remove('card-updated', 'card-moved');
      void card.offsetWidth;
      card.classList.add('card-updated');
      if (changedLane) card.classList.add('card-moved');
      setTimeout(() => card.classList.remove('card-updated', 'card-moved'), 1100);
    }

    function buildCardElement(data, lane) {
      const initialsDelta = name => {
        const txt = (name || '').trim();
        if (!txt) return 'SR';
        return txt.split(/\s+/).slice(0,2).map(p => p.charAt(0).toUpperCase()).join('') || 'SR';
      };
      const fmtOpenedDelta = d => {
        const x = new Date(d);
        if (isNaN(x)) return '—';
        return x.toLocaleString('pt-BR', { day:'2-digit', month:'2-digit', hour:'2-digit', minute:'2-digit' }).replace(',', '');
      };
      const number = data?.number?.display_value || '';
      const sysId = data?.sys_id?.value || '';
      const assName = data?.assigned_to?.display_value || '';
      const assId = data?.assigned_to?.value || '';
      const stateLabel = data?.state?.display_value || 'N/A';
      const isAwaiting = ['18','32','5','29','30'].includes(data?.state?.value || '');
      const priorityLabel = data?.priority?.display_value || 'N/A';
      const prioVal = parseInt(data?.priority?.value || '5', 10);
      const impactVal = data?.impact?.value || '—';
      const urgencyVal = data?.urgency?.value || '—';
      const gid = data?.assignment_group?.value || '';
      const desc = (data?.short_description?.display_value || '').substring(0, 60);
      const openedAt = data?.opened_at?.value || '';
      const caseUrl = _BASE + '/sn_customerservice_case.do?sysparm_query=number=' + encodeURIComponent(number);

      const card = document.createElement('div');
      card.className = 'card card-' + lane + ' card-new';
      card.dataset.sysid = sysId;
      card.dataset.assignedid = assId;
      card.dataset.assignedname = assName;
      card.dataset.impact = impactVal;
      card.dataset.urgency = urgencyVal;
      card.onclick = () => openCaseModal(sysId, number, card);

      card.innerHTML =
        '<div class="card-top">' +
          '<a class="card-num" href="' + caseUrl + '" target="_blank">' + escapeHtml(number) + ' ↗</a>' +
          '<span class="card-prio-badge card-prio-' + prioVal + '">' + escapeHtml(priorityLabel) + '</span>' +
          (isAwaiting ? '<span class="badge-await">⏳ ' + escapeHtml(stateLabel) + '</span>' : '') +
          '<button class="card-reassign-btn" title="Reatribuir" data-sysid="' + escapeHtml(sysId) + '" data-gid="' + escapeHtml(gid) + '" data-assigned="' + escapeHtml(assName) + '" onclick="openReassignBtn(event,this)">👤 ✎</button>' +
        '</div>' +
        '<p class="card-desc">' + escapeHtml(desc || '—') + '</p>' +
        '<div class="sla-bar-wrap"><span class="sla-bar-name" style="color:#0969DA">Atualizado agora</span></div>' +
        '<div class="card-tags">' +
          '<span class="tag tag-state">' + escapeHtml(stateLabel) + '</span>' +
          '<span class="tag tag-iu">I:' + escapeHtml(impactVal) + ' · U:' + escapeHtml(urgencyVal) + '</span>' +
        '</div>' +
        '<div class="card-footer">' +
          '<span class="card-assigned' + (assName ? '' : ' unassigned') + '">' +
            '<span class="card-avatar">' + (assName ? initialsDelta(assName) : '!') + '</span>' +
            '<span>' + (assName ? escapeHtml(assName) : 'Sem responsável') + '</span>' +
          '</span>' +
          '<span class="card-time">📅 ' + escapeHtml(fmtOpenedDelta(openedAt)) + '</span>' +
        '</div>';

      setTimeout(() => card.classList.remove('card-new'), 900);
      return card;
    }

    function insertNewCaseCard(data) {
      if (isTerminalState(data?.state?.value)) return;
      const gid = data?.assignment_group?.value || '';
      const targetDoc = outWin.document;
      
      // 1. Kanban Board
      if (queueMatchesFila(gid, currentFila)) {
        const board = targetDoc.getElementById('board-wrap');
        if (board) {
          const lane = resolveLaneFromDelta(data);
          const targetBody = board.querySelector('.lane[data-lane="' + lane + '"] .lane-body');
          if (targetBody) {
            const empty = targetBody.querySelector('.lane-empty');
            if (empty) empty.remove();
            const card = buildCardElement(data, lane);
            targetBody.prepend(card);
            updateLaneCounters(board);
          }
        }
      }

      // 2. Backlog Board
      if (queueMatchesFila(gid, currentBacklogFila)) {
        const board = targetDoc.getElementById('board-wrap-backlog-tab');
        if (board) {
          const lane = resolveLaneFromDelta(data);
          const targetBody = board.querySelector('.lane[data-lane="' + lane + '"] .lane-body');
          if (targetBody) {
            const empty = targetBody.querySelector('.lane-empty');
            if (empty) empty.remove();
            const card = buildCardElement(data, lane);
            targetBody.prepend(card);
            updateLaneCounters(board);
          }
        }
      }
    }

    function updateLaneCounters(board) {
      if (!board) return;
      board.querySelectorAll('.lane[data-lane]').forEach(laneEl => {
        const count = Array.from(laneEl.querySelectorAll('.lane-body .card')).filter(c => c.style.display !== 'none').length;
        const countEl = laneEl.querySelector('.lane-count');
        if (countEl) countEl.textContent = String(count);
      });
    }

    function updateCard(card, data) {
      const newGroupId = data.assignment_group?.value || '';
      const managedGroups = _G_IDS.split(',');
      
      // Otimização de Performance: Se o sys_updated_on for igual, não faz nada
      if (card.dataset.lastUpdated === data.sys_updated_on.value) return;
      card.dataset.lastUpdated = data.sys_updated_on.value;
      
      // Determine which board this card belongs to
      const board = card.closest('.board-inner');
      const isBacklog = board && board.id === 'board-wrap-backlog-tab';
      const filaKey = isBacklog ? currentBacklogFila : currentFila;

      // Remove cards that left monitored groups or no longer belong to the selected queue for THIS board.
      if (!managedGroups.includes(newGroupId) || !queueMatchesFila(newGroupId, filaKey)) {
        card.remove();
        if (board) updateLaneCounters(board);
        reapplyAnalystFilters();
        return;
      }

      const isAw = ['18','32','5','29','30'].includes(data.state.value);
      const badge = card.querySelector('.badge-await');
      if (isAw) {
        if (badge) badge.textContent = '⏳ ' + data.state.display_value;
        else {
          const b = document.createElement('span'); b.className = 'badge-await'; b.textContent = '⏳ ' + data.state.display_value;
          card.querySelector('.card-top').insertBefore(b, card.querySelector('.card-reassign-btn'));
        }
      } else if (badge) badge.remove();

      const desc = card.querySelector('.card-desc');
      if (desc) desc.textContent = (data.short_description?.display_value || '').substring(0, 60);

      const tags = card.querySelector('.card-tags');
      if (tags) {
        const sTag = tags.querySelector('.tag-state');
        if (sTag) sTag.textContent = data.state.display_value;

        const tTag = tags.querySelector('.tag-type');
        if (tTag) tTag.textContent = data.u_type?.display_value || '';

        const iuTag = tags.querySelector('.tag-iu');
        if (iuTag) iuTag.textContent = 'I:' + (data.impact?.value||'—') + ' · U:' + (data.urgency?.value||'—');
      }
      const prioBadge = card.querySelector('.card-prio-badge');
      if (prioBadge) {
        const pv = parseInt(data.priority?.value || '5', 10);
        prioBadge.textContent = data.priority?.display_value || 'N/A';
        prioBadge.className = 'card-prio-badge card-prio-' + pv;
      }
      
      const iuBtn = card.querySelector('.card-iu-btn');
      if (iuBtn) { iuBtn.dataset.impact = data.impact?.value || ''; iuBtn.dataset.urgency = data.urgency?.value || ''; }
      card.dataset.impact = data.impact?.value || '';
      card.dataset.urgency = data.urgency?.value || '';

      const footer = card.querySelector('.card-footer');
      if (footer) {
        const ass = footer.querySelector('.card-assigned');
        if (ass) {
          const name = data.assigned_to?.display_value || '';
          // Só atualiza se o responsável mudar
          if (card.dataset.assignedname !== name) {
          card.dataset.assignedid = data.assigned_to?.value || '';
          card.dataset.assignedname = name;
          const avatar = ass.querySelector('.card-avatar');
          if (avatar) avatar.textContent = name ? name.split(/\s+/).slice(0,2).map(p=>p.charAt(0).toUpperCase()).join('') : '!';
          const lbl = ass.querySelector('span:last-child');
          if (lbl) lbl.textContent = name || 'Sem responsável';
          ass.className = 'card-assigned' + (name ? '' : ' unassigned');
          }
        }
      }

      const prevLane = Array.from(LANE_CLASSES).find(cls => card.classList.contains(cls)) || '';
      const nextLane = resolveLaneWithSla(data, card);
      // Remove ONLY lane-specific classes (card-critical, card-high, etc.)
      // Never remove the base 'card' class
      LANE_CLASSES.forEach(cls => card.classList.remove(cls));
      card.classList.add('card-' + nextLane);
      moveCardToLane(card, nextLane);
      pulseCard(card, prevLane !== ('card-' + nextLane));
    }

    window.__deltaPollingTimerId = setInterval(fetchDeltas, POLLING_INTERVAL);

    // Expose restart hook so startPolling() can revive delta polling after tab re-focus
    window.__restartDeltaPolling = function() {
      if (window.__deltaPollingTimerId) clearInterval(window.__deltaPollingTimerId);
      window.__deltaPollingTimerId = setInterval(fetchDeltas, POLLING_INTERVAL);
    };
    window.__setDeltaPollingInterval = function(ms){
      POLLING_INTERVAL = Math.max(15000, parseInt(ms,10)||30000);
      if (window.__deltaPollingTimerId) clearInterval(window.__deltaPollingTimerId);
      window.__deltaPollingTimerId = setInterval(fetchDeltas, POLLING_INTERVAL);
    };
  })();
	</script>
<!-- Case Modal -->
<div id="case-modal-overlay" style="display:none;position:fixed;inset:0;z-index:500;background:rgba(15,23,42,.45);backdrop-filter:blur(2px);">
  <div id="case-modal" style="position:absolute;top:50%;left:50%;width:min(920px,92vw);height:min(88vh,820px);background:#fff;border:1px solid #D0D7DE;border-radius:12px;display:flex;flex-direction:column;transform:translate(-50%, -48%) scale(0.96);transition:transform .18s ease;box-shadow:0 20px 55px rgba(15,23,42,.35);overflow:hidden;">
    <div id="modal-hdr" style="padding:12px 14px;border-bottom:1px solid #D0D7DE;background:#F6F8FA;display:flex;align-items:center;gap:8px;">
      <div style="flex:1">
        <div style="font-size:10px;color:#57606A;margin-bottom:2px;">Case</div>
        <div style="display:flex;align-items:center;gap:6px;">
          <span id="modal-num" style="font-family:monospace;font-size:13px;font-weight:700;color:#0969DA;"></span>
          <a id="modal-snow-link" href="#" target="_blank" style="font-size:10px;background:#0969DA;color:#fff;border:none;border-radius:4px;padding:3px 8px;text-decoration:none;">Abrir no Snow ↗</a>
        </div>
      </div>
      <button onclick="closeCaseModal()" style="background:none;border:none;font-size:18px;cursor:pointer;color:#57606A;width:28px;height:28px;display:flex;align-items:center;justify-content:center;border-radius:4px;line-height:1;">✕</button>
    </div>
    <div id="modal-title" style="padding:10px 14px;font-size:13px;font-weight:600;color:#24292F;border-bottom:1px solid #D0D7DE;"></div>
    <div id="modal-body" style="flex:1;overflow-y:auto;padding:12px 14px;display:flex;flex-direction:column;gap:12px;">
      <div style="text-align:center;color:#57606A;font-size:13px;padding:40px 0;">Carregando...</div>
    </div>
    <div id="modal-footer" style="padding:10px 14px;border-top:1px solid #D0D7DE;display:flex;flex-direction:column;gap:6px;">
      <div style="display:flex;gap:6px;align-items:center;">
        <span id="modal-state-badge" style="font-size:11px;color:#57606A;flex:1;"></span>
        <button onclick="modalReassign()" style="font-size:11px;padding:4px 10px;border-radius:4px;cursor:pointer;border:1px solid #D0D7DE;background:#fff;color:#24292F;white-space:nowrap;">👤 Reatribuir</button>
      </div>
      <div style="display:flex;gap:6px;flex-wrap:wrap;">
        <button onclick="toggleScheduleControls()" style="font-size:11px;padding:4px 8px;border-radius:4px;cursor:pointer;border:1px solid #D0D7DE;background:#fff;color:#24292F;">Schedule</button>
        <button onclick="modalSetState('18')" style="font-size:11px;padding:4px 8px;border-radius:4px;cursor:pointer;border:1px solid #D0D7DE;background:#fff;color:#24292F;">Awaiting Info</button>
        <button onclick="modalSetState('32')" style="font-size:11px;padding:4px 8px;border-radius:4px;cursor:pointer;border:1px solid #D0D7DE;background:#fff;color:#24292F;">Awaiting Customer Approval</button>
      </div>
      <div id="modal-schedule-row" style="display:none;gap:6px;align-items:center;">
        <input id="modal-schedule-dt" type="datetime-local" style="font-size:11px;padding:4px 6px;border:1px solid #D0D7DE;border-radius:4px;flex:1;">
        <button onclick="applyScheduledState()" style="font-size:11px;padding:4px 10px;border-radius:4px;cursor:pointer;border:1px solid #0969DA;background:#0969DA;color:#fff;">Aplicar</button>
      </div>
      <div style="display:flex;gap:6px;margin-bottom:2px;">
        <button id="tab-wn" onclick="modalTabSwitch('wn')" style="font-size:11px;padding:3px 10px;border-radius:4px;cursor:pointer;border:1px solid #0969DA;background:#0969DA;color:#fff;font-weight:600;">Work Note</button>
        <button id="tab-cm" onclick="modalTabSwitch('cm')" style="font-size:11px;padding:3px 10px;border-radius:4px;cursor:pointer;border:1px solid #D0D7DE;background:#fff;color:#24292F;">Comentário</button>
      </div>
      <textarea id="modal-note-ta" rows="2" placeholder="Adicionar work note (interno)..." style="width:100%;font-size:11px;padding:6px 8px;border:1px solid #D0D7DE;border-radius:4px;resize:none;color:#24292F;font-family:inherit;"></textarea>
      <div style="display:flex;justify-content:flex-end;gap:6px;">
        <button onclick="closeCaseModal()" style="font-size:11px;padding:4px 10px;border-radius:4px;cursor:pointer;border:1px solid #D0D7DE;background:#fff;color:#24292F;">Cancelar</button>
        <button onclick="saveModal()" style="font-size:11px;padding:4px 14px;border-radius:4px;cursor:pointer;border:1px solid #0969DA;background:#0969DA;color:#fff;font-weight:600;">Salvar no Snow</button>
      </div>
    </div>
  </div>
</div>

<div id="account-products-overlay" style="display:none;position:fixed;inset:0;z-index:700;background:rgba(15,23,42,.55);align-items:center;justify-content:center;">
  <div style="width:min(620px,92vw);max-height:82vh;background:#fff;border:1px solid #D0D7DE;border-radius:12px;box-shadow:0 20px 55px rgba(15,23,42,.35);display:flex;flex-direction:column;overflow:hidden;">
    <div style="padding:12px 14px;border-bottom:1px solid #D0D7DE;background:#F6F8FA;display:flex;align-items:center;gap:8px;">
      <div style="flex:1;min-width:0;">
        <div style="font-size:10px;color:#57606A;">Produtos/Serviços do Account</div>
        <div id="account-products-name" style="font-size:13px;font-weight:700;color:#1f2937;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">—</div>
      </div>
      <button onclick="closeAccountProductsModal()" style="background:none;border:none;font-size:18px;cursor:pointer;color:#57606A;width:28px;height:28px;">✕</button>
    </div>
    <div id="account-products-list" style="padding:12px 14px;overflow:auto;">
      <div class="account-product-empty">Carregando...</div>
    </div>
    <div style="padding:10px 14px;border-top:1px solid #D0D7DE;display:flex;justify-content:flex-end;">
      <button onclick="closeAccountProductsModal()" style="font-size:11px;padding:4px 10px;border-radius:4px;cursor:pointer;border:1px solid #D0D7DE;background:#fff;color:#24292F;">Fechar</button>
    </div>
  </div>
</div>


</body></html>`;
  };

  // ── Fetch and build ────────────────────────────────────────────────────
  const {ini, fim} = mesRange(mes);
  const qA = `assignment_groupIN${G_IDS}${EXCL}`; // All active — backlog split done client-side by age
  const qP = `assignment_groupIN${G_IDS}^stateIN3,6^resolved_at>=${ini}^resolved_at<=${fim}`;

  // Aggregate API — filtro exato dos reports do Snow por fila
  const G_ID_MAP_FETCH = {
    l1   : '1c7c9057db6771d0832ead8ed396197a',
    l2   : 'ff72689247ee1e143cbfe07a216d4357',
    event: '673c2170476422503cbfe07a216d430f'
  };
  const RODRIGO_IDS = ['1a8b95014fc1af00f3d33d828110c7cf','1d2a4cd84f347788c58b8e1f0210c767','38483f9fdbb7b0d0545dee0c139619ab','46b501304fea0700f5e08e1f0210c770','5a1ed5054fc1af00f3d33d828110c7ce'];
  const rodrigoExclude = RODRIGO_IDS.map(id=>`^assigned_to!=${id}`).join('');
  const REPORT_IDS = {'1c7c9057db6771d0832ead8ed396197a':'c0b342f797c5e6547509fd971153aff2'};
  const FALLBACK_FILTER = gid => `assigned_toANYTHING^u_typeIN0,1^u_operating_country=BR^stateIN1,10,21,8,2^u_internal_cases=false${rodrigoExclude}^assignment_group=${gid}`;
  const getReportFilter = async gid => {
    const rid = REPORT_IDS[gid]; if (!rid) return FALLBACK_FILTER(gid);
    try {
      const r = await fetch(`${BASE}/api/now/table/sys_report?sysparm_query=sys_id=${rid}&sysparm_fields=filter&sysparm_limit=1`,{headers});
      const d = await r.json(); const f = d.result?.[0]?.filter?.value;
      return f || FALLBACK_FILTER(gid);
    } catch(e) { return FALLBACK_FILTER(gid); }
  };
  const fagg = async gid => {
    const filter = await getReportFilter(gid);
    return fetch(`${BASE}/api/now/stats/sn_customerservice_case?sysparm_query=${encodeURIComponent(filter)}&sysparm_group_by=assigned_to,u_type&sysparm_count=true&sysparm_display_value=all&sysparm_limit=200`,{headers}).then(r=>r.json()).then(d=>({gid,rows:d.result||[]}));
  };
  // Resolved today query (independent of month filter)
  const todayStr = (() => { const d=new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; })();
  const qRT = `assignment_groupIN${G_IDS}^stateIN3,6^resolved_at>=${todayStr} 00:00:00^resolved_at<=${todayStr} 23:59:59`;

  // No separate backlog query — backlog is determined by age (>20 days) client-side

  // Expose re-render hook so changeMes can call back
  window._emsOpsRender = (tok, m2, targetWin, uid2) => {
    const h2 = {'Accept':'application/json','X-UserToken':tok};
    const snBase = BASE;
    // Override fcases/bsla to use new token h2
    const fcases = q => fetch(`${BASE}/api/now/table/sn_customerservice_case?sysparm_query=${encodeURIComponent(q)}&sysparm_fields=${FIELDS}&sysparm_display_value=all&sysparm_limit=1000`,{headers:h2}).then(r=>r.json()).then(d=>d.result||[]);
    const fsla2  = q => fetch(`${BASE}/api/now/table/task_sla?sysparm_query=${encodeURIComponent(q)}&sysparm_fields=${SLA_F}&sysparm_display_value=all&sysparm_limit=500`,{headers:h2}).then(r=>r.json()).then(d=>d.result||[]);
    const bsla   = (ids,f) => !ids.length ? Promise.resolve([]) : Promise.all(chunk(ids).map(b=>fsla2(`taskIN${b.join(',')}^${f}`))).then(r=>r.flat());
    const {ini:i2,fim:f2} = mesRange(m2);
    const qA2=`assignment_groupIN${G_IDS}${EXCL}`; // All active cases
    const qP2=`assignment_groupIN${G_IDS}^stateIN3,6^resolved_at>=${i2}^resolved_at<=${f2}`;
    const todayStr2=(()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;})();
    const qRT2=`assignment_groupIN${G_IDS}^stateIN3,6,7,24,25,33,35^resolved_at>=${todayStr2} 00:00:00^resolved_at<=${todayStr2} 23:59:59^ORclosed_at>=${todayStr2} 00:00:00^closed_at<=${todayStr2} 23:59:59`;
    const rodrigoEx2=['1a8b95014fc1af00f3d33d828110c7cf','1d2a4cd84f347788c58b8e1f0210c767','38483f9fdbb7b0d0545dee0c139619ab','46b501304fea0700f5e08e1f0210c770','5a1ed5054fc1af00f3d33d828110c7ce'].map(id=>`^assigned_to!=${id}`).join('');
    const aggF2=gid=>`assigned_toANYTHING^u_typeIN0,1^u_operating_country=BR^stateIN1,10,21,8,2^u_internal_cases=false${rodrigoEx2}^assignment_group=${gid}`;
    const fa2=gid=>fetch(`${snBase}/api/now/stats/sn_customerservice_case?sysparm_query=${encodeURIComponent(aggF2(gid))}&sysparm_group_by=assigned_to,u_type&sysparm_count=true&sysparm_display_value=all&sysparm_limit=200`,{headers:h2}).then(r=>r.json()).then(d=>({gid,rows:d.result||[]}));
    Promise.all([fcases(qA2),fcasesAllGroups(qP2),fcases(qRT2),
      fa2('1c7c9057db6771d0832ead8ed396197a'),fa2('ff72689247ee1e143cbfe07a216d4357'),fa2('673c2170476422503cbfe07a216d430f')
    ])
    .then(([a,p,rt2,ag1,ag2,ag3])=>{
      const ia=a.map(c=>c.sys_id?.value).filter(Boolean);
      const ip=p.map(c=>c.sys_id?.value).filter(Boolean);
      return Promise.all([Promise.resolve(a),Promise.resolve(p),Promise.resolve(rt2),Promise.resolve(ag1),Promise.resolve(ag2),Promise.resolve(ag3),
        bsla(ia,'sla.nameLIKEEMS-OLA-AMER^sla.nameLIKEResolve'),
        bsla(ip,'sla.nameLIKEEMS-OLA-AMER^sla.nameLIKEResolve'),
        bsla(ia,'sla.nameLIKEResolution^sla.nameNOTLIKEResponse'),
        bsla(ip,'sla.nameLIKEResolution^sla.nameNOTLIKEResponse'),
      ]);
    })
    .then(([a,p,rt2,ag1,ag2,ag3,eA,eP,xA,xP])=>{
      const html = render(a,p,[...xA,...eA],[...xP,...eP],m2,rt2,{l1:ag1,l2:ag2,event:ag3});
      if(targetWin&&!targetWin.closed){targetWin.document.open();targetWin.document.write(html);targetWin.document.close();}
    })
    .catch(e=>console.error('_emsOpsRender:',e));
  };

  const outWin = window.open('','_blank');
  if (outWin) {
    outWin.document.write('<html><body style="background:#F6F8FA;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;font-family:system-ui"><div style="text-align:center;color:#57606A"><div style="font-size:40px;margin-bottom:12px">🖥</div><div style="font-size:16px;font-weight:600;color:#24292F">EMS Ops Dashboard</div><div style="font-size:13px;margin-top:6px">Carregando dados...</div></div></body></html>');
  }

  // Stagger agg calls to reduce server load (performance improvement)
  Promise.all([
    fcases(qA), fcasesAllGroups(qP), fcases(qRT),
    fagg(G_ID_MAP_FETCH.l1),
    new Promise(r=>setTimeout(()=>fagg(G_ID_MAP_FETCH.l2).then(r),300)),
    new Promise(r=>setTimeout(()=>fagg(G_ID_MAP_FETCH.event).then(r),600)),
  ])
  .then(([ativos, postMortem, resolvedToday, aggL1, aggL2, aggEvent]) => {
    const ia = ativos.map(c=>c.sys_id?.value).filter(Boolean);
    const ip = postMortem.map(c=>c.sys_id?.value).filter(Boolean);
    return Promise.all([
      Promise.resolve(ativos), Promise.resolve(postMortem), Promise.resolve(resolvedToday),
      Promise.resolve(aggL1), Promise.resolve(aggL2), Promise.resolve(aggEvent),
      bsla(ia,'sla.nameLIKEEMS-OLA-AMER^sla.nameLIKEResolve'),
      bsla(ip,'sla.nameLIKEEMS-OLA-AMER^sla.nameLIKEResolve'),
      bsla(ia,'sla.nameLIKEResolution^sla.nameNOTLIKEResponse'),
      bsla(ip,'sla.nameLIKEResolution^sla.nameNOTLIKEResponse'),
    ]);
  })
  .then(([ativos, postMortem, resolvedToday, aggL1, aggL2, aggEvent, emsA, emsP, eqixA, eqixP]) => {
    const html = render(ativos, postMortem, [...eqixA,...emsA], [...eqixP,...emsP], mes, resolvedToday, {l1:aggL1,l2:aggL2,event:aggEvent});
    if (outWin && !outWin.closed) { outWin.document.open(); outWin.document.write(html); outWin.document.close(); }
    else { const b=new Blob([html],{type:'text/html'}); window.open(URL.createObjectURL(b),'_blank'); }
  })
  .catch(e => {
    console.error('EMS Ops error:', e);
    if (outWin && !outWin.closed) outWin.document.write(`<html><body style="background:#F6F8FA;padding:40px;font-family:system-ui"><h2 style="color:#CF222E">Erro ao carregar painel</h2><pre style="color:#57606A">${e.message}</pre></body></html>`);
  });

  return { ok: true };
}
