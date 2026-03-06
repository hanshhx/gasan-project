"use client";
import React, { useEffect, useState } from "react";

export default function Overview() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [globalMousePos, setGlobalMousePos] = useState({ x: -100, y: -100 });

  useEffect(() => { const h = () => setIsScrolled(window.scrollY > 50); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  useEffect(() => { const handleGlobalMouseMove = (e: MouseEvent) => setGlobalMousePos({ x: e.clientX, y: e.clientY }); window.addEventListener("mousemove", handleGlobalMouseMove); return () => window.removeEventListener("mousemove", handleGlobalMouseMove); }, []);
  useEffect(() => {
    const o = new IntersectionObserver((es) => { es.forEach(e => { if (e.isIntersecting) e.target.classList.add("is-revealed"); }); }, { threshold: 0.08 });
    document.querySelectorAll(".ag-reveal").forEach(el => o.observe(el));
    return () => document.querySelectorAll(".ag-reveal").forEach(el => o.unobserve(el));
  }, []);

  const navItems = [{name:'분양정보',link:'/overview',subItems:[{name:'사업개요',link:'/overview'},{name:'오시는길',link:'/location'}]},{name:'입지환경',link:'/location-map',subItems:[{name:'광역위치도',link:'/location-map'},{name:'미래비전',link:'/vision'}]},{name:'단지정보',link:'/special-design',subItems:[{name:'특화설계',link:'/special-design'},{name:'층별계획',link:'/floor-plan'}]},{name:'홍보센터',link:'/site-photos',subItems:[{name:'현장사진',link:'/site-photos'}]}];

  return (
    <div className="min-h-screen bg-[#F7F5F2] text-black font-sans tracking-tight overflow-x-hidden selection:bg-[#9A000C] selection:text-white break-keep cursor-none">
      
      <div className="pointer-events-none fixed inset-0 z-[999] opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className="pointer-events-none fixed top-0 left-0 w-6 h-6 border-[1.5px] border-[#9A000C] rounded-full z-[1000] transition-transform duration-100 ease-out mix-blend-difference hidden lg:block" style={{ transform: `translate3d(${globalMousePos.x - 12}px, ${globalMousePos.y - 12}px, 0)` }} />

      <div className="fixed bottom-6 md:bottom-10 right-4 md:right-10 z-[100] flex flex-col space-y-3"><a href="http://pf.kakao.com/_uhZqX/chat" target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-[#FEE500] shadow-[0_8px_25px_rgba(254,229,0,0.4)] flex items-center justify-center hover:-translate-y-3 hover:shadow-[0_20px_40px_rgba(254,229,0,0.6)] transition-all duration-700 rounded-full"><svg className="h-6 w-6 text-[#3c1e1e]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3c-4.97 0-9 3.185-9 7.115 0 2.558 1.712 4.8 4.346 6.136l-.847 3.127c-.123.456.433.805.81.55l3.676-2.431c.33.048.667.073 1.015.073 4.97 0 9-3.185 9-7.115S16.97 3 12 3z"/></svg></a><a href="tel:18003357" className="w-14 h-14 bg-[#9A000C] shadow-[0_8px_25px_rgba(154,0,12,0.4)] flex items-center justify-center hover:-translate-y-3 hover:shadow-[0_20px_40px_rgba(154,0,12,0.6)] transition-all duration-700 rounded-full animate-[gentleBounce_4s_ease_infinite]"><svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg></a></div>
      <div className="bg-[#9A000C] text-white py-2 overflow-hidden z-[60] relative"><div className="ticker-wrap"><div className="ticker-content">{[...Array(6)].map((_,i)=>(<span key={i} className="mx-8 text-xs font-light tracking-[0.2em] whitespace-nowrap inline-flex items-center gap-3"><span className="w-1 h-1 bg-white/50 rounded-full"/>가산 3차 SK V1 센터 — 프리미엄 할인 분양<span className="w-1 h-1 bg-white/50 rounded-full"/>즉시입주 가능 · 1800-3357</span>))}</div></div></div>
      <header className={`sticky top-0 left-0 right-0 z-50 transition-all duration-[800ms] ${isScrolled?"py-4 bg-white/80 backdrop-blur-2xl border-b border-gray-900/5":"py-6 bg-transparent"}`}><div className="max-w-[1600px] mx-auto px-5 md:px-12 flex justify-between items-center"><a href="/" className="group"><img src="/images/logo.png" alt="로고" className="h-6 md:h-7 transition-all duration-700 brightness-0 group-hover:opacity-70"/></a><nav className="hidden lg:flex space-x-12 font-medium text-[14px] text-gray-800 tracking-wider">{navItems.map(item=>(<div key={item.name} className="relative group py-2"><a href={item.link} className="hover:text-[#9A000C] transition-colors block relative">{item.name}</a>{item.subItems.length>0&&(<div className="absolute top-full left-1/2 -translate-x-1/2 mt-6 w-48 bg-white/95 backdrop-blur-xl border border-gray-100/50 shadow-[0_30px_60px_rgba(0,0,0,0.05)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 translate-y-4 group-hover:translate-y-0 rounded-2xl overflow-hidden">{item.subItems.map(sub=>(<a key={sub.name} href={sub.link} className="block px-6 py-5 text-center text-[13px] text-gray-500 hover:bg-gray-50 hover:text-[#9A000C] font-medium transition-all duration-300">{sub.name}</a>))}</div>)}</div>))}</nav><div className="flex items-center gap-5"><a href="tel:18003357" className="hidden sm:flex items-center gap-2 font-serif text-lg text-gray-800 hover:text-[#9A000C] transition-colors italic"><span className="w-2 h-2 bg-[#9A000C] rounded-full animate-pulse"/>1800-3357</a><a href="/#inquiry" className="px-8 py-3.5 font-medium text-xs tracking-widest bg-gray-900 text-white rounded-none hover:bg-[#9A000C] transition-all duration-700">상담예약</a><button className="lg:hidden p-1 text-gray-800" onClick={()=>setIsMobileMenuOpen(true)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/></svg></button></div></div></header>
      <div className={`fixed inset-0 z-[200] lg:hidden transition-all duration-700 ${isMobileMenuOpen?"opacity-100 visible":"opacity-0 invisible"}`}><div className="absolute inset-0 bg-black/80 backdrop-blur-2xl" onClick={()=>setIsMobileMenuOpen(false)}/><div className={`absolute top-0 right-0 bottom-0 w-full max-w-sm bg-white flex flex-col transform transition-transform duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${isMobileMenuOpen?"translate-x-0":"translate-x-full"}`}><div className="flex justify-between items-center p-8 border-b border-gray-100"><img src="/images/logo.png" alt="로고" className="h-6 brightness-0"/><button onClick={()=>setIsMobileMenuOpen(false)} className="text-gray-400 hover:text-gray-900 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg></button></div><div className="flex-1 overflow-y-auto p-10">{navItems.map(item=>(<div key={item.name} className="mb-10"><a href={item.link} className="text-2xl font-serif text-gray-900 hover:text-[#9A000C] transition-colors block mb-4" onClick={()=>setIsMobileMenuOpen(false)}>{item.name}</a><div className="flex flex-col pl-4 border-l border-gray-200 space-y-4">{item.subItems.map(sub=>(<a key={sub.name} href={sub.link} className="text-sm font-light text-gray-500 hover:text-gray-900 transition-colors" onClick={()=>setIsMobileMenuOpen(false)}>{sub.name}</a>))}</div></div>))}</div><div className="p-10 bg-gray-900 text-center"><p className="text-[10px] font-light text-white/50 mb-2 uppercase tracking-[0.3em]">VIP Contact</p><a href="tel:18003357" className="text-3xl font-serif text-white italic">1800-3357</a></div></div></div>

      {/* 히어로 */}
      <section className="relative h-[45vh] min-h-[350px] md:h-[55vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#FFF9F5] via-[#FFF5EE] to-[#FFE8D8]">
        <div className="absolute inset-0 bg-[url('/images/building-1.png')] bg-cover bg-center opacity-[0.03] scale-105"/>
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-[#9A000C]/[0.02] rounded-full blur-[120px] pointer-events-none animate-[float_10s_ease_infinite]"/>
        <div className="relative z-10 text-center px-4">
          <span className="inline-block px-5 py-2 bg-transparent border border-[#9A000C]/20 text-[#9A000C] text-[10px] md:text-xs font-medium tracking-[0.4em] uppercase mb-6 rounded-none ag-slide-up">Project Information</span>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif text-gray-900 mb-6 tracking-tight ag-slide-up" style={{animationDelay:"0.15s"}}>사업개요</h2>
          <div className="w-16 h-[1px] bg-gray-300 mx-auto ag-slide-up" style={{animationDelay:"0.3s"}}/>
          <p className="text-base sm:text-lg md:text-xl text-gray-500 font-light mt-7 ag-slide-up tracking-wide" style={{animationDelay:"0.4s"}}>비즈니스의 압도적 가치, 성공을 향한 최적의 플랫폼</p>
        </div>
      </section>

      {/* 본문 */}
      <main className="py-24 md:py-40">
        <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 flex flex-col items-center gap-16 md:gap-24 mb-32 md:mb-48">
          <div className="ag-reveal w-full overflow-hidden border border-gray-200/50">
            <img src="/images/overview-1.png" alt="사업개요 이미지 1" className="w-full h-auto object-contain opacity-90 hover:opacity-100 transition-opacity duration-700"/>
          </div>
          <div className="ag-reveal w-full overflow-hidden border border-gray-200/50" style={{transitionDelay:"0.2s"}}>
            <img src="/images/overview-2.png" alt="사업개요 이미지 2" className="w-full h-auto object-contain opacity-90 hover:opacity-100 transition-opacity duration-700"/>
          </div>
        </div>

        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
          <div className="ag-reveal mb-20 md:mb-32 pl-4 md:pl-8 border-l-[1px] border-[#9A000C]">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-gray-900 leading-[1.3] mb-6">
              실입주 기업을 위한 <br/><span className="italic font-light text-[#9A000C]">프리미엄 지식산업센터</span>
            </h3>
            <p className="text-base md:text-lg text-gray-500 font-light leading-relaxed max-w-3xl tracking-wide">
              서울 금천구 가산디지털1로 136에 위치하며, 가산디지털단지 핵심 업무권역에 자리해 IT·제조·연구·벤처기업의 집적 효과를 극대화합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-32 md:mb-48">
            {[
              {tag:"01",title:"대규모 프로젝트",desc:"2개동 지하 5층부터 지상 20층까지 구성된 대규모 프로젝트로, 업무·연구·지원 기능이 효율적으로 배치되어 있습니다."},
              {tag:"02",title:"유연한 공간 활용",desc:"연면적 약 1만7천평 규모로 계획되어 소형부터 중·대형까지 다양한 면적 선택이 가능합니다."},
              {tag:"03",title:"실사용 가치 극대화",desc:"효율적인 평면 구성과 넉넉한 주차 계획을 통해 업무 동선과 직원 편의성을 함께 고려한 가치를 높였습니다.", span: true}
            ].map((item,idx) => (
              <div key={idx} className={`ag-reveal group relative bg-transparent p-6 sm:p-10 border-t-[0.5px] border-gray-300 hover:border-[#9A000C] transition-colors duration-700 ${item.span?"md:col-span-2 md:w-1/2 md:mr-auto":""}`} style={{transitionDelay:`${idx*0.2}s`}}>
                <div className="relative z-10">
                  <div className="text-xs font-serif italic text-gray-400 mb-6">{item.tag}.</div>
                  <h4 className="text-xl md:text-2xl font-serif text-gray-900 mb-4">{item.title}</h4>
                  <p className="text-gray-500 font-light leading-relaxed text-sm md:text-base tracking-wide">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* [수정: 디자인 4, 8번 - 브랜드 메시지 배너 그라데이션 대신 딥 다크톤의 차분함 부여] */}
          <div className="ag-reveal relative bg-[#4A0A0A] rounded-none p-12 sm:p-20 md:p-32 text-center overflow-hidden">
            <div className="absolute inset-0 bg-[url('/images/building-1.png')] bg-cover bg-center opacity-[0.05] mix-blend-overlay"/>
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5"><div className="whitespace-nowrap animate-[marquee_40s_linear_infinite] text-[10rem] font-black text-white leading-none mt-10">SK V1 CENTER · GASAN · SK V1 CENTER ·&nbsp;</div></div>
            <div className="relative z-10">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white leading-[1.2] mb-8">
                비즈니스의 미래를 바꾸는 최상의 선택<br/><span className="text-white/60 font-light italic mt-4 block">가산 3차 SK V1 center</span>
              </h3>
              <div className="w-16 h-[1px] bg-white/20 mx-auto mb-8"/>
              <p className="text-sm md:text-base text-white/50 font-light max-w-2xl mx-auto leading-loose tracking-widest px-2">
                SK V1 브랜드의 굳건한 신뢰도를 바탕으로,<br className="hidden lg:block"/>기업 성장을 지원하는 핵심 비즈니스 거점을 지향합니다.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="relative bg-black py-24 md:py-32 overflow-hidden"><div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10"><div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-20"><div><img src="/images/logo.png" className="h-5 mb-10 brightness-0 invert opacity-40" alt="logo"/><div className="text-white/40 text-xs font-light tracking-wide leading-loose"><p>가산 3차 SK V1 센터 | 프리미엄 지식산업센터</p><p>상호: 케이케이솔루션 | 사업자번호: 135-31-54956 | 관리자: 김기강</p></div></div><div className="text-left lg:text-right"><p className="text-white/40 text-[10px] font-light uppercase tracking-[0.3em] mb-4">Inquiry</p><a href="tel:18003357" className="text-white font-serif text-3xl md:text-4xl hover:text-[#9A000C] transition-colors italic">1800-3357</a></div></div><div className="w-full h-[1px] bg-white/10 mb-10"/><div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6"><p className="text-[10px] text-white/30 font-light leading-relaxed max-w-xl tracking-wide">본 홈페이지의 이미지는 소비자의 이해를 돕기 위한 컷으로 실제 시공 시 차이가 있을 수 있습니다. 모든 정보는 홍보관을 통해 최종 확인하시기 바랍니다.</p><p className="text-[10px] font-light text-white/30 uppercase tracking-[0.2em] shrink-0">© 2026 GASAN 3rd SK V1 CENTER.</p></div></div></footer>

      <style jsx global>{`
        body, button, a { cursor: none !important; }
        .hide-scrollbar::-webkit-scrollbar{display:none}.hide-scrollbar{-ms-overflow-style:none;scrollbar-width:none}
        .ag-reveal{opacity:0;transform:translateY(40px);transition:opacity 1.2s cubic-bezier(0.25,1,0.5,1),transform 1.2s cubic-bezier(0.25,1,0.5,1)}
        .ag-reveal.is-revealed{opacity:1;transform:translateY(0)}
        @keyframes slideUpMask{0%{transform:translateY(110%);opacity:0}100%{transform:translateY(0);opacity:1}}
        .ag-slide-up{display:inline-block;animation:slideUpMask 1.5s cubic-bezier(0.16,1,0.3,1) forwards;opacity:0}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-20px)}}
        @keyframes gentleBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
        @keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        .ticker-wrap{overflow:hidden;width:100%}.ticker-content{display:inline-flex;animation:tickerScroll 30s linear infinite;white-space:nowrap}@keyframes tickerScroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        html{scroll-behavior:smooth}
      `}</style>
    </div>
  );
}