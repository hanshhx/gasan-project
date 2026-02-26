"use client";

import React, { useEffect, useState } from "react";

export default function FloorPlan() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("upper"); 
  const [selectedFloor, setSelectedFloor] = useState("지상3층(업무시설)");
  
  // ⭐️ 모바일 메뉴 열림/닫힘 상태 추가
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 1. 사진 속 괄호 설명(지산, 상가, 업무시설)을 완벽히 반영한 데이터
  const floorData: { [key: string]: { name: string; file: string }[] } = {
    basement: [
      { name: "지하1층", file: "지하1층-1.png" },
      { name: "지하2층", file: "지하2층-1.png" },
      { name: "지하3층", file: "지하3층-1.png" },
      { name: "지하4층", file: "지하4층-1.png" },
      { name: "지하5층", file: "지하5층-2.png" },
    ],
    lower: [
      { name: "지상1층(상가)", file: "1층-2.png" },
      { name: "지상2층(업무시설)", file: "2층-2-768x432.png" },
    ],
    upper: [
      { name: "지상3층(업무시설)", file: "3층-2.png" }, 
      { name: "지상4층(지산)", file: "4층-3.png" },
      { name: "지상5층(지산)", file: "5층-2.png" }, 
      { name: "지상6층(지산)", file: "6층-3.png" },
      { name: "지상7층(지산)", file: "7층-3.png" }, 
      { name: "지상8층(지산)", file: "8층-3.png" },
      { name: "지상9층(지산)", file: "9층-3.png" }, 
      { name: "지상10층(지산)", file: "10층-2.png" },
      { name: "지상11층(지산)", file: "11층-3.png" }, 
      { name: "지상12층(지산)", file: "12층-3.png" },
      { name: "지상13층(지산)", file: "13층-2.png" }, 
      { name: "지상14층(지산)", file: "14층-2.png" }, 
      { name: "지상15층(지산)", file: "15층-2-768x432.png" },
      { name: "지상16층(지산)", file: "16층-2.png" }, 
      { name: "지상17층(지산)", file: "17층-2.png" },
      { name: "지상18층(지산)", file: "18층-2.png" }, 
      { name: "지상19층(지산)", file: "19층-2.png" },
      { name: "지상20층(업무시설)", file: "20층-2.png" },
    ]
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: '분양정보', link: '/overview', subItems: [{ name: '사업개요', link: '/overview' }, { name: '오시는길', link: '/location' }] },
    { name: '입지환경', link: '/location-map', subItems: [{ name: '광역위치도', link: '/location-map' }, { name: '미래비전', link: '/vision' }] },
    { name: '단지정보', link: '/special-design', subItems: [{ name: '특화설계', link: '/special-design' }, { name: '층별계획', link: '/floor-plan' }] },
    { name: '홍보센터', link: '/site-photos', subItems: [{ name: '현장사진', link: '/site-photos' }] }
  ];

  const currentImg = [...floorData.basement, ...floorData.lower, ...floorData.upper].find(f => f.name === selectedFloor)?.file || "3층-2.png";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans tracking-tight overflow-x-hidden selection:bg-[#E60012] selection:text-white break-keep">

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
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "bg-white/95 backdrop-blur-md py-3 shadow-md" : "bg-transparent py-4 md:py-6"}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
          <a href="/"><img src="/images/logo.png" alt="로고" className={`transition-all duration-300 ${isScrolled ? "h-8 md:h-10" : "h-10 md:h-12"} brightness-0 invert`} /></a>
          
          {/* PC 네비게이션 */}
          <nav className={`hidden lg:flex space-x-12 font-bold text-lg ${isScrolled ? "text-slate-700" : "text-white"}`}>
            {navItems.map((item) => (
              <div key={item.name} className="relative group py-2">
                <a href={item.link} className="hover:text-[#E60012] transition-colors relative block">
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#E60012] transition-all group-hover:w-full"></span>
                </a>
                {item.subItems.length > 0 && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-32 bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 overflow-hidden border border-slate-100">
                    {item.subItems.map((sub) => (<a key={sub.name} href={sub.link} className="block px-4 py-3 text-center text-sm text-slate-700 hover:bg-[#E60012] hover:text-white font-bold transition-colors">{sub.name}</a>))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          
          <div className="flex items-center space-x-3 md:space-x-6">
            <span className={`hidden sm:block font-black text-lg md:text-xl ${isScrolled ? "text-[#002855]" : "text-white"}`}>1800-3357</span>
            <a href="/#inquiry" className="bg-[#E60012] text-white px-5 py-2.5 md:px-6 md:py-3 rounded-full font-black hover:bg-red-700 transition-all shadow-lg active:scale-95 text-sm md:text-base">상담예약</a>
            
            {/* ⭐️ 모바일 햄버거 메뉴 버튼 ⭐️ */}
            <button 
              className={`lg:hidden p-1 transition-colors ${isScrolled ? "text-[#002855]" : "text-white"}`}
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

      {/* 2. 상단 타이틀 */}
      <section className="relative pt-32 md:pt-40 pb-16 md:pb-20 bg-[#002855] text-center overflow-hidden px-4">
        <div className="absolute inset-0 bg-[url('/images/building-1.png')] bg-cover bg-center opacity-10 blur-sm scale-110"></div>
        <div className="relative z-10">
          <span className="text-[#FFD700] font-black tracking-widest text-xs md:text-sm mb-3 md:mb-4 block uppercase md:tracking-[0.3em]">Architecture Plan</span>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4 md:mb-6 tracking-tight">층별계획</h2>
          <div className="w-12 md:w-16 h-1 bg-[#E60012] mx-auto rounded-full"></div>
        </div>
      </section>

      {/* 3. 본문 영역 */}
      <main className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          {/* 카테고리 탭 (모바일 대응 여백/폰트 조절) */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 md:mb-12">
            {[
              { id: 'upper', label: '지상층 (3F~20F)' },
              { id: 'lower', label: '저층부 (1F~2F)' },
              { id: 'basement', label: '지하층 (B1~B5)' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  const firstFloorOfTab = floorData[tab.id][0].name;
                  setSelectedFloor(firstFloorOfTab);
                }}
                className={`px-4 py-2.5 sm:px-6 md:px-10 md:py-4 rounded-xl md:rounded-2xl font-black text-sm sm:text-base md:text-lg transition-all duration-300 ${activeTab === tab.id ? 'bg-[#002855] text-white shadow-xl scale-105' : 'bg-white text-slate-400 hover:text-slate-600'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* ⭐️ 층별 버튼 영역 (모바일 대응 여백/폰트 조절) */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 md:mb-16 bg-white p-4 sm:p-6 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-slate-100">
            {floorData[activeTab].map(floor => (
              <button
                key={floor.name}
                onClick={() => setSelectedFloor(floor.name)}
                className={`px-3 md:px-4 h-10 sm:h-12 md:h-16 rounded-lg md:rounded-xl font-bold text-xs sm:text-sm md:text-base transition-all flex items-center justify-center border-2 ${selectedFloor === floor.name ? 'border-[#E60012] bg-[#E60012] text-white shadow-md md:shadow-lg -translate-y-1' : 'border-slate-50 bg-slate-50 text-slate-500 hover:border-slate-200 hover:text-slate-700'}`}
              >
                {floor.name}
              </button>
            ))}
          </div>

          {/* 도면 디스플레이 (모바일 패딩/높이 최적화) */}
          <div className="relative w-full max-w-6xl mx-auto bg-white rounded-[2rem] md:rounded-[3.5rem] shadow-lg md:shadow-[0_50px_100px_rgba(0,0,0,0.08)] border border-slate-100 overflow-hidden group">
            {/* 현재 층 배지 */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-10 md:left-10 z-10 bg-[#002855] text-white px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl font-black text-sm sm:text-xl md:text-2xl shadow-xl">
              {selectedFloor}
            </div>
            
            <div className="p-4 sm:p-10 md:p-20 flex justify-center items-center min-h-[300px] sm:min-h-[400px] md:min-h-[600px] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat">
              <img 
                key={selectedFloor} 
                src={`/images/${currentImg}`} 
                alt={`${selectedFloor} floor plan`}
                className="w-full h-auto object-contain max-h-[400px] md:max-h-[850px] animate-floor-fade drop-shadow-2xl"
              />
            </div>

            {/* 도면 하단 설명 */}
            <div className="bg-slate-900 py-6 px-6 md:py-8 md:px-10 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-slate-400 font-bold flex items-center italic text-xs md:text-sm text-center md:text-left">
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#E60012] rounded-full mr-2 md:mr-3 shrink-0"></span>
                본 도면은 소비자의 이해를 돕기 위한 이미지컷으로 실제와 차이가 있을 수 있습니다.
              </p>
              <div className="bg-white/10 px-4 py-2 md:px-6 md:py-2 rounded-full text-slate-300 text-xs md:text-sm font-bold border border-white/10 shrink-0">
                문의 : 1800-3357
              </div>
            </div>
          </div>

        </div>
      </main>

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
        @keyframes floor-fade {
          from { opacity: 0; transform: scale(0.97) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-floor-fade { animation: floor-fade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
}