"use client";

import React, { useEffect, useState } from "react";

export default function SitePhotos() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  
  // ⭐️ 모바일 메뉴 열림/닫힘 상태 추가
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 14장의 현장 사진 데이터
  const photos = [
    { src: "건물외관-21800-1-1536x1536.jpg", title: "건물 외관" },
    { src: "현장사진-로비11800-1536x1536.jpg", title: "메인 로비" },
    { src: "현장사진-로비31800-1536x1536.jpg", title: "로비 라운지" },
    { src: "현장사진-휴게공간21800-1536x1536.jpg", title: "오픈형 휴게소" },
    { src: "호실내부-51800-1-1536x1536.jpg", title: "전용 오피스 내부" },
    { src: "호실내부-21800-1536x1536.jpg", title: "사무실 조망" },
    { src: "호실내부-11800-1536x1536.jpg", title: "내부 시설 제어" },
    { src: "엘리베이트-11800-1536x1536.jpg", title: "엘리베이터 홀" },
    { src: "복도-11800-1536x1536.jpg", title: "공용 복도" },
    { src: "현장사진-보안게이트1800-1536x1536.jpg", title: "출입 보안 게이트" },
    { src: "현장사진-보안게이트11800-1536x1536.jpg", title: "보안 시스템" },
    { src: "현장사진-보안자동문1800-1536x1536.jpg", title: "전층 보안 자동문" },
    { src: "차량진출입로-11800-1536x1536.jpg", title: "차량 진출입로" },
    { src: "주차장-11800-1536x1536.jpg", title: "광폭 주차 공간" },
  ];

  const navItems = [
    { name: '분양정보', link: '/overview', subItems: [{ name: '사업개요', link: '/overview' }, { name: '오시는길', link: '/location' }] },
    { name: '입지환경', link: '/location-map', subItems: [{ name: '광역위치도', link: '/location-map' }, { name: '미래비전', link: '/vision' }] },
    { name: '단지정보', link: '/special-design', subItems: [{ name: '특화설계', link: '/special-design' }, { name: '층별계획', link: '/floor-plan' }] },
    { name: '홍보센터', link: '/site-photos', subItems: [{ name: '현장사진', link: '/site-photos' }] }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans tracking-tight break-keep">

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
      <section className="relative pt-32 md:pt-40 pb-16 md:pb-20 bg-[#002855] text-center overflow-hidden px-4">
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <div className="absolute inset-0 bg-[url('/images/건물외관-21800-1-1536x1536.jpg')] bg-cover bg-center scale-110 blur-[2px]"></div>
        <div className="relative z-20">
          <span className="text-[#FFD700] font-black tracking-widest text-xs md:text-sm mb-3 md:mb-4 block uppercase">Gallery</span>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4 md:mb-6 tracking-tight">현장사진</h2>
          <div className="w-12 md:w-16 h-1 md:h-1.5 bg-[#E60012] mx-auto rounded-full"></div>
          <p className="text-white/90 font-medium mt-4 md:mt-6 text-base md:text-lg">가산 3차 SK V1 center의 완성된 가치를 확인하세요</p>
        </div>
      </section>

      {/* 3. 갤러리 그리드 */}
      <main className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* 1단(모바일) -> 2단(태블릿) -> 3단(PC) 그리드 반응형 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {photos.map((photo, index) => (
              <div 
                key={index} 
                className="group relative bg-white rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-md md:shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-slate-100"
                onClick={() => setSelectedImg(photo.src)}
              >
                <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                  <img 
                    src={`/images/${photo.src}`} 
                    alt={photo.title}
                    className="w-full h-full object-cover transform md:group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                <div className="p-5 md:p-6">
                  <h3 className="text-lg md:text-xl font-black text-[#002855]">{photo.title}</h3>
                  <p className="text-slate-400 text-xs md:text-sm mt-1 font-bold">Gasan 3rd SK V1 Center</p>
                </div>
                {/* 호버 시 나타나는 돋보기 아이콘 (PC에서만 호버 효과 적용) */}
                <div className="hidden md:flex absolute inset-0 bg-[#002855]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 items-center justify-center">
                   <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                     <svg className="w-8 h-8 text-[#E60012]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* 4. 사진 크게보기 모달 (라이트박스 - 모바일 닫기 버튼 최적화) */}
      {selectedImg && (
        <div className="fixed inset-0 z-[300] bg-black/95 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-10 animate-fade-in" onClick={() => setSelectedImg(null)}>
          <button 
            className="absolute top-4 right-4 md:top-8 md:right-8 text-white/70 hover:text-[#E60012] transition-colors z-[310] bg-black/50 md:bg-transparent rounded-full p-2 md:p-0"
            onClick={(e) => { e.stopPropagation(); setSelectedImg(null); }}
          >
            <svg className="w-8 h-8 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
          <div className="relative max-w-6xl w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <img 
              src={`/images/${selectedImg}`} 
              alt="확대 사진" 
              className="max-w-full max-h-[90vh] object-contain rounded-lg md:rounded-xl shadow-2xl animate-scale-up"
            />
          </div>
        </div>
      )}

      {/* 5. 푸터 (최신 정보 및 모바일 여백 적용) */}
      <footer className="bg-black py-12 md:py-20 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center">
          <img src="/images/logo.png" className="h-8 md:h-10 mb-8 md:mb-10 brightness-0 invert opacity-40" alt="logo" />
          
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
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scale-up { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        .animate-scale-up { animation: scale-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
}