"use client";

import React, { useRef, useEffect, useState } from "react";

export default function Home() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAd, setShowAd] = useState(false);
  
  // ⭐️ 모바일 메뉴 열림/닫힘 상태 추가
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 메인 슬라이더 이미지 인덱스 상태
  const [bgIndex, setBgIndex] = useState(0);
  const heroImages = [
    "/images/hero-6.jpg",
    "/images/hero-4.jpg",
    "/images/hero-5.jpg"
  ];

  // 4.5초마다 배경 이미지 자동 전환
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % heroImages.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
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

  useEffect(() => {
    const timer = setTimeout(() => setShowAd(true), 2500); 
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(formRef.current!);
    
    formData.append("access_key", "257d3b0d-8f67-491b-ab80-e6009aa1fced"); 
    formData.append("subject", "🚨 [가산3차 SK V1] 새로운 관심고객 상담 신청이 접수되었습니다!");
    formData.append("from_name", "가산3차 SK V1 웹사이트");
    formData.append("title", "✨ 신규 VIP 관심고객 상담 신청이 도착했습니다.");
    formData.append("template", "box"); 

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: json
      });
      const result = await res.json();
      if (result.success) {
        alert("✅ 상담 신청이 성공적으로 접수되었습니다!\n담당 전문가가 내용을 확인 후 신속하게 연락드리겠습니다.");
        formRef.current?.reset(); 
        setShowAd(false);
      } else alert("❌ 전송에 실패했습니다. 다시 시도해 주세요.");
    } catch (error) {
      alert("❌ 통신 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    }
  };

  const navItems = [
    { name: '분양정보', link: '/overview', subItems: [{ name: '사업개요', link: '/overview' }, { name: '오시는길', link: '/location' }] },
    { name: '입지환경', link: '/location-map', subItems: [{ name: '광역위치도', link: '/location-map' }, { name: '미래비전', link: '/vision' }] },
    { name: '단지정보', link: '/special-design', subItems: [{ name: '특화설계', link: '/special-design' }, { name: '층별계획', link: '/floor-plan' }] },
    { name: '홍보센터', link: '/site-photos', subItems: [{ name: '현장사진', link: '/site-photos' }] }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans tracking-tight overflow-x-hidden selection:bg-[#E60012] selection:text-white relative break-keep">
      
      {/* 🎁 팝업/플로팅 요소 */}
      <div className={`fixed bottom-6 md:bottom-8 left-4 md:left-8 z-[110] w-[calc(100%-5.5rem)] sm:w-80 md:w-96 bg-white rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.3)] border border-slate-200 overflow-hidden transition-all duration-1000 ease-out transform ${showAd ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0 pointer-events-none"}`}>
        <button onClick={() => setShowAd(false)} className="absolute top-3 right-3 z-10 bg-black/40 hover:bg-black/70 text-white p-1.5 rounded-full backdrop-blur-sm transition-colors">
          <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        <div className="w-full bg-slate-100"><img src="/images/popup.png" alt="특별할인" className="w-full h-auto object-contain" /></div>
        <div className="p-3 md:p-4 bg-white border-t border-slate-100">
          <a href="#inquiry" onClick={() => setShowAd(false)} className="block w-full text-center bg-gradient-to-r from-[#E60012] to-[#FF4E50] text-white font-black py-3 md:py-3.5 rounded-xl hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-300 text-sm md:text-base">특별 혜택 상담 신청하기</a>
        </div>
      </div>

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

      {/* 1. 헤더 */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "bg-white/95 backdrop-blur-md py-3 shadow-md" : "bg-transparent py-4 md:py-6"}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
          <a href="/"><img src="/images/logo.png" alt="로고" className={`transition-all duration-300 ${isScrolled ? "h-8 md:h-10" : "h-10 md:h-12"} brightness-0 invert`} /></a>
          
          <nav className={`hidden lg:flex space-x-12 font-bold text-lg ${isScrolled ? "text-slate-700" : "text-white"}`}>
            {navItems.map((item) => (
              <div key={item.name} className="relative group py-2">
                <a href={item.link} className="hover:text-[#E60012] transition-colors relative block">
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#E60012] transition-all group-hover:w-full"></span>
                </a>
                {item.subItems.length > 0 && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-32 bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 overflow-hidden border border-slate-100">
                    {item.subItems.map((sub) => (
                      <a key={sub.name} href={sub.link} className="block px-4 py-3 text-center text-sm text-slate-700 hover:bg-[#E60012] hover:text-white font-bold transition-colors">{sub.name}</a>
                    ))}
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

      {/* 2. 메인 시그니처 */}
      <section className="relative h-[100dvh] flex items-center justify-center overflow-hidden bg-[#00152e]">
        <div className="absolute inset-0">
          {heroImages.map((src, idx) => (
            <div 
              key={idx}
              className={`absolute inset-0 transition-all duration-[2000ms] ease-in-out ${idx === bgIndex ? "opacity-100 scale-105" : "opacity-0 scale-100"}`}
            >
              <img src={src} alt="Main Visual" className="w-full h-full object-cover opacity-60" />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-[#00152e]/90 md:bg-gradient-to-b md:from-black/70 md:via-transparent md:to-[#00152e]/90"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4 mt-16 md:mt-20 w-full max-w-5xl">
          <span className="inline-block px-4 py-1.5 md:px-6 md:py-2 bg-[#E60012] rounded-full text-[11px] sm:text-xs md:text-sm font-black tracking-widest mb-6 md:mb-8 animate-fade-in-up shadow-[0_0_20px_rgba(230,0,18,0.5)]">
            즉시입주 가능 · 역세권 지식산업센터
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black mb-6 md:mb-8 leading-[1.1] md:leading-tight animate-fade-in-up delay-100 tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#FFA500]">대폭할인</span> 분양
          </h1>
          <p className="text-lg sm:text-xl md:text-3xl font-bold text-slate-100 mb-10 md:mb-12 max-w-3xl mx-auto animate-fade-in-up delay-200 leading-snug">
            전용 10평 ~ 1천평 이상 대형호실 가능
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-6 animate-fade-in-up delay-300 w-full px-4 sm:px-0">
            <a href="#inquiry" className="bg-[#E60012] text-white px-6 py-4 md:px-10 md:py-5 rounded-xl md:rounded-2xl font-black text-base md:text-xl shadow-xl hover:-translate-y-1 transition-transform text-center w-full sm:w-auto">할인분양 조건확인</a>
            <a href="#단지정보" className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-6 py-4 md:px-10 md:py-5 rounded-xl md:rounded-2xl font-black text-base md:text-xl hover:bg-white hover:text-slate-900 transition-all shadow-xl text-center w-full sm:w-auto">실시간 호실현황</a>
          </div>
          
          <div className="absolute -bottom-16 md:-bottom-24 left-1/2 -translate-x-1/2 flex space-x-2 md:space-x-3">
            {heroImages.map((_, idx) => (
              <div key={idx} className={`h-1 md:h-1.5 rounded-full transition-all duration-500 ${idx === bgIndex ? "w-6 md:w-8 bg-[#E60012]" : "w-2 md:w-3 bg-white/30"}`}></div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. 신뢰의 숫자 */}
      <section className="relative -mt-16 md:-mt-20 z-20 max-w-7xl mx-auto px-4 sm:px-6 reveal opacity-0 translate-y-12 transition-all duration-1000 ease-out">
        <div className="bg-white rounded-[2rem] md:rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-6 sm:p-10 md:p-14 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4 text-center border border-slate-100 w-full">
            <div className="flex-1 flex flex-col items-center group w-full">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-2xl md:text-3xl mb-4 md:mb-5 group-hover:-translate-y-2 transition-transform duration-300">🚇</div>
                <h3 className="text-lg md:text-2xl font-black text-[#002855] mb-1 md:mb-2">역세권 지식산업센터</h3>
                <p className="text-slate-500 font-bold text-xs md:text-sm">가산디지털단지역(1·7호선) 도보</p>
            </div>
            <div className="hidden md:block w-px h-20 md:h-24 bg-slate-100"></div>
            <div className="w-full h-px bg-slate-100 md:hidden"></div>
            <div className="flex-1 flex flex-col items-center group w-full">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center text-2xl md:text-3xl mb-4 md:mb-5 group-hover:-translate-y-2 transition-transform duration-300">🏢</div>
                <h3 className="text-lg md:text-2xl font-black text-[#002855] mb-1 md:mb-2">대형 호실 가능</h3>
                <p className="text-slate-500 font-bold text-xs md:text-sm">전용 10평부터 1천평 이상까지</p>
            </div>
            <div className="hidden md:block w-px h-20 md:h-24 bg-slate-100"></div>
            <div className="w-full h-px bg-slate-100 md:hidden"></div>
            <div className="flex-1 flex flex-col items-center group w-full">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center text-2xl md:text-3xl mb-4 md:mb-5 group-hover:-translate-y-2 transition-transform duration-300">🔑</div>
                <h3 className="text-lg md:text-2xl font-black text-[#002855] mb-1 md:mb-2">즉시 바로 입주</h3>
                <p className="text-slate-500 font-bold text-xs md:text-sm">준공 완료, 계약 후 즉시 입주</p>
            </div>
            <div className="hidden md:block w-px h-20 md:h-24 bg-slate-100"></div>
            <div className="w-full h-px bg-slate-100 md:hidden"></div>
            <div className="flex-1 flex flex-col items-center group w-full">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-yellow-50 text-yellow-600 rounded-2xl flex items-center justify-center text-2xl md:text-3xl mb-4 md:mb-5 group-hover:-translate-y-2 transition-transform duration-300">🔖</div>
                <h3 className="text-lg md:text-2xl font-black text-[#002855] mb-1 md:mb-2">대폭 할인 분양</h3>
                <p className="text-slate-500 font-bold text-xs md:text-sm">마지막 잔여호실 특별 프로모션</p>
            </div>
        </div>
      </section>

      {/* 4. 입지환경 */}
      <section id="입지환경" className="py-20 md:py-40 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <div className="order-2 lg:order-1 reveal opacity-0 translate-y-12 transition-all duration-1000 ease-out text-center md:text-left">
              <span className="text-[#E60012] font-black tracking-widest text-xs md:text-sm mb-3 md:mb-4 block uppercase">Premium Location</span>
              <h2 className="text-3xl md:text-5xl font-black text-[#002855] mb-6 md:mb-8 leading-tight">가산디지털단지 <br className="hidden md:block"/><span className="text-[#E60012]">최중심</span>의 가치</h2>
              <div className="w-16 md:w-20 h-1.5 bg-[#E60012] mx-auto md:mx-0 mb-8 md:mb-12 rounded-full"></div>
              <ul className="space-y-4 md:space-y-6 text-lg md:text-xl font-bold text-slate-600 text-left inline-block">
                <li className="flex items-center"><span className="w-2 h-2 md:w-2.5 md:h-2.5 bg-[#E60012] rounded-full mr-3 md:mr-4 shrink-0"></span>G밸리 핵심 업무권역 위치</li>
                <li className="flex items-center"><span className="w-2 h-2 md:w-2.5 md:h-2.5 bg-[#E60012] rounded-full mr-3 md:mr-4 shrink-0"></span>지하철 1·7호선 가산역 도보 3분</li>
                <li className="flex items-center"><span className="w-2 h-2 md:w-2.5 md:h-2.5 bg-[#E60012] rounded-full mr-3 md:mr-4 shrink-0"></span>서부간선·남부순환로 쾌속연결</li>
              </ul>
            </div>
            <div className="order-1 lg:order-2 rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-xl md:shadow-[0_30px_60px_rgba(0,0,0,0.15)] transform md:hover:scale-[1.02] transition-transform duration-500 border-4 md:border-8 border-white reveal opacity-0 translate-y-12 transition-all duration-1000 delay-200 ease-out">
              <img src="/images/map.png" alt="지도" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. 업무환경 */}
      <section className="py-20 md:py-40 bg-[#00152e] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-[#E60012] rounded-full filter blur-[150px] md:blur-[250px] opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-[200px] h-[200px] md:w-[500px] md:h-[500px] bg-[#002855] rounded-full filter blur-[100px] md:blur-[200px] opacity-50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <div className="rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl md:shadow-[0_30px_80px_rgba(0,0,0,0.5)] transform md:hover:scale-[1.02] transition-transform duration-700 border-2 md:border-4 border-slate-800 reveal opacity-0 translate-y-12 transition-all duration-1000 ease-out relative">
              <img src="/images/building-1.jpg" alt="로비" className="w-full h-auto" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
            <div className="reveal opacity-0 translate-y-12 transition-all duration-1000 delay-200 ease-out text-center md:text-left">
              <span className="text-[#FFD700] font-black tracking-widest text-xs md:text-sm mb-3 md:mb-4 block uppercase">Innovation Space</span>
              <h2 className="text-3xl md:text-5xl font-black mb-6 md:mb-8 leading-tight">쾌적한 업무환경/실용적 공간계획 <br className="hidden md:block"/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-yellow-200">최적의 공간 설계</span></h2>
              <div className="w-16 md:w-20 h-1.5 bg-[#E60012] mx-auto md:mx-0 mb-8 md:mb-12 rounded-full"></div>
              <ul className="space-y-4 md:space-y-6 text-base md:text-xl font-bold text-slate-300 text-left inline-block">
                <li className="flex items-start md:items-center"><span className="w-2 h-2 md:w-2.5 md:h-2.5 bg-[#E60012] rounded-full mr-3 md:mr-4 shrink-0 mt-1.5 md:mt-0"></span>개방감 있는 호실 설계</li>
                <li className="flex items-start md:items-center"><span className="w-2 h-2 md:w-2.5 md:h-2.5 bg-[#E60012] rounded-full mr-3 md:mr-4 shrink-0 mt-1.5 md:mt-0"></span>보안게이트/보안자동문으로 외부인 완벽통제</li>
                <li className="flex items-start md:items-center"><span className="w-2 h-2 md:w-2.5 md:h-2.5 bg-[#E60012] rounded-full mr-3 md:mr-4 shrink-0 mt-1.5 md:mt-0"></span>고속승강기/로비휴게공간/공용세미나실</li>
                <li className="flex items-start md:items-center"><span className="w-2 h-2 md:w-2.5 md:h-2.5 bg-[#E60012] rounded-full mr-3 md:mr-4 shrink-0 mt-1.5 md:mt-0"></span>넉넉한 주차공간/층별미팅룸/폰부스</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6. 도면 섹션 */}
      <section id="단지정보" className="py-20 md:py-40 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-20 reveal opacity-0 translate-y-12 transition-all duration-1000 ease-out">
            <h2 className="text-3xl md:text-6xl font-black text-[#002855] mb-4 md:mb-6">혁신적인 평면 계획</h2>
            <div className="w-16 h-1.5 bg-[#E60012] mx-auto mb-4 md:mb-6 rounded-full"></div>
            <p className="text-base md:text-2xl font-bold text-slate-500">소형부터 대형까지, 기업 규모에 맞춘 실용적 공간</p>
          </div>
          <div className="max-w-5xl mx-auto bg-slate-50 rounded-[2rem] md:rounded-[3rem] p-4 sm:p-8 md:p-16 shadow-lg md:shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-slate-100 group overflow-hidden reveal opacity-0 translate-y-12 transition-all duration-1000 delay-200 ease-out">
            <img src="/images/메인페이지5층.png" alt="평면도" className="w-full h-auto mix-blend-multiply transform md:group-hover:scale-[1.02] transition-transform duration-700" />
          </div>
        </div>
      </section>

      {/* 7. 관심고객 등록 폼 */}
      <section id="inquiry" className="py-20 md:py-40 relative bg-slate-900 flex items-center justify-center">
        <div className="absolute inset-0 opacity-30 mix-blend-overlay"><img src="/images/building-1.jpg" className="w-full h-full object-cover" /></div>
        <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 relative z-10 reveal opacity-0 translate-y-12 transition-all duration-1000 ease-out">
          <div className="bg-white rounded-[2rem] md:rounded-[4rem] p-6 sm:p-10 md:p-20 shadow-2xl md:shadow-[0_40px_100px_rgba(0,0,0,0.5)] border-[4px] md:border-[8px] border-white/10 bg-clip-padding">
            <div className="text-center mb-8 md:mb-12">
               <h2 className="text-3xl md:text-5xl font-black text-[#002855] mb-3 md:mb-4">관심고객 등록</h2>
               <p className="text-sm md:text-base text-slate-500 font-bold">상담을 남겨주시면 담당자가 빠르게 안내해 드립니다.</p>
            </div>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 font-bold">
                <div>
                  <label className="block mb-2 md:mb-3 text-slate-700 text-sm md:text-lg ml-1 md:ml-2">성함</label>
                  <input name="성함" type="text" placeholder="성함을 입력하세요" className="w-full p-4 md:p-5 text-sm md:text-base bg-slate-50 rounded-xl md:rounded-2xl outline-none focus:ring-2 focus:ring-[#E60012] transition-all border border-slate-200" required />
                </div>
                <div>
                  <label className="block mb-2 md:mb-3 text-slate-700 text-sm md:text-lg ml-1 md:ml-2">연락처</label>
                  <input name="연락처" type="tel" placeholder="010-0000-0000" className="w-full p-4 md:p-5 text-sm md:text-base bg-slate-50 rounded-xl md:rounded-2xl outline-none focus:ring-2 focus:ring-[#E60012] transition-all border border-slate-200" required />
                </div>
              </div>
              <div className="font-bold">
                <label className="block mb-2 md:mb-3 text-slate-700 text-sm md:text-lg ml-1 md:ml-2">문의사항</label>
                <textarea name="문의사항" rows={4} placeholder="원하시는 평형대나 궁금하신 점을 입력해 주세요" className="w-full p-4 md:p-5 text-sm md:text-base bg-slate-50 rounded-xl md:rounded-2xl outline-none resize-none focus:ring-2 focus:ring-[#E60012] border border-slate-200 transition-all" required />
              </div>
              <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />
              <button type="submit" className="w-full mt-2 md:mt-4 bg-gradient-to-r from-[#E60012] to-[#FF4E50] text-white font-black text-lg md:text-2xl py-4 md:py-6 rounded-xl md:rounded-2xl md:hover:scale-[1.02] active:scale-95 transition-all shadow-xl flex items-center justify-center gap-2 md:gap-3">
                <span>상담 신청하기</span>
                <svg className="w-5 h-5 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 8. 푸터 */}
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
        @keyframes subtle-zoom { 0% { transform: scale(1.05); } 100% { transform: scale(1.15); } }
        .animate-ken-burns { animation: subtle-zoom 20s infinite alternate ease-in-out; }
        .animate-bounce-slow { animation: bounce 3s infinite; }
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fade-in-up 1.2s ease-out forwards; }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
}