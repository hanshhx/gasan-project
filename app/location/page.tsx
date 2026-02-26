"use client";

import React, { useEffect, useState, useRef } from "react";

export default function Location() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showRoadview, setShowRoadview] = useState(false);
  const [mapCenter, setMapCenter] = useState<any>(null);
  
  // ⭐️ 모바일 메뉴 열림/닫힘 상태 추가
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const mapRef = useRef<HTMLDivElement>(null);
  const roadviewRef = useRef<HTMLDivElement>(null);

  // 1. 헤더 스크롤 효과
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. 등장 애니메이션
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0", "translate-y-12");
            entry.target.classList.add("opacity-100", "translate-y-0");
          }
        });
      },
      { threshold: 0.1 }
    );
    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach((el) => observer.observe(el));
    return () => revealElements.forEach((el) => observer.unobserve(el));
  }, []);

  // 3. 카카오지도 연동
  useEffect(() => {
    const KAKAO_API_KEY = "ed46603fb133bbedb6eb40c5fe4b0278"; 
    const initMap = () => {
      const kakao = (window as any).kakao;
      if (!kakao || !kakao.maps) return; 
      kakao.maps.load(() => {
        const geocoder = new kakao.maps.services.Geocoder();
        geocoder.addressSearch('서울특별시 금천구 가산동 371-36', function(result: any, status: any) {
          if (status === kakao.maps.services.Status.OK) {
            const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
            setMapCenter(coords);
            if(mapRef.current) {
              const map = new kakao.maps.Map(mapRef.current, { center: coords, level: 3 });
              new kakao.maps.Marker({ map: map, position: coords });
            }
          }
        });
      });
    };
    if (!document.getElementById("kakao-map-script")) {
      const script = document.createElement("script");
      script.id = "kakao-map-script";
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_API_KEY}&libraries=services&autoload=false`;
      document.head.appendChild(script);
      script.onload = initMap;
    } else { initMap(); }
  }, []);

  // 4. 로드뷰 연동
  useEffect(() => {
    if (showRoadview && mapCenter) {
      const timer = setTimeout(() => {
        const kakao = (window as any).kakao;
        if (roadviewRef.current && kakao && kakao.maps) {
          const rv = new kakao.maps.Roadview(roadviewRef.current);
          const rvClient = new kakao.maps.RoadviewClient();
          rvClient.getNearestPanoId(mapCenter, 100, (panoId: any) => rv.setPanoId(panoId, mapCenter));
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [showRoadview, mapCenter]);

  const navItems = [
    { name: '분양정보', link: '/overview', subItems: [{ name: '사업개요', link: '/overview' }, { name: '오시는길', link: '/location' }] },
    { name: '입지환경', link: '/location-map', subItems: [{ name: '광역위치도', link: '/location-map' }, { name: '미래비전', link: '/vision' }] },
    { name: '단지정보', link: '/special-design', subItems: [{ name: '특화설계', link: '/special-design' }, { name: '층별계획', link: '/floor-plan' }] },
    { name: '홍보센터', link: '/site-photos', subItems: [{ name: '현장사진', link: '/site-photos' }] }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans tracking-tight overflow-x-hidden selection:bg-[#E60012] selection:text-white break-keep">
      
      {/* 📱 듀얼 플로팅 상담 바 (모바일 사이즈 최적화) */}
      <div className="fixed bottom-6 md:bottom-8 right-4 md:right-8 z-[100] flex flex-col space-y-3 md:space-y-4">
        <a href="http://pf.kakao.com/_uhZqX/chat" target="_blank" rel="noopener noreferrer" className="w-12 h-12 md:w-16 md:h-16 bg-[#FEE500] rounded-xl md:rounded-2xl shadow-2xl flex flex-col items-center justify-center hover:-translate-y-2 transition-transform duration-300 group">
          <svg className="h-5 w-5 md:h-7 md:w-7 text-[#3c1e1e]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3c-4.97 0-9 3.185-9 7.115 0 2.558 1.712 4.8 4.346 6.136l-.847 3.127c-.123.456.433.805.81.55l3.676-2.431c.33.048.667.073 1.015.073 4.97 0 9-3.185 9-7.115S16.97 3 12 3z"/></svg>
          <span className="text-[8px] md:text-[10px] font-black text-[#3c1e1e] mt-0.5">1:1 채팅</span>
        </a>
        <a href="tel:18003357" className="w-12 h-12 md:w-16 md:h-16 bg-[#E60012] rounded-xl md:rounded-2xl shadow-2xl flex flex-col items-center justify-center hover:-translate-y-2 transition-transform duration-300 animate-bounce-slow">
          <svg className="h-5 w-5 md:h-7 md:w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
          <span className="text-[8px] md:text-[10px] font-black text-white mt-0.5">전화문의</span>
        </a>
      </div>

      {/* 1. 반응형 헤더 */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "bg-[#001a3d]/95 backdrop-blur-md py-3 shadow-md" : "bg-transparent py-4 md:py-6"}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
          <a href="/"><img src="/images/logo.png" alt="로고" className={`transition-all duration-300 ${isScrolled ? "h-8 md:h-10" : "h-10 md:h-12"} brightness-0 invert`} /></a>
          
          {/* PC 네비게이션 */}
          <nav className="hidden lg:flex space-x-12 font-bold text-lg text-white">
            {navItems.map((item) => (
              <div key={item.name} className="relative group py-2">
                <a href={item.link} className="hover:text-[#E60012] transition-colors relative block">
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#E60012] transition-all group-hover:w-full"></span>
                </a>
                {item.subItems.length > 0 && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-32 bg-white rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-slate-100 overflow-hidden">
                    {item.subItems.map((sub) => (<a key={sub.name} href={sub.link} className="block px-4 py-3 text-center text-sm text-slate-700 hover:bg-[#E60012] hover:text-white font-bold transition-colors">{sub.name}</a>))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          
          <div className="flex items-center space-x-3 md:space-x-6">
            <span className={`hidden sm:block font-black text-lg md:text-xl text-white`}>1800-3357</span>
            <a href="/#inquiry" className="bg-[#E60012] text-white px-5 py-2.5 md:px-6 md:py-3 rounded-full font-black hover:bg-red-700 transition-all shadow-lg active:scale-95 text-sm md:text-base">상담예약</a>
            
            {/* ⭐️ 모바일 햄버거 메뉴 버튼 ⭐️ */}
            <button 
              className={`lg:hidden p-1 transition-colors text-white`}
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="메뉴 열기"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* ⭐️ 1-1. 모바일 전용 풀스크린 네비게이션 메뉴 ⭐️ */}
      <div className={`fixed inset-0 z-[200] lg:hidden transition-all duration-500 ease-in-out ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
        {/* 어두운 배경 */}
        <div className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${isMobileMenuOpen ? "opacity-100" : "opacity-0"}`} onClick={() => setIsMobileMenuOpen(false)}></div>
        
        {/* 우측 슬라이드 패널 */}
        <div className={`absolute top-0 right-0 bottom-0 w-[80%] max-w-sm bg-white shadow-2xl flex flex-col transform transition-transform duration-500 ease-out ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
          {/* 패널 헤더 */}
          <div className="flex justify-between items-center p-6 border-b border-slate-100">
            <img src="/images/logo.png" alt="로고" className="h-8 brightness-0" />
            <button onClick={() => setIsMobileMenuOpen(false)} className="text-slate-400 hover:text-[#E60012] p-2 bg-slate-50 rounded-full transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          
          {/* 패널 메뉴 리스트 */}
          <div className="flex-1 overflow-y-auto p-8">
            <div className="flex flex-col space-y-8">
              {navItems.map((item) => (
                <div key={item.name} className="flex flex-col space-y-4">
                  <a href={item.link} className="text-2xl font-black text-[#002855] hover:text-[#E60012] transition-colors inline-block" onClick={() => setIsMobileMenuOpen(false)}>
                    {item.name}
                  </a>
                  {item.subItems.length > 0 && (
                    <div className="flex flex-col pl-4 border-l-4 border-slate-100 space-y-4">
                      {item.subItems.map((sub) => (
                        <a key={sub.name} href={sub.link} className="text-lg font-bold text-slate-500 hover:text-[#E60012] transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                          {sub.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* 패널 푸터 (상담 연결) */}
          <div className="p-8 bg-slate-50 border-t border-slate-100 text-center">
            <p className="text-sm font-bold text-slate-500 mb-2 block">분양상담센터</p>
            <a href="tel:18003357" className="text-3xl font-black text-[#E60012] block">1800-3357</a>
          </div>
        </div>
      </div>

      {/* ⭐️ 2. 최상단 히어로 영역 */}
      <section className="relative h-[50vh] min-h-[400px] md:h-[55vh] md:min-h-[400px] bg-[#001a3d] flex flex-col items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10"><img src="/images/building-1.png" className="w-full h-full object-cover" alt="bg" /></div>
        <div className="relative z-10 px-4 mt-10">
          <span className="text-[#FFD700] font-black tracking-[0.2em] text-xs md:text-sm lg:text-base mb-3 md:mb-4 block uppercase">Location Info</span>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-4 md:mb-6 tracking-tight">오시는 길</h2>
          <div className="w-12 md:w-16 lg:w-20 h-1.5 md:h-2 bg-[#E60012] mx-auto mb-6 md:mb-10 rounded-full"></div>
          <p className="text-base sm:text-lg md:text-2xl text-white font-bold tracking-tight opacity-95">서울특별시 금천구 가산디지털1로 136</p>
        </div>
      </section>

      {/* 3. 본문 콘텐츠 */}
      <main className="py-16 md:py-24 bg-white flex flex-col items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
          
          {/* 지도 박스 (대형 프리미엄 스타일) */}
          <div className="reveal opacity-0 translate-y-12 transition-all duration-1000 ease-out relative w-full h-[400px] sm:h-[500px] md:h-[650px] rounded-[1.5rem] md:rounded-[3.5rem] overflow-hidden shadow-lg md:shadow-[0_40px_100px_rgba(0,0,0,0.1)] border border-slate-100 bg-slate-50 mb-16 md:mb-20 group">
            <div ref={mapRef} className="w-full h-full z-0 group-hover:scale-105 transition-transform duration-[2000ms]"></div>
            
            {/* ⭐️ 지도 위 플로팅 카드 (모바일에서는 위치를 아래로 변경하여 지도를 덜 가리도록 수정) ⭐️ */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 md:top-10 md:bottom-auto md:left-10 md:translate-x-0 z-10 bg-white/95 backdrop-blur-md p-5 md:p-8 rounded-2xl md:rounded-[2rem] shadow-2xl border border-slate-100 w-[90%] md:w-auto md:max-w-xs text-center md:text-left">
              <h4 className="text-[#002855] font-black text-lg md:text-xl mb-1 md:mb-2">가산 3차 SK V1 center</h4>
              <p className="text-slate-500 font-bold text-xs md:text-sm leading-relaxed mb-4 md:mb-6">서울특별시 금천구 가산동 371-36</p>
              <div className="flex gap-2">
                <a href="https://map.kakao.com/link/to/가산3차SKV1,37.4800,126.8833" target="_blank" className="flex-1 bg-[#002855] text-white py-3 rounded-xl text-center text-xs md:text-sm font-black hover:bg-black transition-colors shadow-md">길찾기</a>
                <button onClick={() => setShowRoadview(true)} className="flex-1 bg-[#E60012] text-white py-3 rounded-xl text-center text-xs md:text-sm font-black hover:bg-red-700 transition-colors shadow-md">로드뷰</button>
              </div>
            </div>
          </div>

          {/* 교통 정보 3단 카드 (심플 & 세련) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-20 md:mb-32 reveal opacity-0 translate-y-12 transition-all duration-1000 delay-200 ease-out">
            {[
              { i: "🚇", t: "지하철 이용 시", c: "1·7호선 가산디지털단지역 3번출구에서 도보 약 250m (약 3분 소요)" },
              { i: "🚌", t: "버스 이용 시", c: "가산디지털단지역(중) 정류장 하차 / 지선버스: 5537, 5616, 5712, 5714 등" },
              { i: "🚗", t: "자차 이용 시", c: "네비게이션 '가산 3차 SK V1' 검색 / 서부간선도로, 남부순환로 진출입 용이" }
            ].map((info, idx) => (
              <div key={idx} className="bg-slate-50 p-8 md:p-10 rounded-[1.5rem] md:rounded-[3rem] border border-slate-100 text-center hover:bg-white hover:shadow-2xl transition-all duration-500 group">
                <div className="text-4xl md:text-5xl mb-4 md:mb-6 group-hover:scale-110 transition-transform">{info.i}</div>
                <h4 className="text-xl md:text-2xl font-black text-[#002855] mb-3 md:mb-4">{info.t}</h4>
                <p className="text-slate-500 font-bold leading-relaxed text-sm md:text-base">{info.c}</p>
              </div>
            ))}
          </div>

          {/* 입지 홍보 이미지 섹션 */}
          <div className="flex flex-col items-center gap-10 md:gap-16 reveal opacity-0 translate-y-12 transition-all duration-1000 delay-300 ease-out">
            <div className="text-center mb-2 md:mb-4">
               <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#002855]">압도적 입지의 <span className="text-[#E60012] block sm:inline mt-1 sm:mt-0">완성된 비즈니스</span></h3>
            </div>
            <img src="/images/location-1.png" alt="입지안내" className="w-full max-w-5xl h-auto shadow-md md:shadow-[0_20px_60px_rgba(0,0,0,0.08)] rounded-[1.5rem] md:rounded-[2.5rem] border border-slate-100" />
            <img src="/images/location-2.png" alt="오피스안내" className="w-full max-w-5xl h-auto shadow-md md:shadow-[0_20px_60px_rgba(0,0,0,0.08)] rounded-[1.5rem] md:rounded-[2.5rem] border border-slate-100" />
          </div>

        </div>
      </main>

      {/* 로드뷰 모달 (모바일 환경에 맞게 UI 개선) */}
      {showRoadview && (
        <div className="fixed inset-0 z-[200] bg-[#001a3d]/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
          <div className="w-full max-w-6xl h-[70vh] md:h-[80vh] bg-white rounded-[1.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl relative flex flex-col">
            <div className="h-14 md:h-16 bg-[#001a3d] flex items-center justify-between px-6 md:px-10 shrink-0">
              <span className="text-white font-black text-sm md:text-base">가산 3차 SK V1 로드뷰</span>
              <button onClick={() => setShowRoadview(false)} className="text-white font-black hover:text-[#E60012] text-sm md:text-base">CLOSE ✕</button>
            </div>
            <div ref={roadviewRef} className="flex-1 bg-slate-100 w-full h-full"></div>
          </div>
        </div>
      )}

      {/* 4. 푸터 (단어 단위 줄바꿈 유지, 모바일 여백 조절) */}
      <footer className="bg-black py-12 md:py-20 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center">
          <img src="/images/logo.png" className="h-8 md:h-10 mb-8 md:mb-10 brightness-0 invert opacity-40" alt="logo" />
          
          <div className="text-slate-400 text-xs sm:text-sm md:text-base font-medium mb-6 md:mb-8 leading-relaxed">
            <p className="mb-1 md:mb-2">가산 3차 SK V1 센터 | 지식산업센터 | 분양 홍보관</p>
            <p className="mb-1 md:mb-2">상호: 케이케이솔루션 | 사업자번호: 135-31-54956 | 관리자: 김기강</p>
            <p className="mt-2 md:mt-0">분양문의 : <span className="text-white font-black text-base md:text-lg ml-1">1800-3357</span></p>
          </div>

          <div className="w-full max-w-2xl h-px bg-slate-800 mb-6 md:mb-10"></div>
          
          <p className="text-[10px] sm:text-xs text-slate-500 max-w-2xl leading-relaxed mb-6 px-4 italic">
            ※ 본 홈페이지의 이미지는 이해를 돕기 위한 컷으로 실제 시공 시 차이가 있을 수 있습니다. <br className="hidden sm:block"/>
            모든 정보는 홍보관을 통해 최종 확인하시기 바랍니다.
          </p>
          
          <p className="text-[10px] sm:text-sm font-bold text-slate-400 uppercase tracking-widest">© 2026 GASAN 3rd SK V1 CENTER. All rights reserved.</p>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fade-in-up 1.2s ease-out forwards; }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
}