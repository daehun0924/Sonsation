// import { useState, useEffect, useRef } from 'react';
// import { motion } from 'framer-motion';
// import 'bootstrap/dist/css/bootstrap.min.css';

// export default function SpinningWheel({ words, isSpinning, setIsSpinning, onSelectWord }) {
//     const [selectedIndex, setSelectedIndex] = useState(null);
//     const containerRef = useRef(null);

//     const slotHeight = 60; // 단어 하나 높이 (px)
//     const visibleCount = 5; // 화면에 보이는 단어 개수
//     const centerIndex = Math.floor(visibleCount / 2); // 중앙 위치 인덱스

//     const repeatedWords = [...Array(30)].flatMap(() => words); // 무한 꼬리 효과용 반복 배열

//     useEffect(() => {
//         if (isSpinning) {
//             const randomIdx = Math.floor(Math.random() * words.length);
//             setSelectedIndex(randomIdx);

//             const scrollRounds = 2; // 매번 새롭게 3바퀴 돌림
//             const baseOffset = repeatedWords.length * slotHeight; // 항상 초기화할 기준점

//             // reset transform (즉시 초기화)
//             containerRef.current.style.transition = 'none';
//             containerRef.current.style.transform = `translateY(0px)`;

//             // 강제로 reflow 시켜 transition 먹이기
//             void containerRef.current.offsetWidth;

//             const totalDistance = scrollRounds * words.length * slotHeight + (randomIdx - centerIndex) * slotHeight;

//             containerRef.current.style.transition = 'transform 3s ease-out';
//             containerRef.current.style.transform = `translateY(-${totalDistance}px)`;

//             setTimeout(() => {
//                 setIsSpinning(false);
//                 onSelectWord(words[randomIdx]);
//             }, 3100);
//         }
//     }, [isSpinning, words, setIsSpinning, onSelectWord]);

//     return (
//         <div
//             className="position-relative w-100 bg-light rounded border p-3"
//             style={{ height: `${slotHeight * visibleCount}px`, overflow: 'hidden' }}
//         >
//             <div className="position-absolute top-50 start-0 w-100 border border-success" style={{ zIndex: 10 }}></div>

//             <div ref={containerRef}>
//                 {repeatedWords.map((word, idx) => (
//                     <div
//                         key={idx}
//                         className={`d-flex justify-content-center align-items-center fw-semibold ${
//                             selectedIndex !== null && idx % words.length === selectedIndex
//                                 ? 'text-success fs-4 fw-bold'
//                                 : 'text-dark'
//                         }`}
//                         style={{ height: `${slotHeight}px` }}
//                     >
//                         {word}
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

import { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function SpinningWheel({ words, isSpinning, setIsSpinning, onSelectWord }) {
    const [selectedIndex, setSelectedIndex] = useState(null); // 내부 계산용
    const [visibleIndex, setVisibleIndex] = useState(null); // 사용자에게 보여줄 border용
    const containerRef = useRef(null);

    const slotHeight = 60;
    const visibleCount = 5;
    const centerIndex = Math.floor(visibleCount / 2);
    const repeatedWords = [...Array(30)].flatMap(() => words);

    useEffect(() => {
        if (isSpinning) {
            const randomIdx = Math.floor(Math.random() * words.length);
            setSelectedIndex(randomIdx);
            setVisibleIndex(null); // 회전 중에는 border 숨김

            const scrollRounds = 2;
            const totalDistance = scrollRounds * words.length * slotHeight + (randomIdx - centerIndex) * slotHeight;

            // 초기화
            containerRef.current.style.transition = 'none';
            containerRef.current.style.transform = `translateY(0px)`;
            void containerRef.current.offsetWidth;

            // 애니메이션 적용
            containerRef.current.style.transition = 'transform 3s ease-out';
            containerRef.current.style.transform = `translateY(-${totalDistance}px)`;

            // 끝나고 visibleIndex 설정
            setTimeout(() => {
                setIsSpinning(false);
                setVisibleIndex(randomIdx); // 이때만 border 보이게
                onSelectWord(words[randomIdx]);
            }, 3100);
        }
    }, [isSpinning, words, setIsSpinning, onSelectWord]);

    return (
        <div
            className="position-relative w-100 bg-light rounded border p-3"
            style={{ height: `${slotHeight * visibleCount}px`, overflow: 'hidden' }}
        >
            <div ref={containerRef}>
                {repeatedWords.map((word, idx) => {
                    const showBorder = visibleIndex !== null && idx % words.length === visibleIndex;
                    return (
                        <div
                            key={idx}
                            className={`d-flex justify-content-center align-items-center fw-semibold ${
                                showBorder ? 'text-success fs-4 fw-bold border border-success rounded' : 'text-dark'
                            }`}
                            style={{
                                height: `${slotHeight}px`,
                                boxSizing: 'border-box',
                            }}
                        >
                            {word}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
