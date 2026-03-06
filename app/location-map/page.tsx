"use client";
import React, { useEffect, useState } from "react";

export default function LocationMap() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [globalMousePos, setGlobalMousePos] = useState({ x: -100, y: -100 });

  useEffect(() => { const h = () => setIsScrolled(window.scrollY > 50); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  useEffect(() => { const handleGlobalMouseMove = (e: MouseEvent) => setGlobalMousePos({ x: e.clientX, y: e.clientY }); window.addEventListener("mousemove", handleGlobalMouseMove); return () => window.removeEventListener("mousemove", handleGlobalMouseMove); }, []);
  useEffect(() => { const o = new IntersectionObserver((es) => { es.forEach(e => { if (e.isIntersecting) e.target.classList.add("is-revealed"); }); }, { threshold: 0.08 }); document.querySelectorAll(".ag-reveal").forEach(el => o.observe(el)); return () => document.querySelectorAll(".ag-reveal").forEach(el => o.unobserve(el)); }, []);
  
  const navItems = [{name:'분양정보',link:'/overview',subItems:[{name:'사업개요',link:'/overview'},{name:'오시는길',link:'/location'}]},{name:'입지환경',link:'/location-map',subItems:[{name:'광역위치도',link:'/location-map'},{name:'미래비전',link:'/vision'}]},{name:'단지정보',link:'/special-design',subItems:[{name:'특화설계',link:'/special-design'},{name:'층별계획',link:'/floor-plan'}]},{name:'홍보센터',link:'/site-photos',subItems:[{name:'현장사진',link:'/site-photos'}]}];

  // [수정: SharedChrome 내부에도 동일하게 럭셔리 UI 렌더링 적용]
  const SharedChrome = () => (<>
    <div className="pointer-events-none fixed inset-0 z-[999] opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    <div className="pointer-events-none fixed top-0 left-0 w-6 h-6 border-[1.5px] border-[#9A000C] rounded-full z-[1000] transition-transform duration-100 ease-out mix-blend-difference hidden lg:block" style={{ transform: `translate3d(${globalMousePos.x - 12}px, ${globalMousePos.y - 12}px, 0)` }} />
    <div className="fixed bottom-6 md:bottom-10 right-4 md:right-10 z-[100] flex flex-col space-y-3"><a href="http://pf.kakao.com/_uhZqX/chat" target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-[#FEE500] shadow-[0_8px_25px_rgba(254,229,0,0.4)] flex items-center justify-center hover:-translate-y-3 hover:shadow-[0_20px_40px_rgba(254,229,0,0.6)] transition-all duration-700 rounded-full"><svg className="h-6 w-6 text-[#3c1e1e]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3c-4.97 0-9 3.185-9 7.115 0 2.558 1.712 4.8 4.346 6.136l-.847 3.127c-.123.456.433.805.81.55l3.676-2.431c.33.048.667.073 1.015.073 4.97 0 9-3.185 9-7.115S16.97 3 12 3z"/></svg></a><a href="tel:18003357" className="w-14 h-14 bg-[#9A000C] shadow-[0_8px_25px_rgba(154,0,12,0.4)] flex items-center justify-center hover:-translate-y-3 hover:shadow-[0_20px_40px_rgba(154,0,12,0.6)] transition-all duration-700 rounded-full animate-[gentleBounce_4s_ease_infinite]"><svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg></a></div>
    <div className="bg-[#9A000C] text-white py-2 overflow-hidden z-[60] relative"><div className="ticker-wrap"><div className="ticker-content">{[...Array(6)].map((_,i)=>(<span key={i} className="mx-8 text-xs font-light tracking-[0.2em] whitespace-nowrap inline-flex items-center gap-3"><span className="w-1 h-1 bg-white/50 rounded-full"/>가산 3차 SK V1 센터 — 프리미엄 할인 분양<span className="w-1 h-1 bg-white/50 rounded-full"/>즉시입주 가능 · 1800-3357</span>))}</div></div></div>
    <header className={`sticky top-0 left-0 right-0 z-50 transition-all duration-[800ms] ${isScrolled?"py-4 bg-white/80 backdrop-blur-2xl border-b border-gray-900/5":"py-6 bg-transparent"}`}><div className="max-w-[1600px] mx-auto px-5 md:px-12 flex justify-between items-center"><a href="/" className="group"><img src="/images/logo.png" alt="로고" className="h-6 md:h-7 transition-all duration-700 brightness-0 group-hover:opacity-70"/></a><nav className="hidden lg:flex space-x-12 font-medium text-[14px] text-gray-800 tracking-wider">{navItems.map(item=>(<div key={item.name} className="relative group py-2"><a href={item.link} className="hover:text-[#9A000C] transition-colors block relative">{item.name}</a>{item.subItems.length>0&&(<div className="absolute top-full left-1/2 -translate-x-1/2 mt-6 w-48 bg-white/95 backdrop-blur-xl border border-gray-100/50 shadow-[0_30px_60px_rgba(0,0,0,0.05)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 translate-y-4 group-hover:translate-y-0 rounded-2xl overflow-hidden">{item.subItems.map(sub=>(<a key={sub.name} href={sub.link} className="block px-6 py-5 text-center text-[13px] text-gray-500 hover:bg-gray-50 hover:text-[#9A000C] font-medium transition-all duration-300">{sub.name}</a>))}</div>)}</div>))}</nav><div className="flex items-center gap-5"><a href="tel:18003357" className="hidden sm:flex items-center gap-2 font-serif text-lg text-gray-800 hover:text-[#9A000C] transition-colors italic"><span className="w-2 h-2 bg-[#9A000C] rounded-full animate-pulse"/>1800-3357</a><a href="/#inquiry" className="px-8 py-3.5 font-medium text-xs tracking-widest bg-gray-900 text-white rounded-none hover:bg-[#9A000C] transition-all duration-700">상담예약</a><button className="lg:hidden p-1 text-gray-800" onClick={()=>setIsMobileMenuOpen(true)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/></svg></button></div></div></header>
    <div className={`fixed inset-0 z-[200] lg:hidden transition-all duration-700 ${isMobileMenuOpen?"opacity-100 visible":"opacity-0 invisible"}`}><div className="absolute inset-0 bg-black/80 backdrop-blur-2xl" onClick={()=>setIsMobileMenuOpen(false)}/><div className={`absolute top-0 right-0 bottom-0 w-full max-w-sm bg-white flex flex-col transform transition-transform duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${isMobileMenuOpen?"translate-x-0":"translate-x-full"}`}><div className="flex justify-between items-center p-8 border-b border-gray-100"><img src="/images/logo.png" alt="로고" className="h-6 brightness-0"/><button onClick={()=>setIsMobileMenuOpen(false)} className="text-gray-400 hover:text-gray-900 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg></button></div><div className="flex-1 overflow-y-auto p-10">{navItems.map(item=>(<div key={item.name} className="mb-10"><a href={item.link} className="text-2xl font-serif text-gray-900 hover:text-[#9A000C] transition-colors block mb-4" onClick={()=>setIsMobileMenuOpen(false)}>{item.name}</a><div className="flex flex-col pl-4 border-l border-gray-200 space-y-4">{item.subItems.map(sub=>(<a key={sub.name} href={sub.link} className="text-sm font-light text-gray-500 hover:text-gray-900 transition-colors" onClick={()=>setIsMobileMenuOpen(false)}>{sub.name}</a>))}</div></div>))}</div><div className="p-10 bg-gray-900 text-center"><p className="text-[10px] font-light text-white/50 mb-2 uppercase tracking-[0.3em]">VIP Contact</p><a href="tel:18003357" className="text-3xl font-serif text-white italic">1800-3357</a></div></div></div>
  </>);

  return (
    <div className="min-h-screen bg-[#F7F5F2] text-black font-sans tracking-tight overflow-x-hidden selection:bg-[#9A000C] selection:text-white break-keep cursor-none">
      <SharedChrome/>

      {/* [수정: 디자인 5, 8번 - 히어로 글꼴 세리프 변경 및 여백 넓게] */}
      <section className="relative h-[45vh] min-h-[350px] md:h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#FFF9F5] via-[#FFF5EE] to-[#FFE8D8]">
        <div className="absolute inset-0 bg-[url('/images/building-1.jpg')] bg-cover bg-center opacity-[0.03]"/>
        <div className="absolute top-10 right-10 w-[400px] h-[400px] bg-[#9A000C]/[0.02] rounded-full blur-[100px] pointer-events-none animate-[float_10s_ease_infinite]"/>
        <div className="relative z-10 text-center px-4">
          <span className="inline-block px-5 py-2 bg-transparent border border-[#9A000C]/20 text-[#9A000C] text-[10px] md:text-xs font-medium tracking-[0.4em] uppercase mb-6 rounded-none ag-slide-up">Premium Location</span>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif text-gray-900 mb-6 tracking-tight ag-slide-up" style={{animationDelay:"0.15s"}}>광역위치도</h2>
          <div className="w-16 h-[1px] bg-gray-300 mx-auto ag-slide-up" style={{animationDelay:"0.3s"}}/>
          <p className="text-base md:text-xl text-gray-500 font-light mt-7 ag-slide-up tracking-wide" style={{animationDelay:"0.4s"}}>성공 비즈니스를 위한 최적의 교통 네트워크</p>
        </div>
      </section>

      <main className="py-24 md:py-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-center">
          {/* 위치도 이미지 */}
          <div className="w-full flex flex-col items-center gap-16 md:gap-24 mb-24 md:mb-32">
            {["광역위치도-1.png","광역위치도-2.png"].map((img,idx)=>(
              <div key={idx} className="ag-reveal w-full group overflow-hidden border border-gray-200/50" style={{transitionDelay:`${idx*0.2}s`}}>
                <img src={`/images/${img}`} alt="광역위치도" className="w-full h-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-700"/>
              </div>
            ))}
          </div>

          {/* 카드 */}
          <div className="w-full mb-12 md:mb-20">
            <div className="ag-reveal text-center mb-16 md:mb-24">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif text-gray-900 mb-6">가산 3차 SK V1 center만의<br className="sm:hidden"/><span className="text-gray-400 italic font-light"> 압도적 입지 가치</span></h3>
              <p className="text-gray-500 font-light text-sm md:text-lg tracking-wide">기업의 현재와 미래를 완성하는 완벽한 비즈니스 환경</p>
            </div>

            {/* [수정: 디자인 10번 - 박스 그림자 대신 상단 라인 포인트] */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {[
                {icon:"Map",title:"최적의 산업 생태계",desc:"서울 금천구 가산디지털단지 핵심 업무축에 위치. IT·제조·연구개발 등 산업 생태계를 형성합니다."},
                {icon:"Train",title:"쾌속 광역 교통망",desc:"1·7호선 가산디지털단지역 대중교통 접근성 및 남부순환로, 서부간선도로 등 진출입이 용이합니다."},
                {icon:"Coffee",title:"완성도 높은 인프라",desc:"수준 높은 업무시설과 상업시설이 함께 조성되어 직원 출퇴근 및 기업 운영의 편의를 제공합니다."}
              ].map((card,idx)=>(
                <div key={idx} className="ag-reveal group bg-transparent p-0 border-t-[0.5px] border-gray-300 pt-8 hover:border-[#9A000C] transition-colors duration-700" style={{transitionDelay:`${idx*0.2}s`}}>
                  <div className="text-[10px] text-gray-400 font-serif italic uppercase tracking-[0.3em] mb-6">{card.icon}</div>
                  <h4 className="text-xl md:text-2xl font-serif text-gray-900 mb-4">{card.title}</h4>
                  <p className="text-gray-500 leading-relaxed text-sm font-light tracking-wide">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="relative bg-black py-24 md:py-32 overflow-hidden"><div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10"><div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-20"><div><img src="/images/logo.png" className="h-5 mb-10 brightness-0 invert opacity-40" alt="logo"/><div className="text-white/40 text-xs font-light tracking-wide leading-loose"><p>가산 3차 SK V1 센터 | 프리미엄 지식산업센터</p><p>상호: 케이케이솔루션 | 사업자번호: 135-31-54956 | 관리자: 김기강</p></div></div><div className="text-left lg:text-right"><p className="text-white/40 text-[10px] font-light uppercase tracking-[0.3em] mb-4">Inquiry</p><a href="tel:18003357" className="text-white font-serif text-3xl md:text-4xl hover:text-[#9A000C] transition-colors italic">1800-3357</a></div></div><div className="w-full h-[1px] bg-white/10 mb-10"/><div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6"><p className="text-[10px] text-white/30 font-light leading-relaxed max-w-xl tracking-wide">본 홈페이지의 이미지는 소비자의 이해를 돕기 위한 컷으로 실제 시공 시 차이가 있을 수 있습니다. 모든 정보는 홍보관을 통해 최종 확인하시기 바랍니다.</p><p className="text-[10px] font-light text-white/30 uppercase tracking-[0.2em] shrink-0">© 2026 GASAN 3rd SK V1 CENTER.</p></div></div></footer>

      <style jsx global>{`
        body, button, a { cursor: none !important; }
        .ag-reveal{opacity:0;transform:translateY(40px);transition:opacity 1.2s cubic-bezier(0.25,1,0.5,1),transform 1.2s cubic-bezier(0.25,1,0.5,1)}.ag-reveal.is-revealed{opacity:1;transform:translateY(0)}
        @keyframes slideUpMask{0%{transform:translateY(110%);opacity:0}100%{transform:translateY(0);opacity:1}}.ag-slide-up{display:inline-block;animation:slideUpMask 1.5s cubic-bezier(0.16,1,0.3,1) forwards;opacity:0}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-20px)}}
        @keyframes gentleBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
        .ticker-wrap{overflow:hidden;width:100%}.ticker-content{display:inline-flex;animation:tickerScroll 30s linear infinite;white-space:nowrap}@keyframes tickerScroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        html{scroll-behavior:smooth}
      `}</style>
    </div>
  );
}