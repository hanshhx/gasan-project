"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";

export default function Home() {
  const formRef = useRef<HTMLFormElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAd, setShowAd] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [bgIndex, setBgIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const totalSlides = 4;

  const [globalMousePos, setGlobalMousePos] = useState({ x: -100, y: -100 });

  // [수정: 로컬 이미지 경로 인식 오류 수정 (/images/ 폴더 경로 추가)]
  const heroImages = [
    "/images/hhh-7.jpg",
    "/images/hhh-8.png",
    "/images/hhh-9.jpg"
  ];

  const heroTexts = [
    { red: "대폭할인", black: "분양" },
    { red: "100%환불", black: "보장제" },
    { red: "선임대 후", black: "분양가능" }
  ];

  // 팝업 로직
  useEffect(() => {
    const h = localStorage.getItem("hideAdUntil");
    if (h && new Date().getTime() < parseInt(h)) setShowAd(false);
    else { const t = setTimeout(() => setShowAd(true), 1500); return () => clearTimeout(t); }
  }, []);
  const closeAdForToday = () => { const t = new Date(); t.setHours(24,0,0,0); localStorage.setItem("hideAdUntil", t.getTime().toString()); setShowAd(false); };

  // 히어로 배경 슬라이드 로직
  useEffect(() => { const i = setInterval(() => setBgIndex(p => (p+1)%heroImages.length), 5000); return () => clearInterval(i); }, []);

  // 스크롤 감지 로직
  useEffect(() => { const h = () => setIsScrolled(window.scrollY > 50); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);

  // 히어로 섹션 마우스 추적 (글로우 효과용)
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    setMousePos({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
  }, []);

  // 전역 마우스 커서 이벤트 리스너 & 호버 감지
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => setGlobalMousePos({ x: e.clientX, y: e.clientY });
    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('a, button, input, textarea')) setIsHovering(true);
      else setIsHovering(false);
    };
    window.addEventListener("mousemove", handleGlobalMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    return () => { window.removeEventListener("mousemove", handleGlobalMouseMove); window.removeEventListener("mouseover", handleMouseOver); };
  }, []);

  // 가로 스크롤 로직
  const scrollH = (d: 'left'|'right') => { if (scrollContainerRef.current) scrollContainerRef.current.scrollBy({ left: d==='left' ? -scrollContainerRef.current.clientWidth : scrollContainerRef.current.clientWidth, behavior: "smooth" }); };
  const goSlide = (i: number) => { if (scrollContainerRef.current) scrollContainerRef.current.scrollTo({ left: scrollContainerRef.current.clientWidth*i, behavior: "smooth" }); };
  useEffect(() => { const c = scrollContainerRef.current; if (!c) return; const h = () => setCurrentSlide(Math.round(c.scrollLeft/c.clientWidth)); c.addEventListener("scroll",h,{passive:true}); return () => c.removeEventListener("scroll",h); }, []);

  // Reveal 옵저버
  useEffect(() => {
    const o1 = new IntersectionObserver((es) => { es.forEach(e => { if (e.isIntersecting) e.target.classList.add("is-revealed"); }); }, { threshold: 0.1, root: scrollContainerRef.current });
    const o2 = new IntersectionObserver((es) => { es.forEach(e => { if (e.isIntersecting) e.target.classList.add("is-revealed"); }); }, { threshold: 0.15 });
    document.querySelectorAll(".ag-reveal-h").forEach(el => o1.observe(el));
    document.querySelectorAll(".ag-reveal").forEach(el => o2.observe(el));
    return () => { document.querySelectorAll(".ag-reveal-h").forEach(el => o1.unobserve(el)); document.querySelectorAll(".ag-reveal").forEach(el => o2.unobserve(el)); };
  }, []);

  // 카운트업 애니메이션
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const countRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const targets = [1, 7, 250, 5];
        const duration = 3000;
        const steps = 60;
        let step = 0;
        const interval = setInterval(() => {
          step++;
          const progress = step / steps;
          const eased = 1 - Math.pow(1 - progress, 3);
          setCounts(targets.map(t => Math.round(t * eased)));
          if (step >= steps) clearInterval(interval);
        }, duration / steps);
        o.disconnect();
      }
    }, { threshold: 0.3 });
    if (countRef.current) o.observe(countRef.current);
    return () => o.disconnect();
  }, []);

  // 폼 전송 로직
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData(formRef.current!);
    fd.append("access_key","ab9a4476-07ee-4fcc-b4e6-d159667306c1");
    fd.append("subject","🚨 [가산3차 SK V1] 새로운 관심고객 상담 신청이 접수되었습니다!");
    fd.append("from_name","가산3차 SK V1 웹사이트");
    fd.append("title","✨ 신규 VIP 관심고객 상담 신청이 도착했습니다.");
    fd.append("template","box");
    try {
      const r = await fetch("https://api.web3forms.com/submit",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(Object.fromEntries(fd))});
      const res = await r.json();
      if (res.success) { alert("✅ 상담 신청이 성공적으로 접수되었습니다!\n담당 전문가가 내용을 확인 후 신속하게 연락드리겠습니다."); formRef.current?.reset(); setShowAd(false); }
      else alert("❌ 전송에 실패했습니다.");
    } catch { alert("❌ 통신 오류가 발생했습니다."); }
  };

  const navItems = [
    {name:'분양정보',link:'/overview',subItems:[{name:'사업개요',link:'/overview'},{name:'오시는길',link:'/location'}]},
    {name:'입지환경',link:'/location-map',subItems:[{name:'광역위치도',link:'/location-map'},{name:'미래비전',link:'/vision'}]},
    {name:'단지정보',link:'/special-design',subItems:[{name:'특화설계',link:'/special-design'},{name:'층별계획',link:'/floor-plan'}]},
    {name:'홍보센터',link:'/site-photos',subItems:[{name:'현장사진',link:'/site-photos'}]}
  ];
  const slideLabels = ["핵심특장점","입지환경","업무공간","평면계획"];

  return (
    <div className="min-h-screen bg-[#eeeae7] text-[#1E1515] font-sans tracking-tight overflow-x-hidden selection:bg-[#812120] selection:text-[#eeeae7] relative break-keep lg:cursor-none">

      {/* 에디토리얼 그리드 라인 */}
      <div className="pointer-events-none fixed inset-0 z-0 hidden lg:flex justify-between max-w-[1600px] mx-auto px-12 w-full opacity-[0.06]">
        {[...Array(5)].map((_,i) => <div key={i} className="w-px h-full bg-[#812120]" />)}
      </div>

      {/* 전체 노이즈 텍스처 오버레이 */}
      <div className="pointer-events-none fixed inset-0 z-[40] opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* 커스텀 마우스 커서 */}
      <div 
        className={`pointer-events-none fixed top-0 left-0 border border-[#812120] rounded-full z-[150] items-center justify-center transition-all duration-[250ms] ease-out mix-blend-difference hidden lg:flex ${showAd ? 'opacity-0' : 'opacity-100'} ${isHovering ? 'w-10 h-10 bg-[#812120]/30 backdrop-blur-sm -ml-5 -mt-5' : 'w-5 h-5 -ml-2.5 -mt-2.5'}`} 
        style={{ transform: `translate3d(${globalMousePos.x}px, ${globalMousePos.y}px, 0)` }} 
      />

      {/* ── 팝업 ── */}
      <div className={`fixed inset-0 z-[300] flex items-center justify-center bg-[#160F0F]/80 backdrop-blur-2xl transition-all duration-[1200ms] ${showAd?"opacity-100 visible":"opacity-0 invisible pointer-events-none"}`}>
        <div className={`bg-[#eeeae7] w-[92%] md:max-w-[550px] md:w-full shadow-[0_40px_100px_rgba(129,33,32,0.15)] ring-1 ring-white/50 transition-all duration-[1000ms] ${showAd?"scale-100 translate-y-0":"scale-[0.98] translate-y-12"}`}>
          <div className="w-full bg-[#EFECE8]"><img src="/images/popup.png" alt="가산 3차 SK V1 특별할인 팝업" className="w-full h-auto object-contain mix-blend-multiply" /></div>
          <div className="flex border-t border-[#812120]/10">
            <button onClick={closeAdForToday} className="flex-1 py-5 bg-[#eeeae7] text-[#812120] font-medium tracking-widest hover:text-[#812120] hover:bg-[#E5E0DC] transition-colors text-xs">오늘 하루 보지 않기</button>
            <button onClick={() => setShowAd(false)} className="flex-1 py-5 bg-[#812120] text-[#eeeae7] font-medium tracking-widest hover:bg-[#6A1A1A] transition-colors text-xs">닫기</button>
          </div>
        </div>
      </div>

      {/* ── 플로팅 ── */}
      <div className="fixed bottom-8 md:bottom-12 right-6 md:right-12 z-[100] flex flex-col space-y-4">
        <a href="#inquiry" title="관심고객 등록" className="w-14 h-14 bg-[#1E1515] shadow-[0_15px_40px_rgba(30,21,21,0.2)] flex items-center justify-center hover:-translate-y-3 hover:shadow-[0_25px_50px_rgba(30,21,21,0.4)] transition-all duration-[800ms] ease-out rounded-full group relative">
          <svg className="h-5 w-5 text-[#eeeae7]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
          <span className="absolute right-16 bg-[#1E1515] text-[#eeeae7] text-[10px] tracking-[0.2em] px-4 py-2.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 whitespace-nowrap font-medium rounded-sm">상담신청</span>
        </a>
        <a href="tel:18003357" title="전화 상담" className="w-14 h-14 bg-[#812120] shadow-[0_15px_40px_rgba(129,33,32,0.3)] flex items-center justify-center hover:-translate-y-3 hover:shadow-[0_25px_50px_rgba(129,33,32,0.5)] transition-all duration-[800ms] ease-out rounded-full animate-[gentleBounce_5s_ease_infinite] relative group">
          <svg className="h-5 w-5 text-[#eeeae7]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
          <span className="absolute right-16 bg-[#812120] text-[#eeeae7] text-[10px] tracking-[0.2em] px-4 py-2.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 whitespace-nowrap font-medium rounded-sm">1800-3357</span>
        </a>
      </div>

      {/* 티커 */}
      <div className="bg-[#812120] text-[#eeeae7] py-2.5 overflow-hidden z-[60] relative" style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' }}>
        <div className="ticker-wrap"><div className="ticker-content">
          {[...Array(8)].map((_,i) => (
            <span key={i} className="mx-12 text-[11px] font-medium tracking-[0.3em] whitespace-nowrap inline-flex items-center gap-4 text-[#eeeae7]">
              <span className="w-1.5 h-1.5 bg-[#eeeae7]/60 rounded-full" />가산 3차 SK V1 센터 — 프리미엄 할인 분양<span className="w-1.5 h-1.5 bg-[#eeeae7]/60 rounded-full" />즉시입주 가능 · 1800-3357
            </span>
          ))}
        </div></div>
      </div>

      {/* 헤더 */}
      <header className={`sticky top-0 left-0 right-0 z-50 transition-all duration-[1000ms] ${isScrolled?"py-4 bg-[#eeeae7]/90 backdrop-blur-2xl border-b border-[#812120]/10 shadow-[0_10px_40px_rgba(129,33,32,0.03)]":"py-6 bg-transparent"}`}>
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex justify-between items-center">
          <a href="/" className="group"><img src="/images/logo.png" alt="가산 3차 SK V1 센터 로고" className="h-8 md:h-10 transition-all duration-1000 brightness-0 opacity-100 group-hover:opacity-75" /></a>
          <nav className="hidden lg:flex space-x-14 font-medium text-[13px] text-[#1E1515] tracking-[0.15em] uppercase">
            {navItems.map(item => (
              <div key={item.name} className="relative group py-4">
                <a href={item.link} className="hover:text-[#812120] transition-colors block font-semibold">{item.name}</a>
                {item.subItems.length > 0 && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-1 w-52 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                    <div className="bg-[#eeeae7]/95 backdrop-blur-xl border border-[#812120]/10 shadow-[0_30px_60px_rgba(129,33,32,0.08)] overflow-hidden">
                      {item.subItems.map(sub => (
                        <a key={sub.name} href={sub.link} className="block px-6 py-5 text-center text-[12px] text-[#1E1515]/80 hover:bg-[#812120]/10 hover:text-[#812120] font-medium transition-all duration-500 tracking-[0.1em]">{sub.name}</a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
          <div className="flex items-center gap-6">
            <a href="tel:18003357" className="hidden sm:flex items-center gap-3 font-[Georgia,serif] text-lg text-[#1E1515] hover:text-[#812120] transition-colors italic font-semibold"><span className="w-2 h-2 bg-[#812120] rounded-full animate-pulse" />1800-3357</a>
            <a href="#inquiry" className="px-8 py-3.5 font-medium text-[11px] tracking-[0.3em] bg-[#1E1515] text-[#eeeae7] hover:bg-[#812120] transition-all duration-700 uppercase">상담예약</a>
            <button className="lg:hidden p-1 text-[#1E1515]" onClick={() => setIsMobileMenuOpen(true)} aria-label="메뉴 열기"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg></button>
          </div>
        </div>
      </header>

      {/* 모바일 메뉴 */}
      <div className={`fixed inset-0 z-[200] lg:hidden transition-all duration-700 ${isMobileMenuOpen?"opacity-100 visible":"opacity-0 invisible"}`}>
        <div className="absolute inset-0 bg-[#160F0F]/95 backdrop-blur-3xl" onClick={() => setIsMobileMenuOpen(false)} />
        <div className={`absolute top-0 right-0 bottom-0 w-full max-w-md bg-[#eeeae7] flex flex-col transform transition-transform duration-[1000ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${isMobileMenuOpen?"translate-x-0":"translate-x-full"}`}>
          <div className="flex justify-between items-center p-8 border-b border-[#812120]/20"><img src="/images/logo.png" alt="로고" className="h-8 brightness-0 opacity-100" /><button onClick={() => setIsMobileMenuOpen(false)} className="text-[#1E1515]/70 hover:text-[#812120] transition-colors" aria-label="메뉴 닫기"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg></button></div>
          <div className="flex-1 overflow-y-auto p-10">{navItems.map((item, idx) => (<div key={item.name} className="mb-10 ag-reveal" style={{transitionDelay:`${idx*0.1}s`}}><a href={item.link} className="text-2xl font-[Georgia,serif] text-[#1E1515] hover:text-[#812120] transition-colors block mb-5 font-semibold" onClick={() => setIsMobileMenuOpen(false)}>{item.name}</a><div className="flex flex-col pl-5 border-l-2 border-[#812120]/30 space-y-4">{item.subItems.map(sub => (<a key={sub.name} href={sub.link} className="text-sm font-medium text-[#1E1515]/80 hover:text-[#812120] transition-colors tracking-widest" onClick={() => setIsMobileMenuOpen(false)}>{sub.name}</a>))}</div></div>))}</div>
          <div className="p-12 bg-[#1E1515] text-center"><p className="text-[10px] font-medium text-[#eeeae7]/70 mb-3 uppercase tracking-[0.5em]">분양상담센터</p><a href="tel:18003357" className="text-3xl font-[Georgia,serif] text-[#eeeae7] italic font-bold">1800-3357</a></div>
        </div>
      </div>

      {/* 히어로 */}
      <section ref={heroRef} onMouseMove={handleMouseMove} className="relative flex flex-col lg:flex-row h-[calc(100vh-108px)] md:h-[calc(100vh-124px)] overflow-hidden">
        <div className="w-full lg:w-[45%] h-full flex flex-col justify-center px-6 md:px-12 lg:px-16 xl:px-28 py-10 lg:py-0 z-10 bg-transparent relative overflow-hidden">
          <div className="absolute w-[800px] h-[800px] rounded-full bg-[#812120]/[0.05] blur-[150px] pointer-events-none transition-all duration-[3000ms] ease-out" style={{ left: `${mousePos.x}%`, top: `${mousePos.y}%`, transform: 'translate(-50%,-50%)' }} />
          
          <div className="absolute bottom-8 left-6 md:left-12 lg:left-16 flex-col items-center gap-4 hidden md:flex">
            <span className="text-[#1E1515]/70 text-[10px] font-medium tracking-[0.4em] uppercase rotate-[-90deg] origin-bottom whitespace-nowrap mb-16">아래로 스크롤</span>
            <div className="w-[2px] h-16 bg-[#812120]/30 relative overflow-hidden"><div className="w-full h-full bg-[#812120] absolute top-0 -translate-y-full animate-[scrollDown_2s_ease-in-out_infinite]" /></div>
          </div>

          <div className="relative z-10 lg:pl-10">
            <div className="overflow-hidden mb-8 md:mb-12">
              <span className="inline-flex items-center gap-4 px-0 py-2 pb-3 text-[#1E1515]/80 text-[10px] font-medium tracking-[0.5em] uppercase ag-slide-up border-b border-[#812120]/40">즉시입주 가능 · 역세권 지식산업센터</span>
            </div>
            
            <div className="relative h-[120px] sm:h-[150px] lg:h-[230px] xl:h-[280px] mb-10 overflow-hidden">
              {heroTexts.map((text, idx) => (
                <h1 
                  key={idx} 
                  className={`absolute inset-0 text-5xl sm:text-6xl lg:text-[5.5rem] xl:text-[6.5rem] font-serif leading-[1.05] tracking-tighter text-[#1E1515] transition-all duration-[1500ms] cubic-bezier(0.25, 1, 0.5, 1) ${idx === bgIndex ? "opacity-100 translate-y-0 visible" : "opacity-0 translate-y-8 invisible"}`}
                >
                  <span className="text-[#812120] italic font-bold">{text.red}</span>
                  <br className="sm:hidden" />
                  <span className="font-bold">{text.black}</span>
                </h1>
              ))}
            </div>

            <div className="overflow-hidden mb-14 md:mb-20">
              <p className="text-sm md:text-lg font-medium text-[#1E1515] leading-[2] ag-slide-up tracking-wide" style={{animationDelay:"0.45s"}}>전용 10평 ~ 1천평 이상 대형호실 가능<br/>가산 3차 SK V1 특별 분양</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-5 w-full md:w-[85%] ag-fade-in" style={{animationDelay:"0.7s"}}>
              <a href="#inquiry" className="group relative bg-[#1E1515] text-[#eeeae7] px-10 py-[18px] font-medium text-[11px] tracking-[0.3em] uppercase text-center flex-1 inline-flex items-center justify-center gap-3 overflow-hidden hover:-translate-y-1 transition-all duration-700">
                <span className="absolute inset-0 bg-[#812120] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <span className="relative z-10">할인분양 조건확인</span>
                <span className="relative z-10 transform group-hover:translate-x-2 transition-transform duration-500 text-lg leading-none font-bold">→</span>
              </a>
              <a href="#inquiry" className="group border-2 border-[#812120]/50 text-[#812120] px-10 py-[18px] font-bold text-[11px] tracking-[0.3em] uppercase transition-all duration-700 text-center flex-1 hover:-translate-y-1 hover:border-[#812120] hover:bg-[#812120]/5 flex items-center justify-center gap-3">
                <span>실시간 호실현황</span>
                <span className="transform group-hover:translate-x-2 transition-transform duration-500 text-lg leading-none opacity-0 group-hover:opacity-100 font-bold">→</span>
              </a>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[55%] h-[40vh] lg:h-full relative overflow-hidden bg-[#1E1515]">
          {heroImages.map((src, idx) => (
            <div key={idx} className={`absolute inset-0 transition-opacity duration-[2500ms] ${idx===bgIndex?"opacity-100 z-10":"opacity-0 z-0"}`}>
              <img src={src} alt={`가산 3차 SK V1 센터 전경 ${idx+1}`} className={`w-full h-full object-cover ${idx===bgIndex?"kenburns-luxury":"scale-105"}`} />
              <div className="absolute inset-0 bg-[#160F0F]/30 mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#eeeae7]/20 w-[40%]" />
            </div>
          ))}
          <div className="absolute top-0 bottom-0 left-0 z-20 flex flex-col w-[3px] bg-[#eeeae7]/20 hidden lg:flex">
            {heroImages.map((_, idx) => (
              <div key={idx} className="flex-1 relative overflow-hidden">
                <div className={`absolute inset-0 bg-[#eeeae7] origin-top ${idx===bgIndex?"animate-[slideProgressY_5s_linear_forwards]":"scale-y-0"}`} />
              </div>
            ))}
          </div>
          <div className="absolute bottom-12 right-12 z-20 hidden lg:flex items-baseline gap-3 font-[Georgia,serif]">
            <span className="text-6xl text-[#eeeae7] italic font-light">{String(bgIndex+1).padStart(2,'0')}</span>
            <span className="text-[#eeeae7]/40 text-sm font-sans tracking-widest">/ {String(heroImages.length).padStart(2,'0')}</span>
          </div>
        </div>
      </section>

      {/* 카운터 */}
      <section ref={countRef} className="relative py-28 md:py-44 bg-[#812120] border-y border-[#160F0F] overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC44IiBudW1PY3RhdmVzPSI0IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNuKSIgb3BhY2l0eT0iMC40Ii8+PC9zdmc+')] opacity-[0.08] mix-blend-overlay pointer-events-none" />
        <div className="absolute -top-1/2 -right-1/4 w-[1000px] h-[1000px] bg-[#1E1515]/30 rounded-full blur-[200px] pointer-events-none" />
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 relative z-10">
          {[
            { num: "1·7", suffix: "호선", label: "더블 역세권", fixed: true },
            { num: counts[0], suffix: "호선", label: "지하철 노선", fixed: false },
            { num: counts[1], suffix: "m", label: "역까지 도보거리", fixed: false },
            { num: counts[2], suffix: "층", label: "최고층 랜드마크", fixed: false },
          ].map((item, idx) => (
            <div key={idx} className={`text-center group ag-reveal ${idx%2!==0?'md:mt-12':''}`} style={{transitionDelay: `${idx*0.2}s`}}>
              <div className="text-5xl md:text-7xl font-[Georgia,serif] font-light text-[#eeeae7] mb-5 tabular-nums group-hover:-translate-y-3 transition-transform duration-[1000ms] drop-shadow-2xl">
                {item.fixed ? item.num : item.num}<span className="text-lg md:text-2xl text-[#eeeae7]/60 font-sans font-thin italic tracking-wide ml-1">{item.suffix}</span>
              </div>
              <div className="w-8 h-[1px] bg-[#eeeae7]/30 mx-auto mb-5 group-hover:w-16 transition-all duration-700" />
              <p className="text-[10px] md:text-xs font-light tracking-[0.4em] text-[#eeeae7]/80 uppercase">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 가로 스크롤 */}
      <section className="relative w-full">
        <div className="absolute top-0 left-0 right-0 z-30 bg-[#eeeae7]/80 backdrop-blur-2xl h-20 flex items-center justify-between px-6 md:px-12 border-b border-[#812120]/10">
          <div className="hidden md:flex items-center gap-10">
            {slideLabels.map((label, idx) => (
              <button key={idx} onClick={() => goSlide(idx)} className={`py-7 text-[11px] tracking-[0.3em] uppercase font-light transition-all duration-1000 relative ${idx===currentSlide?"text-[#812120]":"text-[#1E1515]/40 hover:text-[#1E1515]"}`}>
                <span className="relative z-10 flex items-center gap-4">
                  <span className={`text-[10px] font-[Georgia,serif] italic transition-all duration-1000 ${idx===currentSlide?"text-[#812120]":"text-[#1E1515]/30"}`}>{String(idx+1).padStart(2,'0')}.</span>{label}
                </span>
                {idx===currentSlide && <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#812120] animate-[scaleIn_1s_ease-out]" />}
              </button>
            ))}
          </div>
          <div className="flex md:hidden items-center gap-3">
            {slideLabels.map((_, idx) => (
              <button key={idx} onClick={() => goSlide(idx)} className={`transition-all duration-500 rounded-full ${idx===currentSlide?"w-6 h-1.5 bg-[#812120]":"w-1.5 h-1.5 bg-[#1E1515]/20"}`} />
            ))}
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => scrollH('left')} aria-label="이전" className="w-12 h-12 border-[0.5px] border-[#812120]/20 flex items-center justify-center text-[#1E1515] hover:bg-[#812120] hover:text-[#eeeae7] hover:border-[#812120] transition-all duration-700 rounded-full group"><svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg></button>
            <button onClick={() => scrollH('right')} aria-label="다음" className="w-12 h-12 border-[0.5px] border-[#812120]/20 flex items-center justify-center text-[#1E1515] hover:bg-[#812120] hover:text-[#eeeae7] hover:border-[#812120] transition-all duration-700 rounded-full group"><svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg></button>
          </div>
        </div>

        <div ref={scrollContainerRef} className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar w-full bg-[#160F0F]">

          {/* 슬라이드 1 */}
          <div className="w-screen flex-shrink-0 snap-center flex items-center justify-center pt-32 pb-24 px-6 md:px-12 lg:px-20 min-h-[calc(100vh-80px)] bg-gradient-to-br from-[#eeeae7] to-[#E3DED8] relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none z-0 select-none hidden sm:block" aria-hidden="true">
              <h2 className="text-[15rem] md:text-[25rem] font-black text-[#812120]/[0.03] tracking-tighter whitespace-nowrap">SK V1</h2>
            </div>
            <div className="w-full max-w-[1400px] relative z-10 ag-reveal-h">
              <div className="mb-20 md:mb-28 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div>
                  <span className="inline-block text-[#812120] text-[10px] font-medium tracking-[0.5em] uppercase mb-6 border-b-2 border-[#812120]/40 pb-2">Key Features</span>
                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-[Georgia,serif] text-[#1E1515] leading-[1.15] font-bold">성공 비즈니스를 위한<br/><span className="text-[#812120] italic">완벽한 인프라</span></h2>
                </div>
                <p className="text-[#1E1515]/80 font-medium text-base tracking-wide text-left max-w-sm leading-[1.8]">가산 3차 SK V1 센터는 귀하의 비즈니스 성공을 위한 최적의 환경과 독보적인 프리미엄을 제공합니다.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {[
                  { title:"역세권 인프라", desc:"가산디지털단지역(1·7호선) 도보" },
                  { title:"대형 호실 구성", desc:"전용 10평부터 1천평 이상까지" },
                  { title:"즉시 입주 가능", desc:"준공 완료, 계약 후 즉시 입주" },
                  { title:"특별 할인 분양", desc:"마지막 잔여호실 특별 프로모션" }
                ].map((item, idx) => (
                  <div key={idx} className={`group relative bg-[#Fcfbfb] p-10 md:p-12 transition-all duration-[800ms] overflow-hidden border border-[#812120]/10 shadow-[0_20px_60px_rgba(30,21,21,0.08)] hover:shadow-[0_30px_80px_rgba(129,33,32,0.2)] ${idx%2!==0?'lg:mt-16':''}`}>
                    <div className="absolute bottom-0 left-0 w-full h-[4px] bg-[#812120] transform translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    <div className="relative z-10">
                      <div className="text-sm font-[Georgia,serif] italic text-[#1E1515]/50 mb-10 group-hover:text-[#812120] transition-colors duration-500 font-bold">{String(idx+1).padStart(2,'0')}.</div>
                      <h3 className="text-xl md:text-2xl font-[Georgia,serif] text-[#1E1515] mb-4 font-bold">{item.title}</h3>
                      <p className="text-[#1E1515]/80 font-medium text-sm md:text-base leading-[1.8]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 슬라이드 2 */}
          <div className="w-screen flex-shrink-0 snap-center flex items-center min-h-[calc(100vh-80px)] pt-20 bg-gradient-to-br from-[#1E1515] to-[#160F0F]">
            <div className="w-full grid lg:grid-cols-2 gap-0 items-stretch ag-reveal-h h-full">
              <div className="flex flex-col justify-center px-6 md:px-12 lg:px-20 xl:px-32 py-20 lg:py-0 relative overflow-hidden text-[#eeeae7]">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#812120]/[0.2] rounded-full blur-[150px] pointer-events-none" />
                <div className="relative z-10">
                  <span className="inline-block text-[#eeeae7]/70 text-[10px] font-medium tracking-[0.5em] uppercase mb-10 border-b-2 border-[#eeeae7]/30 pb-2">Premium Location</span>
                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-[Georgia,serif] mb-12 leading-[1.1] font-bold">가산디지털단지<br/><span className="italic text-[#812120]">최중심의 가치</span></h2>
                  <ul className="space-y-10 text-sm md:text-lg font-medium text-[#eeeae7]/80 tracking-widest">
                    {["G밸리 핵심 업무권역 위치","지하철 1·7호선 가산역 도보거리","서부간선·남부순환로 쾌속연결"].map((t,i) => (
                      <li key={i} className="flex items-center group/li hover:text-[#eeeae7] transition-colors duration-700"><span className="w-12 h-[2px] bg-[#812120] mr-8 group-hover/li:w-20 transition-all duration-700" />{t}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="relative overflow-hidden h-[50vh] lg:h-auto group flex items-center justify-center lg:p-20">
                <div className="w-full h-full overflow-hidden relative shadow-[0_30px_100px_rgba(0,0,0,0.6)]">
                  <img src="/images/map.png" alt="가산디지털단지 광역 위치도" className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-[3s] mix-blend-luminosity group-hover:mix-blend-normal" loading="lazy" />
                  <div className="absolute inset-0 bg-[#812120]/20 mix-blend-multiply group-hover:opacity-0 transition-opacity duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#160F0F] via-transparent to-transparent opacity-90" />
                </div>
                <div className="absolute bottom-10 left-10 lg:left-10 lg:bottom-32 bg-[#eeeae7] text-[#1E1515] px-10 py-8 shadow-[0_20px_60px_rgba(0,0,0,0.5)] border-2 border-white/20 z-10">
                  <p className="text-[10px] font-bold text-[#812120] tracking-[0.4em] uppercase mb-3">주소</p>
                  <p className="text-sm tracking-widest font-bold">서울특별시 금천구 가산디지털1로 136</p>
                </div>
              </div>
            </div>
          </div>

          {/* 슬라이드 3 */}
          <div className="w-screen flex-shrink-0 snap-center flex items-center min-h-[calc(100vh-80px)] pt-20 bg-[#Fcfbfb]">
            <div className="w-full grid lg:grid-cols-2 gap-0 items-stretch ag-reveal-h h-full">
              <div className="relative overflow-hidden h-[50vh] lg:h-auto order-2 lg:order-1 group">
                <img src="/images/building-1.jpg" alt="가산 3차 SK V1 로비 인테리어" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#Fcfbfb]/40 to-transparent pointer-events-none" />
              </div>
              <div className="flex flex-col justify-center px-6 md:px-12 lg:px-20 xl:px-32 py-20 lg:py-0 order-1 lg:order-2 relative bg-[#Fcfbfb]">
                <div className="relative z-10">
                  <span className="inline-block text-[#812120] text-[10px] font-medium tracking-[0.5em] uppercase mb-10 border-b-2 border-[#812120]/30 pb-2">Innovation Space</span>
                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-[Georgia,serif] mb-12 leading-[1.15] text-[#1E1515] font-bold">쾌적한 업무환경<br/><span className="text-[#812120] italic">최적의 공간 설계</span></h2>
                  <div className="w-16 h-[2px] bg-[#812120]/50 mb-12" />
                  <ul className="space-y-10 text-sm md:text-lg font-medium text-[#1E1515]/80 tracking-widest">
                    {["개방감 있는 호실 설계","보안게이트/보안자동문으로 외부인 완벽통제","고속승강기/로비휴게공간/공용세미나실","넉넉한 주차공간/층별미팅룸/폰부스"].map((t,i) => (
                      <li key={i} className="flex items-start group/li hover:text-[#1E1515] transition-colors duration-500"><span className="text-[#812120] mr-8 font-[Georgia,serif] italic text-base mt-0.5 font-bold">{String(i+1).padStart(2,'0')}</span>{t}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* 슬라이드 4 */}
          <div className="w-screen flex-shrink-0 snap-center flex items-center min-h-[calc(100vh-80px)] pt-20 bg-[#812120]">
            <div className="w-full grid lg:grid-cols-[40%_60%] gap-0 items-stretch ag-reveal-h h-full">
              <div className="flex flex-col justify-center px-6 md:px-12 lg:px-16 xl:px-24 py-20 lg:py-0 text-[#eeeae7] relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
                <div className="relative z-10">
                  <span className="inline-block text-[#eeeae7]/80 text-[10px] font-medium tracking-[0.5em] uppercase mb-10 border-b-2 border-[#eeeae7]/30 pb-2">Floor Plan</span>
                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-[Georgia,serif] mb-10 leading-[1.1] font-bold">혁신적인<br/><span className="italic text-[#eeeae7]/80">평면 계획</span></h2>
                  <p className="text-base font-medium text-[#eeeae7]/90 leading-[2] mb-16 tracking-widest max-w-sm">소형부터 대형까지, 기업 규모에 맞춘 실용적 공간</p>
                  <a href="/floor-plan" className="group inline-flex items-center justify-between w-full max-w-[250px] border-b-2 border-[#eeeae7]/50 pb-4 text-[11px] tracking-[0.4em] uppercase font-bold text-[#eeeae7] hover:border-[#eeeae7] transition-colors duration-700"><span>층별계획 보기</span><span className="transform group-hover:translate-x-2 transition-transform duration-500 text-lg leading-none font-bold">→</span></a>
                </div>
              </div>
              <div className="bg-[#eeeae7] p-10 md:p-20 flex items-center justify-center relative shadow-[-30px_0_100px_rgba(30,21,21,0.6)] z-10">
                <img src="/images/메인페이지5층.png" alt="가산 3차 SK V1 5층 평면도" className="w-full h-auto max-h-[75vh] object-contain opacity-100 transition-opacity duration-1000" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center md:hidden text-[#1E1515]/60 text-[10px] tracking-[0.3em] z-20 font-medium">← 옆으로 넘겨서 보기 →</div>
      </section>

      {/* CTA */}
      <section className="relative py-28 md:py-40 overflow-hidden bg-[#160F0F]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none z-0 select-none" aria-hidden="true">
          <h2 className="text-[8rem] md:text-[14rem] font-black text-[#eeeae7]/[0.02] tracking-tighter whitespace-nowrap">SK V1 CENTER</h2>
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col items-center text-center">
          <p className="text-[#812120] text-[10px] tracking-[0.5em] uppercase mb-8 font-medium">분양상담센터</p>
          <h3 className="text-4xl md:text-6xl font-[Georgia,serif] text-[#eeeae7] leading-[1.2] mb-6 font-bold">지금 바로 상담받아보세요</h3>
          <p className="text-[#eeeae7]/40 font-light text-sm tracking-widest mb-14">전문 상담사가 최적의 호실을 안내해드립니다</p>
          <a href="tel:18003357" className="bg-[#812120] border-2 border-[#812120] text-[#eeeae7] px-16 py-6 font-bold text-[12px] tracking-[0.4em] uppercase hover:bg-transparent hover:text-[#812120] transition-all duration-500">전화상담 1800-3357</a>
        </div>
      </section>

      {/* 폼 */}
      <section id="inquiry" className="relative py-24 md:py-40 bg-[#eeeae7] overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC44IiBudW1PY3RhdmVzPSI0IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNuKSIgb3BhY2l0eT0iMC40Ii8+PC9zdmc+')] opacity-[0.04] mix-blend-overlay pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16 md:mb-28 ag-reveal">
            <span className="inline-block text-[#812120] text-[10px] font-bold tracking-[0.5em] uppercase mb-6 border-b-2 border-[#812120]/30 pb-2">Contact Us</span>
            <h2 className="text-3xl md:text-5xl font-[Georgia,serif] text-[#1E1515] mb-8 font-bold">관심고객 등록 및 실시간 호실문의</h2>
            <p className="text-sm md:text-base tracking-widest text-[#1E1515]/80 font-medium">상담을 남겨주시면 담당자가 빠르게 안내해 드립니다.</p>
          </div>
          <div className="ag-reveal bg-[#Fcfbfb] p-10 md:p-20 shadow-[0_40px_100px_rgba(129,33,32,0.08)] border border-[#812120]/10" style={{transitionDelay:"0.2s"}}>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="relative"><label className="block mb-6 text-[#1E1515]/60 font-bold text-[10px] uppercase tracking-[0.4em]">성함</label><input name="성함" type="text" placeholder="성함을 입력해주세요" aria-label="성함" className="w-full py-4 text-base bg-transparent border-b-2 border-gray-300 outline-none text-[#1E1515] placeholder:text-[#1E1515]/40 font-medium peer transition-all" required /><div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#812120] peer-focus:w-full transition-all duration-500" /></div>
                <div className="relative"><label className="block mb-6 text-[#1E1515]/60 font-bold text-[10px] uppercase tracking-[0.4em]">연락처</label><input name="연락처" type="tel" placeholder="010-0000-0000" aria-label="연락처" className="w-full py-4 text-base bg-transparent border-b-2 border-gray-300 outline-none text-[#1E1515] placeholder:text-[#1E1515]/40 font-medium peer transition-all" required /><div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#812120] peer-focus:w-full transition-all duration-500" /></div>
              </div>
              <div className="relative"><label className="block mb-6 text-[#1E1515]/60 font-bold text-[10px] uppercase tracking-[0.4em]">문의사항</label><textarea name="문의사항" rows={3} placeholder="원하시는 평형대나 궁금하신 점을 입력해 주세요" aria-label="문의사항" className="w-full py-4 text-base bg-transparent border-b-2 border-gray-300 outline-none resize-none text-[#1E1515] placeholder:text-[#1E1515]/40 font-medium peer transition-all" required /><div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#812120] peer-focus:w-full transition-all duration-500" /></div>
              <input type="checkbox" name="botcheck" className="hidden" style={{display:'none'}} />
              <button type="submit" className="group w-full bg-[#1E1515] text-[#eeeae7] font-bold text-[11px] tracking-[0.4em] uppercase py-7 hover:bg-[#812120] transition-colors duration-700 mt-4 flex items-center justify-center gap-4"><span>상담 신청하기</span><span className="transform group-hover:translate-x-2 transition-transform duration-500 text-base leading-none font-bold">→</span></button>
            </form>
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="relative bg-[#0d0909] py-24 md:py-32">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-20">
            <div><img src="/images/logo.png" className="h-7 md:h-8 mb-12 brightness-0 invert opacity-60" alt="가산 3차 SK V1 로고" /><div className="text-[#eeeae7]/60 text-[12px] font-medium tracking-widest leading-[2.5]"><p>가산 3차 SK V1 센터 | 프리미엄 지식산업센터</p><p>상호: 케이케이솔루션 | 사업자번호: 135-31-54956 | 관리자: 김기강</p></div></div>
            <div className="text-left lg:text-right"><p className="text-[#812120] text-[10px] font-bold uppercase tracking-[0.5em] mb-6">분양문의</p><a href="tel:18003357" className="text-[#eeeae7] font-[Georgia,serif] text-3xl md:text-4xl hover:text-[#812120] transition-colors italic font-bold">1800-3357</a></div>
          </div>
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#eeeae7]/20 to-transparent mb-10" />
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <p className="text-[10px] text-[#eeeae7]/40 font-medium leading-relaxed max-w-xl tracking-[0.2em]">본 홈페이지의 이미지는 소비자의 이해를 돕기 위한 컷으로 실제와 차이가 있을 수 있습니다. 모든 정보는 분양 홍보관을 통해 다시 한번 확인하시기 바랍니다.</p>
            <p className="text-[10px] font-medium text-[#eeeae7]/50 uppercase tracking-[0.4em] shrink-0">© 2026 GASAN 3rd SK V1 CENTER.</p>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @media (min-width: 1024px) {
          .lg\\:cursor-none, .lg\\:cursor-none button, .lg\\:cursor-none a { cursor: none !important; }
        }
        .hide-scrollbar::-webkit-scrollbar{display:none}
        .hide-scrollbar{-ms-overflow-style:none;scrollbar-width:none}
        .ag-reveal,.ag-reveal-h{opacity:0;transform:translateY(40px);transition:opacity 1.5s cubic-bezier(0.25,1,0.5,1),transform 1.5s cubic-bezier(0.25,1,0.5,1)}
        .ag-reveal.is-revealed,.ag-reveal-h.is-revealed{opacity:1;transform:translateY(0)}
        @keyframes slideUpMask{0%{transform:translateY(110%);opacity:0}100%{transform:translateY(0);opacity:1}}
        .ag-slide-up{display:inline-block;animation:slideUpMask 1.8s cubic-bezier(0.16,1,0.3,1) forwards;opacity:0}
        @keyframes fadeInNormal{from{opacity:0;transform:translateY(15px)}to{opacity:1;transform:translateY(0)}}
        .ag-fade-in{animation:fadeInNormal 2.5s ease forwards;opacity:0}
        .kenburns-luxury{animation:kenburnsLux 5s cubic-bezier(0.25,1,0.5,1) forwards}
        @keyframes kenburnsLux{0%{transform:scale(1)}100%{transform:scale(1.05)}}
        @keyframes slideProgressY{0%{transform:scaleY(0)}100%{transform:scaleY(1)}}
        .ticker-wrap{overflow:hidden;width:100%}
        .ticker-content{display:inline-flex;animation:tickerScroll 40s linear infinite;white-space:nowrap}
        @keyframes tickerScroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        @keyframes scrollDown{0%{transform:translateY(-100%)}50%{transform:translateY(0)}100%{transform:translateY(100%)}}
        @keyframes gentleBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
        @keyframes scaleIn{from{transform:scaleX(0)}to{transform:scaleX(1)}}
        html{scroll-behavior:smooth}
      `}</style>
    </div>
  );
}