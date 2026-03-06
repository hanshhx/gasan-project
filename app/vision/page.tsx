"use client";
import React, { useEffect, useState } from "react";

export default function Vision() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => { const h = () => setIsScrolled(window.scrollY > 50); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  useEffect(() => { const o = new IntersectionObserver((es) => { es.forEach(e => { if (e.isIntersecting) e.target.classList.add("is-revealed"); }); }, { threshold: 0.08 }); document.querySelectorAll(".ag-reveal").forEach(el => o.observe(el)); return () => document.querySelectorAll(".ag-reveal").forEach(el => o.unobserve(el)); }, []);
  const navItems = [{name:'분양정보',link:'/overview',subItems:[{name:'사업개요',link:'/overview'},{name:'오시는길',link:'/location'}]},{name:'입지환경',link:'/location-map',subItems:[{name:'광역위치도',link:'/location-map'},{name:'미래비전',link:'/vision'}]},{name:'단지정보',link:'/special-design',subItems:[{name:'특화설계',link:'/special-design'},{name:'층별계획',link:'/floor-plan'}]},{name:'홍보센터',link:'/site-photos',subItems:[{name:'현장사진',link:'/site-photos'}]}];

  // 공통 UI 컴포넌트 (플로팅/티커/헤더/모바일메뉴)
  const Chrome = () => (<><div className="fixed bottom-6 md:bottom-10 right-4 md:right-10 z-[100] flex flex-col space-y-3"><a href="http://pf.kakao.com/_uhZqX/chat" target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-[#FEE500] shadow-[0_8px_25px_rgba(254,229,0,0.4)] flex items-center justify-center hover:-translate-y-2 transition-all duration-500 rounded-full"><svg className="h-6 w-6 text-[#3c1e1e]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3c-4.97 0-9 3.185-9 7.115 0 2.558 1.712 4.8 4.346 6.136l-.847 3.127c-.123.456.433.805.81.55l3.676-2.431c.33.048.667.073 1.015.073 4.97 0 9-3.185 9-7.115S16.97 3 12 3z"/></svg></a><a href="tel:18003357" className="w-14 h-14 bg-[#E60012] shadow-[0_8px_25px_rgba(230,0,18,0.4)] flex items-center justify-center hover:-translate-y-2 transition-all duration-500 rounded-full animate-[gentleBounce_3s_ease_infinite]"><svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg></a></div><div className="bg-[#E60012] text-white py-2 overflow-hidden z-[60] relative"><div className="ticker-wrap"><div className="ticker-content">{[...Array(6)].map((_,i)=>(<span key={i} className="mx-8 text-xs md:text-sm font-bold tracking-wider whitespace-nowrap inline-flex items-center gap-3"><span className="w-1.5 h-1.5 bg-white/50 rounded-full"/>가산 3차 SK V1 센터 — 대폭할인 분양 중<span className="w-1.5 h-1.5 bg-white/50 rounded-full"/>즉시입주 가능 · 1800-3357</span>))}</div></div></div><header className={`sticky top-0 left-0 right-0 z-50 transition-all duration-700 ${isScrolled?"py-3 bg-white/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.06)]":"py-5 bg-[#F7F5F2]"}`}><div className="max-w-[1600px] mx-auto px-5 md:px-12 flex justify-between items-center"><a href="/"><img src="/images/logo.png" alt="로고" className="h-7 md:h-8 brightness-0"/></a><nav className="hidden lg:flex space-x-12 font-bold text-[15px] text-gray-800">{navItems.map(item=>(<div key={item.name} className="relative group py-2"><a href={item.link} className="hover:text-[#E60012] transition-colors block relative">{item.name}<span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#E60012] transition-all duration-500 group-hover:w-full"/></a>{item.subItems.length>0&&(<div className="absolute top-full left-1/2 -translate-x-1/2 mt-5 w-44 bg-white border border-gray-100 shadow-[0_25px_50px_rgba(0,0,0,0.08)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-400 translate-y-3 group-hover:translate-y-0 rounded-xl overflow-hidden">{item.subItems.map(sub=>(<a key={sub.name} href={sub.link} className="block px-6 py-4 text-center text-sm text-gray-500 hover:bg-[#E60012] hover:text-white font-bold transition-all">{sub.name}</a>))}</div>)}</div>))}</nav><div className="flex items-center gap-4"><a href="tel:18003357" className="hidden sm:flex items-center gap-2 font-black text-lg text-gray-800 hover:text-[#E60012] transition-colors"><span className="w-2.5 h-2.5 bg-[#E60012] rounded-full animate-pulse"/>1800-3357</a><a href="/#inquiry" className="px-7 py-3 font-bold text-sm bg-[#E60012] text-white rounded-full hover:bg-black hover:scale-105 transition-all duration-500 shadow-[0_4px_20px_rgba(230,0,18,0.25)]">상담예약</a><button className="lg:hidden p-1 text-gray-800" onClick={()=>setIsMobileMenuOpen(true)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/></svg></button></div></div></header><div className={`fixed inset-0 z-[200] lg:hidden transition-all duration-500 ${isMobileMenuOpen?"opacity-100 visible":"opacity-0 invisible"}`}><div className="absolute inset-0 bg-black/50 backdrop-blur-md" onClick={()=>setIsMobileMenuOpen(false)}/><div className={`absolute top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white flex flex-col transform transition-transform duration-600 ${isMobileMenuOpen?"translate-x-0":"translate-x-full"}`}><div className="flex justify-between items-center p-6 border-b border-gray-100"><img src="/images/logo.png" alt="로고" className="h-7 brightness-0"/><button onClick={()=>setIsMobileMenuOpen(false)} className="text-gray-400 hover:text-[#E60012] p-2 bg-gray-50 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg></button></div><div className="flex-1 overflow-y-auto p-8">{navItems.map(item=>(<div key={item.name} className="mb-8"><a href={item.link} className="text-2xl font-black text-gray-800 hover:text-[#E60012] transition-colors block mb-3" onClick={()=>setIsMobileMenuOpen(false)}>{item.name}</a><div className="flex flex-col pl-4 border-l-2 border-[#E60012] space-y-3">{item.subItems.map(sub=>(<a key={sub.name} href={sub.link} className="text-base font-medium text-gray-400 hover:text-gray-800 transition-colors" onClick={()=>setIsMobileMenuOpen(false)}>{sub.name}</a>))}</div></div>))}</div><div className="p-8 bg-[#E60012]"><p className="text-xs font-bold text-white/60 mb-1 uppercase tracking-widest">분양상담센터</p><a href="tel:18003357" className="text-3xl font-black text-white">1800-3357</a></div></div></div></>);

  return (
    <div className="min-h-screen bg-[#F7F5F2] text-black font-sans tracking-tight overflow-x-hidden selection:bg-[#E60012] selection:text-white break-keep">
      <Chrome/>
      <section className="relative h-[45vh] min-h-[350px] md:h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#FFF8E0] via-[#FFF2CC] to-[#FFE8B0]">
        <div className="absolute inset-0 bg-[url('/images/building-1.png')] bg-cover bg-center opacity-[0.06]"/>
        <div className="absolute top-20 left-0 w-[400px] h-[400px] bg-[#FFB800]/[0.06] rounded-full blur-[120px] pointer-events-none animate-[float_8s_ease_infinite]"/>
        <div className="absolute -bottom-20 -right-20 w-[250px] h-[250px] border-2 border-[#E60012]/10 rounded-full hero-spin pointer-events-none"/>
        <div className="relative z-10 text-center px-4">
          <span className="inline-block px-5 py-2 bg-white text-gray-700 text-[10px] md:text-xs font-black tracking-[0.3em] uppercase mb-5 rounded-full shadow-[0_2px_15px_rgba(0,0,0,0.06)] ag-slide-up">Future Vision</span>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-gray-900 mb-4 md:mb-6 tracking-tight ag-slide-up" style={{animationDelay:"0.15s"}}>미래비전</h2>
          <div className="w-16 h-1 bg-[#E60012] mx-auto rounded-full ag-slide-up" style={{animationDelay:"0.3s"}}/>
          <p className="text-base md:text-xl text-gray-500 font-medium mt-5 md:mt-7 ag-slide-up" style={{animationDelay:"0.4s"}}>가산디지털단지의 내일, 그 중심에 서다</p>
        </div>
      </section>

      <main className="py-16 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-center">
          <div className="ag-reveal w-full mb-16 md:mb-24 group rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.06)] bg-white border border-gray-100 hover:shadow-[0_30px_80px_rgba(0,0,0,0.1)] transition-shadow duration-700">
            <img src="/images/vision-1.png" alt="가산디지털단지 중심 입지" className="w-full h-auto object-contain group-hover:scale-[1.02] transition-transform duration-700"/>
          </div>

          <div className="w-full">
            <div className="ag-reveal text-center mb-12 md:mb-16">
              <span className="inline-block px-4 py-1.5 bg-[#E60012] text-white text-[10px] font-black tracking-[0.25em] uppercase mb-4 rounded-full shadow-[0_4px_12px_rgba(230,0,18,0.25)]">Seoul G-Valley</span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-3 md:mb-4">G밸리 <span className="text-[#E60012]">미래 비전</span></h3>
              <p className="text-gray-400 font-bold text-sm md:text-lg max-w-2xl mx-auto px-2">과거의 산업단지를 넘어, 대한민국의 새로운 혁신을 이끄는 도심형 미래 산업지구로 도약합니다.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
              {[
                {icon:"💡",title:<>제조 중심에서<br/><span className="text-[#0066CC]">지식·첨단 산업 중심</span> 전환</>,desc:"G밸리는 과거 제조업 중심 산업단지에서 벗어나, IT, 컨텐츠, 연구개발, 지식기반 산업이 융합된 첨단 산업 클러스터로 지속적인 구조 전환이 진행 중입니다.",bg:"from-[#F0F7FF] to-[#E0EEFF]",accent:"from-blue-500 to-cyan-400"},
                {icon:"🏙️",title:<>노후 산업단지 재편과<br/><span className="text-[#E60012]">업무 환경 고도화</span></>,desc:"노후 시설 정비 및 지식산업센터 공급 확대, 업무·상업·지원 기능의 복합화를 통해 기존 산업단지 이미지를 넘어 도심형 미래 산업지구로 재편되고 있습니다.",bg:"from-[#FFF0F0] to-[#FFE8E8]",accent:"from-[#E60012] to-orange-400"},
                {icon:"📈",title:<>서울 서남권 대표<br/><span className="text-emerald-600">핵심 성장 엔진</span></>,desc:"교통 인프라 확충과 기업 집적 효과를 바탕으로 G밸리는 서남권을 대표하는 산업·고용 거점이자, 수도권 전역과 연계되는 광역 경제 축의 핵심 지역으로 성장하고 있습니다.",bg:"from-[#E8F8F0] to-[#D0F0E0]",accent:"from-emerald-500 to-green-400"}
              ].map((card,idx)=>(
                <div key={idx} className="ag-reveal group bg-white rounded-3xl p-8 md:p-10 border border-gray-100 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(0,0,0,0.08)] transition-all duration-500 relative overflow-hidden" style={{transitionDelay:`${idx*0.1}s`}}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}/>
                  <div className={`absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r ${card.accent} origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}/>
                  <div className="relative z-10">
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-gray-50 group-hover:bg-white rounded-2xl flex items-center justify-center text-2xl md:text-3xl mb-6 md:mb-8 group-hover:scale-110 group-hover:shadow-lg transition-all duration-500">{card.icon}</div>
                    <h4 className="text-lg md:text-xl font-black text-gray-800 mb-3 md:mb-5 leading-snug">{card.title}</h4>
                    <p className="text-gray-500 leading-relaxed text-sm md:text-[15px] font-medium">{card.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="relative bg-gray-900 py-20 md:py-28 overflow-hidden"><div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10"><div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-16"><div><img src="/images/logo.png" className="h-7 mb-8 brightness-0 invert opacity-30" alt="logo"/><div className="text-white/25 text-sm font-medium leading-relaxed space-y-1"><p>가산 3차 SK V1 센터 | 지식산업센터 | 분양 홍보관</p><p>상호: 케이케이솔루션 | 사업자번호: 135-31-54956 | 관리자: 김기강</p></div></div><div className="text-left lg:text-right"><p className="text-white/25 text-xs font-bold uppercase tracking-widest mb-2">분양문의</p><a href="tel:18003357" className="text-white font-black text-3xl md:text-4xl tracking-tighter hover:text-[#E60012] transition-colors inline-flex items-center gap-3"><span className="w-3 h-3 bg-[#E60012] rounded-full animate-pulse"/>1800-3357</a></div></div><div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8"/><div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"><p className="text-[11px] text-white/15 max-w-lg">본 홈페이지의 이미지는 이해를 돕기 위한 컷으로 실제와 차이가 있을 수 있습니다. 모든 정보는 분양 홍보관을 통해 다시 한번 확인하시기 바랍니다.</p><p className="text-[11px] font-bold text-white/15 uppercase tracking-widest">© 2026 GASAN 3rd SK V1 CENTER.</p></div></div></footer>

      <style jsx global>{`
        .ag-reveal{opacity:0;transform:translateY(50px);transition:opacity 1s cubic-bezier(0.25,1,0.5,1),transform 1s cubic-bezier(0.25,1,0.5,1)}.ag-reveal.is-revealed{opacity:1;transform:translateY(0)}
        @keyframes slideUpMask{0%{transform:translateY(110%);opacity:0}100%{transform:translateY(0);opacity:1}}.ag-slide-up{display:inline-block;animation:slideUpMask 1.2s cubic-bezier(0.16,1,0.3,1) forwards;opacity:0}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-20px)}}.hero-spin{animation:spin 40s linear infinite}@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes gentleBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
        .ticker-wrap{overflow:hidden;width:100%}.ticker-content{display:inline-flex;animation:tickerScroll 25s linear infinite;white-space:nowrap}@keyframes tickerScroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        html{scroll-behavior:smooth}
      `}</style>
    </div>
  );
}
