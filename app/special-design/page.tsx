"use client";

import React, { useEffect, useState } from "react";

export default function SpecialDesign() {
  const [isScrolled, setIsScrolled] = useState(false);
  // ⭐️ 모바일 메뉴 열림/닫힘 상태 추가
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 1. 스크롤 시 헤더 디자인 변경
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. 스크롤 애니메이션 (부드럽게 스르륵 나타나는 효과)
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

      {/* 2. 타이틀 영역 */}
      <section className="relative pt-32 md:pt-40 pb-16 md:pb-20 bg-[#00152e] flex flex-col items-center justify-center overflow-hidden text-center px-4">
        <div className="absolute inset-0 bg-[url('/images/building-1.png')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="relative z-10 reveal opacity-0 translate-y-12 transition-all duration-1000 ease-out">
          <span className="text-[#FFD700] font-black tracking-widest text-xs md:text-sm mb-3 md:mb-4 block uppercase">Specialized Design</span>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4 md:mb-6 tracking-tight">특화설계</h2>
          <div className="w-12 md:w-16 h-1 md:h-1.5 bg-[#E60012] mx-auto rounded-full mb-4 md:mb-6"></div>
          <p className="text-base md:text-xl text-slate-300 font-medium max-w-2xl px-4 leading-relaxed">
            가산 3차 SK V1 center만의 압도적인 디테일<br className="hidden sm:block"/>
            성공적인 비즈니스를 위한 완벽한 공간을 설계합니다
          </p>
        </div>
      </section>

      {/* 3. 특화설계 본문 (고급 갤러리 UI 적용) */}
      <main className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center gap-16 md:gap-24">
          
          {/* 섹션 1: 실용성과 하이엔드 (design-1.png) */}
          <div className="w-full flex flex-col items-center reveal opacity-0 translate-y-12 transition-all duration-1000 ease-out">
            <div className="text-center mb-6 md:mb-8">
              <span className="text-[#E60012] font-black tracking-widest text-xs md:text-sm mb-2 block uppercase">Detail 01</span>
              <h3 className="text-2xl md:text-3xl font-black text-[#002855]">프라임 오피스의 <span className="text-[#E60012]">혁신적 공간</span></h3>
            </div>
            {/* ⭐️ 사진 오버플로우 방지 및 호버 시네마틱 줌 효과 ⭐️ */}
            <div className="w-full rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-lg md:shadow-[0_20px_60px_rgba(0,0,0,0.08)] bg-white border border-slate-100 group">
              <img 
                src="/images/design-1.png" 
                alt="프라임 오피스 장점" 
                className="w-full h-auto object-contain transform md:group-hover:scale-105 transition-transform duration-700 ease-in-out" 
              />
            </div>
          </div>

          {/* 섹션 2: 철저한 보안과 속도 (design-2.png) */}
          <div className="w-full flex flex-col items-center reveal opacity-0 translate-y-12 transition-all duration-1000 delay-200 ease-out">
            <div className="text-center mb-6 md:mb-8">
              <span className="text-[#E60012] font-black tracking-widest text-xs md:text-sm mb-2 block uppercase">Detail 02</span>
              <h3 className="text-2xl md:text-3xl font-black text-[#002855]">완벽한 통제, <span className="text-[#E60012]">압도적인 이동 속도</span></h3>
            </div>
            <div className="w-full rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-lg md:shadow-[0_20px_60px_rgba(0,0,0,0.08)] bg-black border border-slate-800 group">
              <img 
                src="/images/design-2.png" 
                alt="보안 및 고속 승강기" 
                className="w-full h-auto object-contain opacity-90 md:group-hover:opacity-100 transform md:group-hover:scale-105 transition-all duration-700 ease-in-out" 
              />
            </div>
          </div>

          {/* 섹션 3: 임직원 만족도 (design-3.png) */}
          <div className="w-full flex flex-col items-center reveal opacity-0 translate-y-12 transition-all duration-1000 delay-200 ease-out">
            <div className="text-center mb-6 md:mb-8">
              <span className="text-[#E60012] font-black tracking-widest text-xs md:text-sm mb-2 block uppercase">Detail 03</span>
              <h3 className="text-2xl md:text-3xl font-black text-[#002855]">임직원의 <span className="text-[#E60012]">자부심이 되는 부대시설</span></h3>
            </div>
            <div className="w-full rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-lg md:shadow-[0_20px_60px_rgba(0,0,0,0.08)] bg-white border border-slate-100 group">
              <img 
                src="/images/design-3.png" 
                alt="임직원 만족도 부대시설" 
                className="w-full h-auto object-contain transform md:group-hover:scale-105 transition-transform duration-700 ease-in-out" 
              />
            </div>
          </div>

          {/* 하단 브랜드 요약 배너 */}
          <div className="w-full bg-[#002855] rounded-[2rem] md:rounded-[3rem] p-8 sm:p-12 md:p-16 mt-4 md:mt-10 text-center shadow-2xl relative overflow-hidden reveal opacity-0 translate-y-12 transition-all duration-1000 ease-out">
            <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-[#E60012] rounded-full filter blur-[80px] md:blur-[100px] opacity-30"></div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight mb-4 md:mb-6 relative z-10">
              기업의 가치를 높이는 <span className="text-[#FFD700] block sm:inline mt-2 sm:mt-0">가산 3차 SK V1 center</span>
            </h3>
            <div className="w-12 md:w-16 h-1 bg-[#E60012] mx-auto mb-4 md:mb-6 rounded-full relative z-10"></div>
            <p className="text-base sm:text-lg md:text-xl text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed relative z-10 px-2">
              디테일이 성공의 크기를 결정합니다. 실입주 기업의 다양한 니즈를 완벽하게 충족시키는 최상의 업무 환경을 직접 확인해 보세요.
            </p>
          </div>

        </div>
      </main>

      {/* 4. 푸터 (단어 단위 줄바꿈 유지, 모바일 여백 조절) */}
      <footer className="bg-black py-12 md:py-20 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center reveal opacity-0 translate-y-12 transition-all duration-1000 ease-out">
          <img src="/images/logo.png" className="h-8 md:h-10 mb-8 md:mb-10 brightness-0 invert opacity-40" />
          
          <div className="text-slate-400 text-xs sm:text-sm md:text-base font-medium mb-6 md:mb-8 leading-relaxed">
            <p className="mb-1 md:mb-2">가산 3차 SK V1 센터 | 지식산업센터 | 분양 홍보관</p>
            <p className="mb-1 md:mb-2">상호: 케이케이솔루션 | 사업자번호: 135-31-54956 | 관리자: 김기강</p>
            <p className="mt-2 md:mt-0">분양문의 : <span className="text-white font-black text-base md:text-lg ml-1">1800-3357</span></p>
          </div>

          <div className="w-full max-w-2xl h-px bg-slate-800 mb-6 md:mb-10"></div>
          
          <p className="text-[10px] sm:text-xs text-slate-500 max-w-2xl leading-relaxed mb-6 px-4">
            본 홈페이지의 이미지는 이해를 돕기 위한 컷으로 실제와 차이가 있을 수 있습니다. 모든 정보는 분양 홍보관을 통해 다시 한번 확인하시기 바랍니다.
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