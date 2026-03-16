document.addEventListener('DOMContentLoaded', () => {
    // 1. Swiper.js 초기화 (갤러리)
    const swiper = new Swiper('.mySwiper', {
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
    });

    // 2. 아코디언 메뉴 동작 (계좌번호)
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            
            // Toggle current item
            item.classList.toggle('active');
            
            // 기본 동작 제어 (하나만 열리게 하려면 아래 코드 주석 해제)
            /*
            const siblings = document.querySelectorAll('.accordion-item');
            siblings.forEach(sibling => {
                if(sibling !== item) {
                    sibling.classList.remove('active');
                }
            });
            */
        });
    });

    // 3. 계좌번호 복사 기능
    const copyButtons = document.querySelectorAll('.btn-copy');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // 버튼 요소의 부모 요소(account-row) 내부에서 계좌번호(acc-num) 값을 찾음
            const row = e.target.closest('.account-row');
            const accNum = row.querySelector('.acc-num').innerText;
            
            // 하이픈(-) 제거
            const cleanAccNum = accNum.replace(/-/g, '');
            
            navigator.clipboard.writeText(cleanAccNum).then(() => {
                alert('계좌번호가 복사되었습니다.');
            }).catch(err => {
                console.error('복사 실패:', err);
                alert('복사에 실패했습니다. 직접 선택하여 복사해 주세요.');
            });
        });
    });

    // 4. D-Day 카운트다운
    const weddingDate = new Date('2026-04-18T12:00:00');

    function updateCountdown() {
        const now = new Date();
        const diff = weddingDate - now;

        if (diff <= 0) {
            document.getElementById('countdown').innerHTML = "<span>00</span><span class='colon'>:</span><span>00</span><span class='colon'>:</span><span>00</span><span class='colon'>:</span><span>00</span>";
            document.getElementById('d-day-result').innerText = "오늘";
            document.querySelector('.d-day-text').innerHTML = "오늘은 기홍, 지현의 <b>결혼식 당일</b>입니다. 축하해 주세요!";
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('d-days').innerText = days.toString().padStart(2, '0');
        document.getElementById('d-hours').innerText = hours.toString().padStart(2, '0');
        document.getElementById('d-mins').innerText = minutes.toString().padStart(2, '0');
        document.getElementById('d-secs').innerText = seconds.toString().padStart(2, '0');
        
        document.getElementById('d-day-result').innerText = `${days}일`;
    }

    if (document.getElementById('countdown')) {
        setInterval(updateCountdown, 1000);
        updateCountdown();
    }

    // 5. 네이버 지도 초기화 및 커스텀 마커
    const mapElement = document.getElementById('naver-map');
    if (mapElement && typeof naver !== 'undefined' && naver.maps) {
        // 세계로금란교회 좌표 (경기도 파주시 와석순환로172번길 14)
        const churchLocation = new naver.maps.LatLng(37.7136, 126.7464);

        const map = new naver.maps.Map('naver-map', {
            center: churchLocation,
            zoom: 16,
            zoomControl: false,
            mapTypeControl: false,
            scaleControl: false,
            logoControl: false,
            mapDataControl: false,
        });

        // 커스텀 HTML 마커: 라벨 + 핀 + 펄스 애니메이션
        const markerContent = `
            <div class="custom-marker">
                <div class="marker-wrapper">
                    <div class="marker-label">세계로금란교회</div>
                    <div class="marker-pin"></div>
                    <div class="marker-pulse"></div>
                </div>
            </div>
        `;

        new naver.maps.Marker({
            position: churchLocation,
            map: map,
            icon: {
                content: markerContent,
                size: new naver.maps.Size(38, 58),
                anchor: new naver.maps.Point(19, 58),
            },
        });
    } else if (mapElement) {
        // 네이버 지도 API 미로드 시 대체 UI
        mapElement.innerHTML = `
            <div style="display:flex; align-items:center; justify-content:center; height:100%; flex-direction:column; gap:8px; color:#888;">
                <svg viewBox="0 0 24 24" width="32" height="32" fill="#d1bfae"><path d="M12 2C7.03 2 3 6.03 3 11c0 5.25 7.11 10.36 8.42 11.27a1 1 0 0 0 1.16 0C13.89 21.36 21 16.25 21 11c0-4.97-4.03-9-9-9zm0 12.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z"/></svg>
                <span style="font-size:13px;">아래 버튼으로 지도를 확인하세요</span>
            </div>
        `;
    }
});
