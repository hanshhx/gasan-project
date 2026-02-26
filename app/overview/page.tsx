"use client";

import React, { useEffect, useState } from "react";

export default function Overview() {
  const [isScrolled, setIsScrolled] = useState(false);
  // ⭐️ 모바일 메뉴 열림/닫힘 상태 추가
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
                <a href={item.link} className="hover:text-[#E60012] transition-colors relative block">{item.name}<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#E60012] transition-all group-hover:w-full"></span></a>
                {item.subItems.length > 0 && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-32 bg-white rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-slate-100 overflow-hidden">
                    {item.subItems.map((sub) => (<a key={sub.name} href={sub.link} className="block px-4 py-3 text-center text-sm text-slate-700 hover:bg-[#E60012] hover:text-white font-bold transition-colors">{sub.name}</a>))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          
          <div className="flex items-center space-x-3 md:space-x-6">
            <span className="hidden sm:block font-black text-lg md:text-xl text-white">1800-3357</span>
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

      {/* 2. 최상단 히어로 영역 */}
      <section className="relative h-[50vh] min-h-[400px] md:h-[55vh] md:min-h-[400px] bg-[#001a3d] flex flex-col items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10"><img src="/images/building-1.png" className="w-full h-full object-cover" alt="bg" /></div>
        <div className="relative z-10 px-4 mt-10">
          <span className="text-[#FFD700] font-black tracking-[0.2em] text-xs md:text-sm lg:text-base mb-3 md:mb-4 block uppercase">Project Information</span>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-4 md:mb-6 tracking-tight">사업개요</h2>
          <div className="w-12 md:w-16 lg:w-20 h-1.5 md:h-2 bg-[#E60012] mx-auto mb-6 md:mb-10 rounded-full"></div>
          <p className="text-base sm:text-lg md:text-2xl text-white font-bold tracking-tight opacity-95">비즈니스의 압도적 가치, 성공을 향한 최적의 비즈니스 플랫폼</p>
        </div>
      </section>

      {/* 3. 본문 메인 콘텐츠 (이미지 섹션 먼저 배치) */}
      <main className="py-16 md:py-24 bg-white flex flex-col items-center">
        
        {/* 중앙 이미지 섹션 */}
        <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 reveal opacity-0 translate-y-12 transition-all duration-1000 ease-out flex flex-col items-center gap-10 md:gap-16 mb-20 md:mb-32">
          <img src="/images/overview-1.png" alt="사업개요 이미지 1" className="w-full h-auto object-contain shadow-md md:shadow-sm rounded-[1.5rem] md:rounded-3xl" />
          <img src="/images/overview-2.png" alt="사업개요 이미지 2" className="w-full h-auto object-contain shadow-md md:shadow-sm rounded-[1.5rem] md:rounded-3xl" />
        </div>

        {/* ⭐️ 4. 하단 상세 텍스트 섹션 ⭐️ */}
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 reveal opacity-0 translate-y-12 transition-all duration-1000 delay-200 ease-out">
          
          {/* 상단 텍스트 설명 */}
          <div className="text-center md:text-left mb-12 md:mb-20">
             <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-[#002855] leading-tight md:leading-tight mb-6 md:mb-8 inline-block border-l-[6px] md:border-l-[10px] border-[#E60012] pl-4 md:pl-6 text-left">
                지식산업센터를 중심으로 업무시설, 상업시설이 들어서는 <br className="hidden md:block" />
                실입주 기업을 위한 <span className="text-[#E60012]">복합 지식산업센터</span>
             </h3>
             <p className="text-base sm:text-lg md:text-xl text-slate-600 font-bold leading-relaxed max-w-4xl text-left md:ml-4">
                서울 금천구 가산디지털1로 136에 위치하며, <br className="hidden sm:block md:hidden" />
                가산디지털단지 핵심 업무권역에 자리해 IT·제조·연구·벤처기업의 집적 효과를 누릴 수 있습니다.
             </p>
          </div>
          
          {/* 하단 카드 포인트 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16 md:mb-24">
            
            {/* 포인트 1: 대규모 프로젝트 */}
            <div className="bg-slate-50 p-8 sm:p-10 md:p-12 rounded-[1.5rem] md:rounded-[2.5rem] border border-slate-100 hover:bg-white hover:shadow-2xl transition-all duration-300">
              <div className="text-4xl md:text-5xl mb-6 md:mb-8">🏢</div>
              <h4 className="text-xl md:text-2xl font-black text-[#002855] mb-4 md:mb-6">대규모 프로젝트</h4>
              <p className="text-slate-500 font-bold leading-relaxed text-sm md:text-lg">
                2개동 지하 5층부터 지상 20층까지 구성된 대규모 프로젝트로, <br className="hidden xl:block"/>
                업무·연구·지원 기능이 효율적으로 배치되어 실입주 기업 중심의 안정적인 업무 환경을 제공합니다.
              </p>
            </div>

            {/* 포인트 2: 유연한 공간 활용 */}
            <div className="bg-slate-50 p-8 sm:p-10 md:p-12 rounded-[1.5rem] md:rounded-[2.5rem] border border-slate-100 hover:bg-white hover:shadow-2xl transition-all duration-300">
              <div className="text-4xl md:text-5xl mb-6 md:mb-8">📐</div>
              <h4 className="text-xl md:text-2xl font-black text-[#002855] mb-4 md:mb-6">유연한 공간 활용</h4>
              <p className="text-slate-500 font-bold leading-relaxed text-sm md:text-lg">
                연면적 약 1만7천평 규모로 계획되어 소형부터 중·대형까지 다양한 면적 선택이 가능하며, <br className="hidden xl:block"/>
                기업 규모와 성장 단계에 맞춘 유연한 공간 활용이 가능합니다.
              </p>
            </div>

            {/* 포인트 3: 실사용 가치 극대화 (가로로 긴 카드) */}
            <div className="bg-slate-50 p-8 sm:p-10 md:p-12 rounded-[1.5rem] md:rounded-[2.5rem] border border-slate-100 hover:bg-white hover:shadow-2xl transition-all duration-300 md:col-span-2">
              <div className="text-4xl md:text-5xl mb-6 md:mb-8">🚗</div>
              <h4 className="text-xl md:text-2xl font-black text-[#002855] mb-4 md:mb-6">실사용 가치 극대화</h4>
              <p className="text-slate-500 font-bold leading-relaxed text-sm md:text-lg">
                또한 효율적인 평면 구성과 넉넉한 주차 계획을 통해 <br className="hidden xl:block"/>
                업무 동선과 직원 편의성을 함께 고려한 실사용 가치를 높였습니다.
              </p>
            </div>

          </div>

          {/* 최종 브랜드 메시지 */}
          <div className="bg-[#002855] rounded-[2rem] md:rounded-[3.5rem] p-8 sm:p-12 md:p-20 text-center shadow-2xl relative overflow-hidden transform md:hover:scale-[1.01] transition-transform duration-500">
            <div className="absolute inset-0 bg-[url('/images/building-1.png')] bg-cover bg-center opacity-10 blur-sm"></div>
            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight mb-4 md:mb-8">
                비즈니스의 미래를 바꾸는 최상의 선택 <br/>
                <span className="text-[#FFD700] block mt-2 sm:inline sm:mt-0">가산 3차 SK V1 center</span>
              </h3>
              <div className="w-12 md:w-16 h-1 bg-[#E60012] mx-auto mb-4 md:mb-8 rounded-full"></div>
              <p className="text-sm sm:text-base md:text-xl text-slate-300 font-medium max-w-4xl mx-auto leading-relaxed px-2">
                가산 3차 SK V1 센터는 SK V1 브랜드의 신뢰도와 가산디지털단지의 입지 경쟁력을 바탕으로, <br className="hidden lg:block"/>
                기업의 현재와 미래 성장을 동시에 지원하는 핵심 비즈니스 거점을 지향합니다.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* 5. 푸터 */}
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
            ※ 본 홈페이지의 이미지는 소비자의 이해를 돕기 위한 컷으로 실제 시공 시 차이가 있을 수 있습니다. <br className="hidden sm:block"/>
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