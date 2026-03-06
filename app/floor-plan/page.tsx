"use client";
import React, { useEffect, useState } from "react";

export default function FloorPlan() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("upper");
  const [selectedFloor, setSelectedFloor] = useState("지상3층(업무시설)");

  // [추가: 디자인 13번 - 커스텀 마우스 커서를 위한 전역 마우스 위치 상태]
  const [globalMousePos, setGlobalMousePos] = useState({ x: -100, y: -100 });

  useEffect(() => { const h = () => setIsScrolled(window.scrollY > 50); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  
  // [추가: 디자인 13번 - 커스텀 마우스 커서 추적]
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => setGlobalMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleGlobalMouseMove);
    return () => window.removeEventListener("mousemove", handleGlobalMouseMove);
  }, []);

  useEffect(() => { const o = new IntersectionObserver((es) => { es.forEach(e => { if (e.isIntersecting) e.target.classList.add("is-revealed"); }); }, { threshold: 0.08 }); document.querySelectorAll(".ag-reveal").forEach(el => o.observe(el)); return () => document.querySelectorAll(".ag-reveal").forEach(el => o.unobserve(el)); }, []);

  const floorData: {[key:string]:{name:string;file:string}[]} = {
    basement:[{name:"지하1층",file:"지하1층-1.png"},{name:"지하2층",file:"지하2층-1.png"},{name:"지하3층",file:"지하3층-1.png"},{name:"지하4층",file:"지하4층-1.png"},{name:"지하5층",file:"지하5층-2.png"}],
    lower:[{name:"지상1층(상가)",file:"1층-2.png"},{name:"지상2층(업무시설)",file:"2층-2-768x432.png"}],
    upper:[{name:"지상3층(업무시설)",file:"3층-2.png"},{name:"지상4층(지산)",file:"4층-3.png"},{name:"지상5층(지산)",file:"5층-2.png"},{name:"지상6층(지산)",file:"6층-3.png"},{name:"지상7층(지산)",file:"7층-3.png"},{name:"지상8층(지산)",file:"8층-3.png"},{name:"지상9층(지산)",file:"9층-3.png"},{name:"지상10층(지산)",file:"10층-2.png"},{name:"지상11층(지산)",file:"11층-3.png"},{name:"지상12층(지산)",file:"12층-3.png"},{name:"지상13층(지산)",file:"13층-2.png"},{name:"지상14층(지산)",file:"14층-2.png"},{name:"지상15층(지산)",file:"15층-2-768x432.png"},{name:"지상16층(지산)",file:"16층-2.png"},{name:"지상17층(지산)",file:"17층-2.png"},{name:"지상18층(지산)",file:"18층-2.png"},{name:"지상19층(지산)",file:"19층-2.png"},{name:"지상20층(업무시설)",file:"20층-2.png"}]
  };
  const navItems = [{name:'분양정보',link:'/overview',subItems:[{name:'사업개요',link:'/overview'},{name:'오시는길',link:'/location'}]},{name:'입지환경',link:'/location-map',subItems:[{name:'광역위치도',link:'/location-map'},{name:'미래비전',link:'/vision'}]},{name:'단지정보',link:'/special-design',subItems:[{name:'특화설계',link:'/special-design'},{name:'층별계획',link:'/floor-plan'}]},{name:'홍보센터',link:'/site-photos',subItems:[{name:'현장사진',link:'/site-photos'}]}];
  const currentImg = [...floorData.basement,...floorData.lower,...floorData.upper].find(f=>f.name===selectedFloor)?.file||"3층-2.png";

  return (
    // [수정: 디자인 1, 13번 - 톤다운 레드 셀렉션 및 커서 숨김]
    <div className="min-h-screen bg-[#F7F5F2] text-black font-sans tracking-tight overflow-x-hidden selection:bg-[#9A000C] selection:text-white break-keep cursor-none">
      
      {/* [추가: 디자인 3번 - 전역 노이즈 텍스처] */}
      <div className="pointer-events-none fixed inset-0 z-[999] opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      {/* [추가: 디자인 13번 - 커스텀 원형 커서] */}
      <div className="pointer-events-none fixed top-0 left-0 w-6 h-6 border-[1.5px] border-[#9A000C] rounded-full z-[1000] transition-transform duration-100 ease-out mix-blend-difference hidden lg:block" style={{ transform: `translate3d(${globalMousePos.x - 12}px, ${globalMousePos.y - 12}px, 0)` }} />

      {/* [수정: 디자인 14, 15번 - 플로팅 버튼 호버 완화 및 트랜지션 연장] */}
      <div className="fixed bottom-6 md:bottom-10 right-4 md:right-10 z-[100] flex flex-col space-y-3"><a href="http://pf.kakao.com/_uhZqX/chat" target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-[#FEE500] shadow-[0_8px_25px_rgba(254,229,0,0.4)] flex items-center justify-center hover:-translate-y-3 hover:shadow-[0_20px_40px_rgba(254,229,0,0.6)] transition-all duration-700 rounded-full"><svg className="h-6 w-6 text-[#3c1e1e]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3c-4.97 0-9 3.185-9 7.115 0 2.558 1.712 4.8 4.346 6.136l-.847 3.127c-.123.456.433.805.81.55l3.676-2.431c.33.048.667.073 1.015.073 4.97 0 9-3.185 9-7.115S16.97 3 12 3z"/></svg></a><a href="tel:18003357" className="w-14 h-14 bg-[#9A000C] shadow-[0_8px_25px_rgba(154,0,12,0.4)] flex items-center justify-center hover:-translate-y-3 hover:shadow-[0_20px_40px_rgba(154,0,12,0.6)] transition-all duration-700 rounded-full animate-[gentleBounce_4s_ease_infinite]"><svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg></a></div>
      
      {/* [수정: 디자인 1, 6, 18번 - 티커 컬러 버건디 변경 및 타이포그래피 정돈] */}
      <div className="bg-[#9A000C] text-white py-2 overflow-hidden z-[60] relative"><div className="ticker-wrap"><div className="ticker-content">{[...Array(6)].map((_,i)=>(<span key={i} className="mx-8 text-xs font-light tracking-[0.2em] whitespace-nowrap inline-flex items-center gap-3"><span className="w-1 h-1 bg-white/50 rounded-full"/>가산 3차 SK V1 센터 — 프리미엄 할인 분양<span className="w-1 h-1 bg-white/50 rounded-full"/>즉시입주 가능 · 1800-3357</span>))}</div></div></div>
      
      {/* [수정: 디자인 10, 16번 - 헤더 글래스모피즘 및 하단 얇은 선 적용] */}
      <header className={`sticky top-0 left-0 right-0 z-50 transition-all duration-[800ms] ${isScrolled?"py-4 bg-white/80 backdrop-blur-2xl border-b border-gray-900/5":"py-6 bg-transparent"}`}><div className="max-w-[1600px] mx-auto px-5 md:px-12 flex justify-between items-center"><a href="/" className="group"><img src="/images/logo.png" alt="로고" className="h-6 md:h-7 transition-all duration-700 brightness-0 group-hover:opacity-70"/></a><nav className="hidden lg:flex space-x-12 font-medium text-[14px] text-gray-800 tracking-wider">{navItems.map(item=>(<div key={item.name} className="relative group py-2"><a href={item.link} className="hover:text-[#9A000C] transition-colors block relative">{item.name}</a>{item.subItems.length>0&&(<div className="absolute top-full left-1/2 -translate-x-1/2 mt-6 w-48 bg-white/95 backdrop-blur-xl border border-gray-100/50 shadow-[0_30px_60px_rgba(0,0,0,0.05)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 translate-y-4 group-hover:translate-y-0 rounded-2xl overflow-hidden">{item.subItems.map(sub=>(<a key={sub.name} href={sub.link} className="block px-6 py-5 text-center text-[13px] text-gray-500 hover:bg-gray-50 hover:text-[#9A000C] font-medium transition-all duration-300">{sub.name}</a>))}</div>)}</div>))}</nav><div className="flex items-center gap-5"><a href="tel:18003357" className="hidden sm:flex items-center gap-2 font-serif text-lg text-gray-800 hover:text-[#9A000C] transition-colors italic"><span className="w-2 h-2 bg-[#9A000C] rounded-full animate-pulse"/>1800-3357</a><a href="/#inquiry" className="px-8 py-3.5 font-medium text-xs tracking-widest bg-gray-900 text-white rounded-none hover:bg-[#9A000C] transition-all duration-700">상담예약</a><button className="lg:hidden p-1 text-gray-800" onClick={()=>setIsMobileMenuOpen(true)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/></svg></button></div></div></header>
      
      {/* [수정: 디자인 19번 - 모바일 메뉴 풀스크린 덮임 효과 및 타이포 세리프체 적용] */}
      <div className={`fixed inset-0 z-[200] lg:hidden transition-all duration-700 ${isMobileMenuOpen?"opacity-100 visible":"opacity-0 invisible"}`}><div className="absolute inset-0 bg-black/80 backdrop-blur-2xl" onClick={()=>setIsMobileMenuOpen(false)}/><div className={`absolute top-0 right-0 bottom-0 w-full max-w-sm bg-white flex flex-col transform transition-transform duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${isMobileMenuOpen?"translate-x-0":"translate-x-full"}`}><div className="flex justify-between items-center p-8 border-b border-gray-100"><img src="/images/logo.png" alt="로고" className="h-6 brightness-0"/><button onClick={()=>setIsMobileMenuOpen(false)} className="text-gray-400 hover:text-gray-900 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg></button></div><div className="flex-1 overflow-y-auto p-10">{navItems.map(item=>(<div key={item.name} className="mb-10"><a href={item.link} className="text-2xl font-serif text-gray-900 hover:text-[#9A000C] transition-colors block mb-4" onClick={()=>setIsMobileMenuOpen(false)}>{item.name}</a><div className="flex flex-col pl-4 border-l border-gray-200 space-y-4">{item.subItems.map(sub=>(<a key={sub.name} href={sub.link} className="text-sm font-light text-gray-500 hover:text-gray-900 transition-colors" onClick={()=>setIsMobileMenuOpen(false)}>{sub.name}</a>))}</div></div>))}</div><div className="p-10 bg-gray-900 text-center"><p className="text-[10px] font-light text-white/50 mb-2 uppercase tracking-[0.3em]">VIP Contact</p><a href="tel:18003357" className="text-3xl font-serif text-white italic">1800-3357</a></div></div></div>

      {/* [수정: 디자인 5, 8번 - 히어로 폰트 세리프 변경 및 여백/간격 확대] */}
      <section className="relative h-[40vh] min-h-[300px] md:h-[45vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#FFF9F5] via-[#FFF5EE] to-[#FFE8D8]">
        <div className="absolute inset-0 bg-[url('/images/building-1.png')] bg-cover bg-center opacity-[0.03]"/>
        <div className="absolute top-10 right-0 w-[400px] h-[400px] bg-[#9A000C]/[0.02] rounded-full blur-[120px] pointer-events-none animate-[float_8s_ease_infinite]"/>
        <div className="relative z-10 text-center px-4">
          <span className="inline-block px-5 py-2 bg-transparent border border-[#9A000C]/20 text-[#9A000C] text-[10px] md:text-xs font-medium tracking-[0.4em] uppercase mb-6 rounded-none ag-slide-up">Architecture Plan</span>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif text-gray-900 mb-6 tracking-tight ag-slide-up" style={{animationDelay:"0.15s"}}>층별계획</h2>
          <div className="w-16 h-[1px] bg-gray-300 mx-auto ag-slide-up" style={{animationDelay:"0.3s"}}/>
        </div>
      </section>

      <main className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* [수정: 디자인 10, 17번 - 탭 버튼 모양을 각진 선형으로 변경하고 섀도우 최소화] */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12 md:mb-16">
            {[{id:'upper',label:'지상층 (3F~20F)'},{id:'lower',label:'저층부 (1F~2F)'},{id:'basement',label:'지하층 (B1~B5)'}].map(tab=>(
              <button key={tab.id} onClick={()=>{setActiveTab(tab.id);setSelectedFloor(floorData[tab.id][0].name);}} className={`px-6 py-3 sm:px-8 md:px-12 md:py-4 rounded-none font-medium text-xs tracking-widest sm:text-sm transition-all duration-700 border ${activeTab===tab.id?'bg-[#9A000C] text-white border-[#9A000C]':'bg-transparent text-gray-500 border-gray-300 hover:border-gray-900 hover:text-gray-900'}`}>{tab.label}</button>
            ))}
          </div>

          {/* [수정: 디자인 10, 17번 - 하위 층 버튼들도 둥글기와 섀도우를 제거하고 모던하게 배치] */}
          <div className="flex flex-wrap justify-center gap-3 mb-16 md:mb-24 bg-transparent p-0 sm:p-2 border-b border-gray-200 pb-10">
            {floorData[activeTab].map(floor=>(
              <button key={floor.name} onClick={()=>setSelectedFloor(floor.name)} className={`px-4 h-10 sm:h-12 rounded-none font-serif italic text-xs sm:text-sm transition-all duration-500 flex items-center justify-center border ${selectedFloor===floor.name?'bg-gray-900 text-white border-gray-900':'bg-white text-gray-400 border-gray-200 hover:border-[#9A000C] hover:text-[#9A000C]'}`}>{floor.name}</button>
            ))}
          </div>

          {/* [수정: 디자인 8, 10번 - 도면 컨테이너 얇은 라인, 배지 미니멀화] */}
          <div className="ag-reveal relative w-full max-w-6xl mx-auto bg-white rounded-none border border-gray-200 overflow-hidden group">
            <div className="absolute top-6 left-6 md:top-10 md:left-10 z-10 bg-transparent text-[#9A000C] border border-[#9A000C]/30 px-5 py-2 font-serif text-sm sm:text-lg italic">{selectedFloor}</div>
            <div className="p-8 sm:p-16 md:p-24 flex justify-center items-center min-h-[400px] md:min-h-[700px] bg-[#FAFAFA]">
              <img key={selectedFloor} src={`/images/${currentImg}`} alt={`${selectedFloor} floor plan`} className="w-full h-auto object-contain max-h-[500px] md:max-h-[850px] animate-floor-fade drop-shadow-xl opacity-90 hover:opacity-100 transition-opacity duration-700"/>
            </div>
            <div className="bg-white border-t border-gray-100 py-6 px-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 font-light text-[11px] md:text-xs tracking-wider">본 도면은 소비자의 이해를 돕기 위한 이미지컷으로 실제와 차이가 있을 수 있습니다.</p>
              <div className="text-gray-400 font-serif italic text-xs md:text-sm">Inquiry : 1800-3357</div>
            </div>
          </div>
        </div>
      </main>

      {/* [수정: 디자인 8, 7번 - 푸터 패딩 확대 및 타이포그래피 정돈] */}
      <footer className="relative bg-black py-24 md:py-32 overflow-hidden"><div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10"><div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-20"><div><img src="/images/logo.png" className="h-5 mb-10 brightness-0 invert opacity-40" alt="logo"/><div className="text-white/40 text-xs font-light tracking-wide leading-loose"><p>가산 3차 SK V1 센터 | 프리미엄 지식산업센터</p><p>상호: 케이케이솔루션 | 사업자번호: 135-31-54956 | 관리자: 김기강</p></div></div><div className="text-left lg:text-right"><p className="text-white/40 text-[10px] font-light uppercase tracking-[0.3em] mb-4">Inquiry</p><a href="tel:18003357" className="text-white font-serif text-3xl md:text-4xl hover:text-[#9A000C] transition-colors italic">1800-3357</a></div></div><div className="w-full h-[1px] bg-white/10 mb-10"/><div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6"><p className="text-[10px] text-white/30 font-light leading-relaxed max-w-xl tracking-wide">본 홈페이지의 이미지는 소비자의 이해를 돕기 위한 컷으로 실제와 차이가 있을 수 있습니다.</p><p className="text-[10px] font-light text-white/30 uppercase tracking-[0.2em] shrink-0">© 2026 GASAN 3rd SK V1 CENTER.</p></div></div></footer>

      <style jsx global>{`
        body, button, a { cursor: none !important; }
        @keyframes floor-fade{from{opacity:0;transform:scale(0.98) translateY(10px)}to{opacity:1;transform:scale(1) translateY(0)}}.animate-floor-fade{animation:floor-fade 1.2s cubic-bezier(0.16,1,0.3,1) forwards}
        .ag-reveal{opacity:0;transform:translateY(40px);transition:opacity 1.2s cubic-bezier(0.25,1,0.5,1),transform 1.2s cubic-bezier(0.25,1,0.5,1)}.ag-reveal.is-revealed{opacity:1;transform:translateY(0)}
        @keyframes slideUpMask{0%{transform:translateY(110%);opacity:0}100%{transform:translateY(0);opacity:1}}.ag-slide-up{display:inline-block;animation:slideUpMask 1.5s cubic-bezier(0.16,1,0.3,1) forwards;opacity:0}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-20px)}}@keyframes gentleBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
        .ticker-wrap{overflow:hidden;width:100%}.ticker-content{display:inline-flex;animation:tickerScroll 30s linear infinite;white-space:nowrap}@keyframes tickerScroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        html{scroll-behavior:smooth}
      `}</style>
    </div>
  );
}