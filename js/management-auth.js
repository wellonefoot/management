(() => {
  'use strict';
  const $=id=>document.getElementById(id);
  const clean=v=>String(v??'').trim();
  const SESSION_KEY='wellone_management_session_v107';
  let client=null;
  const db=()=>client||(client=window.supabase.createClient(ADMIN_CONFIG.supabaseUrl,ADMIN_CONFIG.supabaseAnonKey,{auth:{persistSession:false,autoRefreshToken:false,detectSessionInUrl:false}}));
  const load=()=>{try{return JSON.parse(localStorage.getItem(SESSION_KEY)||'null');}catch(_e){return null;}};
  const save=value=>{if(value)localStorage.setItem(SESSION_KEY,JSON.stringify(value));else localStorage.removeItem(SESSION_KEY);};
  function showDesk(session){$('managementLoginScreen').hidden=true;$('managementDesk').hidden=false;$('employeeSessionName').textContent=session?.username||'Management';document.dispatchEvent(new CustomEvent('wellone-management-ready'));requestAnimationFrame(()=>window.scrollTo({top:0,behavior:'auto'}));}
  function showLogin(message=''){save(null);$('managementDesk').hidden=true;$('managementLoginScreen').hidden=false;$('managementLoginError').textContent=message;setTimeout(()=>$('managementLoginUsername')?.focus(),30);}
  async function login(event){event.preventDefault();$('managementLoginError').textContent='Checking...';try{const {data,error}=await db().rpc('employee_management_login',{p_username:clean($('managementLoginUsername').value),p_password:$('managementLoginPassword').value||''});if(error)throw error;save(data);$('managementLoginPassword').value='';$('managementLoginError').textContent='';showDesk(data);}catch(error){$('managementLoginError').textContent=error.message||'Login failed.';}}
  $('managementLoginForm').addEventListener('submit',login);
  $('employeeLogoutBtn').addEventListener('click',()=>showLogin(''));
  const session=load();if(session?.token&&session?.username&&session?.role==='management')showDesk(session);else showLogin('');
})();
