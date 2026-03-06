"use client";
import React, { useEffect, useState, useRef } from "react";

export default function Location() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showRoadview, setShowRoadview] = useState(false);
  const [mapCenter, setMapCenter] = useState<any>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const roadviewRef = useRef<HTMLDivElement>(null);
  const [globalMousePos, setGlobalMousePos] = useState({ x: -100, y: -100 });

  useEffect(() => { const h = () => setIsScrolled(window.scrollY > 50); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  useEffect(() => { const handleGlobalMouseMove = (e: MouseEvent) => setGlobalMousePos({ x: e.clientX, y: e.clientY }); window.addEventListener("mousemove", handleGlobalMouseMove); return () => window.removeEventListener("mousemove", handleGlobalMouseMove); }, []);
  useEffect(() => { const o = new IntersectionObserver((es) => { es.forEach(e => { if (e.isIntersecting) e.target.classList.add("is-revealed"); }); }, { threshold: 0.08 }); document.querySelectorAll(".ag-reveal").forEach(el => o.observe(el)); return () => document.querySelectorAll(".ag-reveal").forEach(el => o.unobserve(el)); }, []);

  // [유지: 카카오맵 연동 로직은 수정하지 않음]
  useEffect(() => {
    const KAKAO_API_KEY = "ed46603fb133bbedb6eb40c5fe4b0278";
    const initMap = () => { const kakao = (window as any).kakao; if (!kakao||!kakao.maps) return; kakao.maps.load(() => { const geocoder = new kakao.maps.services.Geocoder(); geocoder.addressSearch('서울특별시 금천구 가산동 371-36', function(result:any,status:any){ if(status===kakao.maps.services.Status.OK){ const coords = new kakao.maps.LatLng(result[0].y,result[0].x); setMapCenter(coords); if(mapRef.current){ const map = new kakao.maps.Map(mapRef.current,{center:coords,level:3}); new kakao.maps.Marker({map,position:coords}); } } }); }); };
    if(!document.getElementById("kakao-map-script")){const s=document.createElement("script");s.id="kakao-map-script";s.src=`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_API_KEY}&libraries=services&autoload=false`;document.head.appendChild(s);s.onload=initMap;}else{initMap();}
  }, []);
  useEffect(() => { if(showRoadview&&mapCenter){const t=setTimeout(()=>{const kakao=(window as any).kakao;if(roadviewRef.current&&kakao&&kakao.maps){const rv=new kakao.maps.Roadview(roadviewRef.current);const rc=new kakao.maps.RoadviewClient();rc.getNearestPanoId(mapCenter,100,(p:any)=>rv.setPanoId(p,mapCenter));}},100);return()=>clearTimeout(t);} }, [showRoadview,mapCenter]);

  const navItems = [{name:'분양정보',link:'/overview',subItems:[{name:'사업개요',link:'/overview'},{name:'오시는길',link:'/location'}]},{name:'입지환경',link:'/location-map',subItems:[{name:'광역위치도',link:'/location-map'},{name:'미래비전',link:'/vision'}]},{name:'단지정보',link:'/special-design',subItems:[{name:'특화설계',link:'/special-design'},{name:'층별계획',link:'/floor-plan'}]},{name:'홍보센터',link:'/site-photos',subItems:[{name:'현장사진',link:'/site-photos'}]}];

  return (
    <div className="min-h-screen bg-[#F7F5F2] text-black font-sans tracking-tight overflow-x-hidden selection:bg-[#9A000C] selection:text-white break-keep cursor-none">
      <div className="pointer-events-none fixed inset-0 z-[999] opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className="pointer-events-none fixed top-0 left-0 w-6 h-6 border-[1.5px] border-[#9A000C] rounded-full z-[1000] transition-transform duration-100 ease-out mix-blend-difference hidden lg:block" style={{ transform: `translate3d(${globalMousePos.x - 12}px, ${globalMousePos.y - 12}px, 0)` }} />

      <div className="fixed bottom-6 md:bottom-10 right-4 md:right-10 z-[100] flex flex-col space-y-3"><a href="http://pf.kakao.com/_uhZqX/chat" target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-[#FEE500] shadow-[0_8px_25px_rgba(254,229,0,0.4)] flex items-center justify-center hover:-translate-y-3 hover:shadow-[0_20px_40px_rgba(254,229,0,0.6)] transition-all duration-700 rounded-full"><svg className="h-6 w-6 text-[#3c1e1e]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3c-4.97 0-9 3.185-9 7.115 0 2.558 1.712 4.8 4.346 6.136l-.847 3.127c-.123.456.433.805.81.55l3.676-2.431c.33.048.667.073 1.015.073 4.97 0 9-3.185 9-7.115S16.97 3 12 3z"/></svg></a><a href="tel:18003357" className="w-14 h-14 bg-[#9A000C] shadow-[0_8px_25px_rgba(154,0,12,0.4)] flex items-center justify-center hover:-translate-y-3 hover:shadow-[0_20px_40px_rgba(154,0,12,0.6)] transition-all duration-700 rounded-full animate-[gentleBounce_4s_ease_infinite]"><svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg></a></div>
      <div className="bg-[#9A000C] text-white py-2 overflow-hidden z-[60] relative"><div className="ticker-wrap"><div className="ticker-content">{[...Array(6)].map((_,i)=>(<span key={i} className="mx-8 text-xs font-light tracking-[0.2em] whitespace-nowrap inline-flex items-center gap-3"><span className="w-1 h-1 bg-white/50 rounded-full"/>가산 3차 SK V1 센터 — 프리미엄 할인 분양<span className="w-1 h-1 bg-white/50 rounded-full"/>즉시입주 가능 · 1800-3357</span>))}</div></div></div>
      <header className={`sticky top-0 left-0 right-0 z-50 transition-all duration-[800ms] ${isScrolled?"py-4 bg-white/80 backdrop-blur-2xl border-b border-gray-900/5":"py-6 bg-transparent"}`}><div className="max-w-[1600px] mx-auto px-5 md:px-12 flex justify-between items-center"><a href="/" className="group"><img src="/images/logo.png" alt="로고" className="h-6 md:h-7 transition-all duration-700 brightness-0 group-hover:opacity-70"/></a><nav className="hidden lg:flex space-x-12 font-medium text-[14px] text-gray-800 tracking-wider">{navItems.map(item=>(<div key={item.name} className="relative group py-2"><a href={item.link} className="hover:text-[#9A000C] transition-colors block relative">{item.name}</a>{item.subItems.length>0&&(<div className="absolute top-full left-1/2 -translate-x-1/2 mt-6 w-48 bg-white/95 backdrop-blur-xl border border-gray-100/50 shadow-[0_30px_60px_rgba(0,0,0,0.05)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 translate-y-4 group-hover:translate-y-0 rounded-2xl overflow-hidden">{item.subItems.map(sub=>(<a key={sub.name} href={sub.link} className="block px-6 py-5 text-center text-[13px] text-gray-500 hover:bg-gray-50 hover:text-[#9A000C] font-medium transition-all duration-300">{sub.name}</a>))}</div>)}</div>))}</nav><div className="flex items-center gap-5"><a href="tel:18003357" className="hidden sm:flex items-center gap-2 font-serif text-lg text-gray-800 hover:text-[#9A000C] transition-colors italic"><span className="w-2 h-2 bg-[#9A000C] rounded-full animate-pulse"/>1800-3357</a><a href="/#inquiry" className="px-8 py-3.5 font-medium text-xs tracking-widest bg-gray-900 text-white rounded-none hover:bg-[#9A000C] transition-all duration-700">상담예약</a><button className="lg:hidden p-1 text-gray-800" onClick={()=>setIsMobileMenuOpen(true)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/></svg></button></div></div></header>
      <div className={`fixed inset-0 z-[200] lg:hidden transition-all duration-700 ${isMobileMenuOpen?"opacity-100 visible":"opacity-0 invisible"}`}><div className="absolute inset-0 bg-black/80 backdrop-blur-2xl" onClick={()=>setIsMobileMenuOpen(false)}/><div className={`absolute top-0 right-0 bottom-0 w-full max-w-sm bg-white flex flex-col transform transition-transform duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${isMobileMenuOpen?"translate-x-0":"translate-x-full"}`}><div className="flex justify-between items-center p-8 border-b border-gray-100"><img src="/images/logo.png" alt="로고" className="h-6 brightness-0"/><button onClick={()=>setIsMobileMenuOpen(false)} className="text-gray-400 hover:text-gray-900 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg></button></div><div className="flex-1 overflow-y-auto p-10">{navItems.map(item=>(<div key={item.name} className="mb-10"><a href={item.link} className="text-2xl font-serif text-gray-900 hover:text-[#9A000C] transition-colors block mb-4" onClick={()=>setIsMobileMenuOpen(false)}>{item.name}</a><div className="flex flex-col pl-4 border-l border-gray-200 space-y-4">{item.subItems.map(sub=>(<a key={sub.name} href={sub.link} className="text-sm font-light text-gray-500 hover:text-gray-900 transition-colors" onClick={()=>setIsMobileMenuOpen(false)}>{sub.name}</a>))}</div></div>))}</div><div className="p-10 bg-gray-900 text-center"><p className="text-[10px] font-light text-white/50 mb-2 uppercase tracking-[0.3em]">VIP Contact</p><a href="tel:18003357" className="text-3xl font-serif text-white italic">1800-3357</a></div></div></div>

      {/* [수정: 디자인 2, 5번 - 다크톤(차콜) 배경으로 히어로 반전 및 타이포 변경] */}
      <section className="relative h-[45vh] min-h-[350px] md:h-[55vh] flex items-center justify-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0 bg-[url('/images/building-1.png')] bg-cover bg-center opacity-10 mix-blend-overlay"/>
        <div className="relative z-10 text-center px-4">
          <span className="inline-block px-5 py-2 bg-transparent border border-white/20 text-white/80 text-[10px] md:text-xs font-medium tracking-[0.4em] uppercase mb-6 rounded-none ag-slide-up">Location Info</span>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif text-white mb-6 tracking-tight ag-slide-up" style={{animationDelay:"0.15s"}}>오시는 길</h2>
          <div className="w-16 h-[1px] bg-white/30 mx-auto ag-slide-up" style={{animationDelay:"0.3s"}}/>
          <p className="text-base sm:text-lg md:text-xl text-white/60 font-light mt-7 ag-slide-up tracking-widest" style={{animationDelay:"0.4s"}}>서울특별시 금천구 가산디지털1로 136</p>
        </div>
      </section>

      <main className="py-24 md:py-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
          {/* [수정: 디자인 10, 16번 - 카카오 지도 보더 제거, 글래스모피즘 박스] */}
          <div className="ag-reveal relative w-full h-[400px] sm:h-[500px] md:h-[650px] rounded-none overflow-hidden shadow-2xl border border-gray-200 bg-gray-50 mb-24 md:mb-32 group">
            <div ref={mapRef} className="w-full h-full z-0 group-hover:scale-[1.01] transition-transform duration-[3000ms]"/>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:top-10 md:bottom-auto md:left-10 md:translate-x-0 z-10 bg-white/80 backdrop-blur-2xl p-6 md:p-10 border border-white/30 w-[90%] md:w-auto md:max-w-xs text-center md:text-left shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
              <h4 className="text-gray-900 font-serif text-xl md:text-2xl mb-2">가산 3차 SK V1 center</h4>
              <p className="text-gray-500 font-light text-xs md:text-sm tracking-wide mb-6">서울특별시 금천구 가산동 371-36</p>
              <div className="flex gap-3">
                <a href="https://map.kakao.com/link/to/가산3차SKV1,37.4800,126.8833" target="_blank" className="flex-1 bg-transparent border border-gray-900 text-gray-900 py-3 text-center text-xs tracking-widest uppercase hover:bg-gray-900 hover:text-white transition-colors">길찾기</a>
                <button onClick={()=>setShowRoadview(true)} className="flex-1 bg-[#9A000C] text-white py-3 text-center text-xs tracking-widest uppercase hover:bg-black transition-colors">로드뷰</button>
              </div>
            </div>
          </div>

          {/* [수정: 디자인 10, 17번 - 교통 안내 카드 두꺼운 호버와 배경 그라데이션 대신 상단 얇은 선 라인] */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 mb-32 md:mb-40">
            {[
              {i:"Subway",t:"지하철 이용 시",c:"1·7호선 가산디지털단지역 3번출구에서 도보 약 250m (약 3분 소요)"},
              {i:"Bus",t:"버스 이용 시",c:"가산디지털단지역(중) 정류장 하차 / 지선버스: 5537, 5616, 5712, 5714 등"},
              {i:"Car",t:"자차 이용 시",c:"네비게이션 '가산 3차 SK V1' 검색 / 서부간선도로, 남부순환로 진출입 용이"}
            ].map((info,idx)=>(
              <div key={idx} className={`ag-reveal group bg-transparent p-6 md:p-8 border-t-[0.5px] border-gray-300 hover:border-[#9A000C] transition-all duration-700 relative`} style={{transitionDelay:`${idx*0.2}s`}}>
                <div className="text-[10px] text-gray-400 font-serif italic mb-6 uppercase tracking-[0.3em]">{info.i}</div>
                <h4 className="text-xl md:text-2xl font-serif text-gray-900 mb-4">{info.t}</h4>
                <p className="text-gray-500 font-light leading-relaxed text-sm tracking-wide">{info.c}</p>
              </div>
            ))}
          </div>

          {/* 입지 이미지 */}
          <div className="flex flex-col items-center gap-12 md:gap-20">
            <div className="ag-reveal text-center mb-4 md:mb-8">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif text-gray-900">압도적 입지의 <br/><span className="text-gray-400 font-light italic">완성된 비즈니스</span></h3>
            </div>
            {["location-1.png","location-2.png"].map((img,idx)=>(
              // [수정: 이미지 보더 없애고 스케일 업 애니메이션 미세 조정]
              <div key={idx} className="ag-reveal w-full max-w-5xl group overflow-hidden border border-gray-100/50" style={{transitionDelay:`${idx*0.2}s`}}>
                <img src={`/images/${img}`} alt="입지안내" className="w-full h-auto group-hover:scale-[1.01] opacity-90 hover:opacity-100 transition-all duration-[2000ms]"/>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* [수정: 로드뷰 모달창 디자인 변경] */}
      {showRoadview&&(<div className="fixed inset-0 z-[300] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 md:p-10 animate-fade-in"><div className="w-full max-w-6xl h-[75vh] md:h-[85vh] bg-transparent border border-white/10 rounded-none overflow-hidden shadow-2xl relative flex flex-col"><div className="h-16 bg-black flex items-center justify-between px-8 shrink-0"><span className="text-white/60 font-serif italic text-sm md:text-base">Street View</span><button onClick={()=>setShowRoadview(false)} className="text-white font-light tracking-[0.2em] hover:text-[#9A000C] text-xs">CLOSE ✕</button></div><div ref={roadviewRef} className="flex-1 w-full h-full bg-gray-900"/></div></div>)}

      <footer className="relative bg-black py-24 md:py-32 overflow-hidden"><div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10"><div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-20"><div><img src="/images/logo.png" className="h-5 mb-10 brightness-0 invert opacity-40" alt="logo"/><div className="text-white/40 text-xs font-light tracking-wide leading-loose"><p>가산 3차 SK V1 센터 | 프리미엄 지식산업센터</p><p>상호: 케이케이솔루션 | 사업자번호: 135-31-54956 | 관리자: 김기강</p></div></div><div className="text-left lg:text-right"><p className="text-white/40 text-[10px] font-light uppercase tracking-[0.3em] mb-4">Inquiry</p><a href="tel:18003357" className="text-white font-serif text-3xl md:text-4xl hover:text-[#9A000C] transition-colors italic">1800-3357</a></div></div><div className="w-full h-[1px] bg-white/10 mb-10"/><div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6"><p className="text-[10px] text-white/30 font-light leading-relaxed max-w-xl tracking-wide">본 홈페이지의 이미지는 소비자의 이해를 돕기 위한 컷으로 실제 시공 시 차이가 있을 수 있습니다. 모든 정보는 홍보관을 통해 최종 확인하시기 바랍니다.</p><p className="text-[10px] font-light text-white/30 uppercase tracking-[0.2em] shrink-0">© 2026 GASAN 3rd SK V1 CENTER.</p></div></div></footer>

      <style jsx global>{`
        body, button, a { cursor: none !important; }
        @keyframes fade-in{from{opacity:0}to{opacity:1}}.animate-fade-in{animation:fade-in 0.5s ease-out forwards}
        .ag-reveal{opacity:0;transform:translateY(40px);transition:opacity 1.2s cubic-bezier(0.25,1,0.5,1),transform 1.2s cubic-bezier(0.25,1,0.5,1)}.ag-reveal.is-revealed{opacity:1;transform:translateY(0)}
        @keyframes slideUpMask{0%{transform:translateY(110%);opacity:0}100%{transform:translateY(0);opacity:1}}.ag-slide-up{display:inline-block;animation:slideUpMask 1.5s cubic-bezier(0.16,1,0.3,1) forwards;opacity:0}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-20px)}}.hero-spin{animation:spin 40s linear infinite}@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes gentleBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
        .ticker-wrap{overflow:hidden;width:100%}.ticker-content{display:inline-flex;animation:tickerScroll 30s linear infinite;white-space:nowrap}@keyframes tickerScroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        html{scroll-behavior:smooth}
      `}</style>
    </div>
  );
}